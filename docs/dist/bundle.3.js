(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{29:function(a,d,t){"use strict";var c=t(4),e=t.n(c);d.a=function(a,d){e()("."+a).attr("active","no"),e()("."+a+"."+d).attr("active","yes")}},30:function(a,d,t){"use strict";var c=t(4),e=t.n(c);d.a=function(a,d){d=d||0,a=a||document.documentElement;var t=function(){var a=window.location.href.split("?")[1]||"";if(""==a)return{};var d=a.split("&"),t={};return d.forEach((function(a){var d=a.split("=");t[d[0]]=d[1]})),t}().fixed;if(t){var c=e()("#fixed-"+t);if(c.length>0){var i=c[0].offsetTop-d,r=a.scrollTop||0;e.a.animation((function(d){a.scrollTop=(i-r)*d+r}),500,(function(){a.scrollTop=i}))}}else a.scrollTop=0}},40:function(a,d,t){var c=t(41);"string"==typeof c&&(c=[[a.i,c,""]]),c.locals&&(a.exports=c.locals);(0,t(2).default)("data-icrush-251cadde",c,!0)},41:function(a,d,t){d=a.exports=t(1)(!1);var c=t(6)(t(42));d.push([a.i,".enter_exit{background-image:url("+c+");height:2.2rem;background-repeat:no-repeat;background-position:left center;background-size:auto 100%}\n",""])},42:function(a,d,t){a.exports=t.p+"dist/enter_exit.png"},75:function(a,d,t){"use strict";t.r(d);var c=t(29),e=t(30),i={created:function(){Object(c.a)("menu-2","xhtml")},mounted:function(){prettyPrint(),Object(e.a)()}};t(40);i.render=function(a){return a("div",{class:"api-view","data-icrush-251cadde":""},[a("p",{"data-icrush-251cadde":""},["为了绘图的方便，我们提供了最基本的结点相关操作。因为这些操作是为了绘图而开发的，可能和纯粹的结点操作方法在设计上有所不同，请知悉。"]),a("h2",{id:"fixed-object","data-icrush-251cadde":""},["结点对象"]),a("p",{"data-icrush-251cadde":""},["所有的结点操作都是由结点对象提供的，因此，我们首先来看看如何创建一个结点对象："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["var imageObject=$$(selector[, context]);"])]),a("p",{"data-icrush-251cadde":""},["如上所示，通过执行$$或image2D方法即可获取一个结点对象，我们可以传递二个参数来确定当前结点对象维护的结点是哪些。"]),a("p",{class:"warn","data-icrush-251cadde":""},["结点对象维护了一些结点，调用结点对象上的方法，就是对维护的这些结点进行操作。"]),a("p",{"data-icrush-251cadde":""},["第一个参数selector（称为选择器）是必须的，用以确定当前维护的结点是哪些。"]),a("p",{"data-icrush-251cadde":""},["第二个参数context是可选的，默认选择器在全局查找，你也可以通过传递一个dom结点指定查找上下文（id选择器会忽略此参数直接在全局查找）。"]),a("h4",{id:"fixed-selector","data-icrush-251cadde":""},["选择器"]),a("p",{"data-icrush-251cadde":""},["任何合法的选择器都应该是下列中的某一种："]),a("ul",{"data-icrush-251cadde":""},[a("li",{"data-icrush-251cadde":""},["模板字符串，也就是直接传递html字符串。"]),a("li",{"data-icrush-251cadde":""},["ID选择器，比如“#demo”会选中id是“demo”的第一个标签。"]),a("li",{"data-icrush-251cadde":""},["class和标签选择器，比如“.cls”、“div”、“div.cls”和“g.info.warn”等。"]),a("li",{"data-icrush-251cadde":""},["全部选择器，也就是字符串“*”，会选中全部结点。"]),a("li",{"data-icrush-251cadde":""},["非查询选择器，包括：结点，结点数组和结点对象。这类选择器不会进行查找，直接把传递的结点作为维护结点，因此也会忽略查找上下文。"]),a("li",{"data-icrush-251cadde":""},["筛选函数，传递一个函数，函数形参是当前面对的结点，通过返回true或false来判断是否把当前面对的结点加入结点对象中。"]),a("li",{"data-icrush-251cadde":""},["结点对象元素，比如结点或image2D对象。"]),a("li",{"data-icrush-251cadde":""},["数组，数组的元素是结点对象元素。"])]),a("p",{"data-icrush-251cadde":""},["创建好了结点对象以后，后续依旧可以对维护的结点进行筛选后获取新的结点对象："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["var new_imageObject=imageObject.filter(filterback);"])]),a("p",{"data-icrush-251cadde":""},["返回新的结点对象，不会修改原来的结点对象。其中filterback叫做筛选函数，有二个形参，分别是当前面对结点序号和维护了当前面对结点的结点对象，通过返回true或false来判断是否把当前面对的结点加入新创建的结点对象中。"]),a("p",{class:"warn","data-icrush-251cadde":""},['特别注意：第二个参数context除了可以是dom结点外，还有二个特殊的字符串可以作为参数"html"（或"HTML"）和"svg"（或"SVG"），如果传递这二个字符串中的某个，表示把第一个参数selector作为模板字符串生成新的结点（前者生成html结点，后者生成svg结点）。']),a("h2",{id:"fixed-modify","data-icrush-251cadde":""},["编辑"]),a("p",{"data-icrush-251cadde":""},["把当前维护的结点加到目标结点内部的结尾："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.appendTo(target[, context]);"])]),a("p",{class:"warn","data-icrush-251cadde":""},['target是一个合法的选择器即可，context是一个结点（当然，额外有二个字符串"html"和"svg"可以作为参数，和上面一样），表示目标结点查找上下文，可选，默认全局查找，下同']),a("p",{"data-icrush-251cadde":""},["把当前维护的结点加到目标结点内部的开头："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.prependTo(target[, context]);"])]),a("p",{"data-icrush-251cadde":""},["把当前维护的结点加到目标结点之后："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.afterTo(target[, context]);"])]),a("p",{"data-icrush-251cadde":""},["把当前维护的结点加到目标结点之前："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.beforeTo(target[, context]);"])]),a("p",{"data-icrush-251cadde":""},["从页面中删除当前维护的结点："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.remove();"])]),a("p",{"data-icrush-251cadde":""},["设置或获取结点中的文本："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.text([content]);"])]),a("p",{"data-icrush-251cadde":""},["设置或获取结点中的xhtml字符串模板（相当于innerHTML）："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.html([xhtmlString]);"])]),a("h2",{id:"fixed-calculate","data-icrush-251cadde":""},["计算"]),a("p",{"data-icrush-251cadde":""},["计算结点大小："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.size(type);"])]),a("p",{"data-icrush-251cadde":""},["其中type表示计算的尺寸类型，有如下可选："]),a("ul",{"data-icrush-251cadde":""},[a("li",{"data-icrush-251cadde":""},['"content":包含内容部分的尺寸。']),a("li",{"data-icrush-251cadde":""},['"padding":内容+内边距。']),a("li",{"data-icrush-251cadde":""},['"border":内容+内边距+边框（默认值）。']),a("li",{"data-icrush-251cadde":""},['"scroll":包含滚动的尺寸（不包括border）'])]),a("p",{"data-icrush-251cadde":""},["返回的结果格式为："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["{↵    width:宽,↵    height:高↵}"])]),a("h2",{id:"fixed-attribute","data-icrush-251cadde":""},["样式和属性"]),a("p",{"data-icrush-251cadde":""},["修改或获取结点样式："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.css();"])]),a("p",{"data-icrush-251cadde":""},["通过不同的参数来确定是获取样式还是设置样式，具体有下列参数选项可选："]),a("ul",{"data-icrush-251cadde":""},[a("li",{"data-icrush-251cadde":""},["(key):获取指定样式。"]),a("li",{"data-icrush-251cadde":""},["(key,value):设置指定样式。"]),a("li",{"data-icrush-251cadde":""},["():获取全部样式。"]),a("li",{"data-icrush-251cadde":""},["(json):设置大量样式。"])]),a("p",{"data-icrush-251cadde":""},["设置或获取结点属性："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.attr();"])]),a("p",{"data-icrush-251cadde":""},["和样式css方法类似，也是通过具体参数来确定是获取还是设置样式："]),a("ul",{"data-icrush-251cadde":""},[a("li",{"data-icrush-251cadde":""},["(attr):获取属性。"]),a("li",{"data-icrush-251cadde":""},["(attr,value):设置指定属性值。"]),a("li",{"data-icrush-251cadde":""},["(json):设置大量属性。"])]),a("h2",{id:"fixed-event","data-icrush-251cadde":""},["事件相关"]),a("p",{"data-icrush-251cadde":""},["给维护的结点绑定事件："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.bind(eventType, callback);"])]),a("p",{"data-icrush-251cadde":""},["给维护的结点解除绑定事件："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.unbind(eventType, handler);"])]),a("p",{"data-icrush-251cadde":""},["获取鼠标相对当前维护的元素左上角位置："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.position(event);"])]),a("h4",{"data-icrush-251cadde":""},["静态事件方法"]),a("p",{"data-icrush-251cadde":""},["阻止冒泡"]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["$$.stopPropagation(event);"])]),a("p",{"data-icrush-251cadde":""},["阻止默认事件"]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["$$.preventDefault(event);"])]),a("h2",{id:"fixed-data","data-icrush-251cadde":""},["数据绑定"]),a("p",{"data-icrush-251cadde":""},["绘图就离不开数据，把数据和结点关联起来，会简化结点管理和数据保存问题，这里涉及四个核心方法：data、datum、enter和exit，还有一些相关方法（因为结点对象的各个方法之间不完全是独立的）。"]),a("p",{"data-icrush-251cadde":""},["把数据绑定到一组结点或返回第一个结点数据："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["imageObject.datum();"])]),a("p",{"data-icrush-251cadde":""},["通过具体的参数来判断是获取还是绑定，有下列参数选项可选："]),a("ul",{"data-icrush-251cadde":""},[a("li",{"data-icrush-251cadde":""},["():不带任何参数表示获取数据。"]),a("li",{"data-icrush-251cadde":""},["(data):带一个参数表示设置结点对象维护的全部结点数据为data。"]),a("li",{"data-icrush-251cadde":""},["(data, calcback):和带一个参数类似，只不过绑定的数据是经过calcback函数重新计算后返回的值，该函数有二个形参：data和index。"])]),a("p",{"data-icrush-251cadde":""},["把一组数据绑定到一组结点或返回一组结点数据："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["var update=imageObject.data();"])]),a("p",{"data-icrush-251cadde":""},["和上面的datum方法类似，只不过这是对一组数据进行操作，也就是data变成了数组datas，不再赘述了。"]),a("div",{class:"enter_exit","data-icrush-251cadde":""},[]),a("p",{"data-icrush-251cadde":""},["不过，你可能已经注意到了，data方法因为操作的是数组，数组个数和维护的结点个数不一定一样多，这样就存在平衡问题。"]),a("p",{"data-icrush-251cadde":""},["如上图所示，我们把数据和结点匹配的部分称为update（刚刚好平衡，已经更新好了的意思），数据多于结点的部分称为enter（因为绘图是根据数据来的，数据多了，应该添加结点来维持平衡），结点多于数据的部分称为exit（多余的结点删除即可）"]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["var enter=update.enter(template[, type]);"])]),a("p",{"data-icrush-251cadde":""},["如果数据多于结点，调用enter方法，传递一个参数template（模板字符串）来把多余的数据绑定到新建立的结点上去，后续通过之前的常规结点操作追加到页面的合适位置去即可。"]),a("p",{"data-icrush-251cadde":""},['第二个参数type可选，表示第一个参数生成的结点类型，默认"svg"，表示生成svg结点，或者传递字符串"html"表示生成html结点。']),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["var exit=update.exit();"])]),a("p",{"data-icrush-251cadde":""},["如果结点多于数据，调用exit方法获取多余的结点，然后再调用remove方法删除即可。"]),a("p",{"data-icrush-251cadde":""},["通过上面的四个主要方法，可以把数据和结点绑定起来，接下来需要思考的是如何把数据的绘图方法作用到具体的结点上去："]),a("div",{"ui-copy":"","data-icrush-251cadde":""},[a("pre",{class:"prettyprint","data-icrush-251cadde":""},["// 因为当前有用的结点其实是原来的和追加的，因此需要拼接这两者↵$$([imageObject, enter]).loop(function(data,index,target){↵    // 绘制图像↵    // data是当前结点对象target维护的数据，index是当前结点对象序号↵});"])]),a("p",{"data-icrush-251cadde":""},["loop方法会把传递的绘图方法在当前结点对象维护的每一个结点上应用一次，具体的绘图方法可以根据当前面对的结点绑定的数据来绘制。"])])};d.default=i}}]);