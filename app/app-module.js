
var app = angular.module('bookShop', ['ionic', 'component', 'shared', 'ngCordova', 'ion-datetime-picker', 'pascalprecht.translate', 'canSwipe']);

app.run(function ($rootScope,$ionicPlatform, $cordovaSQLite, dbService,connectivityMonitor,$log) {
    $log.debug('app.run:');
    $ionicPlatform.ready(function () {
        $log.debug('$ionicPlatform.ready:');
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString("#000000");
        }
    });
    //attach event listner for networkstatus change
    connectivityMonitor.startWatching();
});