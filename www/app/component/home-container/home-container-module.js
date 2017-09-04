var homeContainerModule = angular.module('homeContainer', []);
homeContainerModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('store', {
            url: '/store',
            abstract: true,
            templateUrl: 'app/component/home-container/home-container-template.html',
            controller: 'HomeContainerController'
            // ,cache:false
        });
}]);