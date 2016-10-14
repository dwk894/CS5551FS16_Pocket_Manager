angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('createBudget', {
    url: '/page1',
    templateUrl: 'templates/createBudget.html',
    controller: 'createBudgetCtrl'
  })

  .state('expenseModelSelect', {
    url: '/page2',
    templateUrl: 'templates/expenseModelSelect.html',
    controller: 'expenseModelSelectCtrl'
  })

  .state('frugalityModel', {
    url: '/page3',
    templateUrl: 'templates/frugalityModel.html',
    controller: 'frugalityModelCtrl'
  })

  .state('moderateModel', {
    url: '/page4',
    templateUrl: 'templates/moderateModel.html',
    controller: 'moderateModelCtrl'
  })

  .state('amusementModel', {
    url: '/page5',
    templateUrl: 'templates/amusementModel.html',
    controller: 'amusementModelCtrl'
  })

  .state('doItYourself', {
    url: '/page6',
    templateUrl: 'templates/doItYourself.html',
    controller: 'doItYourselfCtrl'
  })

  .state('doItYourself2', {
    url: '/page7',
    templateUrl: 'templates/doItYourself2.html',
    controller: 'doItYourself2Ctrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});