// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

$scope.searchitem = function(){

//function searchitem(){
  var text =$("#wishitem").val().replace(/\s/g,"%20");

  $.getJSON(
    "http://open.api.ebay.com/shopping?callname=FindItems&requestencoding=NV&responseencoding=JSON&appid=yunlongl-s-PRD-a9f3034fd-7c6e9430&siteid=0&SortOrderType=BestMatch&QueryKeywords="+ text +"&version=713",
    function(result){
      var intro = result["Item"]
      $.each(
      intro,
        function(key,value){
          $("#result").replaceWith("<div id = 'result'><p class = 'smalltitle'>" + text + "</p><p class = 'category'>"+ intro[key]["PrimaryCategoryName"] +"</p><img src="+ intro[key]["GalleryURL"] +"><P class='price'>"+ intro[key]["ConvertedCurrentPrice"]["value"] +"</p>")
        }      
      );      
    }    
  );  
}
