dashboardModule.
  controller('DashBoardController', ['$scope', '$state', '$rootScope', '$http', 'dataService', 'sharedValues', 'genericServices', 'delegateFactory', 'sharedConstants', 'imgConstants', '$timeout', '$translate', '$ionicHistory', '$ionicPlatform', 'loginService', function ($scope, $state, $rootScope, $http, dataService, sharedValues, genericServices, delegateFactory, sharedConstants, imgConstants, $timeout, $translate, $ionicHistory, $ionicPlatform, loginService) {
    var self = $scope;
    self.data = null;
    self.profile = {};
    self.absenceCount = {};

    var init = function () {
      self.imgPath = imgConstants.dashboardPath;
      self.profilePath = imgConstants.sharedPath;
      self.sharedPath = imgConstants.imgPath;
      populateDashboard();
      populateAbsenceGraph();

    };

    var goToCreate = function (stateUrl) {
      //clear localstorage modal
      localforage.setItem('absenceDetails', {}).then(function (result) {
        localforage.setItem('attachmentDetails', []);
      }).then(function (result) {
        $state.go(stateUrl, { action: 'CREATE' });
      });
    };

    var populateDashboard = function () {
      var profileDetailsTemp = loginService.getBasicDetails();
      self.profile.profileInfo = angular.copy(profileDetailsTemp);
    };
    var populateAbsenceGraph = function () {
      genericServices.showSpinner();
      var config = angular.copy(sharedValues.apiConfig.absenceGraph);
      config.data.userName = $rootScope.userName;

      delegateFactory.fetchData(config, onSuccess, onError);
    };
    self.gotoFeature = function (stateUrl) {
      switch (stateUrl) {
        case 'createAbsence':
          goToCreate(stateUrl);
          break;
        default:
          $state.go(stateUrl);
      }


    };

    self.performLogout = function () {
      var params = {};
      params.title = $translate.instant('DASHBOARD_LOGOUT_TITLE');
      params.template = $translate.instant('DASHBOARD_LOGOUT_PROMPT');
      params.action = 'logout';
      params.okLabel = $translate.instant('DASHBOARD_LOGOUT_OK');
      params.cancelLabel = $translate.instant('DASHBOARD_LOGOUT_CANCEL');
      params.okType = 'button-balanced';
      genericServices.showConfirmAlert(params, onAlertSuccess, onAlertError);
    };

    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($ionicHistory.currentStateName() === 'dashboard') {
        self.performLogout();
      } else {
        $ionicHistory.goBack();
      }
    }, 100);

    var setScopeValuesOnSuccess = function (response) {
      var params = {};
      switch (response.config.key) {
        case 'profileInfo':
          if (response.data.returnCode !== sharedConstants.apiSuccess) {
            params.title = sharedConstants.errorTitle;
            params.template = response.data.returnMsg;
            params.action = 'profileInfo';
            genericServices.showAlert(params, onAlertSuccess, onAlertError);
          } else {
            self.profile.returnCode = response.data.returnCode;
            self.profile.returnMsg = response.data.returnMsg;
            self.profile.profileInfo = response.data.loginDetailsTab[0];
          }
          break;
        case 'absenceGraph':
          if (response.data.returnCode !== sharedConstants.apiSuccess) {
            params.duration = 'long';
            params.message = response.data.returnMsg;
            params.backgroundColor = '#1694e4';
            params.textColor = '#FFFFFF';
            genericServices.showToast(params, onAlertSuccess, onAlertError);
          } else {

            var absenceCount = {
              approvedLeaves: response.data.approvedLeaveCount,
              pendingLeaves: response.data.pendingLeaveCount
            };


            self.absenceCount = absenceCount;
            self.absenceCount.total = self.absenceCount.pendingLeaves + self.absenceCount.approvedLeaves;
            loadCharts();
          }
          break;
        default:
      }
    };

    var setScopeValuesOnError = function (response) {
      switch (response.config.key) {
        case 'profileInfo':
          break;

        default:
      }
    };

    //--------------------------------- API Callback ---------------------------- 
    function onSuccess(response) {
      genericServices.hideSpinner();
      setScopeValuesOnSuccess(response);
      console.log('populateDashboard IN [DashBoardController] onSuccess promise:' +
        response.data.returnMsg);
    }

    function onError(response) {
      genericServices.hideSpinner();
      // called asynchronously if an error occurs or server returns response with an error status.
      setScopeValuesOnError(response);
      console.log('populateDashboard IN [DashBoardController] onError promise:' + response.status);
    }

    //--------------------------------- Alert Callback ---------------------------- 
    function onAlertSuccess(response, params) {
      switch (params.action) {
        case 'logout':
          $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
          });
          $state.go('login');
          break;

        case 'profileInfo':
          break;

        default:
      }
    }

    function onAlertError(response, params) {
      switch (params.action) {
        case 'logout':
          break;

        default:
      }
    }

    var loadCharts = function () {
      self.chartData = {
        data: {
          barChart: {
            coloursGraph: [{
              backgroundColor: '#5BC8E2',
              pointBackgroundColor: '#5BC8E2',
              pointHoverBackgroundColor: '#5BC8E2',
              borderColor: '#5BC8E2',
              pointBorderColor: '#5BC8E2',
              pointHoverBorderColor: '#5BC8E2',
              fill: false
            },
            {
              backgroundColor: '#80D143',
              pointBackgroundColor: '#80D143',
              pointHoverBackgroundColor: '#80D143',
              borderColor: '#80D143',
              pointBorderColor: '#80D143',
              pointHoverBorderColor: '#80D143',
              fill: false
            }
            ],
            labelsGraph: ['Pre sales', 'PM', 'Developer', 'Tester', 'Designer'],
            series: ['Vacancy Approvals', 'Offer Approvals'],
            dataGraph: [
              [65, 59, 80, 81, 62],
              [28, 48, 40, 19, 80]
            ],
            options: {
              maintainAspectRatio: false,
              responsive: true,
              tooltips: {
                enabled: false
              },
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  fontSize: 9,
                  boxWidth: 10
                }
              },
              scales: {
                xAxes: [{
                  ticks: {
                    fontSize: 9,
                  }
                }],
                yAxes: [{
                  ticks: {
                    fontSize: 9,
                  }
                }]
              }
            }
          },
          pieChart: {
            coloursGraph: [
              {
                backgroundColor: '#5BC8E2',
                pointBackgroundColor: '#5BC8E2',
                pointHoverBackgroundColor: '#5BC8E2',
                borderColor: '#5BC8E2',
                pointBorderColor: '#5BC8E2',
                pointHoverBorderColor: '#5BC8E2',
                fill: false
              },
              {
                backgroundColor: '#80D143',
                pointBackgroundColor: '#80D143',
                pointHoverBackgroundColor: '#80D143',
                borderColor: '#80D143',
                pointBorderColor: '#80D143',
                pointHoverBorderColor: '#80D143',
                fill: false
              }
            ],
            data: [self.absenceCount.pendingLeaves, self.absenceCount.approvedLeaves],
            labels: ['Pending Leaves - ' + self.absenceCount.pendingLeaves, 'Leaves Approved - ' + self.absenceCount.approvedLeaves],
            options: {
              maintainAspectRatio: false,
              responsive: true,
              tooltips: {
                enabled: false
              },
              legend: {
                display: true,
                cursor: 'pointer',
                position: 'right',
                labels: {
                  fontSize: 9,
                  boxWidth: 10
                }
              }
            }
          }
        }
      };
    };

    //init method to call while controller loading
    init();

  }]);

