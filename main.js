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
                        s = s + r.text[i] + '\n';
                    }
                    if (document.getElementsByClassName('description').length != 0) {
                        var g = document.getElementsByClassName('description')[0];
                        g.innerHTML += `<textarea style="width: 100%; height: 200px; margin: 0; padding: 0;">` + s + `</textarea>`;
                        clearInterval(interval);
                    }
                }
            } );
        }
    },2000);
})();
