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

                            // Filter out common Google Vision error of placing commas in dollar amounts
                            text = text.replace(/,/g,".");
                            console.log(text);

                            // Get date
                            var date;

                            // Parse the date with slashes in with two and one digit day and month
                            var twotwo = text.match(/\d{2}\/\d{2}\/\d{4}/);
                            var oneone = text.match(/\d{1}\/\d{1}\/\d{4}/);
                            var onetwo = text.match(/\d{1}\/\d{2}\/\d{4}/);
                            var twoone = text.match(/\d{2}\/\d{1}\/\d{4}/);
                          
                            // Parse date with dashes instead of slashes
                            twotwo = text.match(/\d{2}\-\d{2}\-\d{4}/);
                            oneone = text.match(/\d{1}\-\d{1}\-\d{4}/);
                            onetwo = text.match(/\d{1}\-\d{2}\-\d{4}/);
                            twoone = text.match(/\d{2}\-\d{1}\-\d{4}/);
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

                             // Get total price
                            var regexFloat = /[+-]?\d+(\.\d+)?/g;

                            // All possible totals
                            var totalSet = [];
                            // Final total read from receipt
                            var total;

                            // Counter for number of results
                            var counter = 0;

                            // Get line before word Total
                            var totalBefore = text.match(/((.*\n){1})TOTAL/i);
                         
                            if(totalBefore != null){
                                totalSet[counter] = totalBefore[0].match(regexFloat);
                                console.log(totalSet[counter]);
                                counter++
                            }

                            // Find number before the word Amount Paid
                            var amountBefore = text.match(/((.*\n){1})Amount Paid/i);
                         
                            if(amountBefore != null){
                                totalSet[counter] = amountBefore[0].match(regexFloat);
                                console.log(totalSet[counter]);
                                counter++
                            }

                            // Get line after word Amount Paid
                            var amountAfter = text.match(/AMOUNT PAID((\n.*){1})/i);
                        
                           if(totalAfter != null){
                                totalSet[counter] = amountAfter[0].match(regexFloat);
                                console.log(totalSet[counter]);
                                counter++;
                            }

                            // Get line after word Total:
                            var totalAfterSemi = text.match(/TOTAL:((\n.*){1})/i);
                        
                           if(totalAfter != null){
                                totalSet[counter] = totalAfterSemi[0].match(regexFloat);
                                console.log(totalSet[counter]);
                                counter++;
                            }

                            // Get line after Total with no semicolon
                            var totalAfter = text.match(/TOTAL((\n.*){1})/i);
                            
                            if(totalAfter != null){
                                totalSet[counter] = totalAfter[0].match(regexFloat);
                                console.log(totalSet[counter]);
                                counter++;
                            }
                            
                            // Get largest number from our results
                            if(totalSet != null)
                            {
                                total =  Math.max.apply(null, totalSet)
                            }

                            // No possible totals found
                            else
                            {
                                total = 0;
                            }
                            console.log(total);
   

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
                                sessionStorage.setItem('rec.amount', total);
                                
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