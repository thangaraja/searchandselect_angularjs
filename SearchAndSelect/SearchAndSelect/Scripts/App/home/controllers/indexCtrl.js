'use strict';
appRoot.controller('indexCtrl', ['$scope', 'indexSvc', function ($scope, indexSvc) {

    var fetchingRecords = false;

    $scope.getCountries = function (searchKey, pagenumber) {

        if (fetchingRecords) return
        fetchingRecords = true;

        indexSvc.getCountries(searchKey, pagenumber)
                    .then(function (countries) {
                        if (pagenumber === 1)
                            $scope.countries = countries;
                        else {
                            $scope.countries = $scope.countries.concat(countries);
                        }
                        fetchingRecords = false;
                    },
                        function (errorMessage) {
                            console.warn(errorMessage);
                            fetchingRecords = false;
                        });
    };

    $scope.countries = [];

    $scope.country = {
        Key: "India",
        Value: "In"
    };

    $scope.getCountries("", 1);

}]);