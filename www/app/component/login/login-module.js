var loginModule = angular.module('login', []);
loginModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/component/login/login-template.html',
            controller: 'LoginController'
        });
}]);