homeModule.
  controller('HomeController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'bookService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, bookService) {
    var self = $scope;
    var pageSize = 4;

    self.books = {};
    self.books.favouritesList = [];
    self.books.homeList1 = [];
    self.books.homeList2 = [];
    self.books.homeList3 = [];

    self.$on('search', function (event, args) {
      console.log('IN Home' + args.message);
      populateSearchResults();
    });

    var init = function () {
      self.imgPath = sharedConstants.assetsBaseUrl;
      
      populateFavourites();
      populateHomeList1();
      populateHomeList2();
      populateHomeList3();
    };

    function populateFictionList() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.getbooks);
      var generatedUrl = genericServices.beautifyUrl(config.url, [8, 'Fiction', '']);
      //set generatedUrl to config variable
      config.url = generatedUrl;

      delegateFactory.fetchData(config, onSuccess, onError);
    };

    function populateFavourites() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.getbooks);
      var generatedUrl = genericServices.beautifyUrl(config.url, [pageSize, '', '']);
      //set generatedUrl to config variable
      config.url = generatedUrl;

      delegateFactory.fetchData(config, onSuccess, onError);
    };

    function populateHomeList1() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.getbooks);
      var generatedUrl = genericServices.beautifyUrl(config.url, [pageSize, sharedConstants.homeList.one, '']);
      //set generatedUrl to config variable
      config.key = sharedConstants.homeList.one;
      config.url = generatedUrl;

      delegateFactory.fetchData(config, onSuccess, onError);
    };

    function populateHomeList2() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.getbooks);
      var generatedUrl = genericServices.beautifyUrl(config.url, [pageSize, sharedConstants.homeList.two, '']);
      //set generatedUrl to config variable
      config.key = sharedConstants.homeList.two;
      config.url = generatedUrl;

      delegateFactory.fetchData(config, onSuccess, onError);
    };

    function populateHomeList3() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.getbooks);
      var generatedUrl = genericServices.beautifyUrl(config.url, [pageSize, sharedConstants.homeList.three, '']);
      //set generatedUrl to config variable
      config.key = sharedConstants.homeList.three;
      config.url = generatedUrl;

      delegateFactory.fetchData(config, onSuccess, onError);
    };

    function populateSearchResults() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.books_search);
      var generatedUrl = genericServices.beautifyUrl(config.url, [$rootScope.data.searchString]);
      //set generatedUrl to config variable
      config.url = generatedUrl;

      delegateFactory.fetchData(config, onSuccess, onError);
    };

    self.goToGrid = function (name) {
      $rootScope.data.searchString = '';
      $state.go('home.grid', { id: name });
    };

    self.toDetails = function (item) {
      bookService.setItem(item);
      $rootScope.data.searchString = '';
      $state.go('home.details');
    };

    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {

        case 'getbooks':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.favouritesList = result.data.data;
          } else {
            //error
            self.books.favouritesList = [];
          }
          break;
        case sharedConstants.homeList.one:
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.homeList1 = result.data.data;
          } else {
            //error
            self.books.homeList1 = [];
          }
          break;
        case sharedConstants.homeList.two:
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.homeList2 = result.data.data;
          } else {
            //error
            self.books.homeList2 = [];
          }
          break;
        case sharedConstants.homeList.three:
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.homeList3 = result.data.data;
          } else {
            //error
            self.books.homeList3 = [];
          }
          break;
        case 'books_search':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.newReleasesList = result.data.data;
          } else {
            //error
            self.books.newReleasesList = [];
          }
          break;
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
        case 'getBooks':
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

