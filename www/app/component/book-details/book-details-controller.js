bookDetailsModule.
  controller('bookDetailsController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', '$stateParams', 'bookService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService, $stateParams, bookService) {

    var self = $scope;

    self.bookItem = {};

    var init = function () {
      self.bookItem = bookService.getItem();
    };

    self.addToCart = function (item) {
      bookService.addToCart(item);
      $state.go('store.cart');
    };

    init();

  }]);

