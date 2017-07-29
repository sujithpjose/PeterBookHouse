serviceModule.factory("authorizationFactory", ['dataService','genericServices', 'connectivityMonitor','$log','sharedConstants','$http', function (dataService, genericServices, connectivityMonitor,$log,sharedConstants,$http) {
    return {
        generateToken: function (config, onSuccess, onError) {
                if (true) {
                    config.url = sharedConstants.javaConnectorUrl.base + config.url;
                } else {
                    config.url = sharedConstants.mcsUrl.base + config.url;
                }
                dataService.getData(config).then(
                    function (response) {
                        if (genericServices.isKeyExists(response.data,'error')) {
                             response.data.returnCode =sharedConstants.apiError;
                        }else{
                            response.data.returnCode =sharedConstants.apiSuccess;
                             $http.defaults.headers.common.Authorization ='Bearer '+ response.data.access_token;
                        }
                        onSuccess(response);
                    },
                    function (response) {
                        onError(response);
                    }
                );
            
        }
    };
}]);