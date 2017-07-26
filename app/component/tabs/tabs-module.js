var tabModule = angular.module('tabs', ['contacts', 'organization']);
tabModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'app/component/tabs/tabs-template.html',
    })
    .state('main.track', {
      url: '/track',
      views: {
        'track': {
          templateUrl: 'app/component/tabs/contacts/tabs.contacts-template.html',
          controller: 'TabsController'
        }
      }
    })
    .state('main.chat', {
      url: '/chat',
      views: {
        'chat': {
          templateUrl: 'app/component/tabs/organization/tabs.organization-template.html',
          controller: 'TestController'
        }
      }
    })
    .state('main.buddies', {
      url: '/buddies',
      views: {
        'buddies': {
          template: '<h3>main.buddies</h3>',
          controller: ''
        }
      }
    })
    .state('main.checklist', {
      url: '/checklist',
      views: {
        'checklist': {
          template: '<h3>main.checklist</h3>',
          controller: ''
        }
      }
    });
  $urlRouterProvider.when('/main', '/main/track');
}]);