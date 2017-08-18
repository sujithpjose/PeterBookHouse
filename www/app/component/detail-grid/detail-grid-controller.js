gridModule.
  controller('GridController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', '$stateParams', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService, $stateParams) {
    var self = $scope;
    self.gridModal = {};

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
      self.profilePath = imgConstants.sharedPath;
      self.sharedPath = imgConstants.imgPath;
      populateCategories();
    };

    function populateCategories() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.getcategories);
      delegateFactory.fetchData(config, onSuccess, onError);
    };

    self.$on('search', function (event, args) {
      self.message = args.message;
      console.log('IN Grid' + self.message);
    });

    self.toDetails = function (item) {
      $state.go('home.details');
    };

    self.updateGrid = function () {
      // self.books.newReleasesList = [
      //   { 'book': 'Book1' },
      //   { 'book': 'Book2' },
      //   { 'book': 'Book3' },
      //   { 'book': 'Book4' },
      // ];
    };

    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {
        case 'getBooks':
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

