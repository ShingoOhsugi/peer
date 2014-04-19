// 必要なモジュールを読み込みます。
//var http = require("http");
//var url = require("url");
//var path = require("path");
//var fs = require("fs");
var connect = require('connect');
var socketIO = require("socket.io");

//// アクセスされたら、クライアントに表示するhtmlを返します。
//var server = http.createServer();

////HTTPリクエストを受け付けたときに発生
//server.on("request", function (request, response) {

//    var Response = {
//        "200" : function(file, filename){
//            var extname = path.extname(filename);
//            var header = {
//                "Access-Control-Allow-Origin":"*",
//                "Pragma": "no-cache",
//                "Cache-Control" : "no-cache"       
//            }

//            response.writeHead(200, header);
//            response.write(file, "binary");
//            response.end();
//        },
//        "404":function(){
//            response.writeHead(404, {"Content-Type": "text/plain"});
//            response.write("404 Not Found\n");
//            response.end();

//        },
//        "500":function(err){
//            response.writeHead(500, {"Content-Type": "text/plain"});
//            response.write(err + "\n");
//            response.end();

//        }
//    }

//    var uri = url.parse(request.url).pathname, filename = path.join(process.cwd(), uri);

//    fs.exists(filename, function(exists){

//        console.log("★filename/exists:" + filename + " " + exists);
        
//        if (!exists) { 
//            Response["404"](); return ; 
//        }

//        if (fs.statSync(filename).isDirectory()){ 
//            filename += '/chat.html'; 
//        }

//        fs.readFile(filename, "binary", function(err, file){
//            if (err) { 
//                Response["500"](err); return ; 
//            }
//            Response["200"](file, filename);   
//        }); 

//    });
//});

////HTTPリクエスト待ち受け開始
//server.listen(process.env.PORT, process.env.IP);

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