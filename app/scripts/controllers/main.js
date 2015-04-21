'use strict';

function mainCtrl($scope, $sails) {

    function setProducts(res) {
        $scope.products = res.data.relatedProducts;
    }

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

    $scope.nextSlide = function() {
    	$scope.currentIndex = ($scope.currentIndex < $scope.products.length - 1) ? ++$scope.currentIndex : 0;
    };

    $sails.get('/rfid')
        .then(setProducts);

    $sails.on('product', setProducts);
}

angular.module('rfidFittingRoomClientApp')
    .controller('MainCtrl', [ '$scope', '$sails', mainCtrl ]);
