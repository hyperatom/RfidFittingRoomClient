'use strict';

function mainCtrl($scope, $sails, $interval, $timeout) {

    var rotationTimer = {};

    function isActiveProduct(product) {
        return typeof product !== 'undefined';
    }

    function setProducts(res) {

        if (!isActiveProduct(res.data)) {
            cancelProductRotation();

            return $sails.get('/rfid')
                .then(setProducts);
        }

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

    function getProducts() {
        $sails.on('product', setProducts);

        return $sails.get('/rfid')
            .then(setProducts);
    }

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

    (function init() {
        getProducts();
        initProductRotation();
    })();
}

angular.module('rfidFittingRoomClientApp')
    .controller('MainCtrl', [ '$scope', '$sails', '$interval', '$timeout', mainCtrl ]);
