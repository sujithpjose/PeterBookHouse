app.config(['$urlRouterProvider', '$ionicConfigProvider', '$translateProvider', '$translatePartialLoaderProvider', function ($urlRouterProvider, $ionicConfigProvider, $translateProvider, $translatePartialLoaderProvider) {
  // $urlRouterProvider.otherwise('/home/list');
  $ionicConfigProvider.views.swipeBackEnabled(false);
  //remove back button text in ios
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  // center align title
  $ionicConfigProvider.navBar.alignTitle('center');

  $translatePartialLoaderProvider.addPart('hrmsApp');
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: 'app/lang/locale-{lang}.json'
  });
  $translateProvider.preferredLanguage('en_US');

}]).run(['$http', 'sharedConstants', '$log', '$ionicHistory', '$rootScope', 'localforageService', '$ionicPickerI18n', '$state', function ($http, sharedConstants, $log, $ionicHistory, $rootScope, localforageService, $ionicPickerI18n,$state) {
  $log.debug('hrmsApp.config.run:');

  $rootScope.$on('$ionicView.beforeEnter', function () {

    if ($ionicHistory.currentView().stateName === 'login') {
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
    }
  });

  function setRequestHeader() {
    // $http.defaults.headers.common.Authorization = sharedConstants.httpHeader.AUTHORIZATION_VALUE;
   
    // $http.defaults.headers.common[sharedConstants.httpHeader.ORACLE_MOBILE_BACKEND_ID] = sharedConstants.httpHeader.ORACLE_MOBILE_BACKEND_ID_VALUE;
   
    $http.defaults.headers.common[sharedConstants.httpHeader.X_API_VERSION] = sharedConstants.httpHeader.X_API_VERSION_VALUE;
  };

  function setLocalForageDriver() {
    localforage.defineDriver(window.cordovaSQLiteDriver).then(function () {
      return localforage.setDriver([
        // Try setting cordovaSQLiteDriver if available,
        window.cordovaSQLiteDriver._driver,
        // otherwise use one of the default localforage drivers as a fallback.
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
      ]);
    }).then(function () {
      // this should alert "cordovaSQLiteDriver" when in an emulator or a device
      $log.debug(localforage.driver());
      // set a value;
      return localforage.setItem('testPromiseKey', 'testPromiseValue');
    }).then(function () {
      return localforage.getItem('testPromiseKey');
    }).then(function (value) {
      $log.debug(value);
    }).catch(function (err) {
      $log.error(err);
    });

  };

  var init = function () {
    $ionicPickerI18n.okClass = "btn-red";
    //set up common http request header
    // setRequestHeader();
    //set up localforage driver
    setLocalForageDriver();
    $state.go('login');
  };

  //initialize the setups for the app
  init();
}]);
