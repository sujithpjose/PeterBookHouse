accountModule.
  controller('AccountController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'bookService', '$ionicModal','loginService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, bookService, $ionicModal,loginService) {
    var self = $scope;
    self.profile = {
      first_name: '',
      last_name: '',
      address: '',
      phone: ''
    };

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

    };

    self.addProfile = function () {
      doAddProfile();
    };

    function doAddProfile() {
      $http
        .post('http://admin.peterbookhouse.com/api/user/addprofile', self.profile)
        .then(function () {
          var params = {};
          params.title = sharedConstants.successTitle;
          params.template = 'Profile Created';
          params.action = 'newProfile';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
        });
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

