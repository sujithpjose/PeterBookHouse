cartModule.
  controller('CartController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'bookService', 'loginService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, bookService, loginService) {
    var self = $scope;
    var pageSize = 4;
    var selectedIndex;

    self.cartList = [];

    self.$on('search', function (event, args) {
      console.log('IN Home' + args.message);
      populateSearchResults();
    });

    var init = function () {
      self.imgPath = sharedConstants.assetsBaseUrl;
      loginService.routeToLogin();
      self.cartList = bookService.getCart();
    };

    self.removeItem = function (index) {
      self.cartList.splice(index, 1);
    };

    self.orderItem = function (item, index) {
      selectedIndex = index;
      addtocart(item.id);
    };

    function addtocart(id) {
      genericServices.showSpinner();
      $http
        .post('http://admin.peterbookhouse.com/api/addtocart', { book_id: id })
        .then(
        function success(response) {
          genericServices.hideSpinner();
          var params = {};
          if (sharedConstants.apiStatusSuccess == response.data.meta.status) {
            params.title = sharedConstants.successTitle;
            params.template = 'Ordered Succesfully';
            params.action = 'orderSuccess';
            genericServices.showAlert(params, onAlertSuccess, onAlertError);
          } else {
            params.title = sharedConstants.errorTitle;
            params.template = 'Order failed';
            params.action = 'orderError';
            genericServices.showAlert(params, onAlertSuccess, onAlertError);
          }


        },
        function error() {
          genericServices.hideSpinner();
          var params = {};
          params.title = sharedConstants.errorTitle;
          params.template = 'Order failed';
          params.action = 'orderError';
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
        case 'orderSuccess':
          self.removeItem(selectedIndex);
          break;
        case 'orderError':
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

