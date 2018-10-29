'use strict';

var express = require('express');
// express modules
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

// others
var http = require('http');
var once = require('once');
var path = require('path');
var compress = require('compression');
var debug = require('debug')('main');
var browserify = require('browserify-middleware');
var sassM = require('node-sass-middleware');

var mBlog = require('./modules/blog');
var mRoadmap = require('./modules/roadmap');

// this is not a middleware
function finishRequest(req, res, status, body, modified) {
    if (modified) {
        res.set('last-modified', modified.toString());
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.query.pretty !== 'true') {
        res.send(status, JSON.stringify(body));
    } else {
        res.send(status, JSON.stringify(body, null, 4) + '\n');
    }
}

// Success handler middleware
function successHandler(success, req, res, next) {
    if (success instanceof HttpSuccess) {
        debug('Send response with status', success.statusCode, 'and body', success.body);
        finishRequest(req, res, success.statusCode, success.body, success.modified);
    } else {
        next(success);
    }
}

// Error handlers. These are called until one of them sends headers
function clientErrorHandler(err, req, res, next) {
    var status = err.status || err.statusCode; // support both

    if (status >= 400 && status <= 499) {
        var obj = {
            status: http.STATUS_CODES[status],
            message: err.message
        };

        finishRequest(req, res, status, obj);

        debug(http.STATUS_CODES[status] + ' : ' + err.message);
        debug(err.stack);
    } else {
        next(err);
    }
}

// It is not an error that 'next' is unused. Arity matters in express.
function serverErrorHandler(err, req, res, next) {
    /*jshint unused:vars */
    var status = err.status || err.statusCode || 500;
    var obj = {
        status: http.STATUS_CODES[status],
        message: err.message
    };

    finishRequest(req, res, status, obj);

    debug(http.STATUS_CODES[status] + ' : ' + err.message);
    debug(err.stack);
}

function sassCompilation(err, req, res, next) {
    var srcPath = path.join(__dirname, '../sass');
    var destPath = path.join(__dirname, '../public/styles');
    var includePath = path.join(
        __dirname,
        '../bower_components/bootstrap-sass-official/assets/stylesheets/'
    );
    sassM({
        src: srcPath, //where the sass files are
        dest: destPath, //where css should go
        debug: true,
        force: true,
        outputStyle: 'nested',
        prefix: '/styles',
        includePaths: [includePath]
    });
}

function Server(port, serverURL, silent) {
    this._routePrefix = '/api/v1';
    this._port = port;
    this._serverURL = serverURL;
    this._silent = !!silent;

    this.app = null;
}

Server.prototype._initialize = function (callback) {


    this.app = express();
    this.app.httpServer = http.createServer(this.app);

    var QUERY_LIMIT = '1mb'; // max size for json and urlencoded queries
    var COMPRESSION_THRESHOLD = 0; // compress everything

    this.app.disable('x-powered-by');
    this.app.set('port', this._port);
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view options', {
        layout: true,
        debug: true
    });
    this.app.set('view engine', 'ejs');

    var json = bodyParser.json({
        strict: true,
        limit: QUERY_LIMIT
    }); // application/json

    if (!this._silent) {
        this.app.use(morgan('dev', {
            immediate: false
        }));
    }
    this.app.use(cookieParser());
    this.app.use(json);
    this.app.use(compress({
        threshold: COMPRESSION_THRESHOLD
    }));
    this.app.use(sassCompilation);
    this.app.use(express.static(path.join(__dirname, '../public')));

    this.app.use(successHandler);
    this.app.use(clientErrorHandler);
    this.app.use(serverErrorHandler);

    this.app.get('/scribble/api/blog', mBlog.getBlogData);
    this.app.get('/scribble/api/roadmap', mRoadmap.getRoadmap);
    this.app.get('/scripts/bundle.js', browserify('./clientSrc/main.js'));
    this.app.get('/*', function (req, res) {
        console.log('/*');
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    mBlog.init();
    mRoadmap.init();
    callback(null);
};

Server.prototype._listen = function (callback) {
    callback = once(callback);

    this.app.httpServer.listen(this.app.get('port'), function (error) {
        if (error) {
            return callback(error);
        }
        callback();
    });

    this.app.httpServer.on('error', function (error) {
        callback(error);
    });
};

// public API
Server.prototype.start = function (callback) {
    var that = this;

    if (this.app) {
        return callback(new Error('Server is already up and running.'));
    }

    this._initialize(function (error) {
        if (error) {
            return callback(error);
        }
        that._listen(callback);
    });
};

Server.prototype.stop = function (callback) {
    var that = this;

    if (!this.app.httpServer) {
        return callback();
    }

    this.app.httpServer.close(function () {
        that.app.httpServer.unref();
        that.app = null;

        callback();
    });
};

module.exports = Server;