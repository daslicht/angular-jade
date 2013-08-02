'use strict';


function myController($scope, $http, $route, $routeParams, $compile) {

  var url ='';
  //$route.current.templateUrl = '/template'
  if(typeof $routeParams.name !== "undefined"){
  
   $route.current.templateUrl = '/' + $routeParams.name;
   $('#main-view').animate({opacity:0},125,function(){
        $http.get($route.current.templateUrl).then(function (msg) {
            console.log(msg)
            $scope.name = "YEAH!"
            $('#main-view').html($compile(msg.data)($scope)).animate({opacity:1},125,function(){
                    console.log('transition ready');
            });
     
      
        });
   });
    
  }


 // $route.current.templateUrl = '/' + $routeParams.name;

  /*$http.get($route.current.templateUrl).then(function (msg) {
    $('#views').html($compile(msg.data)($scope));
  });*/
}
myController.$inject = ['$scope', '$http', '$route', '$routeParams', '$compile'];


