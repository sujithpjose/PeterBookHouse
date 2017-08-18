homeModule.
  controller('HomeController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService) {
    var self = $scope;

    self.books = {};
    self.books.newReleasesList = [];

    self.$on('search', function (event, args) {
      console.log('IN Home' + args.message);
      populateSearchResults();
    });

    var init = function () {
      self.imgPath = imgConstants.dashboardPath;
      self.profilePath = imgConstants.sharedPath;
      self.sharedPath = imgConstants.imgPath;
      populateFavourites();
    };

    function populateFavourites() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.books_pagesize);
      var generatedUrl = genericServices.beautifyUrl(config.url, [12]);
      //set generatedUrl to config variable
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

    self.goToGrid = function (id) {
      $rootScope.data.searchString = '';
      $state.go('home.grid', { id: id });
    };

    self.toDetails = function (item) {
      $rootScope.data.searchString = '';
      $state.go('home.details');
    };

    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {
        case 'books_pagesize':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.newReleasesList = result.data.data;
          } else {
            //error
          }
          break;
        case 'books_search':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.newReleasesList = result.data.data;
          } else {
            //error
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

