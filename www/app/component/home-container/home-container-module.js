var homeContainerModule = angular.module('homeContainer', []);
homeContainerModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            abstract: true,
            templateUrl: 'app/component/home-container/home-container-template.html',
            controller: 'HomeContainerController'
            // ,cache:false
        });
}]);