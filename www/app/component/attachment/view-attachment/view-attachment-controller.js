viewAttachmentModule.controller('viewAttachmentController', ['$state', '$rootScope', '$scope', '$log', 'sharedValues', 'delegateFactory', '$state', '$stateParams', 'imgConstants', 'localforageService', 'genericServices', 'sharedConstants', '$filter', 'imgConstants', 'downloadServices', '$translate', 'attachmentConstants', function ($state, $rootScope, $scope, $log, sharedValues, delegateFactory, $state, $stateParams, imgConstants, localforageService, genericServices, sharedConstants, $filter, imgConstants, downloadServices, $translate, attachmentConstants) {
  $log.debug('IN teamCalendarCtrl:');
  $log.debug('iseditable:' + $scope.iseditable);
  var self = $scope;

  //model request object
  self.request = {
    "tempFlag": "Y",
    "attachmentDtlList": [{
      "tempId": null,
      "docId": null,
      "mediaId": null,
      "title": "test",
      "description": "testDesc",
      "fileName": "abctestfileName",
      "fileContentType": "abc"
    }]
  };
  self.attachmentDetails = {};

  var init = function () {
    getSavedInstanceState();
  };

  self.getAttachmentType = function (attachedItem) {
    var dot = attachedItem.fileName.lastIndexOf('.');
    var extension = (dot == -1) ? "" : attachedItem.fileName.substring(dot + 1);
    if (genericServices.isEmpty(extension)) {
      extension = 'OTH';
    }
    return extension.toUpperCase();
  };

  self.performDelete = function (fileDetails, index) {
    var params = {};
    params.title = $translate.instant('ATTACHMENT_DELETE_TITLE');
    params.template = $translate.instant('ATTACHMENT_DELETE_PROMPT');
    params.action = 'deleteAttachment';
    params.fileDetails = fileDetails;
    params.index = index;
    params.okLabel = $translate.instant('DASHBOARD_LOGOUT_OK');
    params.cancelLabel = $translate.instant('DASHBOARD_LOGOUT_CANCEL');
    genericServices.showConfirmAlert(params, onAlertSuccess, onAlertError);
  };

  // Remove from local storage
  var deleteAttachment = function (fileDetails, index) {
    self.config = angular.copy(sharedValues.apiConfig.deleteAttachment);
    //beautifyUrl
    self.config.data = self.request;
    self.config.data.attachmentDtlList[0] = fileDetails;
    if (fileDetails.tempFlag) {
      self.config.data.tempFlag = 'Y';
    } else {
      self.config.data.tempFlag = 'N';
    }
    // To ensure 
    self.config.data.file = $scope.attachmentData;
    var generatedUrl = genericServices.beautifyUrl(self.config.url);
    self.attachList.splice(index, 1);
    delegateFactory.fetchData(self.config, onSuccess, onError);
  };
  self.downloadAttachment = function (fileDetails, index) {
    genericServices.showSpinner();
    self.config = angular.copy(sharedValues.apiConfig.downloadAttachment);
    //beautifyUrl
    self.config.data = fileDetails;
    var generatedUrl = genericServices.beautifyUrl(self.config.url);
    delegateFactory.fetchData(self.config, onSuccess, onError);


  };

  $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams, options) {
      if (fromState.name === 'addAttachment') {
        getSavedInstanceState();
      }
    });

  var getSavedInstanceState = function () {
    localforageService.getFromLocalStorage("attachmentDetails").then(function (result) {
      if (genericServices.isEmpty(result)) {
        //init model with empty state
        self.attachList = [];
      } else {
        self.attachList = result;

      }
      $scope.$apply();

    });
  };

  var downloadFile = function (data) {
    var dot = data.fileName.lastIndexOf('.');
    var fileType = data.fileContentType.split('/');
    var extension = (dot == -1) ? fileType[1] : data.fileName.substring(dot + 1);
    var mimeType = '';
    if (!genericServices.isEmpty(extension)) {
      angular.forEach(attachmentConstants.mimeTypes, function (val, key) {
        if (extension === key || extension.toLowerCase() === key) {
          mimeType = val;
          return;
        }
      });
    }
    if (!genericServices.isEmpty(mimeType)) {
      downloadServices.saveAttachment(data.fileName, mimeType, data.fileData, downloadServices.viewAttachment);
    } else {
      var params = {};
      params.message = 'Not Supported File!';
      params.duration = 'long';
      params.backgroundColor = '##bf0000';
      params.textColor = '#FFFFFF';
      genericServices.showToast(params, onAlertSuccess, onAlertError);
    }
  };

  var setScopeValuesOnSuccess = function (response) {
    var params = {};
    switch (response.config.key) {
      case 'deleteAttachment':
        self.attachmentDetails.returnCode = response.data.returnCode;
        self.attachmentDetails.returnMsg = response.data.returnMsg;
        if (response.data.returnCode === sharedConstants.apiSuccess) {
          localforageService.updateLocalStorage('attachmentDetails', self.attachList);
        } else {
          params.title = sharedConstants.errorTitle;
          params.template = response.data.returnMsg;
          params.action = 'deleteAttachment';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
        }
        break;
      case 'downloadAttachment':
        self.attachmentDetails.returnCode = response.data.returnCode;
        self.attachmentDetails.returnMsg = response.data.returnMsg;
        if (response.data.returnCode === sharedConstants.apiSuccess) {
          downloadFile(response.data);
          //localforageService.updateLocalStorage('attachmentDetails', self.attachList);
        } else {
          params.title = sharedConstants.errorTitle;
          params.template = response.data.returnMsg;
          params.action = 'downloadAttachment';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
        }
        break;
      default:
    }
  };

  var setScopeValuesOnError = function (response) {
    var params = {};
    params.title = sharedConstants.errorTitle + " : " + response.status;
    params.template = sharedConstants.apiFailedMsg;

    switch (response.config.key) {
      case 'deleteAttachment':
        params.action = 'deleteAttachment';
        break;
      case 'downloadAttachment':
        params.action = 'downloadAttachment';
        break;
      
      default:
    }

    genericServices.showAlert(params, onAlertSuccess, onAlertError);
  };
  //--------------------------------- API Callback ---------------------------- 
  function onSuccess(response) {
    //hide loading spinner
    genericServices.hideSpinner();
    //bind data to UI
    setScopeValuesOnSuccess(response);
    console.log('In CTRL promise:' +
      response.data.returnMsg);
  }

  function onError(response) {
    //hide loading spinner
    genericServices.hideSpinner();
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    setScopeValuesOnError(response);
    console.log('In CTRL error promise:' +
      response.status);
    //  hide();
  }
  //--------------------------------- Alert Callback ---------------------------- 
  function onAlertSuccess(response, params) {

    switch (params.action) {
      case 'deleteAttachment':
        deleteAttachment(params.fileDetails, params.index);
        break;
      case 'downloadAttachment':

        break;
      default:

    }

  }

  function onAlertError(response, params) {
    switch (params.action) {
      case 'deleteAttachment':

        break;
      case 'downloadAttachment':

        break;
      default:

    }
  }

  $scope.$on('attachmentDetailsSaved', function (event, args) {
    $log.debug('In attachmentDetailsSaved of $scope.$on');
    init();
  });

  init();
}]);
viewAttachmentModule.directive('attachment', function () {
  return {
    restrict: 'E',
    templateUrl: 'app/component/attachment/view-attachment/view-attachment-template.html',
    scope: {
      iseditable: "=iseditable"
    },
    controller: 'viewAttachmentController'
  };
});
