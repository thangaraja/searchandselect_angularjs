(function () {
'use strict';
appRoot.controller('indexCtrl', ['$scope', 'indexSvc', function ($scope, indexSvc) {

    var fetchingRecords = false;

    $scope.getCountries = function (searchKey, pagenumber) {

        if (fetchingRecords) return;
        fetchingRecords = true;

        indexSvc.getCountries(searchKey, pagenumber)
                    .then(function (result) {
                        if (pagenumber === 1) {
                            $scope.totalRecords = result.TotalRecords;
                            $scope.countries = result.Records;
                        }
                        else {
                            $scope.countries = $scope.countries.concat(result.Records);
                        }
                        fetchingRecords = false;
                    },
                        function (errorMessage) {
                            window.console.warn(errorMessage);
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
}());