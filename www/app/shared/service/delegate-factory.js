serviceModule.factory("delegateFactory", ['dataService', 'connectivityMonitor',  '$log','sharedConstants', function (dataService, connectivityMonitor,$log,sharedConstants) {
    return {
        fetchData: function (config, onSuccess, onError) {
            if (connectivityMonitor.isOffline()) {//should execute if offline
$log.debug("Network offline");
                localforageService.getFromLocalStorage(config.key).then(function (result) {
                 var response ={
                     'data':result,
                     'config':{
                         'key':config.key
                     },
                     'netWorkStatus':'OFFLINE'
                 };
                    // result.data.netWorkStatus = 'OFFLINE';
                    // result.config.key = config.key;
                    onSuccess(response);
                }, function (error) {
                    $log.log('ERROR: ', error);
                });
            } else {
                  $log.debug("Network online");
                if (true) {
                    config.url = sharedConstants.javaConnectorUrl.base + sharedConstants.javaConnectorUrl.path + config.url;
                } else {
                    config.url = sharedConstants.mcsUrl.base + sharedConstants.mcsUrl.path + config.url;
                }
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