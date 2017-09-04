var searchModule = angular.module('search', []);
searchModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('store.search', {
            url: '/search',
            views: {
                // 'header': {
                //     templateUrl: 'app/component/home/home-header-template.html',
                //     controller: 'HomeController'
                // },
                'content': {
                    templateUrl: 'app/component/book-search/book-search-template.html',
                    controller: 'SearchController'
                }
            }
            , params: {
                searchText: ''
            }
            // , cache: false
        });
}]);