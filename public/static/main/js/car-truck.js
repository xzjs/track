var truck = {
    num: 0,
    type: 10,
    connection:null,
    init: function() {
        this.initNum();
        this.bind();
        // this.ws();
    },
    ws:function(){
        var that=this;
        if(window.WebSocket != undefined){
            that.connection= new WebSocket('ws://192.168.1.101:8080');
            (that.connection).onopen=that.wsOpen();
        }else{
            console.log("浏览器不支持websocket");
        }
    },
    wsOpen:function(){
        console.log('Connected to: ' + event.currentTarget.URL);
        this.wsSend("hello world");
    },
    wsSend:function(msg){
        console.log(msg);
    },
    wsMessage:function(event){
        console.log(event.data);
    },
    wsClose:function(){
        console.log("ws closed");
        (this.connection).close();
    },
    bind: function() {
        var that = this;
        $("#J_Truck").delegate('#J_TruckCog', 'click', function(event) {
            that.showForm();
        }).
        delegate('#J_TruckCogBtn', 'click', function(event) {
            that.initNum();
            that.hideForm();
            that.submitForm();
        }).
        delegate('#J_TruckCogPlus', 'click', function(event) {
            that.addNum();
        }).
        delegate('#J_TruckCogMinus', 'click', function(event) {
            that.minusNum();
        });
    },
    showForm: function() {
        $("#J_TruckCogForm").show();
    },
    hideForm: function() {
        $("#J_TruckCogForm").hide();
    },
    addNum: function() {
        this.num++;
        this.renderNum();
    },
    minusNum: function() {
        if (this.num > 0) {
            this.num--;
        }
        this.renderNum();
    },
    renderNum: function() {
        $("#J_TruckCogNum").val(this.num);
    },
    initNum: function() {
        this.num = parseInt($("#J_TruckCogNum").val());
    },
    submitForm: function() {
        if(this.num>0){
            var addUrl='http://xzjs.love/track/public//car/add/'+this.num;
            var $addUrl=$("<script type='text/javascript' src='"+addUrl+"'></script>");
            $addUrl.appendTo($("html"));
            // $.ajax({
            //     url: "http://xzjs.love/track/public//car/add",
            //     dataType:"jsonp",
            //     data: {
            //         num: this.num,
            //     },
            //     jsonp:"callback",
            //     success: function(res) {
            //         $.ajax({
            //             url:"http://xzjs.love/track/public//car",
            //             dataType:"jsonp",
            //             data: {
            //                 id: 1,
            //             },
            //             jsonp:"callback",
            //             success:function(res){
            //                 console.log(res);
            //             }
            //         })
                   
            //     }
            // })
        }else{

            $.ajax({
            url: "http://xzjs.love/track/public//car/delete",
            type:"GET",
            dataType:"jsonp",
            data: {
                id: 4,
            },
            jsonp:"callback",
            success:function(res){
                console.log(res);
            }
        })
        }

        
        
    }
};