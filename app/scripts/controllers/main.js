'use strict';

function mainCtrl($scope, $sails, $interval, $timeout) {

    var rotationTimer = {};

    function isActiveProduct(product) {
        return typeof product !== 'undefined';
    }

    function setProducts(res) {

        if (!isActiveProduct(res.data)) {
            stopProductRotation();

            return $sails.get('/rfid')
                .then(setProducts);
        }

        $scope.products = res.data.relatedProducts;
        restartProductRotation();
    }

    function showNextSlide() {
        $scope.currentIndex = ($scope.currentIndex + 1) % $scope.products.length;
    }

    function startProductRotation() {
        var timeoutMs = 8000;
        rotationTimer = $interval(showNextSlide, timeoutMs);
    }

    function stopProductRotation() {
        $interval.cancel(rotationTimer);
    }

    function restartProductRotation() {
        stopProductRotation();
        $scope.currentIndex = 0;
        startProductRotation();
    }

    function getProducts() {
        $sails.on('product', setProducts);

        return $sails.get('/rfid')
            .then(setProducts);
    }

    $scope.products = [];
    $scope.currentIndex = 0;

    $scope.considerProduct = function(product) {
        product.hasConsidered = true;

        stopProductRotation();

        $timeout(function() {
            showNextSlide();
            startProductRotation();
        }, 1000);
    };

    $scope.setCurrentIndex = function(index) {
    	$scope.currentIndex = index;
    };

    $scope.isCurrentIndex = function(index) {
    	return $scope.currentIndex === index;
    };

    (function init() {
        getProducts();
        startProductRotation();
    })();
}

angular.module('rfidFittingRoomClientApp')
    .controller('MainCtrl', [ '$scope', '$sails', '$interval', '$timeout', mainCtrl ]);
