
addAttachmentModule.controller('addAttachmentController', ['$state', '$rootScope', '$scope', '$log', 'sharedValues', 'delegateFactory', '$state', '$stateParams', 'imgConstants', 'localforageService', 'genericServices', 'sharedConstants', '$filter', 'imgConstants', '$ionicHistory','attachmentConstants', function ($state, $rootScope, $scope, $log, sharedValues, delegateFactory, $state, $stateParams, imgConstants, localforageService, genericServices, sharedConstants, $filter, imgConstants, $ionicHistory, attachmentConstants) {
  $log.debug('IN teamCalendarCtrl:');
  $log.debug('$stateParams:' + $stateParams);
  var self = $scope;
  self.attachList = [];
  self.attachmentDetails = {};
  self.sharedPath = imgConstants.imgPath;
  self.attachmentDetails.title = '';
  self.attachmentDetails.description = '';
  self.attachmentDetails.attachmentName = '';


  //model request object
  self.request = {
    'deviceId': 'ionichrms', //Remove hard coded value after login api integration
    'attachmentDtlList': [{
      'tempId': null,
      'docId': null,
      'mediaId': null,
      'title': null,
      'description': null,
      'fileName': null,
      'fileContentType': null
    }],
    'file': null
  };



  $scope.onChooseFromDeviceClick = function () {
    openGallery();
  };
  $scope.onTakePhotoClick = function () {
    openCamera();
  };

  self.saveAttachment = function () {

    // Validate First

    if (self.attachmentDetails.title !== '' && self.attachmentDetails.description !== '' && $scope.attachmentData) {
      self.config = angular.copy(sharedValues.apiConfig.addAttachment);
      //beautifyUrl
      self.config.data = self.request;
      self.config.data.attachmentDtlList[0].title = self.attachmentDetails.title;
      self.config.data.attachmentDtlList[0].description = self.attachmentDetails.description;
      var tempFileName = $scope.attachmentName.split('.');

      var fileExtension = tempFileName[tempFileName.length - 1];
      var mimeType = '';
       angular.forEach(attachmentConstants.mimeTypes, function (val, key) {
        if (fileExtension === key || fileExtension.toLowerCase() === key) {
          mimeType = val;
          return;
        }
      });
       if(mimeType ===''){
        self.config.data.attachmentDtlList[0].fileName = self.attachmentDetails.title.replace(/\s+/, "");
      }else{
        self.config.data.attachmentDtlList[0].fileName = self.attachmentDetails.title.replace(/\s+/, "")  + '.' + fileExtension;
      }      
      // self.config.data.attachmentDtlList[0].fileName = $scope.attachmentName;
      self.config.data.attachmentDtlList[0].fileContentType = $scope.attachmentType;

      self.config.data.file = $scope.attachmentData;



      var generatedUrl = genericServices.beautifyUrl(self.config.url);
      genericServices.showSpinner();
      delegateFactory.fetchData(self.config, onSuccess, onError);
    } else {
      var params = {
        'title': 'Alert',
        'template': 'Please enter title,description and attachment'
      };
      genericServices.showAlert(params);
    }
  };


  function openCamera() {

    var pictureSource = navigator.camera.PictureSourceType;
    var destinationType = navigator.camera.DestinationType;

    function onPhotoFileSuccess(imageData) {

      window.resolveLocalFileSystemURL(imageData, gotFileEntry, onFail);
      console.log('Got image', imageData);
    }

    navigator.camera.getPicture(onPhotoFileSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI
    });
  };

  function openGallery() {

    var pictureSource = navigator.camera.PictureSourceType;
    var destinationType = navigator.camera.DestinationType;

    function onPhotoURISuccess(imageURI) {

      console.log('Got image: ');
      window.resolveLocalFileSystemURL(imageURI, gotFileEntry, onFail);
      console.log('Got image', imageURI);
    }

    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
      quality: 50,
      destinationType: destinationType.FILE_URI,
      sourceType: pictureSource.PHOTOLIBRARY
    });
  };

  function gotFileEntry(fileEntry) {
    var image64 = {};
    // vm.dataLoadingStatus = 0;
    console.log('got image file entry: ' + fileEntry.fullPath);
    fileEntry.file(function (file) {
      var reader = new FileReader();
      reader.onloadend = function (evt) {
        console.log('Read complete!', evt);
        image64.value = evt.target.result;
        var base64 = evt.target.result

        $scope.attachmentName = evt.target._localURL.split('/').pop();
        $scope.attachmentType = evt.target.result.split(';')[0].split(':')[1];
        //$scope.attachmentData = evt.target.result;
        $scope.attachmentData = evt.target.result.split('base64,')[1];
        $scope.attachmentDetails.attachmentName = $scope.attachmentName;
        console.log('Attachment name' + $scope.attachmentName);
        $scope.$apply();
      };
      console.log('file complete!', image64);
      // image64.value = Base64.encode(evt.target.result);
      reader.readAsDataURL(file);
    }, onFail);
  };

  function onFail(message) {

    console.log('Cannot attach file because of : ' + message);
  }

  self.goBack = function () {
    $ionicHistory.goBack();
  };




  var init = function () {


  };

  var updateLocalForage = function (response) {
    self.config.data.attachmentDtlList[0].tempId = response.data.attTempId;
    self.config.data.attachmentDtlList[0].tempFlag = true;
    localforageService.getFromLocalStorage('attachmentDetails').then(function (result) {
      if (genericServices.isEmpty(result)) {
        self.attachList = self.config.data.attachmentDtlList;
      } else {
        self.attachList = result;
        self.attachList = self.attachList.concat(self.config.data.attachmentDtlList);
      }
      localforage.setItem('attachmentDetails', self.attachList).then(function (result) {
        $ionicHistory.goBack();
      }, function (error) {
        console.log("setItem ERROR: ", error);
      });
    });
  };



  var setScopeValuesOnSuccess = function (response) {
    var params = {};
    switch (response.config.key) {
      case 'addAttachment':
        self.attachmentDetails.returnCode = response.data.returnCode;
        self.attachmentDetails.returnMsg = response.data.returnMsg;



        if (response.data.returnCode === sharedConstants.apiSuccess) {
          updateLocalForage(response);
        } else {
          params.title = sharedConstants.errorTitle;
          params.template = response.data.returnMsg;
          params.action = 'addAttachment';
          genericServices.showAlert(params, onAlertSuccess, onAlertError);
        }
        break;

      default:

    }
  };

  var setScopeValuesOnError = function (response) {
    var params = {};
    params.title = sharedConstants.errorTitle + ' : ' + response.status;
    params.template = sharedConstants.apiFailedMsg;

    switch (response.config.key) {
      case 'teamCalendar':
        params.action = 'teamCalendar';
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
  function onAlertSuccess(response, action) {

    switch (action) {
      case 'addAttachment':

        break;
      case '2':

        break;
      default:

    }

  }

  function onAlertError(response, action) {
    switch (action) {
      case 'addAttachment':

        break;
      case '2':

        break;
      default:

    }
  }

  init();
}]);
