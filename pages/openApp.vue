<script setup lang='ts'>
import { ref, reactive } from 'vue'

onMounted(()=> {
    var u = navigator.userAgent;
    var isWeixin = u.toLowerCase().indexOf('micromessenger') !== -1; // 微信内
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isWeixin) {
        alert('请在浏览器上打开')
    } else {
        //android端
        if (isAndroid) {
            //安卓app的scheme协议
            window.location.href = 'wechat://u.wechat.com/MNSaVUZFA8mrtaZrA0rcWjk';
            setTimeout(function () {
                let hidden = window.document.hidden 
                if (typeof hidden == "undefined" || hidden == false) {
                    //应用宝下载地址 (emmm 找不到淘宝应用宝的地址，这里放的是 lucky coffee 地址)
                    window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.lucky.luckyclient";
                }
            }, 2000);
        }
        //ios端
        if (isIOS) {
            //ios的scheme协议
            window.location.href = 'wechat://'
            // setTimeout(function () {
            //     let hidden = window.document.hidden
            //     if (typeof hidden == "undefined" || hidden == false) {
            //         //App store下载地址
            //         window.location.href = "http://itunes.apple.com/app/id387682726";
            //     }
            // }, 2000);
        }
        // window.location.href = 'wechat://u.wechat.com/MNSaVUZFA8mrtaZrA0rcWjk'
    }
})

function openApp() {
    var u = navigator.userAgent;
    var isWeixin = u.toLowerCase().indexOf('micromessenger') !== -1; // 微信内
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isWeixin) {
        alert('请在浏览器上打开')
    } else {
        //android端
        if (isAndroid) {
            //安卓app的scheme协议
            window.location.href = 'wechat://';
            setTimeout(function () {
                let hidden = window.document.hidden 
                if (typeof hidden == "undefined" || hidden == false) {
                    //应用宝下载地址 (emmm 找不到淘宝应用宝的地址，这里放的是 lucky coffee 地址)
                    window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.lucky.luckyclient";
                }
            }, 2000);
        }
        //ios端
        if (isIOS) {
            //ios的scheme协议
            window.location.href = 'wechat://'
            // setTimeout(function () {
            //     let hidden = window.document.hidden
            //     if (typeof hidden == "undefined" || hidden == false) {
            //         //App store下载地址
            //         window.location.href = "http://itunes.apple.com/app/id387682726";
            //     }
            // }, 2000);
        }
        window.location.href = 'wechat://'
    }
}

</script>

<template>
    <button @click="openApp">打开微信</button>
    <!-- <iframe width="560" height="315"
        src="https://www.bilibili.com/"
        frameborder="0"
        allowfullscreen></iframe> -->
</template>

<style scoped></style>