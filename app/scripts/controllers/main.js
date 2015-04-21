'use strict';

function mainCtrl($scope, $sails, $interval) {

    function setProducts(res) {
        $scope.products = res.data.relatedProducts;
    }

    function showNextSlide() {
        $scope.currentIndex = ($scope.currentIndex + 1) % $scope.products.length;
    }

    (function init() {
        $interval(showNextSlide, 4000);
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
