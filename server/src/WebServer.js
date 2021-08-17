var path = require('path');
var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var WebServer = /** @class */ (function () {
    function WebServer(assetPath, port) {
        this.assetPath = assetPath;
        this.port = port;
    }
    WebServer.prototype.start = function (clientHandler) {
        var _this = this;
        var app = express();
        app.use(express.static(this.assetPath));
        app.get('*', function (req, res) {
            res.sendFile(path.join(_this.assetPath, 'index.html'));
        });
        var httpServer = http.Server(app);
        var io = socketio(httpServer, {
            cors: {
                origin: "http://localhost:4000"
            }
        });
        io.on('connection', function (socket) {
            console.log("Socket connected", socket.id);
            clientHandler.addSocketClient(socket);
        });
        io.on('disconnect', function (socket) {
            console.log("Socket disconnected", socket.id);
        });
        httpServer.listen(this.port, function () {
            console.log("listening on *:" + _this.port);
        });
    };
    return WebServer;
}());
module.exports = WebServer;
