sharedModule.value('sharedValues', {

    'title': 'Oracle HRMS',
    'apiConfig': {
         
        'books_pagesize': {
            'method': 'GET',
            'url': 'getbooks/?pagesize={?}',
            'doSave': 'N',
            'key': 'books_pagesize',
            'methodName': 'books_pagesize'
        },
        'books_category': {
            'method': 'GET',
            'url': 'getbooks/?category={?}',
            'doSave': 'N',
            'key': 'books_category',
            'methodName': 'books_category'
        },
        'books_search': {
            'method': 'GET',
            'url': 'getbooks/?search={?}',
            'doSave': 'N',
            'key': 'books_search',
            'methodName': 'books_search'
        },
        'getcategories': {
            'method': 'GET',
            'url': 'getcategories',
            'doSave': 'N',
            'key': 'getcategories',
            'methodName': 'getcategories'
        }
   
    }
});