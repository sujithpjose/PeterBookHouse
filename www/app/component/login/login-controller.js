loginModule.
  controller('LoginController', ['$scope', '$state', 'imgConstants', 'genericServices', '$translate', '$ionicPlatform', '$ionicHistory', '$rootScope', 'sharedValues', 'authorizationFactory', 'loginService', 'delegateFactory', 'sharedConstants', '$http','$ionicModal', function ($scope, $state, imgConstants, genericServices, $translate, $ionicPlatform, $ionicHistory, $rootScope, sharedValues, authorizationFactory, loginService, delegateFactory, sharedConstants, $http,$ionicModal) {
    var self = $scope;
    self.user = {
      username: '',
      password: ''
    };

    self.signup = {
      captchaImageUrl: '',
      captchaText: '',
      token: ''
    };

    // Signup modal
    $ionicModal.fromTemplateUrl('app/component/modal/signup-modal-template.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openSignupModal = function() {
      $scope.modal.show();
    };
    $scope.closeSignupModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

    // Signup modal

    self.sharedPath = imgConstants.imgPath;
    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($ionicHistory.currentStateName() === 'login') {
        window.plugins.appMinimize.minimize();
      }
    }, 100);

    self.doLogin = function () {
      var params = {};
      if (validateLoginData(self.user)) {
        invokeLogin();
      } else {
        params.title = $translate.instant('LOGIN_ERROR_TITLE');
        params.template = $translate.instant('LOGIN_ERROR_DESC');
        params.action = 'login_error';
        genericServices.showAlert(params, onAlertSuccess, onAlertError);
      }
    };

    // var invokeLogin = function () {
    //   genericServices.showSpinner();
    //   var config = angular.copy(sharedValues.apiConfig.loginDetails);

    //   config.data.userName = self.user.username;
    //   config.data.password = self.user.password;

    //   delegateFactory.fetchData(config, onSuccess, onError);
    // };

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


    // $http
    //   .get('http://localhost/peterbookhouse/repo/webportal/public/signup')
    //   .then(function (response) {
    //     vm.captchaImageUrl = response.data.url;
    //     vm.token = response.data.token;
    //   });
    function signup() {
      $http
        .post('http://localhost/peterbookhouse/repo/webportal/public/signup', { _token: vm.token, name: 'faf', email: 'bb@bbb.com', password: '123456', password_confirmation: '123456', captcha: vm.captchaText })
        .then(function () {
          alert('success');
        });
    }
    
    function invokeLogin() {
      $state.go('store.home');
      // $http
      //   .post('http://localhost/peterbookhouse/repo/webportal/public/api/login', { email: 'jobinskumar91@gmail.com', password: '123456' })
      //   .then(function (response) {
      //     vm.token = response.data.api_token;
      //   }, function () {
      //     alert('Error');
      //   });
    }

    function getdetails() {
      $http({ url: 'http://localhost/peterbookhouse/repo/webportal/public/api/user/details', method: 'GET', headers: { 'Authorization': 'Bearer ' + vm.token } })
        .then(function (response) {
          vm.details = response.data;
        }, function () {
          alert('Error');
        });
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
