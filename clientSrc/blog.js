'use strict';

var isInitialised = false;
var $contentRoot;

function init() {
    $contentRoot = $('#blog .js-blogContent');
}

function loadEntries() {
    if (isInitialised === false) {
        $.ajax({
            url: 'scribble/api/blog'
        })
        .done(function (obj) {
            var blogDataArray = JSON.parse(obj);
            blogDataArray.forEach(function (item) {
                var myPanel = $(
                    '<div class="panel panel-default">' +
                    '<div class="panel-heading">' +
                    '<h3 class="panel-title">' +
                    'Panel title' +
                    '</h3></div><div class="panel-body"></div></div>'
                    );
                $('.panel-body', myPanel).append(item.copy);
                $('.panel-title', myPanel).text(item.date);
                // TODO: Should append this all at once rather than one at a time
                $contentRoot.append(myPanel);
            });
            isInitialised = true;
        });
    }
}

exports = module.exports = {
    init: init,
    loadEntries: loadEntries
};
