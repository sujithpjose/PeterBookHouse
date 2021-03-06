loginModule.
  controller('LoginController', ['$scope', '$state', 'imgConstants', 'genericServices', '$translate', '$ionicPlatform', '$ionicHistory', '$rootScope', 'sharedValues', 'authorizationFactory', 'loginService', 'delegateFactory', 'sharedConstants', '$http', '$ionicModal', '$stateParams', function ($scope, $state, imgConstants, genericServices, $translate, $ionicPlatform, $ionicHistory, $rootScope, sharedValues, authorizationFactory, loginService, delegateFactory, sharedConstants, $http, $ionicModal, $stateParams) {
    var self = $scope;
    var toState = $stateParams.state;
    $rootScope.data = {};
    self.user = {
      _token: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      captcha: ''
    };

    var defaultUser = angular.copy(self.user);

    self.signInUser = {
      email: '',
      password: ''
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
      self.user = defaultUser;

      invokeSignUp();

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

    var init = function () {

    };

    function invokeSignUp() {
      $http
        .get(sharedConstants.apiUrl.base+'signup')
        .then(function (response) {
          self.signup.captchaImageUrl = response.data.url;
          self.user._token = response.data.token;
        });
    };

    self.refreshCaptcha = function () {
      invokeSignUp();
    };

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
        .post(sharedConstants.apiUrl.base+'signup', self.user)
        .then(function success(response) {
          //hide modal
          $scope.modal.hide();
          //set signInUser object
          self.signInUser = {
            email: self.user.email,
            password: self.user.password
          };
          //dologin
          invokeLogin();
          // var params = {};
          // params.title = sharedConstants.successTitle;
          // params.template = 'User Created';
          // params.action = 'newUser';
          // genericServices.showAlert(params, onAlertSuccess, onAlertError);
        },
        function (response) {
          genericServices.hideSpinner();
          var params = {};

          params.template = generateValidationMsg(response.data);

          params.title = sharedConstants.errorTitle;
          params.action = 'loginFailed';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);

        }
        );
    };

    function generateValidationMsg(result) {
      var msg = '';

      if (!genericServices.isEmpty(result.name)) {
        msg += result.name;
      }
      if (!genericServices.isEmpty(result.email)) {
        msg += result.email;
      }
      if (!genericServices.isEmpty(result.password)) {
        msg += result.password;
      }
      if (!genericServices.isEmpty(result.password_confirmation)) {
        msg += result.password_confirmation;
      }
      if (!genericServices.isEmpty(result.captcha)) {
        msg += 'invalid captcha';
      }

      return msg;
    };

    function invokeLogin() {
      $http
        .post(sharedConstants.apiUrl.base+'api/login', self.signInUser)
        .then(function (response) {
          genericServices.hideSpinner();
          $rootScope.data.searchString = '';
          $rootScope.token = response.data.api_token;
          console.log('token:' + $rootScope.token);
          $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.token;

          $state.go(toState);
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
      $http({ url: sharedConstants.apiUrl.base+'api/user/details', method: 'GET' })
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
          //hide modal
          $scope.modal.hide();
          //set signInUser object
          self.signInUser = {
            email: self.user.email,
            password: self.user.password
          };
          //dologin
          invokeLogin();
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

    init();

  }]);
