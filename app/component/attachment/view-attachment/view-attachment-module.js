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


var viewAttachmentModule = angular.module('viewAttachment', []);
viewAttachmentModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('viewAttachment', {
            url: '/viewAttachment',
            views: {
                'root': {
                    templateUrl: 'app/component/attachment/view-attachment/view-attachment-template.html',
                    controller: 'viewAttachmentController'
                }
            },
            cache: false
        });
}]);
