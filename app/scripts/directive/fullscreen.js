'use strict';

function clickFullscreen() {
    return {
        restrict: 'A',
        link: function() {

            function requestFullscreen(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            angular.element('.brand-header__brand-logo').click(function() {
                requestFullscreen(angular.element('html')[0]);
            });
        }
    };
}

angular.module('rfidFittingRoomClientApp')
    .directive('clickFullscreen', [ clickFullscreen ]);
