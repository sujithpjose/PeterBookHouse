searchModule.
  controller('SearchController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', '$stateParams', 'bookService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService, $stateParams, bookService) {
    var self = $scope;
    var pageSize = 8;
    self.paginationList = [];
    self.gridModal = {
      hasPagination: true,
      isPagination: false,
      currentPage: 1,
      category: '',
      lastPage: 2//for testing
    };

    self.pagination = {
      previousDisabled: 'Y',
      nextDisabled: 'N',
    }



    self.books = {};
    self.books.category = [];
    self.books.categoryList = [];

    self.$watch('gridModal.currentPage', function () {
      toggleActivated();
      if (self.gridModal.currentPage === 1) {
        self.pagination.previousDisabled = 'Y';
      } else {
        self.pagination.previousDisabled = 'N';
      }
      if (self.gridModal.currentPage === self.gridModal.lastPage) {
        self.pagination.nextDisabled = 'Y';
      } else {
        self.pagination.nextDisabled = 'N';
      }
    });

    function toggleActivated() {
      for (var i = 0; i < self.paginationList.length; i++) {
        if (self.paginationList[i].index == self.gridModal.currentPage) {
          self.paginationList[i].class = 'page-item-activated';
        } else {
          self.paginationList[i].class = '';
        }

      }
    };

    self.$on('search', function (event, args) {
      self.message = args.message;
      console.log('IN Grid' + self.message);
    });

    var init = function () {
      self.imgPath = sharedConstants.assetsBaseUrl;
      self.gridModal.searchText = $stateParams.searchText;
      self.isLoading = true;

      populateSearchResults();
    };

    function populateSearchResults() {
      genericServices.showSpinner();

      var config = angular.copy(sharedValues.apiConfig.getbooks);
      var generatedUrl = genericServices.beautifyUrl(config.url, [pageSize, '', self.gridModal.currentPage, self.gridModal.searchText]);
      //set generatedUrl to config variable
      config.url = generatedUrl;

      delegateFactory.fetchData(config, onSuccess, onError);
    };



    function toggleStyle() {
      var length = self.books.category.length;

      for (var i = 0; i < length; i++) {
        if (self.gridModal.category == self.books.category[i].name) {
          self.books.category[i].activated = 'Y';
        } else {
          self.books.category[i].activated = 'N';
        }
      }

    };

    self.toDetails = function (item) {
      bookService.setItem(item);
      $rootScope.data.searchString = '';
      $state.go('store.details');
    };


    function setupPagination(param) {
      self.paginationList = [];
      self.gridModal.lastPage = param.last_page;
      var length = self.gridModal.lastPage;
      if (length > 1) {
        self.gridModal.hasPagination = true;
        for (var i = 0; i < length; i++) {
          var paginationObject = {
            index: i + 1,
            class: ''
          }
          if (i == 0) {
            paginationObject.class = 'page-item-activated';
          }
          self.paginationList.push(paginationObject);
        }
      } else {
        console.log('no need for pagination');
        //no need for pagination
        self.gridModal.hasPagination = false;
      }

    };

    self.doPagination = function (param) {
      self.gridModal.isPagination = true;
      switch (param) {
        case 'Previous':
          if (self.gridModal.currentPage > 1) {
            self.gridModal.currentPage = self.gridModal.currentPage - 1;
            populateSearchResults();
          } else {
            // disable Previous
            // self.pre_disabled = true;
          }
          break;

        case 'Next':
          if (self.gridModal.currentPage < self.gridModal.lastPage) {
            self.gridModal.currentPage = self.gridModal.currentPage + 1;
            populateSearchResults();
          } else {
            // disable Next
          }
          break;

        default:
          self.gridModal.currentPage = param;
          populateSearchResults();
      }

    };

    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {
        case 'getbooks':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.categoryList = result.data.data;
            if (!self.gridModal.isPagination) {
              setupPagination(result.data);
            }
          } else {
            //error
            self.books.categoryList = [];
            self.gridModal.hasPagination = false;
          }
          break;
        case 'getcategories':
          var result = response.data;
          if (result.meta.status === 'success') {
            self.books.category = result.data;
            populateCategoriesList();
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
      self.isLoading = false;
      console.log('populateDashboard IN [DashBoardController] onSuccess promise:' +
        response.data.returnMsg);
    }

    function onError(response) {
      genericServices.hideSpinner();
      // called asynchronously if an error occurs or server returns response with an error status.
      setScopeValuesOnError(response);
      self.isLoading = false;
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

