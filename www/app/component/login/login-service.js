loginModule.service('loginService', function ($state,genericServices,$rootScope) {
    var basicDetails = {};

    var setBasicDetails = function (newObj) {
        basicDetails = newObj;
    };

    var getBasicDetails = function () {
        return basicDetails;
    };

    var routeToLogin = function () {
        if (genericServices.isEmpty($rootScope.token)) {
            $state.go('login');
        }
    };

    var isLoggedIn = function () {
        if (genericServices.isEmpty($rootScope.token)) {
           return false;
        } else {
            return true;
        }

    };

    return {
        setBasicDetails: setBasicDetails,
        getBasicDetails: getBasicDetails,
        routeToLogin : routeToLogin,
        isLoggedIn: isLoggedIn
    };

});