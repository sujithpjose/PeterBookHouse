homeContainerModule.service('bookService', function () {
    var item = {};

    var setItem = function (bookItem) {
        item = bookItem;
    };

    var getItem = function () {
        return item;
    };

    return {
        setItem: setItem,
        getItem: getItem
    };

});