// ==UserScript==
// @name         bing壁纸高清原图
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://bing.ioliu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     if (/bing\.ioliu\.cn\/photo/.test(location.href)) {
         function down(){
             var url = document.getElementsByClassName('options')[0].getElementsByClassName('download')[0].href.substring(28).split('?')[0];
             url = 'https://cn.bing.com/th?id=OHR.XXXXX_UHD.jpg'.replace('XXXXX',url);
             var basename = document.getElementsByClassName('description')[0].getElementsByClassName('title')[0].innerText.split('(©')[0].trim()
             var date = document.getElementsByClassName('description')[0].getElementsByClassName('calendari')[0].innerText
             var name = basename+'_'+date+'.jpg'
             var x=new XMLHttpRequest();
             x.open("GET", url, true);
             x.responseType = 'blob';
             x.onload=function(e){
                 if(x.status == 200){
                     var url = window.URL.createObjectURL(x.response)
                     var a = document.createElement('a');
                     a.href = url
                     a.download = name
                     a.click()
                 } else {
                     alert("图片过于古老(2019/05/10)，已经找不到啦")
                 }
             }
             x.send();
             console.log(x)
         }
         var options = document.getElementsByClassName('options')[0]
         var newa = options.getElementsByClassName('download')[0].cloneNode(true)
         newa.getElementsByTagName('em')[0].innerText='UHD'
         newa.removeAttribute('target')
         newa.href = 'javascript:void(0);'
         newa.onclick=down
         options.appendChild(newa)

     } else {
         var cards = document.getElementsByClassName('card');
         function download(i){
             var url = cards[i].getElementsByClassName('mark')[0].href.substring(28).split('?')[0];
             url = 'https://cn.bing.com/th?id=OHR.XXXXX_UHD.jpg'.replace('XXXXX',url);
             var basename = cards[i].getElementsByClassName('description')[0].innerText.split('(©')[0].trim()
             var date = cards[i].getElementsByClassName('calendar')[0].innerText
             var name = basename+'_'+date+'.jpg'
             var x=new XMLHttpRequest();
             x.open("GET", url, true);
             x.responseType = 'blob';
             x.onload=function(e){
                 if(x.status == 200){
                     var url = window.URL.createObjectURL(x.response)
                     var a = document.createElement('a');
                     a.href = url
                     a.download = name
                     a.click()
                 } else {
                     alert("图片过于古老(2019/05/10)，已经找不到啦")
                 }
             }
             x.send();
             console.log(x)
         }

         for(let i=0; i<cards.length; i++){
             var option = cards[i].getElementsByClassName('options')[0];
             var newa1 = option.getElementsByClassName('download')[0].cloneNode(true);
             newa1.getElementsByTagName('em')[0].innerText='UHD';
             newa1.removeAttribute('target')
             newa1.href = 'javascript:void(0);';
             newa1.onclick=function(){
                 console.log(i);
                 download(i)
             }
             option.appendChild(newa1)
         }

     };
    // Your code here...
})();