var bookDetailsModule = angular.module('bookDetails', []);
bookDetailsModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home.details', {
            url: '/details',
            views: {
                // 'header': {
                //     templateUrl: 'app/component/home/home-header-template.html',
                //     controller: 'HomeController'
                // },
                'content': {
                    templateUrl: 'app/component/book-details/book-details-template.html',
                    controller: 'bookDetailsController'
                }
            }
            , params: {
                id: ''
            }
            // , cache: false
        });
}]);