var barrier = {
    existNum:0,
    curNum:0,
    type: 22,
    init: function() {
        this.bind();
    },
    bind: function() {
        var that = this;
        $("#J_Barrier").delegate('#J_BarrierCog', 'click', function(event) {
            that.showForm();
        }).
        delegate('#J_BarrierCogBtn', 'click', function(event) {
            that.initNum();
            that.hideForm();
            that.submitForm();
        }).
        delegate('#J_BarrierCogPlus', 'click', function(event) {
            that.addNum();
        }).
        delegate('#J_BarrierCogMinus', 'click', function(event) {
            that.minusNum();
        });
    },
    initNum: function() {
        this.curNum = parseInt($("#J_BarrierCogNum").val());
    },
    showForm: function() {
        $("#J_BarrierCogForm").show();
    },
    hideForm: function() {
        $("#J_BarrierCogForm").hide();
    },
    addNum: function() {
        this.curNum++;
        this.renderNum();
    },
    minusNum: function() {
        if (this.curNum > 0) {
            this.curNum--;
        }
        this.renderNum();
    },
    renderNum: function() {
        $("#J_BarrierCogNum").val(this.curNum);
    },
    submitForm: function() {
        //todo 子窗口随机产生相应数量的障碍物数目，并且返回障碍物的信息（id、经纬度、大小）
        var curNum = this.curNum;
        var existNum = this.existNum;
        var barrierInfo = mapFrame.window.drawBarrier(existNum,curNum);
        this.existNum+=this.curNum;
        this.curNum=0;
        this.renderNum();
        console.log(barrierInfo);
        // $.ajax({
        //     url: "http://xzjs.love/track/public//obstacle",
        //     type: "POST",
        //     data: {
        //         barrierInfo: barrierInfo,
        //     },
        //     success: function(res) {
        //         try {
        //             if(res.equals("1")){
        //                 var moveInfo = mapFrame.window.moveBarrier();
        //                 if (moveInfo.length){
        //                     $.ajax({
        //                     url: "/obstacle",
        //                     type: "POST",
        //                     data: {
        //                         // type: this.type,
        //                         moveInfo: moveInfo
        //                     },
        //                     success: function(res) {
        //                          //

        //                     }
        //                 })
        //                 }
        //             }
        //         } catch (e) {
        //             alert("抱歉，创建障碍物失败啦");
        //         }
        //     }
        // })

    },

}