serviceModule.factory("genericServices", ['$ionicHistory', '$ionicLoading', '$state', '$ionicPopup', '$filter', '$cordovaToast', function ($ionicHistory, $ionicLoading, $state, $ionicPopup, $filter, $cordovaToast) {
  return {
    doSomething: function () {
      //Do something here
    },
    doSomethingElse: function () {
      //Do something else here
    },
    beautifyUrl: function (urlString, params) {
      angular.forEach(params, function (value, key) {
        urlString = urlString.replace('{?}', value);
      });

      return urlString;
    },
    goToDashBoard: function () {
      $ionicHistory.clearCache().then(function () {
        console.log("In clearCache Success");
        $state.go('dashboard');
      });
    },
    showToast: function (params, onAlertSuccess, onAlertError) {
      document.addEventListener('deviceready', function () {
        $cordovaToast.showWithOptions({
          message: params.message,
          duration: params.duration,
          position: 'bottom',
          styling: {
            backgroundColor: '#C32E27', //params.backgroundColor
            color: params.textColor,
            borderRadius: 30, // a bit less than default, 0 means a square Toast
            alpha: 180, // 0-255, 0 being fully transparent
            padding: {
              bottom: 30
            }
          }
        }).then(function (success) {
          onAlertSuccess();
        }, function (error) {
          onAlertError();
        });
      }, false);
    },
    showAlert: function (params, onAlertSuccess, onAlertError) {
      $ionicPopup.alert({
        title: params.title,
        template: params.template,
        okType: 'btn-red'
      }).then(function (res) {
        onAlertSuccess(res, params);
      });
    },
    showConfirmAlert: function (params, onAlertSuccess, onAlertError) {
      $ionicPopup.confirm({
        title: params.title,
        template: params.template,
        okType: 'btn-red'
        //  params.okType
      }).then(function (res) {
        if (res) {
          onAlertSuccess(res, params);
        } else {
          onAlertError(res, params);
        }

      });
    },
    convertStringToDate: function (dateString, dateFormat) {
      var dateOut = '';
      if (dateString !== null) {
        var dateObject = new Date(dateString);
        var dateOut = $filter('date')(dateObject, dateFormat);
      }

      return dateOut;
    },
    parseDateForJson: function (dateIn) {
      var dateOut = '';
      if (dateIn !== null) {
        var dateOut = new Date(dateIn);
        dateOut.setHours(dateOut.getHours() - dateOut.getTimezoneOffset() / 60);
      }

      return dateOut;
    },
    formatNumberOfDays: function (numberOfDays) {
      if (numberOfDays === null) {
        return '';
      } else if (numberOfDays === 1) {
        return numberOfDays + ' Day';
      } else {
        return numberOfDays + ' Days';
      }
    },
    showSpinner: function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    },
    hideSpinner: function () {
      $ionicLoading.hide();
    },
    makeCall: function (phonenumber) {
      if (!this.isEmpty(phonenumber) && !this.isContainsChar(phonenumber)) {
        if (window.cordova && window.cordova.InAppBrowser) {
          cordova.InAppBrowser.open('tel:' + phonenumber.replace(/\s/g, ''), '_system');
        }
      }
    },
    sendMail: function (mailId) {
      if (!this.isEmpty(mailId) && this.isValidEmail(mailId)) {
        if (window.cordova && window.cordova.InAppBrowser) {
          cordova.InAppBrowser.open('mailto:' + mailId, '_system');
        }
      }
    },
    addOrSubstractDate: function (date, days) {
      var tempDate = new Date(date);
      return new Date(tempDate.getTime() + (days * 24 * 60 * 60 * 1000));
    },
    isUndefinedOrNull: function (obj) {
      return !angular.isDefined(obj) || obj === null;
    },
    isArrayEmpty: function (obj) {
      if (obj.length == 0)
        return true;
      else
        return false;
    },
    formatDateTimeToTime: function (dateTime) {
      var dateSting = "";
      if (!this.isEmpty(dateTime)) {
        var date = new Date(dateTime);

        if (Object.prototype.toString.call(date) === "[object Date]") {
          // it is a date
          if (isNaN(date.getTime())) { // d.valueOf() could also work
            // date is not valid
            return dateTime;
          } else {
            // date is valid
          }
        } else {
          // not a date
          return dateTime;
        }


        var hour = date.getHours();
        var minutes = date.getMinutes();
        if (hour < 10) {
          hour = '0' + hour;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        dateSting = hour + ":" + minutes;
        console.log("dateSting:" + dateSting);
      }
      return dateSting;
    },
    isEmpty: function (data) {
      var isTrue = true;
      if (data != null && typeof data != "undefined" && data != "") {
        isTrue = false;
      }
      return isTrue;
    },
    isKeyExists: function (data, key) {
      var isTrue = false;
      if (!this.isObjectEmpty(data) && data.hasOwnProperty(key)) {
        isTrue = true;
      }
      return isTrue;
    },
    makeArrayUnique: function (arr) {

      var hash = {},
        result = [];

      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!hash.hasOwnProperty(arr[i])) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        }
      }

      return result;
    },

    isObjectEmpty: function (obj) {

      var isEmptyValue = true;

      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          isEmptyValue = false;
        }
      }

      return isEmptyValue;
    },
    isNonZero: function (data) {
      var isTrue = true;
      if (data === 0) {
        isTrue = false;
      }
      return isTrue;
    },
    goBack: function (data) {
      window.history.back();
    },
    isContainsChar: function (string) {
      if (string.match(/[a-z]/i)) {
        return true;
      } else {
        return false;
      }
    },
    isValidEmail: function (email) {
      var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email.match(emailPattern)) {
        return true;
      } else {
        return false;
      }
    },
    getFileExtension: function (fileName) {
      var extension = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (extension === '') {
        return 'OTH';
      } else {
        return extension.toUpperCase();
      }
    },

    compareDates: function (d1, d2) {
      var date1 = new Date(d1);
      date1.setHours(0, 0, 0, 0);
      var date2 = new Date(d2);
      date2.setHours(0, 0, 0, 0);

      if (date1.getTime() === date2.getTime()) {
        return 0;
      } else if (date1.getTime() > date2.getTime()) {
        return 1;
      } else if (date1.getTime() < date2.getTime()) {
        return -1;
      }
    },

    compareTime: function (t1, t2) {

      if (!this.isEmpty(t1) && !this.isEmpty(t2)) {
        var date1 = new Date(t1);
        date1.setFullYear('2000', '0', '1');
        date1.setSeconds('00');
        var date2 = new Date(t2);
        date2.setFullYear('2000', '0', '1');
        date2.setSeconds('00');

        if (date1.getTime() === date2.getTime()) {
          return 0;
        } else if (date1.getTime() > date2.getTime()) {
          return 1;
        } else if (date1.getTime() < date2.getTime()) {
          return -1;
        }
      }
    },

    convertTimeToDatetime: function (time) {
      if (!this.isEmpty(time)) {
        var date = new Date();
        var timeArray = time.split(":");
        date.setHours(timeArray[0]);
        date.setMinutes(timeArray[1]);

        return date;
      } else {
        return time;
      }

    },

    convertTime: function (time) {
      // Check correct time format and split into components
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }

      if (time[0] < 10) {
        time[0] = '0' + time[0];
      }
      return time.join(''); // return adjusted time or original string
    },

    findDiffOfDates: function (date1, date2) {
      var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      // var firstDate = new Date(date1);
      // var secondDate = new Date(date2);

      var firstDate = date1;
      var secondDate = date2;

      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

      return diffDays + 1;
    },

    isObjectContainsValue: function (obj) {
      for (var prop in obj) {
        if (!this.isEmpty(obj[prop])) {
          return true;
        }
      }
      return false;
    }
  };
}]);
