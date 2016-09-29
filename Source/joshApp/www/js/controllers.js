angular.module('starter.controllers', [])



.controller('RecCtrl', function($scope, $state) {
      $scope.recordExp = function(data){
  
    // Make sure they can use local storage before taking the data
    if (typeof(Storage) !== "undefined") {

      //Create a new user on Parse
      localStorage.setItem('rec.category', data.category);
      localStorage.setItem('rec.amount', data.amount);
      localStorage.setItem('rec.vendor', data.vendor);
      localStorage.setItem('rec.date', data.date);
  } else {
    // No local storage :()
    var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: 'No Local Storage on Browser'
              });
  }
        // Go to the login page
     // $state.go('record'); 
  }

});


