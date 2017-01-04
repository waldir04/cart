(function () {
    'use strict';

    angular.module('routes', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/list');

        $stateProvider
        .state('app', {
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.product', {
            module: 'product',
            url: '/list',
            template: '<h1>Hola Mundo!</h1>'
        })
        .state('app.form', {
            module: 'form',
            url: '/form',
            controller: 'FormController',
            templateUrl: '/components/form/form.view.html'
        });

    }]);

}());
