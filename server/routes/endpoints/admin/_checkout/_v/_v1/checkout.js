var Twocheckout = require('2checkout-node');

var tco = new Twocheckout({
    sellerId: "901378548",
    privateKey: "21D194AB-F4CD-4C8B-A7AF-0FC4768A4F72",
	sandbox: true   
});



module.exports = function(req, res, next){
	console.log("am i called");
	console.log(req.body);
	var params = {
	    "merchantOrderId": "123",
	    "token": req.body.tcoToken,
	    "currency": "USD",
	    "total": "10.00",
	    "billingAddr": {
	        "name": "Joe Flagster",
	        "addrLine1": "123 Main Street",
	        "city": "Townsville",
	        "state": "Ohio",
	        "zipCode": "43206",
	        "country": "USA",
	        "email": "example@2co.com",
	        "phoneNumber": "5555555555"
	    }
	};

	tco.checkout.authorize(params, function (error, data) {
		console.log("i was called");
	    if (error) {
	        res.status(300).json({
				code: 300,
				message : error.message
			});
	    } else {
	        res.send(data);
	    }
	});
	
}