var dashboardModule = angular.module('dashboard', []);
dashboardModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            views: {
                'root': {
                    templateUrl: 'app/component/dashboard/dashboard-template.html',
                    controller: 'DashBoardController'
                }
            }
             , cache: false
        });
}]);