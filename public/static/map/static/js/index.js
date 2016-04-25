
    // 创建单个marker
    function createMarker(point,label){
        var opt={
            width:48,
            height:46,
            url:"./static/images/lzh.png"
        };
        var myIcon = new BMap.Icon(opt.url, new BMap.Size(opt.width,opt.height));
        var marker = new BMap.Marker(point,{icon:myIcon});
        map.addOverlay(marker);
        marker.setLabel(label); 
        marker.enableDragging();
        return opt; 
    }
    // 创建制定数量的障碍物
    function drawBarrier(num){
       
        // 随机向地图添加num个数量的障碍物
        var num=parseInt(num),info=[];
        var bounds = map.getBounds();
        var sw = bounds.getSouthWest();
        var ne = bounds.getNorthEast();
        var lngSpan = Math.abs(sw.lng - ne.lng);
        var latSpan = Math.abs(ne.lat - sw.lat);
        if(num==0){
            // 删除地图已有的所有marker
            var allMarkers=map.getOverlays();
            for(var i in allMarkers){
                map.removeOverlay(allMarkers[i]);
            }
        }else{
            for (var i = 0; i < num; i++) {

                var lng=sw.lng + lngSpan * (Math.random() * 0.7),lat=ne.lat - latSpan * (Math.random() * 0.7);
                var point = new BMap.Point(lng, lat);
                var label = new BMap.Label("障碍物"+i,{offset:new BMap.Size(20,-10)});
                label.setStyle({
                    color:"red",
                    fontSize : "12px",
                    height : "20px",
                    lineHeight : "20px",
                    fontFamily:"微软雅黑"
                });
                var opt=createMarker(point,label);
                opt.lng=lng;
                opt.lat=lat;
                opt.label="障碍物"+i;
                info.push(opt);
            }
        }
        return info;
    }

    // 给障碍物绑定事件
    function moveBarrier(){
        // 给所有的障碍物绑定事件
        var allMarkers=map.getOverlays(),moveInfo=[];
        
        for(var i in allMarkers){

            (function(){

                var o={},marker=allMarkers[i];
                o.label=marker.getLabel().content;
                marker.addEventListener("mousedown",function(){
                    var p=marker.getPosition();
                    o.slng=p.lng;
                    o.slat=p.lat;
                })
                marker.addEventListener("mouseup",function(){
                    var p=marker.getPosition();
                    o.elng=p.lng;
                    o.elat=p.lat;
                })
                moveInfo[i]=o;
            })(i)
        }
        return moveInfo;
    }
    