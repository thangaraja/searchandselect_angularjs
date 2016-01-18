## angular-search-and-select

Dropdown directives for AngularJS: Includes server side pagination & search records.

Screenshot:

![]({{site.baseurl}}/http://imgur.com/c1RgeTg)

See demo: http://searchandselect.apphb.com/searchandselect/demo/

Below is the record format. It should have the properties “TotalRecords” and “Records”.

![]({{site.baseurl}}/http://imgur.com/SyA8mqs)

Usage

Include search and select in your module dependencies:
var app = angular.module('yourapplicationmodule', ['angular-search-and-select']);
In view:
<searchandselect selecteditem="country" values="countries" key="Key" totalrecords="totalRecords" onscroll="getCountries(searchKey, pagenumber)"></searchandselect>
	
selecteditem	The item to be selected on load
values	List of records
totalRecords	Property which contains total records value
onscroll	Path the method which calls the server method. Method should have the parameters searchKey, pagenumber 

In controller, setup the select options and object to hold the selected value:

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

Developing
Pull requests are welcome!
License
MIT
