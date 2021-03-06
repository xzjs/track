<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>百度鹰眼</title>
    <meta name="keywords" content="百度地图鹰眼,鹰眼,轨迹,大数据位置,位置智能" />
    <meta name="description" content="百度鹰眼，来自百度LBS开放平台，打造最专业的位置轨迹大数据服务平台。" />
    <link rel="shortcut icon" href="http://api.map.baidu.com/favicon.ico">
    <link href="static/css/track.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="static/css/fontawesome/css/font-awesome.min.css" type="text/css">
    <link href="static/css/jquery.datetimepicker.css" rel="stylesheet" type="text/css">
    <link href="static/css/pagination.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=wWy2A8K94nhntYTYUHS19RXW"></script>
    <script type="text/javascript" src="static/js/jquery.min.js"></script>
    <script type="text/javascript" src="static/js/jquery.datetimepicker.js" charset="UTF-8"></script>
    <script type="text/javascript" src="static/js/jquery.pagination.js" charset="UTF-8"></script>
    <script type="text/javascript" src="static/js/mousewheel.min.js" charset="UTF-8"></script>
    <script type="text/javascript" src="static/js/baiduTemplate.js"></script>
    <script type="text/javascript" src="static/js/esl/esl.js"></script>
    <script src="http://echarts.baidu.com/build/dist/echarts.js"></script>
</head>

<body>
<div id="mapContainer">
</div>
<div class="title">
    <p>
        <span class="name"></span>
            <span class="ctrl">
                    <i class="fa fa-chevron-down"></i>
                </span>
    </p>
</div>
<div id="track-btn" class="type-ctr active" data-tag="0">
    <a href="javascript:void(0)">实时监控</a>
</div>
<div id="track-btn-2" class="type-ctr" data-tag="1">
    <a href="javascript:void(0)">历史轨迹</a>
</div>
<div id="data-box">
    <div class="panel-mask">
        <img src="static/images/loading-1.gif" height="82" width="82">
    </div>
    <div class="panel">
        <input type="text" placeholder="请输入关键字" id="searchKey">
            <span class="search-i">
                <i class="fa fa-search"></i>
            </span>
        <a href="javascript:void(0)" class="btn filter">已选</a>
        <a href="javascript:void(0)" class="btn clean">清除已选</a>
        <div id="tracklist-panel"></div>

        <ul id="tracks-pager-ul" class="pagination"></ul>
    </div>
    <div id="track-box">
        <div class="date-panel">
            <span>查询日期 </span>
            <div class="date" id="div_date">
                <span class="date-title" id="date"></span>
                <span class="sele"><i class="fa fa-sort-desc"></i></span>
            </div>
        </div>
        <input type="text" placeholder="请输入关键字" id="searchKey_2">
            <span class="search-i">
                <i class="fa fa-search"></i>
            </span>
        <a href="javascript:void(0)" class="btn filter">已选</a>
        <a href="javascript:void(0)" class="btn clean">清除已选</a>
        <div class="tracks-panel" id="tracks-panel">
        </div>
        <ul id="tracks-pager-ul-2" class="pagination"></ul>
    </div>
    <div class="tip">
    </div>
</div>
<div class="mask">
    <img src="static/images/loading-1.gif" height="82" width="82">
</div>
<div class="timeline-ctrl">
    <canvas id="timeline" width="780px" height="60px"></canvas>
    <!-- <canvas id="cursor" width="1305px" height="60px"></canvas> -->
    <canvas id="timeCtr" width="16px" height="60px"></canvas>
</div>
<div id="time_span"></div>
<div class="chart-ctrl">
    <div class="no-track-tip">请先勾选需要统计的轨迹！</div>
    <img src="static/images/11.png" height="52" width="52" alt="统计图">
    <span class="title">统计</span>

</div>
<div class="jiupian">

    <img src="static/images/22.png" height="52" width="52" alt="纠偏">
    <span class="title">纠偏</span>
</div>
<div class="chart-wrap">
    <div id="chart"></div>

</div>
<div class="map-ctrl zoom-out" title="地图放大">
    <span><i class="fa fa-plus-circle"></i></span>
</div>
<div class="map-ctrl zoom-in" title="地图缩小">
    <span><i class="fa fa-minus-circle"></i></span>
</div>
<script type="text/html" id="tracklist-tmpl">
    <ul class="tracks-ul">
        <%for(var i=0; i<size; i++) { %>
        <li data-id="<%=trackList[i].entity_name%>" data-name="<%=trackList[i].entity_name%>" data-state="<%=trackList[i].state%>">
            <%if(trackList[i].checked) { %>
            <input type="checkbox" class="cbtest" checked="checked" id="cbtest_<%=trackList[i].entity_name%>" />
            <% } else { %>
            <input type="checkbox" class="cbtest" id="cbtest_<%=trackList[i].entity_name%>" />
            <% } %>
            <label for="cbtest_<%=trackList[i].entity_name%>" class="check-box"></label>
            <span class="state <%=trackList[i].state%>" title="<%=trackList[i].stateTxt%>"></span>
            <span><%=trackList[i].entity_name%></span>
        </li>
        <% } %>
    </ul>
</script>
<script type="text/html" id="sel-tracklist-tmpl">
    <ul class="seled-tracks-ul">
        <%for(var i=0; i<size; i++) { %>
        <li class="seled-track" id="seled-track-<%=trackList[i].entity_name%>" data-id="<%=trackList[i].entity_name%>" data-name="<%=trackList[i].entity_name%>">
            <%if(trackList[i].checked) { %>
            <input type="checkbox" class="cbtest" checked="checked" id="cbtest2_<%=trackList[i].entity_name%>" />
            <% } else { %>
            <input type="checkbox" class="cbtest" id="cbtest2_<%=trackList[i].entity_name%>" />
            <% } %>
            <label for="cbtest2_<%=trackList[i].entity_name%>" class="check-box"></label>
            <span class="sel-track-name"><%=trackList[i].entity_name%></span>
            <span class="pro-bar" style="background-color: <%=trackList[i].barBgColor%>"><span class="bar"></span></span>
            <span class="process play" title="回放轨迹" data-id="<%=trackList[i].entity_name%>"><i class="fa fa-play"></i></span>
        </li>
        <% } %>
    </ul>
</script>
<script type="text/javascript" src="static/js/track/demo.js"></script>
<script type="text/javascript" src="static/js/demoTrack.js"></script>
<script type="text/javascript">
    var map = new BMap.Map("mapContainer", {
        // 关闭底图可点功能
        enableMapClick: false
    });
    function mapInit() {
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 12);
    }
    mapInit();
    // 设置酷黑个性化地图
    map.setMapStyle({
        styleJson: [{
            featureType: "land",
            elementType: "geometry",
            stylers: {
                color: "#212121"
            }
        }, {
            featureType: "building",
            elementType: "geometry",
            stylers: {
                color: "#2b2b2b"
            }
        }, {
            featureType: "highway",
            elementType: "all",
            stylers: {
                lightness: -42,
                saturation: -91
            }
        }, {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
                lightness: -77,
                saturation: -94
            }
        }, {
            featureType: "green",
            elementType: "geometry",
            stylers: {
                color: "#1b1b1b"
            }
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: {
                color: "#181818"
            }
        }, {
            featureType: "subway",
            elementType: "geometry.stroke",
            stylers: {
                color: "#181818"
            }
        }, {
            featureType: "railway",
            elementType: "geometry",
            stylers: {
                lightness: -52,
                visibility: "off"
            }
        }, {
            featureType: "railway",
            elementType: "all",
            stylers: {
                visibility: "off"
            }
        }, {
            featureType: "subway",
            elementType: "all",
            stylers: {
                visibility: "off"
            }
        }, {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: {
                color: "#313131"
            }
        }, {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: {
                color: "#8b8787"
            }
        }, {
            featureType: "manmade",
            elementType: "geometry",
            stylers: {
                color: "#1b1b1b"
            }
        }, {
            featureType: "local",
            elementType: "geometry",
            stylers: {
                lightness: -75,
                saturation: -91
            }
        }, {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
                lightness: -65
            }
        }, {
            featureType: "railway",
            elementType: "all",
            stylers: {
                lightness: -40
            }
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: {
                visibility: "off"
            }
        }, {
            featureType: "highway",
            elementType: "labels.icon",
            stylers: {
                visibility: "off"
            }
        }]
    });
    // 设置个性化地图 最大缩放级别 18
    map.setMaxZoom(18);
    map.addControl(new BMap.MapTypeControl());
</script>
</body>

</html>
