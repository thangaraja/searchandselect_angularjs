## angular-search-and-select

Dropdown directives for AngularJS: Includes server side pagination & search records.

### Screenshot:

![alt tag](http://i.imgur.com/c1RgeTg.png)

See demo: [http://searchandselect.apphb.com/searchandselect/demo/](http://searchandselect.apphb.com/searchandselect/demo/)

Below is the record format. It should have the properties “TotalRecords” and “Records”.

![alt tag](http://i.imgur.com/SyA8mqs.png)

## Usage
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
selecteditem  | The item to be selected on load            
values  | List of records
totalRecords | Property which contains total records value
onscroll | Path the method which calls the server method. Method should have the parameters searchKey, pagenumber

In controller, setup the select options and object to hold the selected value:

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

----------

## Contributing

Open an issue first to discuss potential changes/additions. If you have questions with the guide, feel free to leave them as issues in the repository. If you find a typo, create a pull request. The idea is to keep the content up to date and use github’s native feature to help tell the story with issues and PR’s, which are all searchable via google. Why? Because odds are if you have a question, someone else does too! You can learn more here at about how to contribute.

*By contributing to this repository you are agreeing to make your content available subject to the license of this repository.*

### Process
    1. Discuss the changes in a GitHub issue.
    2. Open a Pull Request, reference the issue, and explain the change and why it adds value.
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
