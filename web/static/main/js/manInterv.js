var manInterv = {
    speed: 30,
    ff: true,
    timeFlag:null,
    init: function() {
        this.bind();
        this.hideCpl();
        this.ff = !this.ff;
    },
    bind: function() {
        var that = this;
        $("#J_ManInterv").on("click", function() {
            if (that.ff) {
                that.showCpl();
            } else {
                that.hideCpl();
            }
        })
    },
    showCpl: function() {
        $("#J_Joystick").show();
        $("#J_SpeedCvs").show();
        this.ff = !this.ff;
        this.intervOpt();
    },
    hideCpl: function() {
        $("#J_Joystick").hide();
        $("#J_SpeedCvs").hide();
        this.ff = !this.ff;
    },
    showTurnL: function() {
        $("#J_TurnP .glyphicon-arrow-left").css("visibility", "visible");
    },
    hideTurnL: function() {
        $("#J_TurnP .glyphicon-arrow-left").css("visibility", "hidden");
    },
    showTurnR: function() {
        $("#J_TurnP .glyphicon-arrow-right").css("visibility", "visible");
    },
    hideTurnR: function() {
        $("#J_TurnP .glyphicon-arrow-right").css("visibility", "hidden");
    },
    intervOpt: function() {
        var that = this;
        // 刚打开时，显示车当前的车速
        that.infoCvs();
        $("#J_Joystick").delegate('#J_SpeedUp', 'mousedown', function(event) {
            $("#J_SpeedUp").addClass('active').siblings('.op-flag').removeClass('active');
            // 传递速度给后台
            $.ajax({
                url:'/operate',
                type:"POST",
                data:{
                    car_id:'int',
                    operate_no:0
                },
                success:function(res){
                    if(res.equals("1")){
                        console.log("开始加速");
                        that.timeFlag=setInterval(function(){
                        that.speed+=10;
                        console.log(that.speed);
                        },1000);
                    }
                }
            })
        }).delegate('#J_SpeedUp', 'mouseup', function(event) {
            // 传递速度给后台
            $.ajax({
                url:'/operate',
                type:"POST",
                data:{
                    car_id:'int',
                    operate_no:1
                },
                success:function(res){
                    if(res.equals("1")){
                        console.log("结束加速");
                        clearInterval(that.timeFlag);
                    }
                }
            })
            console.log(that.speed);
        }).delegate('#J_SpeedDown', 'mousedown', function(event) {
            $("#J_SpeedDown").addClass('active').siblings('.op-flag').removeClass('active');
            if(that.speed > 0){
                $.ajax({
                    url:'/operate',
                    type:"POST",
                    data:{
                        car_id:'int',
                        operate_no:2
                    },
                    success:function(){
                        if(res.equals("1")){
                            console.log("正在减速");
                            that.timeFlag=setInterval(function(){
                                that.speed-=10;
                            },1000);
                        }
                    }
                })
            }else{
                that.speed = 0;
            }
            console.log(that.speed);
        }).delegate('#J_SpeedDown', 'mouseup', function(event) {
            $.ajax({
                url:"/operate",
                type:"POST",
                data:{
                    car_id:'int',
                    operate_no:3
                },
                success:function(res){
                    console.log("结束减速");
                    clearInterval(that.timeFlag);
                }
            })
            console.log(that.speed);
        }).delegate('#J_TurnR', 'mousedown', function(event) {
            // 传递速度和又转信号flag=2；开始-时间戳
            // 开始左转的字符串
            $("#J_TurnR").addClass('active').siblings('.op-flag').removeClass('active');
            that.showTurnR();
            $.ajax({
                url:"/operate",
                type:"POST",
                data:{
                    car_id:'int',
                    operate_no:6
                },
                success:function(){
                    console.log("mousedown");
                }
            })

        }).delegate('#J_TurnR', 'mouseup', function(event) {
            // 传递速度和又转信号flag=2；结束-时间戳
            that.hideTurnR();
            $.ajax({
                url:"/operate",
                type:"POST",
                data:{
                    car_id:'int',
                    operate_no:7
                },
                success:function(){
                    console.log("up");
                }
            })
            
        }).delegate('#J_TurnL', 'mousedown', function(event) {
            // 传递速度和又转信号flag=1；开始-时间戳
            $("#J_TurnL").addClass('active').siblings('.op-flag').removeClass('active');
            that.showTurnL();
            $.ajax({
                url:"/operate",
                type:"POST",
                data:{
                    car_id:'int',
                    operate_no:4
                },
                success:function(){
                    console.log("mousedown");
                }
            })

        }).delegate('#J_TurnL', 'mouseup', function(event) {
            // 传递速度和又转信号flag=1；结束-时间戳
            that.hideTurnL();
            $.ajax({
                url:"/operate",
                type:"POST",
                data:{
                    car_id:'int',
                    operate_no:5
                },
                success:function(){
                    console.log("mouseup");
                }
            })
        });
        // $(document).on("keydown", function(e) {
        //     var type = e.keyCode;
        //     e.preventDefault();
        //     switch (type) {
        //         case 37:
        //             // $('#J_TurnL').bind("mousedown");
        //             console.log(that.speed--);
        //             break;
        //         case 38:
        //             $('#J_SpeedUp').on("click");
        //             break;
        //         case 39:
        //             $('#J_TurnR').on("mousedown");
        //             break;
        //         case 40:
        //             $('#J_SpeedDown').on("click");
        //             break;
        //     }
        // })
    },
    infoCvs: function() {

        var myChart = echarts.init(document.getElementById('J_SpeedCvs'));
        option = {
            backgroundColor: '#1b1b1b',
            tooltip: {
                formatter: "{a} <br/>{c} {b}"
            },
            toolbox: {
                show: false,
                // feature : {
                //     mark : {show: true},
                //     restore : {show: true},
                //     saveAsImage : {show: true}
                // }
            },
            series: [{
                name: '速度',
                type: 'gauge',
                min: 0,
                max: 220,
                splitNumber: 11,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.09, 'lime'],
                            [0.82, '#1e90ff'],
                            [1, '#ff4500']
                        ],
                        width: 3,
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 2
                    }
                },
                axisLabel: { // 坐标轴小标记
                    textStyle: { // 属性lineStyle控制线条样式
                        fontSize: 12,
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 2,
                        padding: 0
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 2
                    }
                },
                splitLine: { // 分隔线
                    length: 12, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 2,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 2
                    }
                },
                pointer: { // 分隔线
                    length: '50%',
                    width: 4,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                title: {
                    offsetCenter: [0, '60%'],
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'normal',
                        fontSize: 12,
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 2
                    }
                },
                detail: {
                    backgroundColor: 'rgba(30,144,255,0.8)',
                    borderWidth: 1,
                    borderColor: '#fff',
                    width: 40,
                    height: 20,
                    offsetCenter: [0, '88%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'lighter',
                        fontSize: 14,
                        color: '#fff'
                    }
                },
                data: [{
                    value: 40,
                    name: '时速km/h'
                }]
            }]
        };
        var timeTicket = 0;
        clearInterval(timeTicket);
        timeTicket = setInterval(function() {
            option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            myChart.setOption(option, true);
        }, 2000)


        // $.ajax({
        // 	url:"",
        // 	type:"POST",
        // 	data:{
        // 		// 
        // 	},
        // 	success:function(res){

        // 		clearInterval(timeTicket);
        // 		timeTicket = setInterval(function (){
        // 		    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
        // 		    myChart.setOption(option,true);
        // 		},2000)


        // 	}      //success
        // })   //ajax
    }, //infoCvs




}