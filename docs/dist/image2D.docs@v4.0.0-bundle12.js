(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{29:function(t,e,i){"use strict";var s=i(4),n=i.n(s);e.a=function(t,e){n()("."+t).attr("active","no"),n()("."+t+"."+e).attr("active","yes")}},62:function(t,e,i){var s=i(63);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);(0,i(2).default)("data-icrush-5b791d1b",s,!0)},63:function(t,e,i){e=t.exports=i(1)(!1);var s=i(6)(i(64));e.push([t.i,"div>div{background-image:url("+s+");height:400px;background-repeat:no-repeat;background-position:center center;background-size:auto 100%}div>h2{box-shadow:rgba(0,0,0,0.1) 0 1px 2px;padding-top:.5rem;padding-left:calc(50vw - 3.5rem);color:gray}div>ul{width:7rem;margin:auto;margin-top:.1rem;font-size:0}\n",""])},64:function(t,e,i){t.exports=i.p+"dist/zfb.jpg"},66:function(t,e,i){"use strict";i.r(e);var s=i(29),n={data:function(){return{sponsors:[{type:"￥",list:[{date:"2020年10月12日",value:.01}]},{type:"￥",list:[{date:"2020年10月12日",value:1.88}]},{type:"￥",list:[{date:"2020年10月12日",value:1.11}]},{type:"￥",list:[{date:"2020年10月12日",value:1}]}]}},created:function(){Object(s.a)("menu-1","Sponsors")},mounted:function(){for(var t="",e=0;e<this.sponsors.length;e++){for(var i=0,s=0;s<this.sponsors[e].list.length;s++)i+=this.sponsors[e].list[s].value;t+="<li title='累计捐款："+this.sponsors[e].type+i.toFixed(2)+"' style='display: inline-block;width: 1rem;height: .75rem;background-image: url(src/assets/Sponsors/"+(e+1)+".jpg)'></li>"}document.getElementById("sponsors-id").innerHTML=t}};i(62);n.render=function(t){return t("div",{"data-icrush-5b791d1b":""},[t("div",{"data-icrush-5b791d1b":""},[]),t("h2",{"data-icrush-5b791d1b":""},["特别感谢以下捐献者："]),t("ul",{id:"sponsors-id","data-icrush-5b791d1b":""},[])])};e.default=n}}]);