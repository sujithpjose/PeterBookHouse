serviceModule.service('dataService', ['$http', function ($http) {
    // delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function (config) {
        // $http() returns a $promise that we can add handlers with .then()
        return $http(config);
    };

}]);