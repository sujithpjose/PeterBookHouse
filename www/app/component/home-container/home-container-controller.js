homeContainerModule.
  controller('HomeContainerController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService) {
    var self = $scope;
    $rootScope.data = {};
    $rootScope.data.searchString = '';

    var init = function () {
      self.imgPath = imgConstants.dashboardPath;
      self.profilePath = imgConstants.sharedPath;
      self.sharedPath = imgConstants.imgPath;
    };

    self.doSearch = function () {
      $state.go('home.search',{searchText: $rootScope.data.searchString});
      self.$broadcast('search', { message: 'doSearch' });
    };

    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {
        default:
      }
    };

    var setScopeValuesOnError = function (response) {
      switch (response.config.key) {
        case 'profileInfo':
          break;

        default:
      }
    };

    //--------------------------------- API Callback ---------------------------- 
    function onSuccess(response) {
      genericServices.hideSpinner();
      setScopeValuesOnSuccess(response);
      console.log('populateDashboard IN [DashBoardController] onSuccess promise:' +
        response.data.returnMsg);
    }

    function onError(response) {
      genericServices.hideSpinner();
      // called asynchronously if an error occurs or server returns response with an error status.
      setScopeValuesOnError(response);
      console.log('populateDashboard IN [DashBoardController] onError promise:' + response.status);
    }

    //--------------------------------- Alert Callback ---------------------------- 
    function onAlertSuccess(response, params) {
      switch (params.action) {
        case 'logout':
          $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
          });
          $state.go('login');
          break;

        default:
      }
    };

    function onAlertError(response, params) {
      switch (params.action) {
        default:
      }
    };

    //init method to call while controller loading
    // init();

  }]);

