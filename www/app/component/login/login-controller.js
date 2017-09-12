loginModule.
  controller('LoginController', ['$scope', '$state', 'imgConstants', 'genericServices', '$translate', '$ionicPlatform', '$ionicHistory', '$rootScope', 'sharedValues', 'authorizationFactory', 'loginService', 'delegateFactory', 'sharedConstants', '$http', '$ionicModal', function ($scope, $state, imgConstants, genericServices, $translate, $ionicPlatform, $ionicHistory, $rootScope, sharedValues, authorizationFactory, loginService, delegateFactory, sharedConstants, $http, $ionicModal) {
    var self = $scope;
    $rootScope.data = {};
    self.user = {
      _token: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      captcha: ''
    };

    self.signInUser = {
      email: 'pjosesujith@gmail.com',
      password: 'sujith1234'
    };

    self.signup = {
      captchaImageUrl: ''
    };

    //------------------------ Signup modal------------------------ //
    $ionicModal.fromTemplateUrl('app/component/modal/signup-modal-template.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openSignupModal = function () {
      $http
        .get('http://admin.peterbookhouse.com/signup')
        .then(function (response) {
          self.signup.captchaImageUrl = response.data.url;
          self.user._token = response.data.token;
        });
      $scope.modal.show();
    };
    $scope.closeSignupModal = function () {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });

    //------------------------ Signup modal------------------------ //

    self.sharedPath = imgConstants.imgPath;
    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($ionicHistory.currentStateName() === 'login') {
        window.plugins.appMinimize.minimize();
      }
    }, 100);

    self.doLogin = function () {
      genericServices.showSpinner();
      var params = {};
      if (validateLoginData(self.signInUser)) {
        invokeLogin();
      } else {
        genericServices.hideSpinner();
        params.title = $translate.instant('LOGIN_ERROR_TITLE');
        params.template = $translate.instant('LOGIN_ERROR_DESC');
        params.action = 'login_error';
        genericServices.showAlert(params, onAlertSuccess, onAlertError);
      }
    };

    self.doSignUp = function () {
      signup();
    };


    self.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

    var validateLoginData = function (data) {
      var isValid = true;
      if (!data.email || !data.password) {
        isValid = false;
      }
      return isValid;
    };

    function signup() {
      $http
        .post('http://admin.peterbookhouse.com/signup', self.user)
        .then(function () {
          var params = {};
          params.title = sharedConstants.successTitle;
          params.template = 'User Created';
          params.action = 'newUser';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
        });
    };

    function invokeLogin() {
      $http
        .post('http://admin.peterbookhouse.com/api/login', self.signInUser)
        .then(function (response) {
          genericServices.hideSpinner();
          $rootScope.data.searchString = '';
          $rootScope.token = response.data.api_token;
          console.log('token:' + $rootScope.token);
          $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.token;
        
          $state.go('store.home');
        }, function (response) {
          genericServices.hideSpinner();
          var params = {};
          params.template = 'Login Failed';
          params.title = sharedConstants.errorTitle;
          params.action = 'loginFailed';

          if (response.data.status == 400) {
            params.template = response.data.error;
          }
          genericServices.showAlert(params, onAlertSuccess, onAlertError);

        });
    };



    self.getdetails = function () {
      $http({ url: 'http://admin.peterbookhouse.com/api/user/details', method: 'GET' })
        .then(function (response) {
          self.UserDetails = response.data;
          console.log(":" + response.data);
        }, function () {
          alert('Error');
        });
    };

    //--------------------------------- Alert Callback ---------------------------- 
    function onAlertSuccess(response, action) {
      switch (action) {
        case 'login_error':
          break;
        case 'newUser':
          $scope.modal.hide();
          break;
        case 'loginFailed':
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
