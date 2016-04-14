/**
 * Created by xzjs on 16/4/14.
 */

var STREAM_SECRET = process.argv[2],
    STREAM_PORT = process.argv[3] || 8082,
    WEBSOCKET_PORT = process.argv[4] || 8084,
    STREAM_MAGIC_BYTES = 'jsmp'; // Must be 4 bytes

var socketServer = new (require('ws').Server)({port: WEBSOCKET_PORT});

socketServer.on('connection', function (socket) {
    console.log('New WebSocket Connection (' + socketServer.clients.length + ' total)');

    socket.on('close', function (code, message) {
        console.log('Disconnected WebSocket (' + socketServer.clients.length + ' total)');
    });
});

socketServer.broadcast = function (data) {
    for (var i in this.clients) {
        if (this.clients[i].readyState == 1) {
            this.clients[i].send(data);
        }
        else {
            console.log('Error: Client (' + i + ') not connected.');
        }
    }
};

var dgram = require("dgram");
var server = dgram.createSocket("udp4");

var total_str = '';

server.on("error", function (err) {
    console.log("server error:\n" + err.stack);
    server.close();
});
server.on("message", function (msg, rinfo) {
    var str = msg.toString();
    if (str == 'start') {
        total_str = '';
    } else if (str != 'end') {
        total_str += str;
    } else {
        socketServer.broadcast(total_str);
    }
    console.log("server got: " + msg + " from " +
        rinfo.address + ":" + rinfo.port);
});
server.on("listening", function () {
    var address = server.address();
    console.log("server listening " +
        address.address + ":" + address.port);
});
server.bind(STREAM_PORT, '127.0.0.1');
