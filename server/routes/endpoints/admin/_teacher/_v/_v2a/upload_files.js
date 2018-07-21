const moment = require('moment');
const Multer = require('multer');
const pify = require('pify');

const File = require('../../../../../../models/FileSchema.js');

const Storage = require('@google-cloud/storage');

// Instantiate a storage client
const storage = Storage();

/* Upload File Logic */
const uploadFile = async function(req, res){
    //Get timestamp
    const uploadDate = moment();
    
    if(req.headers.author){

        //Get author id from headers
        const authorId = req.headers.author; 

        const destination = '../uploads/'
        const filename = (req, file, cb) => cb(null, generateFilename(file, authorId, uploadDate));

        const disk = Multer.diskStorage({ destination, filename })

        const multer = Multer({ disk, 
            limits: {
                fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
            } 
        })

        // A bucket is a container for objects (files).
        const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);


        //Promisify multer upload
        const uploadFormData = pify(multer.single('selectedFiles'));

        try {
            await uploadFormData(req, res);
            console.log(req.file);

            //Process the uploaded file
            if(req.file) {
                const item = req.file;
                //Tokenized the uploaded file's original name
                const tokenized = splitFilename(item.originalname);
                
                if(tokenized){
                    //Filename and file extension
                    const filename = tokenized[0];
                    const fileExtension = tokenized[1];

                    console.log(filename);

                    //Check for duplicate filename in author's files
                    const duplicateFiles = await findAuthorFiles(authorId, filename);

                    //Generating of new display name starts here
                    let newDisplayName = null;

                    console.log(duplicateFiles);
                    
                    if(duplicateFiles.length === 0){ //No filename duplicate in author's files
                        newDisplayName = filename + '.' + fileExtension; //filename.jpg
                    } else if(duplicateFiles.length >= 1){ //There is/are filename duplicate/s in author's files
                        const cnt = getDuplicateCount(duplicateFiles, filename);
                        newDisplayName = `${filename} (${cnt}).${fileExtension}`; //filename (n).jpg
                    }

                    //Uploading of new file information to db starts here
                    const newFile = {
                        fileName: filename + "." + fileExtension,
                        displayName: newDisplayName,
                        author: authorId,
                        uploadDate: uploadDate.format(),
                        fileSize: item.size
                    }
                    console.log(newFile.fileName);

                    File.create(newFile, (err, file) => {
                        if(err) {
                            res.status(500).json({
                                code: 500,
                                message: err
                            });
                        }

                        res.status(200).json({
                            code: 200,
                            message: 'Successfully uploaded the file ' + newDisplayName
                        });
                    });

                    // Create a new blob in the bucket and upload the file data.
                    const blob = bucket.file(req.file.originalname);
                    const blobStream = blob.createWriteStream({
                        resumable: false
                    });

                    blobStream.on('error', (err) => {
                        next(err);
                    });

                    blobStream.on('finish', () => {
                        // The public URL can be used to directly access the file via HTTP.
                        console.log("upload successful");
                    });

                    blobStream.end(req.file.buffer);

                } else {
                    res.status(500).json({
                        code: 500,
                        message: 'An error occured. Please try again.'
                    });
                } 
            } else {
                res.status(500).json({
                    code: 500,
                    message: 'An error occured. Please try again.'
                });
            }
        } catch (err) {
            res.status(500).json({
                code: 500,
                message: err
            });
        }
    } else {
        res.status(500).json({
            code: 500,
            message: 'An error occured. Please try again.'
        });
    }
}

function findAuthorFiles(authorId, filename){
    return new Promise((resolve, reject) => {

        //Looks for files that might have the same filename
        File.find({author: authorId, displayName: {$regex: `^${escapeRegExp(filename)}`}})
            .sort( { uploadDate: 1 } )
            .exec((err, files) => {
                if(err) reject(null);
                resolve(files);
            });
    });
}

function generateFilename(file, authorId, uploadDate){
    const tokenized = splitFilename(file.originalname);

    if(tokenized){
        const filename = tokenized[0];
        const fileExtension = tokenized[1];

        //Generated filename will use the format: filename-authorid-time_epoch.jpg
        const newFilename = `${filename}-${authorId}-${uploadDate.format('x')}.${fileExtension}`; 
        return newFilename;
    }

    return file.originalname;
}

function splitFilename(filename){
    const token = [];
    const pos = filename.lastIndexOf('.');
    if(pos != -1){ 
        token.push(filename.substring(0, pos));
        token.push(filename.substring(pos+1, filename.length));
        return token;
    }

    return null;
}


function getDuplicateCount(files, originalFilename){
    let arr = files.map((file) => {
        const startPos = file.displayName.lastIndexOf('(');
        const endPos = file.displayName.lastIndexOf(')');
    
        if(startPos !== -1 && endPos !== -1 && file.displayName.substring(0, startPos-1) === originalFilename){
            return file.displayName.substring(startPos+1, endPos);
        }

        return 0;
    });

    for(i = 1;;i++){
        if(!arr.includes(i.toString())){
            return i;
        }
    }
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

module.exports = uploadFile;