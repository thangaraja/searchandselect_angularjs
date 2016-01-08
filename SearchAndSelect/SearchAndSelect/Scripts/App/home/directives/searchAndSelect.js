appRoot.directive('searchandselect', function ($rootScope) {
    return {
        restrict: 'E',
        scope: {
            values: "=",
            selecteditem: "="
        },
        templateUrl: '/Scripts/app/home/templates/searchandselect.html?30',
        link: function (scope) {
           
            scope.showList = false;

            scope.selectItem = function (item) {
                scope.selecteditem = item;
                scope.showList = false;
            };

            scope.isActive = function (item) {
                return item.name === scope.selecteditem.name;
            };

            scope.show = function () {
                scope.showList = !scope.showList;
            };

            $rootScope.$on("documentClicked", function (inner, target) {
                if (!$(target[0]).is(".searchandselect") && !$(target[0]).parents(".searchandselect").length > 0)
                    scope.$apply(function () {
                        scope.showList = false;
                    });
            });

           
        }
    }
});




