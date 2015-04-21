'use strict';

var app = angular.module('rfidFittingRoomClientApp');

app.constant('PATHS', (function() {
    var imageBase = 'assets/images/';

    return {
        IMAGES: imageBase,
        STAR_IMAGES: imageBase + 'stars/'
    };
})());
