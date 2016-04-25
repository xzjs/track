var barrier = {
    num: 0,
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
    showForm: function() {
        $("#J_BarrierCogForm").show();
    },
    hideForm: function() {
        $("#J_BarrierCogForm").hide();
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
        $("#J_BarrierCogNum").val(this.num);
    },
    initNum: function() {
        this.num = parseInt($("#J_BarrierCogNum").val());
    },
    submitForm: function() {
        //todo 子窗口随机产生相应数量的障碍物数目，并且返回障碍物的信息（id、经纬度、大小）
        var num = this.num;
        var barrierInfo = mapFrame.window.drawBarrier(num);
        console.log(barrierInfo);
        $.ajax({
            url: "/obstacle",
            type: "POST",
            data: {
                barrierInfo: barrierInfo,
                // type: this.type
            },
            success: function(res) {
                try {
                    if(res.equals("1")){
                        var moveInfo = mapFrame.window.moveBarrier();
                        if (moveInfo.length){
                            $.ajax({
                            url: "/obstacle",
                            type: "POST",
                            data: {
                                // type: this.type,
                                moveInfo: moveInfo
                            },
                            success: function(res) {
                                 //

                            }
                        })
                        }
                    }
                } catch (e) {
                    alert("抱歉，创建障碍物失败啦");
                }
            }
        })

    },

}