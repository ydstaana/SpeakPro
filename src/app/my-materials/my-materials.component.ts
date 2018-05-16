import { UploadService } from './../../service/upload.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { HttpEventType } from '@angular/common/http';
import { User } from '../../model/user';
import { toast } from 'angular2-materialize';
import * as FileSaver from 'file-saver';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-my-materials',
  templateUrl: './my-materials.component.html',
  styleUrls: ['./my-materials.component.css'],
  providers: [UploadService]
})
export class MyMaterialsComponent implements OnInit {
  private availableFiles: any[];
  private uploadQueue: any[] = [];
  private uploadQueueProgress: any[] = [];
  private uploadedCnt = 0;
  private uploadedFiles: any[];
  private fileUploadSub: any;
  private loggedUser: User;

  constructor(private userService: UserService, private uploadService: UploadService, private auth: AuthService) { }

  ngOnInit() {
    this.loggedUser = this.auth.decodeAccessToken(localStorage.getItem('token'));
    this.getAvailableMaterials();
  }


  ngOnDestroy() {
    //TODO: Prevent user from leaving page while uploading
    // if (!this.isUploadDone()) {
    //   if(confirm("Are you sure you want to leave this page?")){
    //     if (this.fileUploadSub) this.fileUploadSub.unsubscribe();
    //     this.uploadQueue = [];
    //     this.uploadQueueProgress = [];
    //     this.uploadedCnt = 0;
    //     this.uploadedFiles = [];
    //   }
    // }
  }


  isUploadDone() {
    return this.uploadQueueProgress.every(e => e === 100); //Checks if all uploads are 100%
  }

  uploadMaterials(selectedFiles, size) {
    const currentIndex = this.uploadQueue.length;
    const totalSize = this.uploadQueue.length + selectedFiles.length;

    this.uploadQueue = this.uploadQueue.concat(selectedFiles); //Adds newly selected files to upload queue

    console.log(this.uploadQueue);

    //Sends request for each selected files
    for (let i = currentIndex; i < totalSize; i++) {
      const formData: FormData = new FormData();
      formData.append("selectedFiles", this.uploadQueue[i], this.uploadQueue[i].name)
      formData.append('user', this.loggedUser.id.toString());

      this.uploadQueueProgress.push(0); //Sets the progress of the selected file to zero

      this.fileUploadSub = this.uploadService.uploadMaterials(formData)
        .subscribe(event => this.handleProgress(event, i, this.uploadQueue[i].name));
    }
  }

  /* Fetches uploaded materials */
  getAvailableMaterials() {
    this.availableFiles = null;
    this.userService.getAvailableMaterialsById(this.loggedUser.id)
      .subscribe((response: any) => {
        if (response.success !== false) {
          this.availableFiles = response.data;
        }
        else {
          toast('Something went wrong. Please try logging in again.', 2000);
        }
      });
  }


  /* Handles File Upload Progress*/
  handleProgress(event, index, filename) {
    if (event.type === HttpEventType.UploadProgress) {
      this.uploadQueueProgress[index] = Math.round(100 * event.loaded / event.total);
    }
    else if (event.type === HttpEventType.Response) {
      this.uploadQueue = [];
      this.getAvailableMaterials();
      toast(`You have successfully uploaded ${filename}`, 2000)
    }
  }


  /* Automatically uploads selected files */
  handleFileInput(filelist) {
    let selectedFiles = [];

    for (let i = 0; i < filelist.length; i++) {
      filelist[i].uploadDate = new Date().toISOString(); //Adds upload date to selected file
      selectedFiles.push(filelist[i]);
    }

    this.uploadMaterials(selectedFiles, selectedFiles.length); //Calls the upload function
  }

  download(fileName) {
    this.userService.downloadFile(fileName)
      .subscribe((response: any) => {
        if (response.success !== false) {
          FileSaver.saveAs(response, fileName);
        }
        else {
          toast('Something went wrong. Please try logging in again.', 2000);
        }
      });
  }
}
