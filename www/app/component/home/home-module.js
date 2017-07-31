var homeModule = angular.module('home', []);
homeModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home.list', {
            url: '/list',
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
             , cache: false
        });
}]);