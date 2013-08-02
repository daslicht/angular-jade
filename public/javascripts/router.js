'use strict';
app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  
    $locationProvider.html5Mode(true)

    console.log('router')

    $routeProvider
        
        .when('/:name', { templateUrl: '/blank.html', controller: myController })
          //       when('/user', {
          //           templateUrl: '/user',   
          //           controller: myController
          //       }).

          //       when('/user/:phoneId', {
          //           templateUrl: 'partials/phone-detail.html', 
          //           controller: myController
          //       })//.
        .otherwise({redirectTo: '/'});
}]);



