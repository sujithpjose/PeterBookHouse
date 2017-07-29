sharedModule.value('sharedValues', {

    'title': 'Oracle HRMS',
    'apiConfig': {

        // 'expenseReports': {
        //     'method': 'POST',
        //     'url': 'https://rapidvaluetest-rvsmcsdomain.mobileenv.us2.oraclecloud.com:443/mobile/custom/RVS_iExpense_EXPENSE_REPORTS_CC/ExpenseReports',
        //     'db': {
        //         'doSave': 'Y',
        //         'key': 'insertIntoTable'
        //     }
        // },
        // 'loginAuthorization': {
        //     'method': 'POST',
        //     'url': 'token?grant_type=password&username={?}&password={?}',
        //     'headers': {
        //         'Authorization': 'Basic bVB5VzlIbTRYUERqc0tGTGFRbE41ZE1UQlRFYTpfdTQ1TkR2YW1SZTlOZlJyWUZva3dsdUwwUTRh',
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     'key': 'loginAuthorization'

        // },
        // 'profileInfo': {
        //     'method': 'GET',
        //     'url': 'userprofile/{?}',
        //     'doSave': 'Y',
        //     'key': 'profileInfo',
        //     'methodName': 'profileInfo'
        // },
        // 'empDirectory': {
        //     'method': 'POST',
        //     'url': 'employee/directory',
        //     'doSave': 'Y',
        //     'key': 'empDirectory',
        //     'data': { 'userName': '', 'favouriteFlag': 'Y', 'searchKey': '', 'pageNo': 0, 'pageNoRecords': 20 },
        //     'methodName': 'empDirectory'
        // },
        // 'empDetails': {
        //     'method': 'GET',
        //     'url': 'employee/details/{?}',
        //     'doSave': 'Y',
        //     'key': 'empDetails@',
        //     'methodName': 'empDetails'
        // },
        // 'reportees': {
        //     'method': 'GET',
        //     'url': 'employee/reportees/{?}',
        //     'doSave': 'Y',
        //     'key': 'empDetails@reportees'
        // },
        // 'peers': {
        //     'method': 'GET',
        //     'url': 'employee/peers/{?}',
        //     'doSave': 'Y',
        //     'key': 'empDetails@peers'
        // },
        // 'favourites': {
        //     'method': 'POST',
        //     'url': 'employee/favourites/{?}',
        //     'doSave': 'N',
        //     'key': '',
        //     'data': { 'userName': '', 'favouritesDetails': [] },
        // },
        // 'absenceMetadata': {
        //     'method': 'GET',
        //     'url': 'absence/metadata/{?}',
        //     'doSave': 'Y',
        //     'key': 'absenceMetadata'
        // },
        // 'absenceSummary': {
        //     'method': 'GET',
        //     'url': 'absence/summary/{?}',
        //     'doSave': 'Y',
        //     'key': 'absenceSummary',
        //     'methodName': 'absenceSummary'
        // },
        // 'replacedBy': {
        //     'method': 'POST',
        //     'url': 'absence/replacedBy',
        //     'doSave': 'Y',
        //     'key': 'replacedBy',
        //     'data': { 'personID': 31418, 'timeStamp': null },
        //     'methodName': 'replacedBy'
        // },
        // 'fetchPayslipDates': {
        //     'method': 'GET',
        //     'url': 'payslip/dates/{?}',
        //     'doSave': 'Y',
        //     'key': 'fetchPayslipDates'
        // },
        // 'fetchPayslipDetails': {
        //     'method': 'POST',
        //     'url': 'payslip/details',
        //     'data': { 'username': '', 'pDate': '' },
        //     'doSave': 'Y',
        //     'key': 'fetchPayslipDetails'
        // },
        // 'payperiodsalaryDetails': {
        //     'method': 'POST',
        //     'url': 'payslip/payperiodsalary',
        //     'data': { 'username': '', 'pDate': '' },
        //     'doSave': 'Y',
        //     'key': 'payperiodsalaryDetails'
        // },
        // 'payperiodsummaryDetails': {
        //     'method': 'POST',
        //     'url': 'payslip/summary',
        //     'data': { 'username': '', 'pDate': '' },
        //     'doSave': 'Y',
        //     'key': 'payperiodsummaryDetails'
        // },
        // 'payperiodHoursearningsDetails': {
        //     'method': 'POST',
        //     'url': 'payslip/hoursearnings',
        //     'data': { 'username': '', 'pDate': '' },
        //     'doSave': 'Y',
        //     'key': 'payperiodHoursearningsDetails'
        // },
        // 'payperiodPreTaxDetails': {
        //     'method': 'POST',
        //     'url': 'payslip/pretaxdeduction',
        //     'data': { 'username': '', 'pDate': '' },
        //     'doSave': 'Y',
        //     'key': 'payperiodPreTaxDetails'
        // },
        // 'payperiodPostTaxDetails': {
        //     'method': 'POST',
        //     'url': 'payslip/aftertaxdeduction',
        //     'data': { 'username': '', 'pDate': '' },
        //     'doSave': 'Y',
        //     'key': 'payperiodPostTaxDetails'
        // },
        // 'payperiodtaxWithHoldInf': {
        //     'method': 'POST',
        //     'url': 'payslip/taxWithHoldInf',
        //     'data': { 'username': '', 'pDate': '' },
        //     'doSave': 'Y',
        //     'key': 'payperiodtaxWithHoldInf'
        // },
        // 'netdistributionDetails': {
        //     'method': 'POST',
        //     'url': 'payslip/netPayDistribut',
        //     'data': { 'username': '', 'pDate': '' },
        //     'doSave': 'Y',
        //     'key': 'netdistributionDetails'
        // },
        // 'taxdeduction': {
        //     'method': 'POST',
        //     'url': 'payslip/taxdeduction',
        //     'data': { 'username': '', 'pDate': '' },
        //     'doSave': 'Y',
        //     'key': 'taxdeduction'
        // },
        // 'teamCalendar': {
        //     'method': 'POST',
        //     'url': 'absence/teamCalendar',
        //     'doSave': 'Y',
        //     'key': 'teamCalendar',
        //     'data': { 'username': '', 'fromDate': '', 'toDate': '' },
        //     'methodName': 'teamCalendar'
        // },
        // 'createAbsence': {
        //     'method': 'POST',
        //     'url': 'absence/manageAbsence',
        //     'doSave': 'N',
        //     'key': 'createAbsence',
        //     'data': {},
        //     'methodName': 'createAbsence'
        // },
        // 'absenceDuration': {
        //     'method': 'POST',
        //     'url': 'absence/duration',
        //     'doSave': 'N',
        //     'key': 'absenceDuration',
        //     'data': {},
        //     'methodName': 'absenceDuration'
        // },
        // 'leaveBalance': {
        //     'method': 'POST',
        //     'url': 'absence/absBal',
        //     'doSave': 'N',
        //     'key': 'leaveBalance',
        //     'data': { 'userName': '', 'personId': '', 'effectDate': '' },
        //     'methodName': 'leaveBalance'
        // },
        // 'employment': {
        //     'method': 'GET',
        //     'url': 'myprofile/employment/{?}',
        //     'doSave': 'Y',
        //     'key': 'employment'
        // },
        // 'performance': {
        //     'method': 'GET',
        //     'url': 'myprofile/performanceDetails/{?}',
        //     'doSave': 'Y',
        //     'key': 'performance'
        // },
        // 'salary': {
        //     'method': 'GET',
        //     'url': 'myprofile/salary/{?}',
        //     'doSave': 'Y',
        //     'key': 'salary'
        // },
        // 'addAttachment': {
        //     'method': 'POST',
        //     'url': 'attachment/add',
        //     'doSave': 'N',
        //     'key': 'addAttachment',
        //     'data': { 'deviceId': '123asdg' },
        //     'methodName': 'addAttachment'

        // },
        // 'deleteAttachment': {
        //     'method': 'POST',
        //     'url': 'attachment/delete',
        //     'doSave': 'N',
        //     'key': 'deleteAttachment',
        //     'data': { 'deviceId': '123asdg' },
        //     'methodName': 'deleteAttachment'

        // },
        // 'downloadAttachment': {
        //     'method': 'POST',
        //     'url': 'attachment/download',
        //     'doSave': 'N',
        //     'data': {},
        //     'key': 'downloadAttachment',
        //     'methodName': 'downloadAttachment'
        // },
        // 'rollbackLeave': {
        //     'method': 'POST',
        //     'url': 'absence/rollbackLeave',
        //     'data': { 'userName': 'ANOOPRV', 'approvalStatus': null, 'deviceId': null, 'transactionId': null },
        //     'doSave': 'N',
        //     'key': 'rollbackLeave'
        // },
        // 'absenceDetails': {
        //     'method': 'POST',
        //     'url': 'absence/details',
        //     'data': { 'userName': 'ANOOPRV', 'approvalStatus': null, 'deviceId': null, 'absenceAttendanceId': null },
        //     'doSave': 'Y',
        //     'key': 'absenceDetails'
        // },
        // 'empHierarchy': {
        //     'method': 'GET',
        //     'url': 'myprofile/empHierarchy/{?}',
        //     'doSave': 'Y',
        //     'key': 'empHierarchy'
        // },
        // 'qualification': {
        //     'method': 'GET',
        //     'url': 'myprofile/qualification/{?}',
        //     'doSave': 'Y',
        //     'key': 'qualification'
        // },
        // 'personalInformationBasicDetails': {
        //     'method': 'GET',
        //     'url': 'myprofile/basicdetails/{?}',
        //     'doSave': 'Y',
        //     'key': 'personalInformationBasicDetails'
        // },
        // 'competency': {
        //     'method': 'GET',
        //     'url': 'myprofile/competency/{?}',
        //     'doSave': 'Y',
        //     'key': 'competency'
        // },
        // 'personalInfoContact': {
        //     'method': 'POST',
        //     'url': 'myprofile/phonenumbers',
        //     'doSave': 'Y',
        //     'key': 'personalInfoContact',
        //     'data': { 'userName': '', 'contactPersonId': '' },
        //     'methodName': 'personalInfoContact'
        // },
        // 'fetchWorkList': {
        //     'method': 'POST',
        //     'url': 'worklist/details',
        //     'doSave': 'Y',
        //     'key': 'fetchWorkList',
        //     'data': { 'userName': '', 'dateStart': '', 'endDate': '', 'worklistType': '' },
        //     'methodName': 'fetchWorkList'
        // },
        // 'employeeAddress': {
        //     'method': 'GET',
        //     'url': 'employee/address/{?}',
        //     'doSave': 'Y',
        //     'key': 'employeeAddress',
        //     'methodName': 'employeeAddress'
        // },
        // 'personalInfoEmergencyContact': {
        //     'method': 'GET',
        //     'url': 'myprofile/contactDetails/{?}',
        //     'doSave': 'Y',
        //     'key': 'personalInfoEmergencyContact'
        // },
        // 'qualificationType': {
        //     'method': 'POST',
        //     'url': 'myprofile/qualType',
        //     'doSave': 'Y',
        //     'data': { 'searchKey': null },
        //     'key': 'qualificationType'
        // },
        // 'qualificationStatus': {
        //     'method': 'GET',
        //     'url': 'myprofile/qualStatus',
        //     'doSave': 'Y',
        //     'key': 'qualificationStatus'
        // },
        // 'qualificationSchool': {
        //     'method': 'POST',
        //     'url': 'myprofile/qualSchool',
        //     'doSave': 'Y',
        //     'data': { 'searchKey': null },
        //     'key': 'qualificationSchool'
        // },
        // 'myprofileTrainingDetails': {
        //     'method': 'GET',
        //     'url': 'myprofile/trainingDetails/{?}',
        //     'doSave': 'Y',
        //     'key': 'myprofileTrainingDetails'
        // },
        // 'worklistSummary': {
        //     'method': 'POST',
        //     'url': '/worklist/summary',
        //     'doSave': 'Y',
        //     'key': 'worklistSummary',
        //     'data': { 'userName': '', 'notificationId': '' },
        //     'methodName': 'worklistSummary'
        // },
        // 'worklistApprovalAction': {
        //     'method': 'POST',
        //     'url': '/worklist/hrssaAction',
        //     'doSave': 'Y',
        //     'key': 'worklistApprovalAction',
        //     'data': { 'userName': '', 'itemKey': '', 'resultAction': '', 'notificationId': '', 'comments': '' },
        //     'methodName': 'worklistApprovalAction'
        // },
        // 'worklistAbsenceCompetencyAction': {
        //     'method': 'POST',
        //     'url': '/worklist/absenceCompetencyAction',
        //     'doSave': 'Y',
        //     'key': 'worklistAbsenceCompetencyAction',
        //     'data': { 'userName': '', 'itemKey': '', 'resultAction': '', 'notificationId': '', 'comments': '' },
        //     'methodName': 'worklistAbsenceCompetencyAction'
        // },
        // 'worklistActionHistory': {
        //     'method': 'POST',
        //     'url': '/worklist/actionHistory',
        //     'doSave': 'Y',
        //     'key': 'worklistActionHistory',
        //     'data': { 'userName': '', 'notificationId': '' },
        //     'methodName': 'worklistActionHistory'
        // },
        // 'competencyTypes': {
        //     'method': 'GET',
        //     'url': 'myprofile/competencyType',
        //     'doSave': 'Y',
        //     'key': 'competencyTypes'
        // },
        // 'findCompetence': {
        //     'method': 'POST',
        //     'url': '/myprofile/findCompetence',
        //     'doSave': 'Y',
        //     'key': 'findCompetence',
        //     'data': {
        //         'userName': '', 'competenceType': '', 'competenceName': '', 'shortName': '', 'global': ''
        //     },
        //     'methodName': 'findCompetence'
        // },
        // 'worklistRequestMoreInfoAction': {
        //     'method': 'POST',
        //     'url': '/worklist/moreInfoAction',
        //     'doSave': 'Y',
        //     'key': 'worklistRequestMoreInfoAction',
        //     'data': { 'userName': '', 'itemKey': '', 'notificationId': '', 'comments': '' },
        //     'methodName': 'worklistRequestMoreInfoAction'
        // },
        // 'manageQualification': {
        //     'method': 'POST',
        //     'url': '/myprofile/manageQualification',
        //     'doSave': 'N',
        //     'key': 'manageQualification',
        //     'data': {},
        //     'methodName': 'manageQualification'
        // },
        // 'proficiencyLevel': {
        //     'method': 'POST',
        //     'url': '/myprofile/proficiencyLevel',
        //     'doSave': 'Y',
        //     'key': 'proficiencyLevel',
        //     'data': { 'userName': '', 'competenceId': '' },
        //     'methodName': 'proficiencyLevel'
        // },
        // 'worklistLeaveDetail': {
        //     'method': 'POST',
        //     'url': '/worklist/leaveDetails',
        //     'doSave': 'Y',
        //     'key': 'worklistLeaveDetail',
        //     'data': { 'userName': '', 'notificationId': '' },
        //     'methodName': 'worklistLeaveDetail'
        // },
        // 'worklistCompetencyDetail': {
        //     'method': 'POST',
        //     'url': '/worklist/competencyDetails',
        //     'doSave': 'Y',
        //     'key': 'worklistCompetencyDetail',
        //     'data': { 'userName': '', 'notificationId': '' },
        //     'methodName': 'worklistCompetencyDetail'
        // },
        // 'worklistBasicDetail': {
        //     'method': 'POST',
        //     'url': '/worklist/basicDetails',
        //     'doSave': 'Y',
        //     'key': 'worklistBasicDetail',
        //     'data': { 'userName': '', 'notificationId': '' },
        //     'methodName': 'worklistBasicDetail'
        // },
        // 'employeeApprovers': {
        //     'method': 'GET',
        //     'url': 'employee/approver/{?}',
        //     'doSave': 'Y',
        //     'key': 'employeeApprovers'
        // },
        // 'manageCompetencies': {
        //     'method': 'POST',
        //     'url': '/myprofile/manageCompetence',
        //     'doSave': 'N',
        //     'key': 'manageCompetencies',
        //     'data': {},
        //     'methodName': 'manageCompetencies'
        // },
        // 'worklistAttachmentDetail': {
        //     'method': 'POST',
        //     'url': '/worklist/attachmentDetails',
        //     'doSave': 'Y',
        //     'key': 'worklistAttachmentDetail',
        //     'data': { 'userName': '', 'notificationId': '' },
        //     'methodName': 'worklistAttachmentDetail'
        // },
        // 'absenceGraph': {
        //     'method': 'GET',
        //     'url': '/absence/absenceCount/{?}',
        //     'doSave': 'Y',
        //     'key': 'absenceGraph',
        //     'methodName': 'absenceGraph'
        // },
        // 'worklistQualificationDetail': {
        //     'method': 'POST',
        //     'url': '/worklist/qualDetails',
        //     'doSave': 'Y',
        //     'key': 'worklistQualificationDetail',
        //     'data': { 'userName': '', 'notificationId': '' },
        //     'methodName': 'worklistQualificationDetail'
        // },
        // 'worklistMainAddress': {
        //     'method': 'POST',
        //     'url': '/worklist/mainAddress',
        //     'doSave': 'Y',
        //     'key': 'worklistMainAddress',
        //     'data': { 'userName': '', 'notificationId': '' },
        //     'methodName': 'worklistMainAddress'
        // },
        // 'fetchRecordTypes': {
        //     'method': 'GET',
        //     'url': '/docOfRecords/docTypeDrpdwn',
        //     'doSave': 'Y',
        //     'key': 'fetchRecordTypes'
        // },
        // 'fetchRecordList': {
        //     'method': 'POST',
        //     'url': '/docOfRecords/details',
        //     'doSave': 'Y',
        //     'key': 'fetchRecordList',
        //     'data': { 'userName': '', 'docTypeId': '' },
        //     'methodName': 'fetchRecordList'
        // },
        // 'fetchDORCountryDropdown': {
        //     'method': 'GET',
        //     'url': '/docOfRecords/countryDrpdwn',
        //     'doSave': 'Y',
        //     'key': 'fetchDORCountryDropdown'
        // },

        // 'specialInfoType': {
        //     'method': 'GET',
        //     'url': '/spclInfoType/details/{?}',
        //     'doSave': 'Y',
        //     'key': 'specialInfoType'
        // },
        // 'createDocOfRec': {
        //     'method': 'POST',
        //     'url': '/docOfRecords/create',
        //     'doSave': 'Y',
        //     'key': 'createDocOfRec',
        //     'data': {},
        //     'methodName': 'createDocOfRec'
        // },
        // 'deleteDocOfRec': {
        //     'method': 'POST',
        //     'url': '/docOfRecords/delete',
        //     'doSave': 'N',
        //     'key': 'deleteDocOfRec',
        //     'data': { 'userName': '', 'docExtraInfoId': '' },
        //     'methodName': 'deleteDocOfRec'
        // },
        // 'fetchDORAttachmentDetails': {
        //     'method': 'POST',
        //     'url': '/docOfRecords/getAttachment',
        //     'doSave': 'N',
        //     'key': 'fetchDORAttachmentDetails',
        //     'data': { 'docExtraInfoId': '', 'deviceId': '' },
        //     'methodName': 'fetchDORAttachmentDetails'
        // },
        // 'payCurrencyDropdown': {
        //     'method': 'POST',
        //     'url': '/spclInfoType/payCurrencyDrpdwn',
        //     'doSave': 'Y',
        //     'key': 'payCurrencyDropdown',
        //     'data': {},
        //     'methodName': 'payCurrencyDropdown'
        // },
        // 'homeCountryDropdown': {
        //     'method': 'POST',
        //     'url': '/spclInfoType/homeCountryDrpdwn',
        //     'doSave': 'Y',
        //     'key': 'homeCountryDropdown',
        //     'data': {},
        //     'methodName': 'homeCountryDropdown'
        // },
        // 'deleteSIT': {
        //     'method': 'POST',
        //     'url': '/spclInfoType/delete',
        //     'doSave': 'N',
        //     'key': 'deleteSIT',
        //     'data': {},
        //     'methodName': 'deleteSIT'
        // },
        // 'createExpatriate': {
        //     'method': 'POST',
        //     'url': '/spclInfoType/createExpatriate',
        //     'doSave': 'N',
        //     'key': 'createExpatriate',
        //     'data': {},
        //     'methodName': 'createExpatriate'
        // },

        // 'titleDropdown': {
        //     'method': 'GET',
        //     'url': '/myprofile/contactDropdowns',
        //     'doSave': 'Y',
        //     'key': 'titleDropdown'
        // },
        // 'maritalStatus': {
        //     'method': 'GET',
        //     'url': '/myprofile/maritalStatus',
        //     'doSave': 'Y',
        //     'key': 'maritalStatus'
        // },
        // 'basicdetails': {
        //     'method': 'POST',
        //     'url': 'myprofile/basicdetails',
        //     'doSave': 'N',
        //     'key': 'basicdetails',
        //     'data': {},
        //     'methodName': 'basicdetails'
        // },
        // 'personalInfoPhoneTypes': {
        //     'method': 'GET',
        //     'url': '/myprofile/phoneTypes',
        //     'doSave': 'Y',
        //     'key': 'personalInfoPhoneTypes'
        // },
        // 'manageContacts': {
        //     'method': 'POST',
        //     'url': '/myprofile/managePhones',
        //     'doSave': 'N',
        //     'key': 'manageContacts',
        //     'data': {},
        //     'methodName': 'manageContacts'
        // },

        // UDC URLS
        'loginDetails': {
            'method': 'POST',
            'url': 'login/loginDetails',
            'doSave': 'N',
            'key': 'loginDetails',
            'data': {},
            'methodName': 'loginDetails'
        },
        'absenceType': {
            'method': 'GET',
            'url': 'absence/type/{?}',
            'doSave': 'N',
            'key': 'absenceType'
        },
        'absenceReason': {
            'method': 'POST',
            'url': 'absence/reasons',
            'doSave': 'N',
            'key': 'absenceReason',
            'data': {},
            'methodName': 'absenceReason'
        },
        'replacedBy': {
            'method': 'POST',
            'url': '/absence/replacedBy',
            'doSave': 'N',
            'key': 'replacedBy',
            'data': {},
            'methodName': 'replacedBy'
        },
        'createAbsence': {
            'method': 'POST',
            'url': 'absence/create',
            'doSave': 'N',
            'key': 'createAbsence',
            'data': {},
            'methodName': 'createAbsence'
        },
        'fetchWorkList': {
            'method': 'POST',
            'url': 'worklist/getWorklist',
            'doSave': 'Y',
            'key': 'fetchWorkList',
            'data': {},
            'methodName': 'fetchWorkList'
        },
        'worklistSummary': {
            'method': 'POST',
            'url': 'worklist/summary',
            'doSave': 'Y',
            'key': 'worklistSummary',
            'data': { 'userName': '', 'notificationId': '' },
            'methodName': 'worklistSummary'
        },
        'worklistLeaveDetail': {
            'method': 'POST',
            'url': 'worklist/leaveDetails',
            'doSave': 'Y',
            'key': 'worklistLeaveDetail',
            'data': { 'userName': '', 'notificationId': '' },
            'methodName': 'worklistLeaveDetail'
        },
        'worklistAttachmentDetail': {
            'method': 'POST',
            'url': 'worklist/attachmentDetails',
            'doSave': 'Y',
            'key': 'worklistAttachmentDetail',
            'data': { 'userName': '', 'notificationId': '' },
            'methodName': 'worklistAttachmentDetail'
        },
        'worklistActionHistory': {
            'method': 'POST',
            'url': 'worklist/actionHistory',
            'doSave': 'Y',
            'key': 'worklistActionHistory',
            'data': { 'userName': '', 'notificationId': '' },
            'methodName': 'worklistActionHistory'
        },
        'absenceSummary': {
            'method': 'POST',
            'url': 'absence/summary',
            'doSave': 'N',
            'key': 'absenceSummary',
            'data': {},
            'methodName': 'absenceSummary'
        },
        'absenceDetails': {
            'method': 'POST',
            'url': 'absence/details',
            'data': {},
            'doSave': 'N',
            'key': 'absenceDetails',
            'methodName': 'absenceDetails'
        },
        'worklistAbsenceCompetencyAction': {
            'method': 'POST',
            'url': 'absence/action',
            'doSave': 'Y',
            'key': 'worklistAbsenceCompetencyAction',
            'data': { 'userName': '', 'itemKey': '', 'resultAction': '', 'notificationId': '', 'comments': '' },
            'methodName': 'worklistAbsenceCompetencyAction'
        },
        'absenceGraph': {
            'method': 'POST',
            'url': 'absence/count',
            'doSave': 'N',
            'data': {},
            'key': 'absenceGraph',
            'methodName': 'absenceGraph'
        },
        'downloadAttachment': {
            'method': 'POST',
            'url': 'attachment/download',
            'doSave': 'N',
            'data': {},
            'key': 'downloadAttachment',
            'methodName': 'downloadAttachment'
        },
        'addAttachment': {
            'method': 'POST',
            'url': 'attachment/add',
            'doSave': 'N',
            'key': 'addAttachment',
            'data': {},
            'methodName': 'addAttachment'
        },
        'deleteAttachment': {
            'method': 'POST',
            'url': 'attachment/delete',
            'doSave': 'N',
            'key': 'deleteAttachment',
            'data': {},
            'methodName': 'deleteAttachment'

        },
        'absenceType_LRA': {
            'method': 'POST',
            'url': 'absence/populateLeaveTypes',
            'data': {},
            'doSave': 'N',
            'key': 'absenceType_LRA'
        },
        'submitLeaveReturn': {
            'method': 'POST',
            'url': 'absence/submitLeaveReturn',
            'data': {},
            'doSave': 'N',
            'key': 'submitLeaveReturn'
        },
        'worklistLRADetail': {
            'method': 'POST',
            'url': 'absence/leaveReturnDetails',
            'doSave': 'Y',
            'key': 'worklistLRADetail',
            'data': {},
            'methodName': 'worklistLRADetail'
        },
        'worklistLraApproveAction': {
            'method': 'POST',
            'url': 'absence/lraAction',
            'doSave': 'N',
            'key': 'worklistLraApproveAction',
            'data': {},
            'methodName': 'worklistLraApproveAction'
        }
    }
});