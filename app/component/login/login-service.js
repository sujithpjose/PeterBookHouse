loginModule.service('loginService', function () {
    var basicDetails = {};

    var setBasicDetails = function (newObj) {
        basicDetails = newObj;
    };

    var getBasicDetails = function () {
        return basicDetails;
    };

    return {
        setBasicDetails: setBasicDetails,
        getBasicDetails: getBasicDetails
    };

});