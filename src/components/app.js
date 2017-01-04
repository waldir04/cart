(function () {
    'use strict';

    var app = angular.module('cart', [
        'routes',
        'productlist.controller',
        'form.controller',
        'form.directive'
    ]);

    $('.ui.sticky').sticky({context: '#content', offset: 70});
    $('.ui.dropdown').dropdown();
    $('.card .image').dimmer({
        on: 'hover'
    });

}());
