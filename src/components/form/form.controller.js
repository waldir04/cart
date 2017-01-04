(function () {
    'use strict';

    angular.module('form.controller', [])
    .controller('FormController', ['$scope', function ($scope) {
        $scope.user = {
            name: '',
            lastName: '',
            email: '',
            phone: ''
        };

        $scope.register = function (form) {
            if(!form.$submitted) {
                form.$setSubmitted();
            }

            if(form.$valid) {
                console.log('Register', $scope.user);
            }
        };
    }]);
}());
