function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/intro');
    $stateProvider
        .state('index', {
            abstract: true,
            url: "/",
            templateUrl: "views/common/content.html"
        })
        .state('intro', {
            url: "/intro",
            templateUrl: "views/intro.html"
        })    
        .state('index.home', {
            url: "home",
            templateUrl: "views/home.html"
        })
        .state('index.project', {
            url: "project",
            templateUrl: "views/project.html"
        })
        .state('index.project.floorplan', {
            url: "/floorplan",
            templateUrl: "views/project-floorplan.html"
        })
        .state('index.project.overview', {
            url: "/overview",
            templateUrl: "views/project-overview.html"
        })
        .state('index.project.gallery', {
            url: "/gallery",
            templateUrl: "views/project-gallery.html"
        })
        .state('index.location', {
            url: "location",
            templateUrl: "views/location.html"
        })
        .state('index.contact', {
            url: "contact",
            templateUrl: "views/contact.html"
        })
        .state('index.register', {
            url: "register",
            templateUrl: "views/register.html"
        })
};

angular.module('alpina').config(config).run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
     $rootScope
        .$on('$stateChangeSuccess',
            function(event){
                if (!$window.ga)
                    return;
                $window.ga('send', 'pageview', { page: $location.path() });
        });
}]);