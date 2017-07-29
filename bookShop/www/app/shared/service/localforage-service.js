serviceModule.service('localforageService', ['sharedConstants', function (sharedConstants) {

    this.setToLocalStorage = function (response) {
        var dbServiceName = response.config.key;
        localforage.setItem(dbServiceName, response.data).then(function (result) {
        }, function (error) {
            console.log("setItem ERROR: ", error);
        });
    };

    this.getFromLocalStorage = function (key) {
        return localforage.getItem(key);
    }
    
    this.updateLocalStorage = function (key, data) {
        localforage.setItem(key, data).then(function (result) {
        }, function (error) {
            console.log("setItem ERROR: ", error);
        });
    };
}]);