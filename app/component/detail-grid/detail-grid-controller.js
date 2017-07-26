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
      self.imgPath = imgConstants.dashboardPath;
      self.profilePath = imgConstants.sharedPath;
      self.sharedPath = imgConstants.imgPath;
      self.gridModal.title = 'HEADING'+$stateParams.id;


    };
    //init method to call while controller loading
    init();

  }]);

