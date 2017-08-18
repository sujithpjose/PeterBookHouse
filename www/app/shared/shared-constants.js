sharedModule.constant('sharedConstants', {
'title': 'Oracle HRMS',
    'httpHeader': {
        'AUTHORIZATION_VALUE': 'Basic bVB5VzlIbTRYUERqc0tGTGFRbE41ZE1UQlRFYTpfdTQ1TkR2YW1SZTlOZlJyWUZva3dsdUwwUTRh',
        'ORACLE_MOBILE_BACKEND_ID': 'Oracle-Mobile-Backend-Id',
        'ORACLE_MOBILE_BACKEND_ID_VALUE': '3322be24-8630-4e73-acb4-c8008908622c',
        'X_API_VERSION': 'X-API-Version',
        'X_API_VERSION_VALUE': 'v1'
    },
     'apiSuccess': 0,
     'apiError': 1,
     'apiFailed': 9,
     'apiFailedMsg': 'Service Failed',
     'successTitle': 'Success',
     'errorTitle': 'Error',
     'infoTitle': 'Info',
     'validationTitle': 'Alert',
     'dbSchema': {
        'schema_table': 'CREATE  TABLE  IF NOT EXISTS  APPROVER  ( id  INTEGER PRIMARY KEY  AUTOINCREMENT  ,  approverName  VARCHAR,  currencyCode  VARCHAR,  description  VARCHAR,  receiptStatus  VARCHAR,  reportHeaderId  VARCHAR,  reportNumber  VARCHAR,  reportStatus  VARCHAR,  submittedDate  VARCHAR,  totalAmount  VARCHAR)'
    },
    'dateFormat': 'dd MMM yyyy',
    'leaveBalanceDateFormat' :'dd MMM yy',
    'javaConnectorUrl':{
        'base':'http://admin.peterbookhouse.com/',
        'path':'api/'
    },
    'mcsUrl':{
        'base':'https://rapidvaluedev-rvsmcsdomain.mobileenv.us2.oraclecloud.com:443',
        'path':'/mobile/custom/'
    },
    'dropdownDefault': 'select',
    'isoDateFormat': 'yyyy-MM-dd'
});

