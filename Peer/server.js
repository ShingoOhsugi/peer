// 必要なモジュールを読み込みます。
var connect = require('connect');
var socketIO = require("socket.io");

// Webサーバを立てます。
var server = connect.createServer(
    connect.static(__dirname)
).listen(process.env.PORT, process.env.IP);

// socket.IO待ち受け開始
var io = socketIO.listen(server);

// 接続されたら、connected!とコンソールにメッセージを表示します。
io.sockets.on("connection", function (socket) {

    console.log("connected");

    //クライアントからの要求をさばく
    socket.on("clPush", function (data) {

        console.log("clPush:" + JSON.stringify(data));

        var d = new Date();
        data.pushTime = 
            d.getFullYear()  + "-" + 
            (d.getMonth() + 1) + "-" + 
            d.getDate() + " " + 
            d.getHours() + ":" + 
            d.getMinutes() + ":" + 
            d.getSeconds();

        socket.broadcast.emit("svPush", data);
    });


});