'use strict';

function starRating(PATHS) {
    return {
        restrict: 'E',
        replace: true,
        template: '<img ng-src="{{ starsImage }}">',
        scope: {
            rating: '='
        },
        link: function(scope) {
            scope.starsImage = PATHS.STAR_IMAGES + scope.rating + '.png';
        }
    };
}

angular.module('rfidFittingRoomClientApp')
    .directive('starRating', [ 'PATHS', starRating ]);
