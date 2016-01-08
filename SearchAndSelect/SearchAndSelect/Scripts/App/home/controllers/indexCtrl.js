'use strict';
appRoot.controller('indexCtrl', ['$scope', 'indexSvc', function ($scope, indexSvc) {

    $scope.initialize = function () {


        indexSvc.getCountries("","",function(result) {


        });
       
        $scope.colours = [{
            name: "Red",
            id: "#F21B1B"
        }, {
            name: "Blue",
            id: "#1B66F2"
        }, {
            name: "Green",
            id: "#07BA16"
        }];
        $scope.colour = {
            name: "Red",
            id: "#F21B1B"
        };

    };

    $scope.initialize();
   
}]);