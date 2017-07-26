var homeModule = angular.module('home', []);
homeModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                'root': {
                    templateUrl: 'app/component/home/home-template.html',
                    controller: 'HomeController'
                }
            }
             , cache: false
        });
}]);