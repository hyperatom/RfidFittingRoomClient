'use strict';

function mainCtrl($scope, Restangular, APIBASE) {

    var api = Restangular.all('rfid');

    $scope.products = [];

    function setProducts(product) {
        $scope.products = product.relatedProducts;
    }

    /*io.sails.url = APIBASE;

    io.socket.get('/rfid', function(body) {
        console.log(body);
    });*/

    api.post({ id: 11111 })
        .then(setProducts);
}

angular.module('rfidFittingRoomClientApp')
    .controller('MainCtrl', [ '$scope', 'Restangular', mainCtrl ]);
