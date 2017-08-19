gridModule.
  controller('GridController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', '$stateParams', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService, $stateParams) {
    var self = $scope;
    var pageSize = 8;
    self.gridModal = {
      hasPagination: true,
      currentPage: 1
    };



    self.books = {};
    self.books.category = [];
    self.books.categoryList = [];

    self.$on('search', function (event, args) {
      self.message = args.message;
      console.log('IN Grid' + self.message);
    });

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
      toggleStyle(name);

      var config = angular.copy(sharedValues.apiConfig.getbooks);
      var generatedUrl = genericServices.beautifyUrl(config.url, [pageSize, name, '']);
      //set generatedUrl to config variable
      config.url = generatedUrl;

      delegateFactory.fetchData(config, onSuccess, onError);
    };

    function toggleStyle(name) {
      var length = self.books.category.length;

      for (var i = 0; i < length; i++) {
        if (name == self.books.category[i].name) {
          self.books.category[i].activated = 'Y';
        } else {
          self.books.category[i].activated = 'N';
        }
      }

    };

    self.toDetails = function (item) {
      $state.go('home.details');
    };

    self.fetchCategory = function (name) {
      populateCategoriesList(name);
    };

    function setupPagination(param) {
      self.paginationList = [];
      var length = param.last_page;
      if (length > 1) {
        self.gridModal.hasPagination = true;
        for (var i = 0; i < length; i++) {
          self.paginationList.push(i + 1);
        }
      } else {
        //no need for pagination
        self.gridModal.hasPagination = false;
      }

    };

    self.doPagination = function (param) {
      switch (param) {
        case 'Previous':
          break;
        case 'Next':
          break;
        default:
      }

    };

    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {
        case 'getbooks':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.categoryList = result.data.data;
            setupPagination(result.data);
          } else {
            //error
            self.books.categoryList = [];
          }
          break;
        case 'getcategories':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.category = result.data;
            populateCategoriesList($stateParams.id);
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

