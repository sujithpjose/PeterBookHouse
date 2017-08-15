bookDetailsModule.
  controller('bookDetailsController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', '$stateParams', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService, $stateParams) {
  $scope.swiperOptions = {
    /* Whatever options */
    effect: 'slide',
    initialSlide: 0,
    /* Initialize a scope variable with the swiper */
    onInit: function(swiper){
    $scope.swiper = swiper;
    // Now you can do whatever you want with the swiper
    },
    onSlideChangeEnd: function(swiper){
    console.log('The active index is ' + swiper.activeIndex); 
    }
  };

  }]);

