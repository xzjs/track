    // 创建制定数量的障碍物
    function drawBarrier(existNum,curNum){
        // 随机向地图添加curNum个数量的障碍物
        // 设定障碍物出现的范围
        var existNum=parseInt(existNum),curNum=parseInt(curNum),info=[];
        var bounds = map.getBounds(),sw = bounds.getSouthWest(),ne = bounds.getNorthEast();
        var lngSpan = Math.abs(sw.lng - ne.lng),latSpan = Math.abs(ne.lat - sw.lat);
        // 设定显示障碍物的图标
        // var opt={
        //     width:48,
        //     height:46,
        //     url:"./static/map/static/images/lzh.png"
        // };
        // var myIcon = new BMap.Icon(opt.url, new BMap.Size(opt.width,opt.height));
        if(curNum){
            // 再次创建curNum个障碍物
            for (var i = existNum; i<(curNum+existNum);i++){
                (function(){
                    var lng=sw.lng + lngSpan * (Math.random() * 0.7),lat=ne.lat - latSpan * (Math.random() * 0.7);
                    var point = new BMap.Point(lng, lat);
                    var cont="<div class='marker-panel'><h3>第"+(i+1)+"个障碍物</h3><p><button onclick='btnBarrier(this)' class='marker-del' data-id='"+i+"'>移除</button></p></div>";
                    var opts = {
                        width : 40,     // 信息窗口宽度
                        height: 40,     // 信息窗口高度
                    }
                    var infoWindow = new BMap.InfoWindow(cont,opts);
                    // var marker = new BMap.Marker(point,{icon:myIcon}); //创建带有图标的marker对象
                    // 无图片的marker
                    var marker = new BMap.Marker(point);
                    marker.enableDragging(); //marker可拖拽
                    marker.addEventListener("click", function(e){
                        this.openInfoWindow(infoWindow);
                    })
                    map.addOverlay(marker); //在地图中添加marker
                    // 返回初次建立的障碍物的位置信息
                    var opt={};
                    opt.lng=lng,opt.lat=lat;
                    info.push(opt);
               
                })(i)
            }
        }
        return info;
    }

    // 给障碍物绑定事件
    function moveBarrier(existNum,curNum){
        // 给所有的障碍物绑定事件
        var allMarkers=map.getOverlays(),moveInfo=[];
        var existNum=parseInt(existNum),curNum=parseInt(curNum);
        
        for(var i=existNum;i<(curNum+existNum);i++){

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
    function btnBarrier(obj){
        console.log("megg");
        //给障碍物上面的button绑定事件
        
        var allOverlay=map.getOverlays();
        var query=window.confirm("你确定移除吗");
        if(query){
                
                var flag=parseInt(obj.getAttribute('data-id'));
                map.removeOverlay(allOverlay[flag]);
        }
    }
    // 通过class来获取元素
    function getByClass(sClass){
        var aResult=[];
        var aEle=document.getElementsByTagName('*');
        /*正则模式*/
        var re=new RegExp("\\b" + sClass + "\\b","g");
        for(var i=0;i<aEle.length;i++){
            /*字符串search方法判断是否存在匹配*/
            if(aEle[i].className.search(re) != -1){
                aResult.push(aEle[i]);
            }
        }
        return aResult;
    }











    