angular.module('starter.controllers', [])



.controller('RecCtrl', function($scope, $state, $filter, $ionicPopup) {

       $scope.date = $filter("date")(Date.now(), "yyyy-MM-dd");
       
      $scope.recordExp = function(data){
  
    // Make sure they can use local storage before taking the data
    if (typeof(Storage) !== "undefined") {

      //Create a new user on Parse
      localStorage.setItem('rec.category', data.category);
      localStorage.setItem('rec.amount', data.amount);
      localStorage.setItem('rec.vendor', data.vendor);

      // See if the user gave us a date, if not use today
      if(data.date==null)
      {
          data.date = new Date();          
      }
      localStorage.setItem('rec.date', data.date);
    
     
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

})

.controller('ConfCtrl', function($scope, $state, $filter, $http, $ionicPopup) {
    
    // Get the date from local storage and convert it to righjt format
     var stored_date = $filter("date")(localStorage.getItem('rec.date'), "yyyy-MM-dd");
     var formatted_date = new Date(stored_date);

        // Send values back ot the form
        $scope.date = formatted_date;
        $scope.category =  localStorage.getItem('rec.category');
        $scope.vendor =  localStorage.getItem('rec.vendor');
        $scope.amount =  parseInt(localStorage.getItem('rec.amount'));
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

.controller('NextCtrl', function($scope, $state) {
    $scope.goRec = function(){
        // Go to the Receipt Page page
      $state.go('record'); 
  }
});

