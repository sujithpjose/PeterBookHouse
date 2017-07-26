loginModule.
  controller('LoginController', ['$scope', '$state', 'imgConstants', 'genericServices', '$translate', '$ionicPlatform', '$ionicHistory', '$rootScope', 'sharedValues', 'authorizationFactory', 'loginService', 'delegateFactory','sharedConstants', function ($scope, $state, imgConstants, genericServices, $translate, $ionicPlatform, $ionicHistory, $rootScope, sharedValues, authorizationFactory, loginService, delegateFactory,sharedConstants) {
    var self = $scope;
    self.user = {
      username: '',
      password: ''
    };
    self.sharedPath = imgConstants.imgPath;
    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($ionicHistory.currentStateName() === 'login') {
        window.plugins.appMinimize.minimize();
      }
    }, 100);

    self.doLogin = function () {
      var params = {};
      if (validateLoginData(self.user)) {
        // $rootScope.userName = self.user.username.toUpperCase();
        invokeLogin();
        // $state.go('dashboard');
      } else {
        params.title = $translate.instant('LOGIN_ERROR_TITLE');
        params.template = $translate.instant('LOGIN_ERROR_DESC');
        params.action = 'login_error';
        genericServices.showAlert(params, onAlertSuccess, onAlertError);
      }
    };

    var invokeLogin = function () {
      genericServices.showSpinner();
      var config = angular.copy(sharedValues.apiConfig.loginDetails);

      config.data.userName = self.user.username;
      config.data.password = self.user.password;
    
      delegateFactory.fetchData(config, onSuccess, onError);
    };

    self.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

    var validateLoginData = function (data) {
      var isValid = true;
      if (!data.username || !data.password) {
        isValid = false;
      }
      return isValid;
    }

    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {
        case 'loginAuthorization':
          $state.go('dashboard');
          break;
        case 'loginDetails':
          self.user.returnCode = response.data.returnCode;
          self.user.returnMsg = response.data.returnMsg;

          var profileInfo = response.data.loginDetailsTab[0];
          loginService.setBasicDetails(profileInfo);

          if (response.data.returnCode !== sharedConstants.apiSuccess) {
            params.title = sharedConstants.errorTitle;
            params.template = response.data.returnMsg;
            params.action = 'profileInfo';
            genericServices.showAlert(params, onAlertSuccess, onAlertError);
          } else {
            $rootScope.personId = profileInfo.personId;
            $rootScope.userName = self.user.username.toUpperCase();
            $state.go('dashboard');
          }
          break;
        default:
      }
    };

    var setScopeValuesOnError = function (response) {
      var params = {};
      switch (response.config.key) {
        case 'loginAuthorization':
          params.title = $translate.instant('LOGIN_ERROR_TITLE');
          params.template = $translate.instant('LOGIN_AUTHORIZATION_DESC');
          params.action = 'login_error';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
          break;
        case 'loginDetails':

        default:
          params.title = $translate.instant('LOGIN_ERROR_TITLE');
          params.template = response.returnMsg;
          params.action = 'login_error';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
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
    function onAlertSuccess(response, action) {
      switch (action) {
        case 'login_error':
          break;

        default:
      }
    }

    function onAlertError(response, action) {
      switch (action) {
        case 'login_error':
          break;

        default:
      }
    }

  }]);
