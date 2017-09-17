serviceModule.factory("delegateFactory", ['dataService', 'connectivityMonitor', '$log', 'sharedConstants', function (dataService, connectivityMonitor, $log, sharedConstants) {
    return {
        fetchData: function (config, onSuccess, onError) {
            if (connectivityMonitor.isOffline()) {//should execute if offline
                $log.debug("Network offline");
                localforageService.getFromLocalStorage(config.key).then(function (result) {
                    var response = {
                        'data': result,
                        'config': {
                            'key': config.key
                        },
                        'netWorkStatus': 'OFFLINE'
                    };
                    // result.data.netWorkStatus = 'OFFLINE';
                    // result.config.key = config.key;
                    onSuccess(response);
                }, function (error) {
                    $log.log('ERROR: ', error);
                });
            } else {
                $log.debug("Network online");

                config.url = sharedConstants.apiUrl.base + sharedConstants.apiUrl.path + config.url;
                // config.url = 'http://www.peterbookhouse.com/portal/public/api/' + config.url;
                
                $log.debug("config.url:"+config.url);

                dataService.getData(config).then(
                    function (response) {
                        if (response.config.doSave === 'Y') {
                            localforageService.setToLocalStorage(response);
                        }
                        response.netWorkStatus = 'ONLINE';
                        onSuccess(response);
                    },
                    function (response) {
                        onError(response);
                    }
                );
            }
        }
    };
}]);