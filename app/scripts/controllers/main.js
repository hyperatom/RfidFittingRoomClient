'use strict';

function mainCtrl($scope, $sails, $interval, $timeout) {

    var rotationTimer = {};

    function setProducts(res) {
        $scope.products = res.data.relatedProducts;
    }

    function showNextSlide() {
        $scope.currentIndex = ($scope.currentIndex + 1) % $scope.products.length;
    }

    function initProductRotation() {
        var timeoutMs = 8000;
        rotationTimer = $interval(showNextSlide, timeoutMs);
    }

    function cancelProductRotation() {
        $interval.cancel(rotationTimer);
    }

    function restartProductRotation() {
        cancelProductRotation();

        $timeout(function() {
            showNextSlide();
            initProductRotation();
        }, 1000);
    }

    (function init() {
        initProductRotation();
    })();

    $scope.products = [];
    $scope.currentIndex = 0;

    $scope.considerProduct = function(product) {
        product.hasConsidered = true;
        restartProductRotation();
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
    .controller('MainCtrl', [ '$scope', '$sails', '$interval', '$timeout', mainCtrl ]);
