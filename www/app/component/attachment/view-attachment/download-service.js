serviceModule.factory("downloadServices", ['$ionicHistory', '$ionicLoading', '$state', '$ionicPopup', '$filter', '$cordovaToast', function ($ionicHistory, $ionicLoading, $state, $ionicPopup, $filter, $cordovaToast) {
    return {

        saveAttachment: function (fileName, extension, fileContent, successCallBack, errorCallBack) {
            console.log("Inside Save Attachment");
            var rootdirectory = this.getRootDirectory();
            var mimeType = '';
            if (device.platform !== 'iOS') {
                cordova.plugins.diagnostic.requestRuntimePermission(function (success) { }, function (error) { }, 'READ_EXTERNAL_STORAGE');
            } 
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                var fileTransfer = new FileTransfer();
                var uri = encodeURI('data:' + extension + ';base64,' + fileContent);
                var fileURL = rootdirectory + fileName.replace(/ /g, '%20');
                fileTransfer.download(uri, fileURL, function (entry) {
                    console.log("Downloaded The Attachment" + entry);
                    fileContent = 'data:' + extension + ';base64,' + fileContent;
                    successCallBack(fileName, fileContent, extension, entry);
                    //this.viewAttachment(fileName,extension);
                }, function (error) {
                    errorCallBack(error);
                }, false, {});
            }, function () { });
        },
        viewAttachment: function (fileName, fileContent, extension, entry, successCallBack, errorCallBack) {
            console.log("Inside View Attachment");
            if (extension === 'image/jpg' || extension === 'image/png' || extension === 'image/jpeg') {
                cordova.plugins.fileOpener2.open(entry.nativeURL, extension, {
                    error: function (error) {
                        console.log("Errored Out while opening");
                        //    errorCallBack(rootDirectory, error);
                    },
                    success: function () {
                        // successCallBack();
                        console.log("Success opening");
                    }
                });
            } else if (device.platform === 'iOS') {
                //  window.plugins.Base64.encodeFile(rootDirectory+fileName+'.'+extension, function(base64){
                var fileView = window.open(fileContent, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes,EnableViewPortScale=no');
                //});
            } else {
                cordova.plugins.fileOpener2.open(entry.nativeURL, extension, {
                    error: function (error) {
                        console.log("Errored Out while opening");
                        //    errorCallBack(rootDirectory, error);
                    },
                    success: function () {
                        // successCallBack();
                        console.log("Success opening");
                    }
                });
            }
        },
        getRootDirectory: function () {
            var directory = '';
            if (device.platform === 'iOS') { directory = cordova.file.documentsDirectory + 'HRMS/'; }
            else { directory = cordova.file.externalDataDirectory + 'HRMS/'; }
            return directory;
        }

    };
}]);