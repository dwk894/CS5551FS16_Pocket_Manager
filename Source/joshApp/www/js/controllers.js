angular.module('starter.controllers', [])



.controller('RecCtrl', function($scope, $state, $filter, $ionicPopup, PhotoService) {
 // Get the date from local storage and convert it to righjt format
     var stored_date = $filter("date")(new Date(), "yyyy-MM-dd");
     var formatted_date = new Date(stored_date);

        // Send values back ot the form
    $scope.date = formatted_date;
    console.log($scope.date);
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
    
     
  } else {
    // No local storage :()
    var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: 'Error 1 - No Local Storage on Browser'
              });
  }
        // Go to the login page
      $state.go('confirm'); 
  }

  $scope.goPhoto = function(){
        // Go to the Receipt Page page
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
      
        
  

})

.controller('ConfCtrl', function($scope, $state, $filter, $http, $ionicPopup) {
    
    // Get the date from local storage and convert it to righjt format
     var stored_date = $filter("date")(sessionStorage.getItem('rec.date'), "yyyy-MM-dd");
     var formatted_date = new Date(stored_date);

        // Send values back ot the form
        $scope.date = formatted_date;

        $scope.category =  sessionStorage.getItem('rec.category');
        $scope.vendor =  sessionStorage.getItem('rec.vendor');
        $scope.amount =  parseFloat(sessionStorage.getItem('rec.amount'));
        $scope.confExp = function(category, amount, vendor, date){
  
         // Make sure they can use local storage before taking the data

         var data = { 'Category': category,
		'Amount': amount,
		'Vendor': vendor,
		'Date': date
	  }
      var url = 'https://api.mlab.com/api/1/databases/pocket_manager/collections/pocket_manager/?apiKey=Omq-HhXv0WUnDNEVey9TQdBhsEEFDtHo';
      $http.post(url, data)
      .success(function (data, status, headers, config) {
            var alertPopup2 = $ionicPopup.alert({
                  title: 'Victory',
                  template: 'You successfully added an expense'
              });
				  
	  }).error(function (data, status, headers, config) { 
            var alertPopup3 = $ionicPopup.alert({
                  title: 'Error',
                  template: 'Error 2 - Could not connect to database to add the expense'
              }); });
  
        // Go to the login page
      $state.go('next'); 
  }
  

})

.controller('NextCtrl', function($scope, $state, $timeout, $cordovaFileTransfer, PhotoService) {
    $scope.goRec = function(){
        // Go to the Receipt Page page
      $state.go('record'); 
    }
        $scope.goPhoto = function(){
        // Go to the Receipt Page page
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
})

// For testing purposes
.controller('PhotoCtrl', function($scope, $state, $cordovaImagePicker, $cordovaFile, $cordovaFileTransfer, $cordovaCamera) {
   

        $scope.select = function() {       
        // Image picker will load images according to these settings
         var options = {
        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
        width: 800,
        height: 800,
        quality: 80            // Higher is better
    };
 
    $cordovaImagePicker.getPictures(options).then(function (imagedata) {
            
    }, function(error) {
        console.log('Error: ' + JSON.stringify(error));    // In case of error
    });
};  
    $scope.test = function(){
        var text = "THE MIXX\nHAWTHORNE\n913-338-4000\n11942 Roe Ave\nLeawood, KS 66209\nCheck Tab Cashier Time\nDate\n340849 3530 1111\n6:18:30 PM 1/2/2016\nSalad Wrap\n8.95\nHealthNut\n10.99\nFood Sub-Total\n19.94\nFountain Ice T\n2.20\nBeverage Sub-Total\n2.20\n22.14\nSUB TOTAL\n2.18\nSales" +  "Tax\n24.32\nTOTAL\nReceipt Used: Master Card\nThank You!\nVisit Us at mixxingitup.com\nSend Feedback to info@mixxingitup.com\n";

    
    // Get date
    var date;
    console.log(text);
      var twotwo = text.match(/\d{2}\/\d{2}\/\d{4}/);
      var oneone = text.match(/\d{1}\/\d{1}\/\d{4}/);
      var onetwo = text.match(/\d{1}\/\d{2}\/\d{4}/);
      var twoone = text.match(/\d{2}\/\d{1}\/\d{4}/);
      console.log(twotwo);
       console.log(twoone);
        console.log(onetwo);
         console.log(oneone);
    
    
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
    else
    {
         date = new Date(); 
    }
    console.log(date);

    // Get vendor
    var vendor = text.split('\n')[0];
    console.log(vendor);
    
    vendor = vendor.replace('Welcome to','').trim();
    vendor = vendor.replace('Welcome To','').trim();
    vendor = vendor.replace('WELCOME TO','').trim();
    console.log(vendor);




    };

    
});

