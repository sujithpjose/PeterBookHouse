var accountModule = angular.module('account', []);
accountModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('store.account', {
            url: '/account',
            views: {
                // 'header': {
                //     templateUrl: 'app/component/home/home-header-template.html',
                //     controller: 'HomeController'
                // },
                'content': {
                    templateUrl: 'app/component/account/account-template.html',
                    controller: 'AccountController'
                }
            }
        });
}]);