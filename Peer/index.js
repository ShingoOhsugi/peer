//IEに対応していないコンソールログを無効にする。
(function () {
    if (typeof window.console === "undefined") {
        window.console = {}
    }
    if (typeof window.console.log !== "function") {
        window.console.log = function () { }
    }
})();

window.addEventListener("load", function () {

    // サーバーサイドのsocket.IOに接続する
    var socket = io.connect("http://localhost:8080/");


    // 送信ボタン押下時
    $("#btnPush").click(function () {
        var reqData = {
            "type": "normal",
            "fromUser": "Aさん",
            "toUser": "Bさん",
            "message": $("#txtMes").val()
        };

        socket.emit("clPush", reqData);

        //window.external.ScriptNotify(JSON.stringify(reqData));

        //自画面に描画

        var item = 
            $('<li/>').append(
                $('<div/>').append(
                    $('<i/>').addClass('glyphicon glyphicon-pencil'),
                    $('<small/>').addClass('meta chat-time').append(""))
        );
 
        item.append($('<div/>').addClass('alert alert-success').text(reqData.message))
            .children('div').children('i').after(reqData.fromUser);
        $('#chat-history').prepend(item).hide().fadeIn(500);

        //クリア
        $("#txtMes").val("");

    });

    // socket.IO　コネクションの確立時に発生
    socket.on("connected", function (data) {
    });

    // socket.IO　ソケットがコネクションを確立しようとするときに発生
    socket.on("connecting", function (data) {
    });

    // socket.IO　コネクションの切断時に発生
    socket.on("disconnect", function (data) {
    });

    // socket.IO　コネクションの確立に失敗したときに発生
    socket.on("connect_failed", function (data) {
    });

    // socket.IO　ハンドリングできないエラー発生時に発生
    socket.on("error", function (data) {
    });

    // socket.IO　コネクションの喪失後、再接続に失敗した時に発生
    socket.on("reconnect_failed", function (data) {
    });

    // socket.IO　コネクションの喪失後、再接続に成功した時に発生
    socket.on("reconnect", function (data) {
    });

    // socket.IO　コネクションの喪失後、再接続を行うときに発生
    socket.on("reconnecting", function (data) {
    });

    // socket.IO　サーバーから情報取得時に発生
    socket.on("svPush", function (data) {
        console.log("pullData: " + JSON.stringify(data));

        var item = $('<li/>').append(
        $('<div/>').append(
            $('<i/>').addClass('glyphicon glyphicon-user'),
            $('<small/>').addClass('meta chat-time').append(data.pushTime))
        );
 
        // pushされたメッセージを解釈し、要素を生成する
        switch (data.type){
            case "system":
                item.addClass('alert alert-info')
                .prepend('<button type="button" class="close" data-dismiss="alert">×</button>')
                .children('div').children('i').after(data.message);
                break;
            case "normal":
                item.addClass('well well-small')
                .append($('<div/>').text(data.message))
                .children('div').children('i').after(data.fromUser);
                break;
            default:
                item.addClass('alert alert-error')
                .children('div').children('i').removeClass('icon-user').addClass('icon-warning-sign')
                .after('不正なメッセージを受信しました');
                break;
       }
       $('#chat-history').prepend(item).hide().fadeIn(500);

    });

});
