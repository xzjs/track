/**
 * @file overview track.js
* @Author: xuguanlong
* @Date:   2015-11-03 16:10:57
* @Last Modified by:   xuguanlong
* @Last Modified time: 2015-11-03 19:43:19
*/

$(document).ready(function () {
    function init() {
        var dataBox = require('track/main');
        dataBox.initEvents();
        dataBox.getTraceDetail();
        // dataBox.getTraceDetail('http://api.map.baidu.com/getscript?v=2.0&ak=wWy2A8K94nhntYTYUHS19RXW&services=&t=20160401164342');
    }
    try {
        init();
    } catch (e) {
        setTimeout(function () {
            init();
        }, 1000);
    }

});