gridModule.
  controller('GridController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', '$stateParams', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService, $stateParams) {
    var self = $scope;
    self.gridModal = {};

    self.books = {};
    self.books.newReleasesList = [];

    var init = function () {
      self.profilePath = imgConstants.sharedPath;
      self.sharedPath = imgConstants.imgPath;
      populateCategories();
    };

    function populateCategories() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.getcategories);
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

    function populateCategoriesList(name) {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.books_category);
      var generatedUrl = genericServices.beautifyUrl(config.url, [name]);
      //set generatedUrl to config variable
      config.url = generatedUrl;
      
      delegateFactory.fetchData(config, onSuccess, onError);
    };

    self.$on('search', function (event, args) {
      self.message = args.message;
      console.log('IN Grid' + self.message);
    });

    self.toDetails = function (item) {
      $state.go('home.details');
    };

    self.fetchCategory = function (name) {
      populateCategoriesList(name);
    };

    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {
        case 'books_category':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.newReleasesList = result.data.data;
          } else {
            //error
          }
          break;
        case 'getcategories':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.categoryList = result.data;
            populateCategoriesList(self.books.categoryList[0].name);
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

    //init method to call while controller loading
    init();

  }]);

