(function () {
    'use strict';
    
    var app = angular.module('cart', [
        'routes',
        'productlist.controller'
    ]);
    
    $('.ui.sticky').sticky({context: '#content', offset: 92});
    $('.ui.dropdown').dropdown();
    
}());
