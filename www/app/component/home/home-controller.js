homeModule.
  controller('HomeController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService) {
    var self = $scope;

    self.books = {};
    self.books.newReleasesList = [
      { 'book': 'Book1' },
      { 'book': 'Book2' },
      { 'book': 'Book3' },
      { 'book': 'Book4' },
      { 'book': 'Book5' },
      { 'book': 'Book6' },
      { 'book': 'Book7' }
    ];

    var init = function () {
      self.imgPath = imgConstants.dashboardPath;
      self.profilePath = imgConstants.sharedPath;
      self.sharedPath = imgConstants.imgPath;
    };

    self.goToGrid = function (id) {
      $state.go('home.grid', { id: id });
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
    // init();

  }]);

