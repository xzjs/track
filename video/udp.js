/**
 * Created by xzjs on 16/4/14.
 */

var METHOD=process.argv[2]||"udp",
    ADDRESS=process.argv[3]||"127.0.0.1",
    STREAM_PORT = process.argv[4] || 9999,
    WEBSOCKET_PORT = process.argv[5] || 9092;

/** websocket **/
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

var i = 0;

if(METHOD=="udp") {

    /** dgram **/
    var dgram = require("dgram");
    var server = dgram.createSocket("udp4");

    var total_str = '';



    server.on("error", function (err) {
        console.log("server error:\n" + err.stack);
        server.close();
    });
    server.on("message", function (msg, rinfo) {
        var str = msg.toString();
        /*if (str == 'start') {
         total_str = '';
         } else if (str != 'end') {
         total_str += str;
         } else {
         socketServer.broadcast(total_str);
         }*/
        socketServer.broadcast(str);
        console.log("server got: #" + i + " " + str + " from " +
            rinfo.address + ":" + rinfo.port);
        i++;
    });
    server.on("listening", function () {
        var address = server.address();
        console.log("server listening " +
            address.address + ":" + address.port);
    });
    server.bind(STREAM_PORT, ADDRESS);
}else if(METHOD=="tcp"){

    /** net **/
    var net = require('net');
    var server = net.createServer(function (c) { // 'connection' 监听器
        console.log('connect');
        c.on('end', function () {
            console.log('disconnect');
        });
        c.on('data',function(msg){
            var str = msg.toString();
            socketServer.broadcast('start');
            for (var i = 0; i < str.length; i += 1000) {
                socketServer.broadcast(str.substr(i, 1000));
            }
            socketServer.broadcast('end');
            console.log("server got: " + str);
        });
        c.write('hello\r\n');
        //c.pipe(c);
    });
    server.listen(STREAM_PORT, function () { // 'listening' 监听器
        console.log('bind');
    });
}

