// /*jshint browser: true*/
// /*global angular: true*/

// (function(){
//     'use strict';

//     angular.module('hrmsApp.attachments.module', [])
//         .config(routerConfiguration);

//     routerConfiguration.$inject = ['$stateProvider'];
//     function routerConfiguration ($stateProvider) {
//         $stateProvider
//             .state('root.addattachment', {
//             url: '/addattachment',
//             templateUrl: 'app/modules/layout/common/addAttachment/addAttachment.html',
//             controller: 'AddAttachmentController',
//             params : {
//                 lastPage : 'root.dashboard',
//                 index : 0
//             },
//             controllerAs: 'addAttachmentVM'
//         });
//     }
// })();


var addAttachmentModule = angular.module('addAttachment', []);
addAttachmentModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('addAttachment', {
            url: '/addAttachment',
            views: {
                'root': {
                    templateUrl: 'app/component/attachment/add-attachment/add-attachment-template.html',
                    controller: 'addAttachmentController'
                }
            },
            cache: false
        });
}]);
