homeContainerModule.service('bookService', function () {
    var item = {};
    var cart = [];

    var setItem = function (bookItem) {
        item = bookItem;
    };

    var getItem = function () {
        return item;
    };

    var addToCart = function (bookItem) {
        cart.push(bookItem);
    };

    var getCart = function () {
        return cart;
    };

    var setCart = function (cartList) {
        cart = cartList;
    };

    var clearCart = function () {
        cart = [];
    };


    var removeFromCart = function (bookItem) {
        var index = cart.indexOf(bookItem);
        if (index != -1) {
            cart.splice(index, 1);
        } else {
            console.log('item not exists');
        }
    };


    return {
        setItem: setItem,
        getItem: getItem,
        addToCart: addToCart,
        getCart: getCart,
        removeFromCart: removeFromCart,
        setCart : setCart,
        clearCart : clearCart
    };

});