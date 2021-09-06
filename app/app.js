
var app = angular.module('app', ['ngRoute','ngAnimate'] );


app.config(['$routeProvider',function($routeProvider) {

    $routeProvider
    .when('/home',{
        templateUrl: 'views/homepage.html'
        
    })
    .when('/directory',{
        templateUrl: 'views/directory.html',
        controller: 'app-controller-1'
    }).otherwise({
        redirectTo: '/home'
    })
}]);

app.directive('randomUser', [function(){
    return {
        restrict: 'E',
        scope: {
            users: '=',
            title: '='
        },
        templateUrl: 'views/randomUser.html',
        transclude: true,
        replace: true,
        controller: function($scope){
            $scope.random = Math.floor(Math.random() * 2);
            console.log($scope.random);

        }
    }

}]);
    


app.controller('app-controller-1', ['$scope', '$http', function($scope, $http) {

    $scope.removeItem = function(item){
        var removing_item_index = $scope.messages.indexOf(item);
        $scope.messages.splice(removing_item_index,1);
    };


    $scope.add_message = function(){
        $scope.messages.push({
            name: $scope.new_item.name,
            mark: parseInt($scope.new_item.mark),
            color: $scope.new_item.color,
            available : true
        });

        $scope.new_item.name = "";
        $scope.new_item.mark = "";
        $scope.new_item.color = "";
    };


    $http.get('content/data/users.json').then(function(data) {
        $scope.messages = data.data;
    });

}]); 