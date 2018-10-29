'use strict';

var isInitialised = false;
var $roadmapRoot;

function init() {
    $roadmapRoot = $('#roadmap .js-roadmapContent');
}

function loadRoadmap() {
    if (isInitialised === false) {
        $.ajax({
            url: 'scribble/api/roadmap'
        })
        .done(function (obj) {
            var roadmap = JSON.parse(obj);
            $roadmapRoot.append(roadmap);
            isInitialised = true;
        });
    }
}

exports = module.exports = {
    init: init,
    loadRoadmap: loadRoadmap
};
