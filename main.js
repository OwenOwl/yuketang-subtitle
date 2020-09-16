// ==UserScript==
// @name         Yuketang Subtitle
// @version      0.1
// @author       Fafa
// @match        https://tsinghua.yuketang.cn
// @match        https://tsinghua.yuketang.cn/*
// @grant        GM_xmlhttpRequest
// @updateURL    https://raw.githubusercontent.com/OwenOwl/yuketang-subtitle/master/main.js
// @downloadURL  https://raw.githubusercontent.com/OwenOwl/yuketang-subtitle/master/main.js
// ==/UserScript==

(function() {
    'use strict';

    var interval = setInterval(function(){
        if (document.getElementsByClassName("xt_video_caption_btn xt_video_player_common_active").length != 0) {
            GM_xmlhttpRequest ( {
                method:     "GET",
                url:        document.getElementsByClassName("xt_video_caption_btn xt_video_player_common_active")[0].attributes["data-src"].value,
                onload:     function (response) {
                    var r = JSON.parse(response.responseText);
                    var s = "";
                    for (var i in r.text) {
                        s = s + r.text[i] + '\\n';
                    }
                    s = s.replace(/[\r\n]/g,"");
                    if (document.getElementsByClassName('title-fl').length != 0) {
                        var f = document.getElementsByClassName('title-fl')[0];
                        f.innerHTML += `<button onclick='prompt("", "`+s+`")'>下载字幕</button>`;
                        clearInterval(interval);
                    }
                }
            } );
        }
    },1000);
})();
