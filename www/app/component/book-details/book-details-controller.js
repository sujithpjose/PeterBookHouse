bookDetailsModule.
  controller('bookDetailsController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', '$stateParams', 'bookService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService, $stateParams, bookService) {

    var self = $scope;

    self.bookItem = {};

    var init = function () {
      self.bookItem = bookService.getItem();
    };

    self.addToCart = function (item) {
      var tempCart = bookService.getCart();
      var length = tempCart.length;
      var canAdditem = true;

      if (length > 0) {
        for (var i = 0; i < tempCart.length; i++) {
          if (tempCart[i].id === item.id) {
            canAdditem = false;
            break;
          }
        }
      }

      if (canAdditem) {
        bookService.addToCart(item);
        $state.go('store.cart');
      } else {
        //already exists
        var params = {};
        params.title = sharedConstants.errorTitle;
        params.template = 'Item already exists';
        params.action = 'addToCartError';
        genericServices.showAlert(params, onAlertSuccess, onAlertError);
      }
    };

    //--------------------------------- Alert Callback ---------------------------- 
    function onAlertSuccess(response, params) {
      switch (params.action) {
        case 'addToCartError':
          break;

        default:
      }
    };

    function onAlertError(response, params) {
      switch (params.action) {
        default:
      }
    };

    init();

  }]);

