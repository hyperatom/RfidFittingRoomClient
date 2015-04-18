'use strict';

function mainCtrl($scope, $sails) {

    function setProducts(res) {
        $scope.products = res.data.relatedProducts;
    }

    $scope.products = [];

    $sails.get('/rfid')
        .then(setProducts);

    $sails.on('product', setProducts);
}

angular.module('rfidFittingRoomClientApp')
    .controller('MainCtrl', [ '$scope', '$sails', mainCtrl ]);
