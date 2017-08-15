var gridModule = angular.module('grid', []);
homeModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home.grid', {
            url: '/grid',
            views: {
                // 'header': {
                //     templateUrl: 'app/component/home/home-header-template.html',
                //     controller: 'HomeController'
                // },
                'content': {
                    templateUrl: 'app/component/detail-grid/detail-grid-template.html',
                    controller: 'GridController'
                }
            }
            , params: {
                id: ''
            }
            // , cache: false
        });
}]);