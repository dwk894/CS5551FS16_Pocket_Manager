angular.module('starter.services', [])

// Receipt photo service
.service('PhotoService', function($state, $cordovaImagePicker, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, $q) {
   var api_key = 'AIzaSyC_7ckfqhJSox1Ay7MLwaxGAx6J-n7MQl0';
   
   // Take a photo
   return{
       takePicture : function(){

           // Possible output
            var deferred = $q.defer();
            var promise = deferred.promise;
            var me = this;

            // Camera options
            var options = {
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                targetWidth: 500,
                targetHeight: 500,
                correctOrientation: true,
                cameraDirection: 0,
                encodingType: Camera.EncodingType.JPEG
            };

            // Take a photo
            $cordovaCamera.getPicture(options).then(function(imagedata){

                me.current_image = "data:image/jpeg;base64," + imagedata;
                me.image_description = '';
                me.locale = '';
                me.detection_type = 'TEXT_DETECTION';
                
                // Put in Google Vision Parameters
                var vision_api_json = {
                  "requests":[
                    {
                      "image":{
                        "content": imagedata
                      },
                     "features": [
                             {
                            type: 'TEXT_DETECTION',
                            maxResults: 10
                        }
                      ]
                    }
                  ]
                };

                // Make them a string
                var file_contents = JSON.stringify(vision_api_json);

                // Write to file
                $cordovaFile.writeFile(
                    cordova.file.applicationStorageDirectory,
                    'file.json',
                    file_contents,
                    true
                ).then(function(result){
                  
                    var headers = {
                        'Content-Type': 'application/json'
                    };
                    // Headers for the photo 
                    options.headers = headers;

                    // Upload to Google
                    var server = 'https://vision.googleapis.com/v1/images:annotate?key=' + api_key;
                    var filePath = cordova.file.applicationStorageDirectory + 'file.json';

                    $cordovaFileTransfer.upload(server, filePath, options, true)
                        .then(function(result){

                            var res = JSON.parse(result.response);
                            
                            // Our response
                            var text = res.responses[0].textAnnotations[0].description;
                            console.log(text);

                            // Get date
                            var date;
                            console.log(text);

                            // Parse the date in with two and one digit day and month
                            var twotwo = text.match(/\d{2}\/\d{2}\/\d{4}/);
                            var oneone = text.match(/\d{1}\/\d{1}\/\d{4}/);
                            var onetwo = text.match(/\d{1}\/\d{2}\/\d{4}/);
                            var twoone = text.match(/\d{2}\/\d{1}\/\d{4}/);
                            console.log(twotwo);
                            console.log(twoone);
                            console.log(onetwo);
                            console.log(oneone);
                            
                            // Write string to a date
                            if(twotwo != null){
                            
                                date = new Date(twotwo);
                            }
                            else if (twoone != null)
                            {
                                    date =  new Date(twoone);

                            }
                            else if (oneone != null)
                            {
                                    date =  new Date(oneone);

                            }
                            else if (onetwo != null)
                            {
                                    date =  new Date(onetwo);

                            }

                            // If nothing set today's date'
                            else
                            {
                                date = new Date(); 
                            }
                            console.log(date);

                            // Get vendor, assume it is first line of the receipt
                            var vendor = text.split('\n')[0];
                            console.log(vendor);
                            
                            // Get rid of welcome message
                            vendor = vendor.replace('Welcome to','').trim();
                            vendor = vendor.replace('Welcome To','').trim();
                            vendor = vendor.replace('WELCOME TO','').trim();
                            console.log(vendor);

                            // Store locally for confirmation with user
                            if (typeof(Storage) !== "undefined") {

                                //Create a new user on Parse
                                sessionStorage.clear();
                                sessionStorage.setItem('rec.vendor', vendor);

                                // See if the user gave us a date, if not use today
                                if(date==null)
                                {
                                    date = new Date();          
                                }
                                sessionStorage.setItem('rec.date', date);
                                
                            // Can't store locally'
                            } else {
                                // No local storage :()
                                var alertPopup = $ionicPopup.alert({
                                            title: 'Error',
                                            template: 'Error 1 - No Local Storage on Browser'
                                        });
                            }
                                // Looks good
                               deferred.resolve('Photo Success!');
                            

                           
                      }, function(err){
                        deferred.reject('Error 1 - An error occurred while uploading the file');
                      });
                }, function(err){
                    deferred.reject('Error 2 - An error occurred while trying to write the file');
                });

            }, function(err){
              deferred.reject('Error 3 - An error occurred getting the picture from the camera');
            });

            // Worked
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }

            // Error
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            // Good bye
            return promise;
        }

   }
       
})