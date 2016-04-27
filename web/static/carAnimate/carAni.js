var joystick = {
    	time:0,
    	str_interv:60,
    	str_01:323,
    	str_02:301,
    	str_03:155,
    	str_07:295,
    	str_08:306,
    	str_09:177,
    	str_013:268,
    	str_014:310,
    	str_015:202,
    	str_04:299,
    	str_05:306,
    	str_06:178,
    	str_010:272,
    	str_011:307,
    	str_012:202,
    	str_016:243,
    	str_017:310,
    	str_018:225,
    	str_10:280,
    	str_11:280,
    	str_12:280,
    	str_13:280,
    	str_14:280,
    	str_15:280,
    	str_16:280,
    	str_17:280,
    	str_18:280,
        duration: 10000,
        turnDur:2000,
        vDuration:10000,
        turnX:22,
        turnY:22,
        car_wid:86,
        animationQueue:null,
        init: function(carInfo) {
            // 初始化运动序列
            this.animationQueue=new AnimationQueue();
            this.drawCar(carInfo);
            this.bind();
        },
        drawCar:function(carInfo){
            // 先将车的经纬度转换为对应的坐标lon(经度)，lat（纬度）
            for(var i in carInfo){
                carInfo[i].lat=latToX(carInfo[i].lat);
                carInfo[i].lon=lonToY(carInfo[i].lon);
            }
        },
        turnMove:function(x,y,turnDur){
            var that=this;
            var turnDur=that.turnDur,trX=that.turnX,trY=that.turnY;
            var turnMove=new Animator(turnDur,function(p){
                var tx=trX*p+x,ty=trY*p+y,rotation=90*p;
                $("#J_Car").css("transform","translate("+tx+"px,"+ty+"px)"+" rotate("+rotation+"deg)");
            })
            return turnMove;
        },
        straightMove:function(x,y,flag,dur){
            var straightMove=new Animator(dur,function(p){
                var tx,ty,rotation;
                if(flag==0){
                    // 水平移动
                    rotation=0;
                    tx=x*p;
                    ty=y;
                }else{
                    rotation=90;
                    tx=x;
                    ty=y*p;
                }
                $("#J_Car").css("transform","translate("+tx+"px,"+ty+"px)"+" rotate("+rotation+"deg)");

            })
            return straightMove;
        },
        startMove:function(){
        	var that=this;
        	var dur=that.duration;
        	var mStr=that.str_01+that.str_02+that.str_03+2*(that.str_interv)-0.5*(that.car_wid);
        	var tr=that.turnDur,trX=that.turnX,trY=that.turnY,vdur=that.vDuration;
        	var rMStr=that.str_12+that.str_15+that.str_18+2*(that.str_interv);
        	
            var topHMainStr=that.straightMove(mStr,0,0,dur);
        	// var topHMainStr=new Animator(dur,function(p){
        	// 	var tx=mStr*p;
        	// 	$("#J_Car").css("transform","translateX("+tx+"px)");
        	// })
            var topStrTr=that.turnMove(mStr,0,tr);
        	// var topStrTr=new Animator(tr,function(p){
        	// 	var tx=trX*p+mStr,ty=trY*p,rotation=90*p;
        	// 	$("#J_Car").css("transform","translate("+tx+"px,"+ty+"px)"+" rotate("+rotation+"deg)");
        	// })
            var topVRightStr=that.straightMove(trX+mStr,rMStr,1,vdur);
        	// var topVRightStr=new Animator(vdur,function(p){
        	// 	var ty=rMStr*p,tx=trX+mStr,rotation=90;
        	// 	$("#J_Car").css("transform","translate("+tx+"px,"+ty+"px)"+" rotate("+rotation+"deg)");
        	// })
        	var bottomStrRtr=new Animator(tr,function(p){
        		var tx=trX+mStr-trX*p,ty=rMStr+2*trY*p,rotation=90+90*p;
        		$("#J_Car").css("transform","translate("+tx+"px,"+ty+"px)"+" rotate("+rotation+"deg)");
        	})
        	var bottomHMainStr=new Animator(dur,function(p){
        		var tx=mStr-trX-(mStr-trX)*p,ty=rMStr+2*trY,rotation=180;
        		$("#J_Car").css("transform","translate("+tx+"px,"+ty+"px)"+" rotate("+rotation+"deg)");

        	})
        	
        	var animators = that.animationQueue;
        		// animators.append(topVRightStr,bottomStrRtr);
        		// var animators=that.animationQueue;
    			animators.append(topHMainStr,topStrTr,topVRightStr,bottomStrRtr,bottomHMainStr);
    			animators.flush();
        },
        bind: function() {
            var that = this;
            $("#J_StartBtn").on("click",function(){
            	that.startMove();
            });
            $("#J_ResetBtn").on("click",function(){
            	$("#J_Car").css("transform","translate("+0+"px,"+0+"px)");
            });

        },
        
}
$(function() {
    joystick.init(carInfo);
})

// 动画的封装
function Animator(duration, progress, easing) {
    this.duration = duration;
    this.progress = progress;
    this.easing = easing || function(p) {
        return p
    };
}
Animator.prototype = {
    start: function(finished) {
        var startTime = Date.now();
        var duration = this.duration,
            self = this;

        requestAnimationFrame(function step() {
            var p = (Date.now() - startTime) / duration;
            var next = true;
            if (p < 1.0) {
                self.progress(self.easing(p), p);
            } else {
                if (typeof finished === 'function') {
                    next = finished() === false;
                } else {
                    next = finished === false;
                }

                if (!next) {
                    self.progress(self.easing(1.0), 1.0);
                } else {
                    startTime += duration;
                    self.progress(self.easing(p), p);
                }
            }
            if (next) requestAnimationFrame(step);
        });
    }
};
function AnimationQueue(animators){
  this.animators = animators || [];
}

AnimationQueue.prototype = {
  status: 'ready',
  append: function(){
    var args = [].slice.call(arguments);
    this.animators.push.apply(this.animators, args);
  },
  flush: function(){
    if(this.animators.length){
      var self = this;

      function play(){
        var animator = self.animators.shift();

        if(animator instanceof Animator){
          animator.start(function(){
            if(self.animators.length){
              play();
            }
          });
        }else{
          animator.apply(self);
          if(self.animators.length){
            play();
          }
        }
      }
      play();
    }
  }
}