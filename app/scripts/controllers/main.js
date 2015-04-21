'use strict';

function mainCtrl($scope, $sails, $interval) {

    function setProducts(res) {
        $scope.products = res.data.relatedProducts;
    }

    function showNextSlide() {
        $scope.currentIndex = ($scope.currentIndex + 1) % $scope.products.length;
    }

    (function init() {
        var timeoutMs = 10000;
        $interval(showNextSlide, timeoutMs);
    })();

    $scope.products = [];
    $scope.currentIndex = 0;

    $scope.considerProduct = function(product) {
        product.hasConsidered = true;
    };

    $scope.setCurrentIndex = function(index) {
    	$scope.currentIndex = index;
    };

    $scope.isCurrentIndex = function(index) {
    	return $scope.currentIndex === index;
    };

    $sails.get('/rfid')
        .then(setProducts);

    $sails.on('product', setProducts);
}

angular.module('rfidFittingRoomClientApp')
    .controller('MainCtrl', [ '$scope', '$sails', '$interval', mainCtrl ]);
