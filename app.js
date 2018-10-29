#!/usr/bin/env node

'use strict';

var app = require('commander');
var Server = require('./src/server');

var port = process.env.PORT || 4000;
var serverURL = process.env.SERVER_URL || 'http://localhost:4000';

app.version('0.1.0')
    .usage('[options]')
    .option('-p --port [port]', 'The port to listen on. [' + port + ']', port)
    .option('-s, --silent', 'turn off logging')
    .parse(process.argv);

var server = new Server(parseInt(app.port, 10),
    app.serverURL,
    app.silent
);

server.start(function (error) {
    if (error) {
        console.log('Unable to start server. Reason: ', error);
        process.exit(2);
    }

    console.log('Server up and running on port ', app.port);
});