sharedModule.constant('sharedConstants', {
    'title': 'Oracle HRMS',
    'httpHeader': {
        'AUTHORIZATION_VALUE': 'Basic bVB5VzlIbTRYUERqc0tGTGFRbE41ZE1UQlRFYTpfdTQ1TkR2YW1SZTlOZlJyWUZva3dsdUwwUTRh',
        'X_API_VERSION': 'X-API-Version',
        'X_API_VERSION_VALUE': 'v1'
    },
    'apiSuccess': 0,
    'apiError': 1,
    'apiFailed': 9,
    'apiStatusSuccess':'success',
    'apiStatusFailure':'failure',
    'apiFailedMsg': 'Service Failed',
    'successTitle': 'Success',
    'errorTitle': 'Error',
    'infoTitle': 'Info',
    'validationTitle': 'Alert',
    'dbSchema': {
        'schema_table': 'CREATE  TABLE  IF NOT EXISTS  APPROVER  ( id  INTEGER PRIMARY KEY  AUTOINCREMENT  ,  approverName  VARCHAR,  currencyCode  VARCHAR,  description  VARCHAR,  receiptStatus  VARCHAR,  reportHeaderId  VARCHAR,  reportNumber  VARCHAR,  reportStatus  VARCHAR,  submittedDate  VARCHAR,  totalAmount  VARCHAR)'
    },
    'dateFormat': 'dd MMM yyyy',
    'leaveBalanceDateFormat': 'dd MMM yy',
    'assetsBaseUrl': 'http://assets.peterbookhouse.com/images/',
    'apiUrl': {
        'base': 'http://www.peterbookhouse.com/portal/public/',
        'path': 'api/'
    },
    'dropdownDefault': 'select',
    'isoDateFormat': 'yyyy-MM-dd',
    'homeList': {
        'one': 'Fiction',
        'two': 'Short Stories',
        'three': 'Fiction/Classics'
    }

});

