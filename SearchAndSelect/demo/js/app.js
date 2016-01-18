var appRoot = angular.module('searchAndSelectApp', ['angular-search-and-select']);     //Define the main module

appRoot.run(function ($rootScope) {
    angular.element(document).on("click", function (e) {
        $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });
});


