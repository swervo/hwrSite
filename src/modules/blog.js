'use strict';

var marked = require('marked');
var moment = require('moment');
var path = require('path');
var fs = require('fs');
// var debug = require('debug');
var blogDataPath, blogEntries, blogEntryString, blogEntry, dateClause, authorDate,
    bloggedDate;

marked.setOptions({
    gfm: true,
    tables: true
});

function init() {
    blogDataPath = path.join(__dirname, '../../data/blog');
}

function getMoment(fileName) {
    var year = fileName.substr(0, 4);
    var month = fileName.substr(4, 2);
    var date = fileName.substr(6, 2);
    var hours = fileName.substr(9, 2);
    var seconds = fileName.substr(11, 2);
    var utcDate = year + '-' + month + '-' + date + 'T' + hours + ':' + seconds + 'Z';
    var dateAsMoment = moment.utc(utcDate);
    return dateAsMoment;
}

function getBlogData(req, res, next) {
    blogEntries = [];
    fs.readdir(blogDataPath, function (err, files) {
        files.forEach(function (item) {
            blogEntry = {};
            dateClause = item.split('.')[0];
            authorDate = getMoment(dateClause);
            blogEntryString = fs.readFileSync(blogDataPath + '/' + item, 'utf8');
            blogEntry.date = authorDate.format('dddd, MMMM Do YYYY, h:mm a');
            blogEntry.copy = marked(blogEntryString);
            blogEntries.push(blogEntry);
        });
        res.end(JSON.stringify(blogEntries));
    });
}

module.exports = {
    getBlogData: getBlogData,
    init: init
};