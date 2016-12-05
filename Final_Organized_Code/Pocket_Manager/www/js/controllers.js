angular.module('starter.controllers', [])


// Controller for the initial recording of an expense
.controller('RecCtrl', function($scope, $state, $filter, $ionicPopup, PhotoService) {
    function getOffsetDate(offsetInMintues) {
  // Get local date object
  var d = new Date();
  
  // Add local time zone offset to get UTC and 
  // Subtract offset to get desired zone
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset() - offsetInMintues);
  return d;
}
var centralDate = getOffsetDate(360);
console.log("cent " + centralDate);
    // Get the date and put it in the form
      $scope.date  = new Date(centralDate);

    // Send values back ot the form
    //$scope.date = formatted_date;
    console.log($scope.date);

    // Runs when submit form data for a manually entered expense
    $scope.recordExp = function(category, amount, vendor, date){

        // Make sure they can use local storage before taking the data
        if (typeof(Storage) !== "undefined") {

            //Create a new user on Parse
            sessionStorage.clear();
            sessionStorage.setItem('rec.category', category);
            sessionStorage.setItem('rec.amount', amount);
            sessionStorage.setItem('rec.vendor', vendor);

            // See if the user gave us a date, if not use today
            if(date==null)
            {
                date = new Date();          
            }
            sessionStorage.setItem('rec.date', date);
        
        } 
        // Error no local storage :(
        else 
        {
            var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error 1 - No Local Storage on Browser'
                });
        }
                // Go to the confirmation page to check the data entered
            $state.go('confirm'); 
    }

    // Capture expense via photo of receipt
    $scope.goPhoto = function(){
        PhotoService.takePicture().success(function(data) {
            // It worked head to the homepage
            console.log(data);
            $state.go('confirm');

        }).error(function(data) {
            // Wrong stuff, try again
            var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: data
        });
    });
    }  

      // Capture expense via photo of receipt
    $scope.goPick = function(){
        PickerService.pickPicture().success(function(data) {
            // It worked head to the homepage
            console.log(data);
            $state.go('confirm');

        }).error(function(data) {
            // Wrong stuff, try again
            var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: data
        });
    });
    }  
})

// Controller for confirmming expense data before final submission
.controller('ConfCtrl', function($scope, $state, $filter, $http, $ionicPopup) {
    
    // Get the date from local storage and convert it to righjt format
     var stored_date = $filter("date")(sessionStorage.getItem('rec.date'), "yyyy-MM-dd");
     var formatted_date = new Date(stored_date);

        // Send values back ot the form
        $scope.date = formatted_date;
        $scope.category =  sessionStorage.getItem('rec.category');
        $scope.vendor =  sessionStorage.getItem('rec.vendor');
        $scope.amount =  parseFloat(sessionStorage.getItem('rec.amount'));

        // Form submit of final data to MongoDb
        $scope.confExp = function(category, amount, vendor, date){

            // Format the data 
            var data = { 
                'Category': category,
                'Amount': amount,
                'Vendor': vendor,
                'Date': date
            }
            var url = 'https://api.mlab.com/api/1/databases/pocket_manager/collections/pocket_manager/?apiKey=Omq-HhXv0WUnDNEVey9TQdBhsEEFDtHo';
            
            // Send data
            $http.post(url, data)
            .success(function (data, status, headers, config) {
            
                var alertPopup2 = $ionicPopup.alert({
                    title: 'Victory',
                    template: 'You successfully added an expense'
                });		  
	        })
            // Something went wrong
            .error(function (data, status, headers, config) { 
                var alertPopup3 = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error 2 - Could not connect to database to add the expense'
                }); 
            });
        // Refresh the applicaiton to clear Angluar data from the form
         window.location.reload();
        // Go to the Next Action window
      $state.go('next'); 
  }
  

})

// Where to next
.controller('NextCtrl', function($scope, $state, $timeout, $cordovaFileTransfer, PhotoService) {
  
     // Go to the Receipt Page page
    $scope.goRec = function(){
      
      $state.go('record'); 
    }
    
    $scope.goPhoto = function(){
            // Go to the Receipt Page page
            PhotoService.takePicture().success(function(data) {
           // It worked head to the homepage
           console.log(data);
            $state.go('confirm');
        })
        
        // Wrong stuff, try again
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: data
            });
        });
    }  
});


