appRoot.directive('searchandselect', function ($rootScope) {
    return {
        replace: true,
        restrict: 'E',
        scope: {
            values: "=",
            selecteditem: "=",
            key: "@",
            onscroll: "&",
            totalrecords: "="
        },
        templateUrl: '/Scripts/app/home/templates/searchandselect.html?54',
        link: function (scope, elm, attr) {

            scope.showList = false;

            scope.selectItem = function (item) {
                scope.selecteditem = item;
                scope.showList = false;
            };

            scope.isActive = function (item) {
                return item[scope.key] === scope.selecteditem[scope.key];
            };

            scope.textChanged = function (searchKey) {
                if (searchKey.length == 0 || searchKey.length > 2) {
                    scope.onscroll({
                        searchKey: searchKey,
                        pagenumber: 1
                    });
                }
                
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

            elm.find(".dropdown").bind('scroll', function () {
                var currentItem = $(this);
                if (currentItem.scrollTop() + currentItem.innerHeight() >= currentItem[0].scrollHeight) {

                    if (!scope.pagenumber) scope.pagenumber = 2;
                    else
                        scope.pagenumber = scope.pagenumber + 1;

                    scope.onscroll({
                        searchKey: scope.searchKey,
                        pagenumber: scope.pagenumber
                    });
                }
            });

        }
    }
});




