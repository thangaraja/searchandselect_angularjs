var appRoot = angular.module('searchAndSelectApp', ['ngRoute']);     //Define the main module

appRoot
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home', { templateUrl: '/Scripts/app/home/Views/index.html?18', controller: 'indexCtrl' })
            .when('/about', { templateUrl: '/Scripts/app/home/Views/about.html', controller: 'indexCtrl' })
            .when('/contact', { templateUrl: '/Scripts/app/home/Views/contact.html', controller: 'indexCtrl' })
            .otherwise({
                redirectTo: '/home'
            });
    }]);



appRoot.run(function ($rootScope) {
    angular.element(document).on("click", function (e) {
        $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });
});


