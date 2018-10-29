'use strict';

var marked = require('marked');
var path = require('path');
var fs = require('fs');
// var debug = require('debug');
var roadmapDataPath, roadmapString;

marked.setOptions({
    gfm: true,
    tables: true
});

function init() {
    roadmapDataPath = path.join(__dirname, '../../data/roadmap/roadmap.md');
}

function getRoadmap(req, res, next) {
    roadmapString = fs.readFileSync(roadmapDataPath, 'utf8');
    res.end(JSON.stringify(marked(roadmapString)));
}

module.exports = {
    getRoadmap: getRoadmap,
    init: init
};