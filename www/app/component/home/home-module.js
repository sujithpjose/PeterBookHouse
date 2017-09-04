var homeModule = angular.module('home', []);
homeModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('store.home', {
            url: '/home',
            views: {
                // 'header': {
                //     templateUrl: 'app/component/home/home-header-template.html',
                //     controller: 'HomeController'
                // },
                'content': {
                    templateUrl: 'app/component/home/home-template.html',
                    controller: 'HomeController'
                }
            }
        });
}]);