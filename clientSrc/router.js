'use strict';

var page = require('page');
var evtCallback;

function setUpRoutes() {
    page.base('/');
    page('/', evtCallback);
    page('customers', evtCallback);
    page('roadmap', evtCallback);
    page('downloads', evtCallback);
    page('blog', evtCallback);
    page('feedback', evtCallback);
    page('*', function (e) {
        console.log(e);
        console.log('not found');
    });

    page.start();
}

function init(callback) {
    evtCallback = callback;
    setUpRoutes();
}

exports = module.exports = {
    init: init
};