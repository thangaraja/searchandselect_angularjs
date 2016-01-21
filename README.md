## angular-search-and-select

Dropdown directive for AngularJS: Includes server side pagination & search records.

![alt tag](http://i.imgur.com/c1RgeTg.png)

See demo: [http://searchandselect.apphb.com/searchandselect/demo/](http://searchandselectangularjs.apphb.com/SearchAndSelect/demo/)

### Dependencies. 
1. Twitter Bootstrap
2. jQuery
3. Font Awesome

### Result format. 
It should have the properties “TotalRecords” and “Records”.

![alt tag](http://i.imgur.com/SyA8mqs.png)

### Usage
Include search and select in your module dependencies:
```js
var app = angular.module('yourapplicationmodule', ['angular-search-and-select']);
```
In view:

```html
<searchandselect selecteditem="country" values="countries" key="Key" totalrecords="totalRecords" onscroll="getCountries(searchKey, pagenumber)"</searchandselect>
```

Option             | Description
 ----------------- | ---------------------------- 
selecteditem  | The item to be selected on load (E.g country)           
values  | List of items to be shown in the dropdown result (E.g countries)
totalRecords | Property which contains total records value (E.g totalRecords)
onscroll | Method which calls the server method. Method should have the parameters searchKey, pagenumber (E.g getCountries)
key | Defines the property that should be displayed to the user from objects

In controller, set the values for totalRecords,key, values:

```js
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
```
The complete code is available in demo folder. Please refer.

## Contributing

If you have questions with the instructions above, feel free to add them as issues in the repository. 

*By contributing to this repository you are agreeing to make your content available subject to the license of this repository.*

### Process
    1. Add/discuss the changes in a GitHub issue.
    2. Create a Pull Request, provide enough details like why it is needed and reference the issue.
    3. The Pull Request will be evaluated and either merged or declined.

## License (The MIT License)
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
