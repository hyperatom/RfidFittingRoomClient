'use strict';

function mainCtrl($scope, Restangular) {

    var api = Restangular.all('rfid');

    $scope.products = [];

    function setProducts(product) {
        $scope.products = product.relatedProducts;
    }

    api.post({ id: 11111 })
        .then(setProducts);
}

angular.module('rfidFittingRoomClientApp')
    .controller('MainCtrl', [ '$scope', 'Restangular', mainCtrl ]);
