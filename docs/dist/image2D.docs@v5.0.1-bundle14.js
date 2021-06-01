(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{23:function(a,e,i){"use strict";var t=i(24),d=i.n(t);e.a=function(a,e){d()("."+a).attr("active","no"),d()("."+a+"."+e).attr("active","yes")}},26:function(a){a.exports=JSON.parse('{"name":"image2d","version":"1.13.1","description":"🍇 使用ECMAScript绘制二维图片。Drawing Two-Dimensional Pictures Using ECMAScript.","main":"build/image2D.min.js","typings":"types/index.d.ts","sideEffects":false,"scripts":{"start":"npm install && npm run build","build":"npm run build:init && npm run build:bundle && npm run build:babel && npm run build:uglifyjs && npm run build:end","build:init":"hai2007_nodejs --config ./hai2007_nodejs.config.js init","build:end":"hai2007_nodejs --config ./hai2007_nodejs.config.js end","build:bundle":"hai2007_nodejs --config ./hai2007_nodejs.config.js bundle","build:babel":"hai2007_nodejs --config ./hai2007_nodejs.config.js babel","build:uglifyjs":"hai2007_nodejs --config ./hai2007_nodejs.config.js uglifyjs","server":"hai2007_nodejs --server 30000"},"keywords":["image","algorithm","svg","canvas","tree","js"],"repository":{"type":"git","url":"git+https://github.com/hai2007/image2D.git"},"author":{"name":"你好2007","url":"https://hai2007.gitee.io/sweethome/"},"license":"MIT","bugs":{"url":"https://github.com/hai2007/image2D/issues"},"homepage":"https://hai2007.gitee.io/image2d/index.html","devDependencies":{"@hai2007/nodejs":"^1.0.0","babel-core":"^6.26.0","babel-plugin-transform-class-properties":"^6.24.1","babel-preset-es2015":"^6.24.1","rollup":"^1.32.1","rollup-plugin-commonjs":"^10.1.0","rollup-plugin-node-resolve":"^5.2.0","uglify-js":"^3.5.6"},"dependencies":{"@hai2007/algorithm":"^0.5.1","@hai2007/tool":"^0.6.2"}}')},27:function(a,e,i){var t=i(28);"string"==typeof t&&(t=[[a.i,t,""]]),t.locals&&(a.exports=t.locals);(0,i(1).default)("data-quickpaper-04269db4",t,!0)},28:function(a,e,i){(a.exports=i(0)(!1)).push([a.i,"div.root{background:#f6f8f8;min-height:calc(100vh - .44rem)}div.root>header{text-align:center;font-size:.3rem;line-height:1.5em;padding:.3rem 0}div.root>header>span{border:1px solid gray;background-color:white;font-size:.12rem;vertical-align:middle;margin-left:.1rem;padding:.03rem .06rem;border-radius:.03rem}div.root>header>p{font-size:.16rem}div.root>header>p>a{color:#4078c0}div.root>div{background-color:#fff;padding:.15rem .5rem;min-height:calc(100vh - 2rem);color:#3a585f}div.root>div a{color:inherit}div.root>div a:hover{text-decoration:underline;color:#3d7991}div.root>div a.link{color:#1b6afc;font-size:.14rem}div.root>div>h2{padding-bottom:.09rem;border-bottom:1px solid #eee;display:block;font-weight:200}div.root>div>ul{padding-top:.09rem;-moz-column-count:3;column-count:3;line-height:1.6em}div.root>div>ul>li{-moz-column-break-inside:avoid;break-inside:avoid}div.root>div>ul>li>h4{font-weight:600;padding-top:.1rem}div.root>div>ul>li>ol{margin-left:1em;padding-left:.1rem}div.root>div>ul>li>ol>li{list-style-type:circle}\n",""])},57:function(a,e,i){"use strict";i.r(e);var t=i(23),d=i(26),r={data:function(){return{version:d.version,info:"本文档对应image2D.js的版本是v"+d.version+"。"}},methods:{goNpmList:function(){window.location.href="https://github.com/hai2007/image2D/blob/master/CHANGELOG"}},created:function(){Object(t.a)("menu-1","guide")}};i(27);r.render=function(a){return a("div",{quickpaper:"","data-quickpaper-04269db4":""},[a("div",{class:"root","data-quickpaper-04269db4":""},[a("header",{"data-quickpaper-04269db4":""},["image2D.js 官方文档",a("span",{":title":"info","@click":"goNpmList()","data-quickpaper-04269db4":""},["{{version}}"]),a("p",{"data-quickpaper-04269db4":""},["在此，我们对",a("a",{href:"https://github.com/hai2007/image2D/blob/master/AUTHORS.txt",target:"_blank","data-quickpaper-04269db4":""},["所有的贡献者"]),"表示感谢！"])]),a("div",{"data-quickpaper-04269db4":""},[a("h2",{"data-quickpaper-04269db4":""},["指南：开始绘图"]),a("ul",{"data-quickpaper-04269db4":""},[a("li",{"data-quickpaper-04269db4":""},[a("h4",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/how-to-use",target:"_blank","data-quickpaper-04269db4":""},["快速开始"])]),a("ol",{"data-quickpaper-04269db4":""},[a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/how-to-use?fixed=purpose",target:"_blank","data-quickpaper-04269db4":""},["关注的问题"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/how-to-use?fixed=import",target:"_blank","data-quickpaper-04269db4":""},["如何引入?"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/how-to-use?fixed=example",target:"_blank","data-quickpaper-04269db4":""},["一个简单的用例"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/how-to-use?fixed=help",target:"_blank","data-quickpaper-04269db4":""},["获取帮助"])])])]),a("li",{"data-quickpaper-04269db4":""},[a("h4",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/xhtml",target:"_blank","data-quickpaper-04269db4":""},["结点操作"])]),a("ol",{"data-quickpaper-04269db4":""},[a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/xhtml?fixed=object",target:"_blank","data-quickpaper-04269db4":""},["结点对象"]),"(你可能需要知道有哪些",a("a",{class:"link",href:"#/api/xhtml?fixed=selector",target:"_blank","data-quickpaper-04269db4":""},["选择器"]),")"]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/xhtml?fixed=modify",target:"_blank","data-quickpaper-04269db4":""},["编辑"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/xhtml?fixed=calculate",target:"_blank","data-quickpaper-04269db4":""},["计算(比如结点大小等常用方法)"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/xhtml?fixed=attribute",target:"_blank","data-quickpaper-04269db4":""},["样式和属性"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/xhtml?fixed=event",target:"_blank","data-quickpaper-04269db4":""},["事件相关"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/xhtml?fixed=data",target:"_blank","data-quickpaper-04269db4":""},["数据绑定"])])])]),a("li",{"data-quickpaper-04269db4":""},[a("h4",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/painter",target:"_blank","data-quickpaper-04269db4":""},["画笔"])]),a("ol",{"data-quickpaper-04269db4":""},[a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/painter?fixed=canvas2d",target:"_blank","data-quickpaper-04269db4":""},["位图画笔"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/painter?fixed=svg",target:"_blank","data-quickpaper-04269db4":""},["矢图画笔"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/painter?fixed=method",target:"_blank","data-quickpaper-04269db4":""},["画笔上的绘图方法"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/painter?fixed=gradient",target:"_blank","data-quickpaper-04269db4":""},["渐变色"]),"(比如",a("a",{class:"link",href:"#/api/painter?fixed=linearGradient",target:"_blank","data-quickpaper-04269db4":""},["线性渐变"]),"和",a("a",{class:"link",href:"#/api/painter?fixed=radialGradient",target:"_blank","data-quickpaper-04269db4":""},["环形渐变"]),")"]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/painter?fixed=translate",target:"_blank","data-quickpaper-04269db4":""},["变换"])])])]),a("li",{"data-quickpaper-04269db4":""},[a("h4",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/calculate",target:"_blank","data-quickpaper-04269db4":""},["辅助计算"])]),a("ol",{"data-quickpaper-04269db4":""},[a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/calculate?fixed=dot",target:"_blank","data-quickpaper-04269db4":""},["二维坐标变换"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/calculate?fixed=matrix4",target:"_blank","data-quickpaper-04269db4":""},["矩阵坐标变换"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/calculate?fixed=interpolation",target:"_blank","data-quickpaper-04269db4":""},["曲线插值"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/calculate?fixed=layout",target:"_blank","data-quickpaper-04269db4":""},["布局"]),"(目前布局有两种：",a("a",{class:"link",href:"#/api/calculate?fixed=treeLayout",target:"_blank","data-quickpaper-04269db4":""},["树布局"]),"和",a("a",{class:"link",href:"#/api/calculate?fixed=pieLayout",target:"_blank","data-quickpaper-04269db4":""},["饼布局"]),"，其中树布局初始的时候会获得",a("a",{class:"link",href:"#/api/calculate?fixed=treeLayout-basic",target:"_blank","data-quickpaper-04269db4":""},["基本树"]),"，而为了方便又提供了常见的几种具体的",a("a",{class:"link",href:"#/api/calculate?fixed=treeLayout-config",target:"_blank","data-quickpaper-04269db4":""},["配置树"]),")"]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/calculate?fixed=map",target:"_blank","data-quickpaper-04269db4":""},["地图坐标映射"]),"（根据不同的需求映射算法有很多中，目前提供的映射方法有：",a("a",{class:"link",href:"#/api/calculate?fixed=map-eoap",target:"_blank","data-quickpaper-04269db4":""},["等角斜方位投影"]),"）"])])]),a("li",{"data-quickpaper-04269db4":""},[a("h4",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/tool",target:"_blank","data-quickpaper-04269db4":""},["有用的补充"])]),a("ol",{"data-quickpaper-04269db4":""},[a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/tool?fixed=layer",target:"_blank","data-quickpaper-04269db4":""},["位图图层"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/tool?fixed=animation",target:"_blank","data-quickpaper-04269db4":""},["动画或定时轮询"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/tool?fixed=colors",target:"_blank","data-quickpaper-04269db4":""},["颜色计算相关方法"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/api/tool?fixed=ruler",target:"_blank","data-quickpaper-04269db4":""},["刻度尺辅助计算"])])])]),a("li",{"data-quickpaper-04269db4":""},[a("h4",{"data-quickpaper-04269db4":""},[a("a",{href:"#/QA",target:"_blank","data-quickpaper-04269db4":""},["答疑Q&A"])]),a("ol",{"data-quickpaper-04269db4":""},[a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/QA?fixed=issue11",target:"_blank","data-quickpaper-04269db4":""},["为什么选择canvas作为画布绘图的时候会出现线条模糊？"])])])]),a("li",{"data-quickpaper-04269db4":""},[a("h4",{"data-quickpaper-04269db4":""},["更多"]),a("ol",{"data-quickpaper-04269db4":""},[a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"#/course/author?fixed=join-us",target:"_blank","data-quickpaper-04269db4":""},["加入我们，参与日常维护？"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"https://github.com/hai2007/image2D/blob/master/CHANGELOG",target:"_blank","data-quickpaper-04269db4":""},["查看版本日志"])]),a("li",{"data-quickpaper-04269db4":""},[a("a",{href:"https://github.com/hai2007/image2D/projects/4",target:"_blank","data-quickpaper-04269db4":""},["开发或bug任务清单"])])])])])])])])};e.default=r}}]);