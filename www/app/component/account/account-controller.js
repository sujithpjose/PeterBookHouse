accountModule.
  controller('AccountController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'bookService', '$ionicModal', 'loginService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, bookService, $ionicModal, loginService) {
    var self = $scope;
    self.account = {};
    self.account.orderList = [];
    self.account.hasProfile = false;
    self.profile = {
      first_name: '',
      last_name: '',
      address: '',
      phone: ''
    };

    var selectedIndex;

    //------------------------ Profile modal------------------------ //
    $ionicModal.fromTemplateUrl('app/component/modal/userprofile-modal-template.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openUserprofileModal = function () {
      $scope.modal.show();
    };
    $scope.closeUserprofileModal = function () {
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

    //------------------------ Profile modal------------------------ //


    var init = function () {
      self.imgPath = sharedConstants.assetsBaseUrl;
      loginService.routeToLogin();
      getOrders();
      getProfile();
    };

    function getOrders() {
      genericServices.showSpinner();
      $http
        .get('http://admin.peterbookhouse.com/api/getorders')
        .then(
        function success(response) {
          genericServices.hideSpinner();
          var params = {};
          if (sharedConstants.apiStatusSuccess == response.data.meta.status) {
            self.account.orderList = response.data.data;
          } else {
            self.account.orderList = [];
          }
        },
        function error() {
          genericServices.hideSpinner();
          self.account.orderList = [];
        }
        );
    };

    self.cancelorder = function (id, index) {
      selectedIndex = index;
      cancelorder(id);
    };

    function cancelorder(id) {
      genericServices.showSpinner();
      $http
        .post('http://admin.peterbookhouse.com/api/cancelorder', { id: id })
        .then(
        function success(response) {
          genericServices.hideSpinner();
          var params = {};
          if (sharedConstants.apiStatusSuccess == response.data.meta.status) {
            params.title = sharedConstants.successTitle;
            params.template = 'Order Cancelled';
            params.action = 'cancelSuccess';
            params.item = response.data.data;
            genericServices.showAlert(params, onAlertSuccess, onAlertError);
          } else {
            params.title = sharedConstants.errorTitle;
            params.template = 'service failed';
            params.action = 'error';
            genericServices.showAlert(params, onAlertSuccess, onAlertError);
          }


        },
        function error() {
          genericServices.hideSpinner();
          var params = {};
          params.title = sharedConstants.errorTitle;
          params.template = 'service failed';
          params.action = 'error';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
        }
        );
    };

    self.addProfile = function () {
      doAddProfile();
    };

    function doAddProfile() {
      genericServices.showSpinner();
      $http
        .post('http://admin.peterbookhouse.com/api/user/addprofile', self.profile)
        .then(function () {
          genericServices.hideSpinner();
          var params = {};
          params.title = sharedConstants.successTitle;
          params.template = 'Profile Created';
          params.action = 'newProfile';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
        },
        function error() {
          genericServices.hideSpinner();
          var params = {};
          params.title = sharedConstants.errorTitle;
          params.template = 'service failed';
          params.action = 'error';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
        }
        );
    };

    function getProfile() {
      genericServices.showSpinner();
      $http
        .get('http://admin.peterbookhouse.com/api/user/profile')
        .then(
        function success(response) {
          genericServices.hideSpinner();
          var params = {};
          if (sharedConstants.apiStatusSuccess == response.data.meta.status) {
            self.account.hasProfile = true;
            self.profile = response.data.data;
          } else {
            self.profile = {};
            params.title = sharedConstants.errorTitle;
            params.template = 'service failed';
            params.action = 'error';
            genericServices.showAlert(params, onAlertSuccess, onAlertError);
          }
        },
        function error() {
          self.profile = {};
          genericServices.hideSpinner();
          var params = {};
          params.title = sharedConstants.errorTitle;
          params.template = 'service failed';
          params.action = 'error';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
        }
        );
    };



    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {


        default:
      }
    };

    var setScopeValuesOnError = function (response) {
      switch (response.config.key) {
        case 'getBooks':
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
        case 'newProfile':
          $scope.modal.hide();
          break;
        case 'cancelSuccess':
          self.account.orderList.splice(selectedIndex, 1, params.item);
          break;
        case 'error':
          break;

        default:
      }
    };

    function onAlertError(response, params) {
      switch (params.action) {
        default:
      }
    };

    $scope.swiperOptions = {
      /* Whatever options */
      effect: 'slide',
      initialSlide: 0,
      /* Initialize a scope variable with the swiper */
      onInit: function (swiper) {
        $scope.swiper = swiper;
        // Now you can do whatever you want with the swiper
      },
      onSlideChangeEnd: function (swiper) {
        console.log('The active index is ' + swiper.activeIndex);
      }
    };

    //init method to call while controller loading
    init();

  }]);

