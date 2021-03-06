// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('record', {
      url: '/record',
          templateUrl: 'templates/record.html',
          controller: 'RecCtrl'
        
      
    })
      .state('confirm', {
      url: '/confirm',
          templateUrl: 'templates/confirm.html',
          controller: 'ConfCtrl'
        
      
    })
     .state('next', {
      url: '/next',
          templateUrl: 'templates/next.html',
          controller: 'NextCtrl'
        
      
    })
 

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:


 

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/record');

});