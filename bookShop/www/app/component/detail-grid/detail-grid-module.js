var gridModule = angular.module('grid', []);
homeModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('grid', {
            url: '/grid',
            views: {
                'root': {
                    templateUrl: 'app/component/detail-grid/detail-grid-template.html',
                    controller: 'GridController'
                }
            }
            , params: {
                id: ''
            }
            , cache: false
        });
}]);