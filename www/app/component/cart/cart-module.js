var cartModule = angular.module('cart', []);
cartModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home.cart', {
            url: '/cart',
            views: {
                // 'header': {
                //     templateUrl: 'app/component/home/home-header-template.html',
                //     controller: 'HomeController'
                // },
                'content': {
                    templateUrl: 'app/component/cart/cart-template.html',
                    controller: 'CartController'
                }
            }
        });
}]);