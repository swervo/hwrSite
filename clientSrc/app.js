'use strict';

var blog = require('./blog');
var roadmap = require('./roadmap');
var router = require('./router');
var $navbarNav = $('.navbar-nav');
var $logoTab = $('a[href="/"]');

function routeResponse(ctx) {
    if (ctx.path !== '/') {
        var targetTabNav = $navbarNav.find('[href="./' + ctx.path + '"]');
        targetTabNav.tab('show');
        if (ctx.path === 'blog') {
            blog.loadEntries();
        } else if (ctx.path === 'roadmap') {
            roadmap.loadRoadmap();
        }
    } else {
        $('.active', $navbarNav).removeClass('active');
        $logoTab.tab('show');
    }
}

function init() {
    router.init(routeResponse);
    blog.init();
    roadmap.init();
}

exports = module.exports = {
    init: init
};