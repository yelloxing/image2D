/*!
* image2D - 🍇 使用ECMAScript绘制二维图片。Drawing Two-Dimensional Pictures Using ECMAScript.
* git+https://github.com/yelloxing/image2D.git
*
* For online documents, please visit
* https://yelloxing.gitee.io/image2d/index.html
*
* author yelloxing
*
* version 1.9.1-beta.0
*
* build Thu Apr 11 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Mon Sep 14 2020 11:39:24 GMT+0800 (GMT+08:00)
*/

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    var toString = Object.prototype.toString;

    /**
     * 获取一个值的类型字符串[object type]
     *
     * @private
     * @param {*} value 需要返回类型的值
     * @returns {string} 返回类型字符串
     */
    function getType(value) {
        if (value == null) {
            return value === undefined ? '[object Undefined]' : '[object Null]';
        }
        return toString.call(value);
    }

    /**
     * 判断一个值是不是一个朴素的'对象'
     *
     * @private
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
     */

    function isPlainObject(value) {
        if (value === null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || getType(value) != '[object Object]') {
            return false;
        }

        // 如果原型为null
        if (Object.getPrototypeOf(value) === null) {
            return true;
        }

        var proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
    }

    /**
     * 判断一个值是不是结点元素。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是结点元素返回true，否则返回false
     */
    function isElement(value) {
        return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
    }

    /**
     * 判断一个值是不是Object。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是Object返回true，否则返回false
     */
    function isObject(value) {
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
        return value != null && (type === 'object' || type === 'function');
    }

    /**
     * 判断一个值是不是Function。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是Function返回true，否则返回false
     */
    function isFunction(value) {
        if (!isObject(value)) {
            return false;
        }

        var type = getType(value);
        return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object Proxy]';
    }

    /**
     * 判断一个值是不是String。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是String返回true，否则返回false
     */
    function isString(value) {
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
        return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
    }

    /**
     * 初始化配置文件
     * @param {Json} init 默认值
     * @param {Json} data
     * @return {Json}
     */
    var initConfig = function initConfig(init, data) {
        for (var key in data) {
            try {
                init[key] = data[key];
            } catch (e) {
                throw new Error("Illegal property value！");
            }
        }return init;
    };

    // 命名空间路径
    var NAMESPACE = {
        "svg": "http://www.w3.org/2000/svg",
        "xhtml": "http://www.w3.org/1999/xhtml",
        "xlink": "http://www.w3.org/1999/xlink",
        "xml": "http://www.w3.org/XML/1998/namespace",
        "xmlns": "http://www.w3.org/2000/xmlns/"
    };

    // 正则表达式
    var REGEXP = {

        // 空白字符:http://www.w3.org/TR/css3-selectors/#whitespace
        "whitespace": "[\\x20\\t\\r\\n\\f]",

        // 空格外的空白字符
        "blank": "[\\n\\f\\r]",

        // 标志符:http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
        "identifier": "(?:\\\\.|[\\w-]|[^\0-\\xa0])+"
    };

    // 记录需要使用xlink命名空间常见的xml属性
    var XLINK_ATTRIBUTE = ["href", "title", "show", "type", "role", "actuate"];

    /**
     * 判断一个值是不是文本结点。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是结点元素返回true，否则返回false
     */
    function isText(value) {
        return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.nodeType === 3 && !isPlainObject(value);
    }

    /**
     * 设置svg字符串
     * @param {dom} target
     * @param {string} svgstring
     */
    var setSVG = function setSVG(target, svgstring) {
        if ('innerHTML' in SVGElement.prototype === false || 'innerHTML' in SVGSVGElement.prototype === false) {

            // 创建一个非svg结点，用例帮助解析
            // 这样比直接解析字符串简单
            var frame = document.createElement("div");
            frame.innerHTML = svgstring;

            var toSvgNode = function toSvgNode(htmlNode) {

                // 创建svg结点，并挂载属性
                var svgNode = document.createElementNS(NAMESPACE.svg, htmlNode.tagName.toLowerCase());
                var attrs = htmlNode.attributes;

                for (var i = 0; attrs && i < attrs.length; i++) {

                    // 是否是特殊属性目前靠手工登记
                    if (XLINK_ATTRIBUTE.indexOf(attrs[i].nodeName) >= 0) {

                        // 针对特殊的svg属性，追加命名空间
                        svgNode.setAttributeNS(NAMESPACE.xlink, 'xlink:' + attrs[i].nodeName, htmlNode.getAttribute(attrs[i].nodeName));
                    } else {
                        svgNode.setAttribute(attrs[i].nodeName, htmlNode.getAttribute(attrs[i].nodeName));
                    }
                }
                return svgNode;
            };

            var rslNode = toSvgNode(frame.firstChild);

            (function toSVG(pnode, svgPnode) {
                var node = pnode.firstChild;

                // 如果是文本结点
                if (isText(node)) {
                    svgPnode.textContent = pnode.innerText;
                    return;
                }

                // 不是文本结点，就拼接
                while (node) {
                    var svgNode = toSvgNode(node);
                    svgPnode.appendChild(svgNode);
                    if (node.firstChild) toSVG(node, svgNode);
                    node = node.nextSibling;
                }
            })(frame.firstChild, rslNode);

            // 拼接
            target.appendChild(rslNode);
        } else {

            // 如果当前浏览器提供了svg类型结点的innerHTML,我们还是使用浏览器提供的
            target.innerHTML = svgstring;
        }
    };

    // 变成指定类型的结点
    // type可以取：
    // 1.'HTML'，html结点
    // 2.'SVG'，svg结点(默认值)
    var toNode = function toNode(template, type) {
        var frame = void 0,
            childNodes = void 0,
            frameTagName = 'div';
        if (type === 'html' || type === 'HTML') {

            // 大部分的标签可以直接使用div作为容器
            // 部分特殊的需要特殊的容器标签

            if (/^<tr[> ]/.test(template)) {

                frameTagName = "tbody";
            } else if (/^<th[> ]/.test(template) || /^<td[> ]/.test(template)) {

                frameTagName = "tr";
            } else if (/^<thead[> ]/.test(template) || /^<tbody[> ]/.test(template)) {

                frameTagName = "table";
            }

            frame = document.createElement(frameTagName);
            frame.innerHTML = template;

            // 比如tr标签，它应该被tbody或thead包含
            // 如果采用别的标签，比如div,这类标签无法生成
            // 为了方便校对，这里给出提示
            if (!/</.test(frame.innerHTML)) {
                throw new Error('This template cannot be generated using div as a container:' + template + "\nPlease contact us: https://github.com/yelloxing/image2D/issues");
            }
        } else {
            frame = document.createElementNS(NAMESPACE.svg, 'svg');
            // 部分浏览器svg元素没有innerHTML
            setSVG(frame, template);
        }
        childNodes = frame.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (isElement(childNodes[i])) return childNodes[i];
        }
    };

    /**
     * 变成结点
     * @param {string} template
     * @param {string} type
     * @return {dom} 返回结点
     */
    function toNode$1(template, type) {

        // 把传递元素类型和标记进行统一处理
        if (new RegExp("^" + REGEXP.identifier + "$").test(template)) template = "<" + template + "></" + template + ">";

        var mark = /^<([^(>| )]+)/.exec(template)[1];

        // 画布canvas特殊知道，一定是html
        if ("canvas" === mark.toLowerCase()) type = 'HTML';

        // 此外，如果没有特殊设定，规定一些标签是html标签
        if (!isString(type) && [

        // 三大display元素
        "div", "span", "p",

        // 小元素
        "em", "i",

        // 关系元素
        "table", "ul", "ol", "dl", "dt", "li", "dd",

        // 表单相关
        "form", "input", "button", "textarea",

        // H5结构元素
        "header", "footer", "article", "section",

        // 标题元素
        "h1", "h2", "h3", "h4", "h5", "h6",

        // 替换元素
        "image", "video", "iframe", "object",

        // 资源元素
        "style", "script", "link",

        // table系列
        "tr", "td", "th", "tbody", "thead"].indexOf(mark.toLowerCase()) >= 0) type = 'HTML';

        return toNode(template, type);
    }

    /**
     * 在指定上下文查找结点
     * @param {string|dom|array|function|image2D} selector 选择器，必输
     * @param {dom|'html'|'svg'} context 查找上下文，或标签类型，必输
     * @return {array|image2D} 结点数组
     *
     * 特别注意：
     *  1.id选择器或者传入的是维护的结点，查找上下文会被忽略
     *  2.如果selector传入的是一个字符串模板，context可选，其表示模板类型
     */
    function sizzle(selector, context) {

        // 如果是字符串
        // context如果是字符串（应该是'html'或'svg'）表示这是生成结点，也走这条路线
        if (isString(context) || isString(selector)) {
            selector = selector.trim().replace(new RegExp(REGEXP.blank, 'g'), '');

            // 如果以'<'开头表示是字符串模板
            if (typeof context == 'string' || /^</.test(selector)) {
                var node = toNode$1(selector, context);
                if (isElement(node)) return [node];else return [];
            }

            // *表示查找全部
            else if (selector === '*') {
                    return context.getElementsByTagName('*');
                }

            var id = selector.match(new RegExp('#' + REGEXP.identifier, 'g'));
            // ID选择器
            // 此选择器会忽略上下文
            if (id) {
                var _node = document.getElementById(id[0].replace('#', ''));
                if (isElement(_node)) return [_node];else return [];
            }

            var cls = selector.match(new RegExp('\\.' + REGEXP.identifier, 'g')),
                tag = selector.match(new RegExp('^' + REGEXP.identifier));

            // 结点和class混合选择器
            if (tag || cls) {
                var allNodes = context.getElementsByTagName(tag ? tag[0] : "*"),
                    temp = [];
                for (var i = 0; i < allNodes.length; i++) {
                    var clazz = " " + allNodes[i].getAttribute('class') + " ",
                        flag = true;
                    for (var j = 0; cls && j < cls.length; j++) {
                        if (!clazz.match(" " + cls[j].replace('.', '') + " ")) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) temp.push(allNodes[i]);
                }
                return temp;
            }

            // 未知情况，报错
            else {
                    throw new Error('Unsupported selector:' + selector);
                }
        }

        // 如果是结点
        else if (isElement(selector)) {
                return [selector];
            }

            // 如果是数组
            // 数组中的内容如果不是结点会直接被忽略
            else if (selector && (selector.constructor === Array || selector.constructor === HTMLCollection || selector.constructor === NodeList)) {
                    var _temp = [];
                    for (var _i = 0; _i < selector.length; _i++) {

                        // 如果是结点
                        if (isElement(selector[_i])) _temp.push(selector[_i]);

                        // 如果是image2D对象
                        else if (selector[_i] && selector[_i].constructor === image2D) {
                                for (var _j = 0; _j < selector[_i].length; _j++) {
                                    _temp.push(selector[_i][_j]);
                                }
                            }
                    }
                    return _temp;
                }

                // 如果是image2D对象
                else if (selector && selector.constructor === image2D) {
                        return selector;
                    }

                    // 如果是函数
                    else if (isFunction(selector)) {
                            var _allNodes = context.getElementsByTagName('*'),
                                _temp2 = [];
                            for (var _i2 = 0; _i2 < _allNodes.length; _i2++) {
                                // 如果选择器函数返回true，表示当前面对的结点被接受
                                if (selector(_allNodes[_i2])) _temp2.push(_allNodes[_i2]);
                            }
                            return _temp2;
                        }

                        // 未知情况，报错
                        else {
                                throw new Error('Unknown selector:' + selector);
                            }
    }

    /**
     * 设计需求是：
     * image2D和image2D(selector[, context])
     * 分别表示绘图类和绘图对象
     *
     * 题外：为什么不选择image2D和new image2D(selector[, context])?
     * 只是感觉没有前面的写法用起来简洁
     *
     * 为了实现需求，第一反应是：
     * let image2D=function(selector,context){
     *      return new image2D();
     * };
     *
     * 在image2D上挂载静态方法，在image2D.prototype上挂载对象方法，
     * 看起来稳的很，其实这明显是一个死循环。
     *
     * 为了解决这个问题，我们在image2D的原型上定义了一个方法：
     * image2D.prototype.init=function(selector,context){
     *      return this;
     * };
     *
     *  执行下面的方法：
     *  let temp=image2D.prototype.init(selector, context);
     *  上面返回的temp很明显就是image2D.prototype，其实就是image2D对象
     * （例如：new A()，其实就是取A.prototype，这样对比就很好理解了）
     *
     * 因此可以改造代码如下：
     *
     * 这样image2D和new image2D(selector[, context])就分别表示类和对象。
     *
     * 问：看起来是不是实现了？
     * 答：是的，实现了。
     * 问：可是总感觉有点不好，说不出为什么。
     * 答：是不是感觉image2D()打印出来的东西有点多？
     * 问：是的。
     *
     * 事实上，因为直接取image2D.prototype作为new image2D(),
     * 理论上说，使用上区别不大，唯一不足的是，
     * 挂载在image2D.prototype上的方法会在打印image2D对象的时候看见，不舒服。
     *
     * 为了看起来好看些，代码再次改造：
     * let image2D = function (selector, context) {
     *      return new image2D.prototype.init(selector, context);
     * };
     *
     * 为了让image2D(selector, context)返回的是image2D对象，需要修改image2D.prototype.init的原型：
     * image2D.prototype.init.prototype = image2D.prototype;
     *
     * 这样：
     *      image2D(selector, context) ==
     *      return new image2D.prototype.init(selector, context) ==
     *      image2D.prototype.init.prototype ==
     *      image2D.prototype ==
     *      new image2D(selector, context)
     *
     * 此时需求就实现了，
     * 而且打印image2D(selector, context)的时候，
     * 对象上的方法都在原型上，看起来就比较舒服了。
     */

    var image2D = function image2D(selector, context) {
        return new image2D.prototype.init(selector, context);
    };

    image2D.prototype.init = function (selector, context) {

        // 如果没有传递，默认使用document作为上下文
        this.context = context = context || document;

        // 使用sizzle获取需要维护的结点，并把结点维护到image2D对象中
        var nodes = sizzle(selector, context),
            flag = void 0;
        for (flag = 0; flag < nodes.length; flag++) {
            this[flag] = nodes[flag];
        }

        // 设置结点个数
        this.length = nodes.length;
        return this;
    };

    // 扩展方法
    // 在image2D和image2D.prototype上分别调用extend方法就可以在类和对象上扩展方法了
    image2D.prototype.extend = image2D.extend = function () {

        var target = arguments[0] || {};
        var source = arguments[1] || {};
        var length = arguments.length;

        /*
         * 确定复制目标和源
         */
        if (length === 1) {
            //如果只有一个参数，目标对象是自己
            source = target;
            target = this;
        }
        if (!isObject(target)) {
            //如果目标不是对象或函数，则初始化为空对象
            target = {};
        }

        /*
         * 复制属性到对象上面
         */
        for (var key in source) {
            try {
                target[key] = source[key];
            } catch (e) {

                // 为什么需要try{}catch(e){}？
                // 一些对象的特殊属性不允许覆盖，比如name
                // 执行：image2D.extend({'name':'新名称'})
                // 会抛出TypeError
                throw new Error("Illegal property key：" + key + "！");
            }
        }

        return target;
    };

    image2D.prototype.init.prototype = image2D.prototype;

    /**
     * 无论绘制的树结构是什么样子的
     * 计算时都假想目标树的样子如下：
     *  1.根结点在最左边，且上下居中
     *  2.树是从左往右生长的结构
     *  3.每个结点都是一块1*1的正方形，top和left分别表示正方形中心的位置
     * @since V0.2.0
     * @public
     */
    function treeLayout(_config) {

        var config = _config || {},

        // 维护的树
        alltreedata = void 0,

        // 根结点ID
        rootid = void 0;

        /**
         * 把内部保存的树结点数据
         * 计算结束后会调用配置的绘图方法
         */
        var update = function update() {

            var beforeDis = [],
                size = 0,
                maxDeep = 0;
            (function positionCalc(pNode, deep) {

                if (deep > maxDeep) maxDeep = deep;
                var flag = void 0;
                for (flag = 0; flag < pNode.children.length; flag++) {
                    // 因为全部的子结点的位置确定了，父结点的y位置就是子结点的中间位置
                    // 因此有子结点的，先计算子结点
                    positionCalc(alltreedata[pNode.children[flag]], deep + 1);
                } // left的位置比较简单，deep从0开始编号
                // 比如deep=0，第一层，left=0+0.5=0.5，也就是根结点
                alltreedata[pNode.id].left = deep + 0.5;
                if (flag == 0) {

                    // beforeDis是一个数组，用以记录每一层此刻top下边缘（每一层是从上到下）
                    // 比如一层的第一个，top值最小可以取top=0.5
                    // 为了方便计算，beforeDis[deep] == undefined的时候表示现在准备计算的是这层的第一个结点
                    // 因此设置最低上边缘为-0.5
                    if (beforeDis[deep] == undefined) beforeDis[deep] = -0.5;
                    // 父边缘同意的进行初始化
                    if (beforeDis[deep - 1] == undefined) beforeDis[deep - 1] = -0.5;

                    // 添加的新结点top值第一种求法：本层上边缘+1（比如上边缘是-0.5，那么top最小是top=-0.5+1=0.5）
                    alltreedata[pNode.id].top = beforeDis[deep] + 1;

                    var pTop = beforeDis[deep] + 1 + (alltreedata[pNode.pid].children.length - 1) * 0.5;
                    // 计算的原则是：如果第一种可行，选择第一种，否则必须选择第二种
                    // 判断第一种是否可行的方法就是：如果第一种计算后确定的孩子上边缘不对导致孩子和孩子的前兄弟重合就是可行的
                    if (pTop - 1 < beforeDis[deep - 1])
                        // 必须保证父亲结点和父亲的前一个兄弟保存1的距离，至少
                        // 添加的新结点top值的第二种求法：根据孩子取孩子结点的中心top
                        alltreedata[pNode.id].top = beforeDis[deep - 1] + 1 - (alltreedata[pNode.pid].children.length - 1) * 0.5;
                } else {

                    // 此刻flag!=0
                    // 意味着结点有孩子，那么问题就解决了，直接取孩子的中间即可
                    // 其实，flag==0的分支计算的就是孩子，是没有孩子的叶结点，那是关键
                    alltreedata[pNode.id].top = (alltreedata[pNode.children[0]].top + alltreedata[pNode.children[flag - 1]].top) * 0.5;
                }

                // 因为计算孩子的时候
                // 无法掌握父辈兄弟的情况
                // 可能会出现父亲和兄弟重叠问题
                if (alltreedata[pNode.id].top <= beforeDis[deep]) {
                    var needUp = beforeDis[deep] + 1 - alltreedata[pNode.id].top;
                    (function doUp(_pid, _deep) {
                        alltreedata[_pid].top += needUp;
                        if (beforeDis[_deep] < alltreedata[_pid].top) beforeDis[_deep] = alltreedata[_pid].top;
                        var _flag = void 0;
                        for (_flag = 0; _flag < alltreedata[_pid].children.length; _flag++) {
                            doUp(alltreedata[_pid].children[_flag], _deep + 1);
                        }
                    })(pNode.id, deep);
                }

                // 计算好一个结点后，需要更新此刻该层的上边缘
                beforeDis[deep] = alltreedata[pNode.id].top;

                // size在每次计算一个结点后更新，是为了最终绘图的时候知道树有多宽（此处应该叫高）
                if (alltreedata[pNode.id].top + 0.5 > size) size = alltreedata[pNode.id].top + 0.5;
            })(alltreedata[rootid], 0);

            // 传递的参数分别表示：记录了位置信息的树结点集合、根结点ID和树的宽
            return {
                "node": alltreedata,
                "root": rootid,
                "size": size,
                "deep": maxDeep + 1
            };
        };

        /**
         * 根据配置的层次关系（配置的id,child,root）把原始数据变成内部结构，方便后期位置计算
         * @param {any} initTree
         *
         * tempTree[id]={
         *  "data":原始数据,
         *  "pid":父亲ID,
         *  "id":唯一标识ID,
         *  "children":[cid1、cid2、...]
         * }
         */
        var toInnerTree = function toInnerTree(initTree) {

            var tempTree = {};
            // 根结点
            var temp = config.root(initTree),
                id = void 0,
                rid = void 0;
            id = rid = config.id(temp);
            tempTree[id] = {
                "data": temp,
                "pid": null,
                "id": id,
                "children": []
            };
            // 根据传递的原始数据，生成内部统一结构
            (function createTree(pdata, pid) {
                var children = config.child(pdata, initTree),
                    flag = void 0;
                for (flag = 0; children && flag < children.length; flag++) {
                    id = config.id(children[flag]);
                    tempTree[pid].children.push(id);
                    tempTree[id] = {
                        "data": children[flag],
                        "pid": pid,
                        "id": id,
                        "children": []
                    };
                    createTree(children[flag], id);
                }
            })(temp, id);

            return [rid, tempTree];
        };

        // 可以传递任意格式的树原始数据
        // 只要配置对应的解析方法即可
        var tree = function tree(initTree) {

            var treeData = toInnerTree(initTree);
            alltreedata = treeData[1];
            rootid = treeData[0];
            return update();
        };

        // 获取根结点的方法:root(initTree)
        tree.root = function (rootback) {
            config.root = rootback;
            return tree;
        };

        // 获取子结点的方法:child(parentTree,initTree)
        tree.child = function (childback) {
            config.child = childback;
            return tree;
        };

        // 获取结点ID方法:id(treedata)
        tree.id = function (idback) {
            config.id = idback;
            return tree;
        };

        return tree;
    }

    /**
     * 点（x,y）围绕中心（cx,cy）旋转deg度
     */
    var _rotate2 = function _rotate2(cx, cy, deg, x, y) {
        var cos = Math.cos(deg),
            sin = Math.sin(deg);
        return [+((x - cx) * cos - (y - cy) * sin + cx).toFixed(7), +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)];
    };

    /**
     * 点（x,y）沿着向量（ax,ay）方向移动距离d
     */
    var _move2 = function _move2(ax, ay, d, x, y) {
        var sqrt = Math.sqrt(ax * ax + ay * ay);
        return [+(ax * d / sqrt + x).toFixed(7), +(ay * d / sqrt + y).toFixed(7)];
    };

    /**
     * 点（x,y）围绕中心（cx,cy）缩放times倍
     */
    var _scale2 = function _scale2(cx, cy, times, x, y) {
        return [+(times * (x - cx) + cx).toFixed(7), +(times * (y - cy) + cy).toFixed(7)];
    };

    var dot = function dot(config) {

        config = initConfig({
            // 前进方向
            d: [1, 1],
            // 中心坐标
            c: [0, 0],
            // 当前位置
            p: [0, 0]
        }, config);

        var dotObj = {

            // 前进方向以当前位置为中心，旋转deg度
            "rotate": function rotate(deg) {
                var dPx = config.d[0] + config.p[0],
                    dPy = config.d[1] + config.p[1];
                var dP = _rotate2(config.p[0], config.p[1], deg, dPx, dPy);
                config.d = [dP[0] - config.p[0], dP[1] - config.p[1]];
                return dotObj;
            },

            // 沿着当前前进方向前进d
            "move": function move(d) {
                config.p = _move2(config.d[0], config.d[1], d, config.p[0], config.p[1]);
                return dotObj;
            },

            // 围绕中心坐标缩放
            "scale": function scale(times) {
                config.p = _scale2(config.c[0], config.c[1], times, config.p[0], config.p[1]);
                return dotObj;
            },

            // 当前位置
            "value": function value() {
                return config.p;
            }

        };

        return dotObj;
    };

    function treeLayout$1(config) {

        config = initConfig({

            // 类型：如果不是下面五种之一，就认为是原始类型
            // type:LR|RL|BT|TB|circle

            // 如果类型是LR|RL|BT|TB需要设置如下参数
            // width,height:宽和高

            // 如果类型是circle需要设置如下参数
            // 1.cx,cy：圆心；2.radius:半径；3.begin-deg,deg：开始和跨越弧度（可选）
            "begin-deg": 0,
            "deg": Math.PI * 2

        }, config);

        var treeCalc = treeLayout()
        // 配置数据格式
        .root(config.root).child(config.child).id(config.id);

        var treeObj = function treeObj(initData) {

            // 计算初始坐标
            var orgData = treeCalc(initData);

            // 计算deep
            for (var key in orgData.node) {
                orgData.node[key].deep = orgData.node[key].left - 0.5;
            }

            if (config.type === 'LR' || config.type === 'RL') {

                // 每层间隔
                var dis1 = config.width / orgData.deep;
                if ("RL" === config.type) dis1 *= -1;
                // 兄弟间隔
                var dis2 = config.height / (orgData.size - -0.5);
                for (var i in orgData.node) {
                    var node = orgData.node[i];
                    orgData.node[i].left = +(("RL" == config.type ? config.width : 0) - -node.left * dis1).toFixed(7);
                    orgData.node[i].top = +(node.top * dis2).toFixed(7);
                }
            } else if (config.type === 'TB' || config.type === 'BT') {

                // 每层间隔
                var _dis = config.height / orgData.deep;
                if ("BT" == config.type) _dis *= -1;
                // 兄弟间隔
                var _dis2 = config.width / (orgData.size - -0.5);
                var _left = void 0,
                    _top = void 0;
                for (var _i3 in orgData.node) {
                    var _node2 = orgData.node[_i3];
                    _left = _node2.left;
                    _top = _node2.top;
                    orgData.node[_i3].top = +(("BT" == config.type ? config.height : 0) - -_left * _dis).toFixed(7);
                    orgData.node[_i3].left = +(_top * _dis2).toFixed(7);
                }
            } else if (config.type === 'circle') {

                // 每层间距
                var _dis3 = config.radius / (orgData.deep - 1);
                // 兄弟间隔弧度
                var _dis4 = config.deg / (orgData.size - -0.5);
                for (var _i4 in orgData.node) {
                    var _node3 = orgData.node[_i4];
                    orgData.node[_i4].deg = (config['begin-deg'] - -_dis4 * _node3.top) % (Math.PI * 2);
                    var pos = _rotate2(config.cx, config.cy, orgData.node[_i4].deg, config.cx - -_dis3 * (_node3.left - 0.5), config.cy);
                    orgData.node[_i4].left = +pos[0];
                    orgData.node[_i4].top = +pos[1];
                }
            }

            // 启动绘图
            config.drawer(orgData);

            return treeObj;
        };

        // 配置
        treeObj.config = function (_config) {
            config = initConfig(config, _config);
            return treeObj;
        };

        // 设置绘图方法
        treeObj.drawer = function (drawerback) {
            config.drawer = drawerback;
            return treeObj;
        };

        return treeObj;
    }

    /**
     * 判断一个值是不是number。
     *
     * @since V0.1.3
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是number返回true，否则返回false
     */
    function isNumber(value) {
        return typeof value === 'number' || value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && getType(value) === '[object Number]';
    }

    function pieLayout(config) {

        config = initConfig({

            // 饼图的开始和跨域角度[可选]
            "begin-deg": -Math.PI / 2,
            "deg": Math.PI * 2,

            // 饼图中一个瓣的中心参考半径，可以有多个[可选]
            "radius": []
            // "cx": "",
            // "cy": "",

            // 设置数据结构[必选]
            // "value": function (data, key, index) { }

        }, config);

        if (!isFunction(config.value)) {
            throw new Error('config.value must be a function!');
        }

        var pieObj = function pieObj(initData) {

            var i = 0,
                innerData = [],
                allData = 0;
            for (var key in initData) {
                innerData.push({
                    "value": config.value(initData[key], key, i),
                    "data": initData[key],
                    "key": key,
                    "index": i,
                    "dots": []
                });
                allData += innerData[i].value;
                i += 1;
            }

            for (i = 0; i < innerData.length; i++) {

                // 起始弧度
                innerData[i].beginDeg = i === 0 ? config['begin-deg'] : innerData[i - 1].beginDeg + innerData[i - 1].deg;

                // 百分比
                var percent = innerData[i].value / allData;

                // 跨越弧度
                innerData[i].deg = percent * config.deg;

                innerData[i].percent = new Number(percent * 100).toFixed(2);
            }

            // 中心点（用于辅助绘制折线）
            if (isNumber(config.cx) && isNumber(config.cy)) {
                for (i = 0; i < config.radius.length; i++) {

                    for (var j = 0; j < innerData.length; j++) {
                        innerData[j].dots.push(_rotate2(config.cx, config.cy, innerData[j].beginDeg + innerData[j].deg * 0.5, config.cx + config.radius[i], config.cy));
                    }
                }
            }

            // 启动绘图
            if (isFunction(config.drawer)) {
                config.drawer(innerData);
            }
        };

        // 配置
        pieObj.config = function (_config) {
            config = initConfig(config, _config);
            return pieObj;
        };

        // 设置绘图方法
        pieObj.drawer = function (drawerback) {
            config.drawer = drawerback;
            return pieObj;
        };

        return pieObj;
    }

    /**
     * 在(a,b,c)方向位移d
     * @private
     */
    function _move(d, a, b, c) {
        c = c || 0;
        var sqrt = Math.sqrt(a * a + b * b + c * c);
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a * d / sqrt, b * d / sqrt, c * d / sqrt, 1];
    }

    /**
     * 围绕0Z轴旋转
     * 其它的旋转可以借助transform实现
     * 旋转角度单位采用弧度制
     * 
     * @private
     */
    function _rotate(deg) {
        var sin = Math.sin(deg),
            cos = Math.cos(deg);
        return [cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }

    /**
     * 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
     * 
     * @private
     */
    function _scale(xTimes, yTimes, zTimes, cx, cy, cz) {
        cx = cx || 0;cy = cy || 0;cz = cz || 0;
        return [xTimes, 0, 0, 0, 0, yTimes, 0, 0, 0, 0, zTimes, 0, cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1];
    }

    /**
     * 针对任意射线(a1,b1,c1)->(a2,b2,c2)
     * 计算出二个变换矩阵
     * 分别为：任意射线变成OZ轴变换矩阵 + OZ轴变回原来的射线的变换矩阵
     * 
     * @private
     */
    function _transform(a1, b1, c1, a2, b2, c2) {

        if (typeof a1 === 'number' && typeof b1 === 'number') {

            // 如果设置二个点
            // 表示二维上围绕某个点旋转
            if (typeof c1 !== 'number') {
                c1 = 0;a2 = a1;b2 = b1;c2 = 1;
            }
            // 只设置三个点(设置不足六个点都认为只设置了三个点)
            // 表示围绕从原点出发的射线旋转
            else if (typeof a2 !== 'number' || typeof b2 !== 'number' || typeof c2 !== 'number') {
                    a2 = a1;b2 = b1;c2 = c1;a1 = 0;b1 = 0;c1 = 0;
                }

            if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error('It\'s not a legitimate ray!');

            var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
                cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
                sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,
                b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
                c = c2 - c1,
                sqrt2 = Math.sqrt(b * b + c * c),
                cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
                sin2 = sqrt2 != 0 ? b / sqrt2 : 0;

            return [

            // 任意射线变成OZ轴变换矩阵
            [cos1, cos2 * sin1, sin1 * sin2, 0, -sin1, cos1 * cos2, cos1 * sin2, 0, 0, -sin2, cos2, 0, b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1],

            // OZ轴变回原来的射线的变换矩阵
            [cos1, -sin1, 0, 0, cos2 * sin1, cos2 * cos1, -sin2, 0, sin1 * sin2, cos1 * sin2, cos2, 0, a1, b1, c1, 1]];
        } else {
            throw new Error('a1 and b1 is required!');
        }
    }

    // 二个4x4矩阵相乘
    // 或矩阵和齐次坐标相乘
    var _multiply = function _multiply(matrix4, param) {
        var newParam = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < param.length / 4; j++) {
                newParam[j * 4 + i] = matrix4[i] * param[j * 4] + matrix4[i + 4] * param[j * 4 + 1] + matrix4[i + 8] * param[j * 4 + 2] + matrix4[i + 12] * param[j * 4 + 3];
            }
        }return newParam;
    };

    /**
     * 4x4矩阵
     * 列主序存储
     * @since V0.2.0
     * @public
     */
    function Matrix4(initMatrix4) {

        var matrix4 = initMatrix4 || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

        var matrix4Obj = {

            // 移动
            "move": function move(dis, a, b, c) {
                matrix4 = _multiply(_move(dis, a, b, c), matrix4);
                return matrix4Obj;
            },

            // 旋转
            "rotate": function rotate(deg, a1, b1, c1, a2, b2, c2) {
                var matrix4s = _transform(a1, b1, c1, a2, b2, c2);
                matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
                return matrix4Obj;
            },

            // 缩放
            "scale": function scale(xTimes, yTimes, zTimes, cx, cy, cz) {
                matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
                return matrix4Obj;
            },

            // 乘法
            // 可以传入一个矩阵(matrix4,flag)
            "multiply": function multiply(newMatrix4, flag) {
                matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
                return matrix4Obj;
            },

            // 对一个坐标应用变换
            // 齐次坐标(x,y,z,w)
            "use": function use(x, y, z, w) {
                // w为0表示点位于无穷远处，忽略
                z = z || 0;w = w || 1;
                var temp = _multiply(matrix4, [x, y, z, w]);
                temp[0] = +temp[0].toFixed(7);
                temp[1] = +temp[1].toFixed(7);
                temp[2] = +temp[2].toFixed(7);
                temp[3] = +temp[3].toFixed(7);
                return temp;
            },

            // 矩阵的值
            "value": function value() {
                return matrix4;
            }

        };

        return matrix4Obj;
    }

    //当前正在运动的动画的tick函数堆栈
    var $timers = [];
    //唯一定时器的定时间隔
    var $interval = 13;
    //指定了动画时长duration默认值
    var $speeds = 400;
    //定时器ID
    var $timerId = null;

    /**
     * 动画轮播
     * @since V0.2.0
     * @public
     * @param {function} doback 轮询函数，有一个形参deep，0-1，表示执行进度
     * @param {number} duration 动画时长，可选
     * @param {function} callback 动画结束回调，可选，有一个形参deep，0-1，表示执行进度
     *
     * @returns {function} 返回一个函数，调用该函数，可以提前结束动画
     */
    function animation(doback, duration, callback) {

        var clock = {
            //把tick函数推入堆栈
            "timer": function timer(tick, duration, callback) {
                if (!tick) {
                    throw new Error('Tick is required!');
                }
                duration = duration || $speeds;
                var id = new Date().valueOf() + "_" + (Math.random() * 1000).toFixed(0);
                $timers.push({
                    "id": id,
                    "createTime": new Date(),
                    "tick": tick,
                    "duration": duration,
                    "callback": callback
                });
                clock.start();
                return id;
            },

            //开启唯一的定时器timerId
            "start": function start() {
                if (!$timerId) {
                    $timerId = setInterval(clock.tick, $interval);
                }
            },

            //被定时器调用，遍历timers堆栈
            "tick": function tick() {
                var createTime = void 0,
                    flag = void 0,
                    tick = void 0,
                    callback = void 0,
                    timer = void 0,
                    duration = void 0,
                    passTime = void 0,
                    timers = $timers;
                $timers = [];
                $timers.length = 0;
                for (flag = 0; flag < timers.length; flag++) {
                    //初始化数据
                    timer = timers[flag];
                    createTime = timer.createTime;
                    tick = timer.tick;
                    duration = timer.duration;
                    callback = timer.callback;

                    //执行
                    passTime = (+new Date() - createTime) / duration;
                    passTime = passTime > 1 ? 1 : passTime;
                    tick(passTime);
                    if (passTime < 1 && timer.id) {
                        //动画没有结束再添加
                        $timers.push(timer);
                    } else if (callback) {
                        callback(passTime);
                    }
                }
                if ($timers.length <= 0) {
                    clock.stop();
                }
            },

            //停止定时器，重置timerId=null
            "stop": function stop() {
                if ($timerId) {
                    clearInterval($timerId);
                    $timerId = null;
                }
            }
        };

        var id = clock.timer(function (deep) {
            //其中deep为0-1，表示改变的程度
            doback(deep);
        }, duration, callback);

        // 返回一个函数
        // 用于在动画结束前结束动画
        return function () {
            var i = void 0;
            for (i in $timers) {
                if ($timers[i].id == id) {
                    $timers[i].id = undefined;
                    return;
                }
            }
        };
    }

    var MAX_SAFE_INTEGER = 9007199254740991;

    /**
     * 判断是不是一个可以作为长度的整数（比如数组下标）
     *
     * @private
     * @param {any} value 需要判断的值
     * @returns {boolean} 如果是返回true，否则返回false
     */

    function isLength(value) {

        return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * 判断是不是一个类似数组的对象，是否可以通过length迭代
     *
     *
     * @private
     * @param {any} value 需要判断的值
     * @returns {boolean} 如果是返回true，否则返回false
     */

    function isArrayLike(value) {

        return value != null && typeof value != 'function' && isLength(value.length);
    }

    /**
     * 和isArrayLike类似，不过特别排除以下类型：
     *  1.字符串
     *
     * @private
     * @param {any} value 需要判断的值
     * @returns {boolean} 如果是返回true，否则返回false
     */

    function isArraySpec(value) {

        return isArrayLike(value) && !isString(value);
    }

    /**
     * 判断一个值是不是数组。
     *
     * @since V0.3.1
     * @public
     * @param {*} value 需要判断类型的值
     * @param {boolean} notStrict 是否不严格检查类型（默认false，如果为true表示判断是不是一个类似数组的类型）
     * @returns {boolean} 如果是数组返回true，否则返回false
     */
    function isArray(value, notStrict) {
        if (notStrict) {
            return isArraySpec(value);
        }
        return Array.isArray(value);
    }

    /**
     * 初始化配置文件
     * 
     * @private
     * @param {Json} init 默认值
     * @param {Json} data
     * @return {Json}
     */
    function initConfig$1(init, data) {
        for (var key in data) {
            try {
                init[key] = data[key];
            } catch (e) {
                throw new Error("Illegal property value！");
            }
        }return init;
    }

    /**
     * Hermite三次插值
     * @since V0.2.0
     * @public
     * @param {Json} config 可选
     */
    function hermite(config) {

        config = initConfig$1({
            // 张弛系数
            "u": 0.5
        }, config);

        var MR = void 0,
            a = void 0,
            b = void 0;

        /**
         * 根据x值返回y值
         * @param {Number} x
         */
        var hermite = function hermite(x) {
            if (MR) {
                var sx = (x - a) / (b - a),
                    sx2 = sx * sx,
                    sx3 = sx * sx2;
                var sResult = sx3 * MR[0] + sx2 * MR[1] + sx * MR[2] + MR[3];
                return sResult * (b - a);
            } else throw new Error('You shoud first set the position!');
        };

        /**
         * 设置点的位置
         * @param {Number} x1 左边点的位置
         * @param {Number} y1
         * @param {Number} x2 右边点的位置
         * @param {Number} y2
         * @param {Number} s1 二个点的斜率
         * @param {Number} s2
         */
        hermite.setP = function (x1, y1, x2, y2, s1, s2) {
            if (x1 < x2) {
                // 记录原始尺寸
                a = x1;b = x2;
                var p3 = config.u * s1,
                    p4 = config.u * s2;
                // 缩放到[0,1]定义域
                y1 /= x2 - x1;
                y2 /= x2 - x1;
                // MR是提前计算好的多项式通解矩阵
                // 为了加速计算
                // 如上面说的
                // 统一在[0,1]上计算后再通过缩放和移动恢复
                // 避免了动态求解矩阵的麻烦
                MR = [2 * y1 - 2 * y2 + p3 + p4, 3 * y2 - 3 * y1 - 2 * p3 - p4, p3, y1];
            } else throw new Error('The point x-position should be increamented!');
            return hermite;
        };

        return hermite;
    }

    /**
     * 轮询动画
     * @param {function} doback 轮询触发方法
     * @param {number} time 动画时长，可选
     * @param {function} callback 动画结束回调，可选
     * @param {array|string} timing 动画进度控制参数，可选
     *
     * @return {function} stop函数，可以提前停止动画
     */
    function animation$1(doback, time, callback, timing) {

        if (!isFunction(callback)) {
            timing = callback;
            callback = false;
        }

        // 获取插值计算参数
        var transition_timing = {
            "ease": [0.25, 0.1, 0.5, 1],
            "ease-in": [0.5, 0.0, 0.75, 0.6],
            "ease-in-out": [0.43, 0.01, 0.58, 1],
            "ease-out": [0.25, 0.6, 0.5, 1],
            "linear": "default"
        }[timing] || timing;

        var transition_timing_function = function transition_timing_function(deep) {
            return deep;
        };
        if (transition_timing && isArray(transition_timing) && transition_timing.length == 4) {
            transition_timing_function = hermite({
                "u": 1
            }).setP(0, 0, 1, 1, transition_timing[1] / transition_timing[0], (1 - transition_timing[3]) / (1 - transition_timing[2]));
        }

        return animation(function (deep) {
            doback(transition_timing_function(deep));
        }, time, function (deep) {
            if (isFunction(callback)) {
                if (deep != 1) deep = transition_timing_function(deep);
                callback(deep);
            }
        });
    }

    /**
     * Cardinal三次插值
     * ----------------------------
     * Hermite拟合的计算是，确定二个点和二个点的斜率
     * 用一个y=ax(3)+bx(2)+cx+d的三次多项式来求解
     * 而Cardinal是建立在此基础上
     * 给定需要拟合的二个点和第一个点的前一个点+最后一个点的后一个点
     * 第一个点的斜率由第一个点的前一个点和第二个点的斜率确定
     * 第二个点的斜率由第一个点和第二个点的后一个点的斜率确定
     */

    function cardinal(config) {

        config = initConfig({
            // 该参数用于调整曲线走势，默认数值t=0，分水岭t=-1，|t-(-1)|的值越大，曲线走势调整的越严重
            "t": 0
        }, config);

        var HS = void 0,
            i = void 0;

        // 根据x值返回y值
        var cardinal = function cardinal(x) {

            if (HS) {
                i = -1;
                // 寻找记录x实在位置的区间
                // 这里就是寻找对应的拟合函数
                while (i + 1 < HS.x.length && (x > HS.x[i + 1] || i == -1 && x >= HS.x[i + 1])) {
                    i += 1;
                }
                if (i == -1 || i >= HS.h.length) throw new Error('Coordinate crossing!');
                return HS.h[i](x);
            } else {
                throw new Error('You shoud first set the position!');
            }
        };

        // 设置张弛系数【应该在点的位置设置前设置】
        cardinal.setT = function (t) {

            if (typeof t === 'number') {
                config.t = t;
            } else {
                throw new Error('Expecting a figure!');
            }
            return cardinal;
        };

        // 设置点的位置
        // 参数格式：[[x,y],[x,y],...]
        // 至少二个点
        cardinal.setP = function (points) {

            HS = {
                "x": [],
                "h": []
            };
            var flag = void 0,
                slope = (points[1][1] - points[0][1]) / (points[1][0] - points[0][0]),
                temp = void 0;
            HS.x[0] = points[0][0];
            for (flag = 1; flag < points.length; flag++) {
                if (points[flag][0] <= points[flag - 1][0]) throw new Error('The point position should be increamented!');
                HS.x[flag] = points[flag][0];
                // 求点斜率
                temp = flag < points.length - 1 ? (points[flag + 1][1] - points[flag - 1][1]) / (points[flag + 1][0] - points[flag - 1][0]) : (points[flag][1] - points[flag - 1][1]) / (points[flag][0] - points[flag - 1][0]);
                // 求解二个点直接的拟合方程
                // 第一个点的前一个点直接取第一个点
                // 最后一个点的后一个点直接取最后一个点
                HS.h[flag - 1] = hermite({
                    "u": (1 - config.t) * 0.5
                }).setP(points[flag - 1][0], points[flag - 1][1], points[flag][0], points[flag][1], slope, temp);
                slope = temp;
            }
            return cardinal;
        };

        return cardinal;
    }

    /**
     * 返回渲染后的CSS样式值
     * @param {DOM} dom 目标结点
     * @param {String} name 属性名称（可选）
     * @return {String}
     */
    function getStyle(dom, name) {

        // 获取结点的全部样式
        var allStyle = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(dom, null) : dom.currentStyle;

        // 如果没有指定属性名称，返回全部样式
        return isString(name) ? allStyle.getPropertyValue(name) : allStyle;
    }

    // 把颜色统一转变成rgba(x,x,x,x)格式
    // 返回数字数组[r,g,b,a]
    var formatColor = function formatColor(color) {
        var colorNode = document.getElementsByTagName('head')[0];
        colorNode.style['color'] = color;
        var rgba = getStyle(colorNode, 'color');
        var rgbaArray = rgba.replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,' + REGEXP.whitespace));
        return [+rgbaArray[0], +rgbaArray[1], +rgbaArray[2], rgbaArray[3] == undefined ? 1 : +rgbaArray[3]];
    };

    // 获取一组随机色彩
    var getRandomColors = function getRandomColors(num) {
        var temp = [];
        for (var flag = 1; flag <= num; flag++) {
            temp.push('rgb(' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ')');
        }
        return temp;
    };

    /**
     * 绑定事件
     * @param {string} eventType
     * @param {function} callback
     */
    var bind = function bind(eventType, callback) {

        if (window.attachEvent) {
            for (var flag = 0; flag < this.length; flag++) {
                this[flag].attachEvent("on" + eventType, callback);
            } // 后绑定的先执行
        } else {
            for (var _flag2 = 0; _flag2 < this.length; _flag2++) {
                this[_flag2].addEventListener(eventType, callback, false);
            } // 捕获
        }

        return this;
    };

    /**
     * 解除绑定事件
     * @param {string} eventType
     * @param {function} handler
     */
    var unbind = function unbind(eventType, handler) {

        if (window.detachEvent) {
            for (var flag = 0; flag < this.length; flag++) {
                this[flag].detachEvent("on" + eventType, handler);
            }
        } else {
            for (var _flag3 = 0; _flag3 < this.length; _flag3++) {
                this[_flag3].removeEventListener(eventType, handler, false);
            }
        }

        return this;
    };

    /**
     * 获取鼠标相对特定元素左上角位置
     * @param {Event} event
     */
    var position = function position(event) {

        // 返回元素的大小及其相对于视口的位置
        var bounding = this[0].getBoundingClientRect();

        if (!event || !event.clientX) throw new Error('Event is necessary!');
        return {

            // 鼠标相对元素位置 = 鼠标相对窗口坐标 - 元素相对窗口坐标
            "x": event.clientX - bounding.left,
            "y": event.clientY - bounding.top
        };
    };

    /**
     * 阻止冒泡
     * @param {Event} event 
     */
    var stopPropagation = function stopPropagation(event) {
        event = event || window.event;
        if (event.stopPropagation) {
            //这是其他非IE浏览器
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
        return this;
    };

    /**
     * 阻止默认事件
     * @param {Event} event 
     */
    var preventDefault = function preventDefault(event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
        return this;
    };

    /* 等角斜方位投影 */

    var
    // 围绕X轴旋转
    _rotateX = function _rotateX(deg, x, y, z) {
        var cos = Math.cos(deg),
            sin = Math.sin(deg);
        return [x, y * cos - z * sin, y * sin + z * cos];
    },

    // 围绕Y轴旋转
    _rotateY = function _rotateY(deg, x, y, z) {
        var cos = Math.cos(deg),
            sin = Math.sin(deg);
        return [z * sin + x * cos, y, z * cos - x * sin];
    },

    // 围绕Z轴旋转
    _rotateZ = function _rotateZ(deg, x, y, z) {
        var cos = Math.cos(deg),
            sin = Math.sin(deg);
        return [x * cos - y * sin, x * sin + y * cos, z];
    };

    var p = [];

    function eoap(config, longitude, latitude) {
        /**
         * 通过旋转的方法
         * 先旋转出点的位置
         * 然后根据把地心到旋转中心的这条射线变成OZ这条射线的变换应用到初始化点上
         * 这样求的的点的x,y就是最终结果
         *
         *  计算过程：
         *  1.初始化点的位置是p（x,0,0）,其中x的值是地球半径除以缩放倍速
         *  2.根据点的纬度对p进行旋转，旋转后得到的p的坐标纬度就是目标纬度
         *  3.同样的对此刻的p进行经度的旋转，这样就获取了极点作为中心点的坐标
         *  4.接着想象一下为了让旋转中心移动到极点需要进行旋转的经纬度是多少，记为lo和la
         *  5.然后再对p进行经度度旋转lo获得新的p
         *  6.然后再对p进行纬度旋转la获得新的p
         *  7.旋转结束
         *
         * 特别注意：第5和第6步顺序一定不可以调换，原因来自经纬度定义上
         * 【除了经度为0的位置，不然纬度的旋转会改变原来的经度值，反过来不会】
         *
         */
        p = _rotateY((360 - latitude) / 180 * Math.PI, 100 * config.scale, 0, 0);
        p = _rotateZ(longitude / 180 * Math.PI, p[0], p[1], p[2]);
        p = _rotateZ((90 - config.center[0]) / 180 * Math.PI, p[0], p[1], p[2]);
        p = _rotateX((90 - config.center[1]) / 180 * Math.PI, p[0], p[1], p[2]);

        return [-p[0], //加-号是因为浏览器坐标和地图不一样
        p[1], p[2]];
    }

    function map(_config) {

        var config = initConfig({

            // 默认使用「等角斜方位投影」
            type: 'eoap',

            // 缩放比例
            scale: 1,

            // 投影中心经纬度
            center: [107, 36]

        }, _config);

        var map = function map(longitude, latitude) {

            switch (config.type) {
                case 'eoap':
                    {
                        return eoap(config, longitude, latitude);
                    }
                default:
                    {
                        throw new Error('Map type configuration error!');
                    }
            }
        };

        // 修改配置
        map.config = function (_config) {
            config = initConfig(config, _config);
            return map;
        };

        return map;
    }

    /**
     * 把当前维护的结点加到目标结点内部的结尾
     * @param {selector} target
     * @return {image2D}
     */
    var appendTo = function appendTo(target, context) {
        var nodes = sizzle(target, context || document);
        if (nodes.length > 0) {
            for (var i = 0; i < this.length; i++) {
                nodes[0].appendChild(this[i]);
            }
        } else {
            throw new Error('Target empty!');
        }
        return this;
    };

    /**
     * 把当前维护的结点加到目标结点内部的开头
     * @param {selector} target
     * @return {image2D}
     */
    var prependTo = function prependTo(target, context) {
        var nodes = sizzle(target, context || document);
        if (nodes.length > 0) {
            for (var i = 0; i < this.length; i++) {
                nodes[0].insertBefore(this[i], nodes[0].childNodes[0]);
            }
        } else {
            throw new Error('Target empty!');
        }
        return this;
    };

    /**
     * 把当前维护的结点加到目标结点之后
     * @param {selector} target
     * @return {image2D}
     */
    var afterTo = function afterTo(target, context) {
        var nodes = sizzle(target, context || document);
        if (nodes.length > 0) {
            for (var i = 0; i < this.length; i++) {
                //如果第二个参数undefined,在结尾追加，目的一样达到
                nodes[0].parentNode.insertBefore(this[i], nodes[0].nextSibling);
            }
        } else {
            throw new Error('Target empty!');
        }
        return this;
    };

    /**
     * 把当前维护的结点加到目标结点之前
     * @param {selector} target
     * @return {image2D}
     */
    var beforeTo = function beforeTo(target, context) {
        var nodes = sizzle(target, context || document);
        if (nodes.length > 0) {
            for (var i = 0; i < this.length; i++) {
                nodes[0].parentNode.insertBefore(this[i], nodes[0]);
            }
        } else {
            throw new Error('Target empty!');
        }
        return this;
    };

    // 删除当前维护的结点
    var remove = function remove() {
        for (var i = 0; i < this.length; i++) {
            this[i].parentNode.removeChild(this[i]);
        }return this;
    };

    // 筛选当前结点
    var filter = function filter(filterback) {
        var temp = [];
        for (var i = 0; i < this.length; i++) {
            if (filterback(i, image2D(this[i]))) temp.push(this[i]);
        }
        return image2D(temp);
    };

    // 修改文本或获取结点文本
    var text = function text(content) {
        if (arguments.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].textContent = content;
            }return this;
        }
        if (this.length <= 0) throw new Error('Target empty!');
        return this[0].textContent;
    };

    // 设置或获取结点中的xhtml字符串模板（相当于innerHTML）
    var html = function html(xhtmlString) {
        if (arguments.length > 0) {
            for (var i = 0; i < this.length; i++) {

                // 如果是SVG标签
                if (/[a-z]/.test(this[i].tagName)) {
                    setSVG(this[i], xhtmlString);
                }

                // 否则是普通html标签
                else {
                        this[i].innerHTML = xhtmlString;
                    }
            }
            return this;
        }
        if (this.length <= 0) throw new Error('Target empty!');
        return this[0].innerHTML;
    };

    // 获取元素大小
    var size = function size(type) {
        if (this.length <= 0) throw new Error('Target empty!');

        var elemHeight = void 0,
            elemWidth = void 0,
            dom = this[0];

        if (type == 'content') {
            //内容
            elemWidth = dom.clientWidth - (getStyle(dom, 'padding-left') + "").replace('px', '') - (getStyle(dom, 'padding-right') + "").replace('px', '');
            elemHeight = dom.clientHeight - (getStyle(dom, 'padding-top') + "").replace('px', '') - (getStyle(dom, 'padding-bottom') + "").replace('px', '');
        } else if (type == 'padding') {
            //内容+内边距
            elemWidth = dom.clientWidth;
            elemHeight = dom.clientHeight;
        } else if (type == 'border') {
            //内容+内边距+边框
            elemWidth = dom.offsetWidth;
            elemHeight = dom.offsetHeight;
        } else if (type == 'scroll') {
            //包含滚动的尺寸（不包括border）
            elemWidth = dom.scrollWidth;
            elemHeight = dom.scrollHeight;
        } else {
            elemWidth = dom.offsetWidth;
            elemHeight = dom.offsetHeight;
        }
        return {
            width: elemWidth,
            height: elemHeight
        };
    };

    /**
     * 设置或获取样式
     * @arguments(key):获取指定样式
     * @arguments(key,value):设置指定样式
     * @arguments():获取全部样式
     * @arguments(json):设置大量样式
     */
    function style() {

        // 获取样式
        if (arguments.length <= 1 && (arguments.length <= 0 || _typeof(arguments[0]) !== 'object')) {
            if (this.length <= 0) throw new Error('Target empty!');

            // 为了获取非style定义的样式，需要使用特殊的方法获取
            return getStyle(this[0], arguments[0]);
        }

        // 设置样式
        for (var i = 0; i < this.length; i++) {
            if (arguments.length === 1) {
                for (var key in arguments[0]) {
                    this[i].style[key] = arguments[0][key];
                }
            } else this[i].style[arguments[0]] = arguments[1];
        }

        return this;
    }

    var setAttribute = function setAttribute(dom, attr, val) {
        if (/[a-z]/.test(dom.tagName) && XLINK_ATTRIBUTE.indexOf(attr) >= 0) {
            // 如果是xml元素
            // 针对xlink使用特殊方法赋值
            dom.setAttributeNS(NAMESPACE.xlink, 'xlink:' + attr, val);
        } else dom.setAttribute(attr, val);
    };

    /**
     * 设置或获取属性
     * @arguments(attr):获取属性
     * @arguments(attr,value):设置指定属性值
     * @arguments(json):设置大量属性
     */
    function attribute() {

        // 获取属性值
        if (arguments.length === 1 && _typeof(arguments[0]) !== 'object') {
            if (this.length <= 0) throw new Error('Target empty!');
            return this[0].getAttribute(arguments[0]);
        }

        // 设置属性值
        else if (arguments.length > 0) {
                for (var i = 0; i < this.length; i++) {
                    if (arguments.length === 1) {
                        for (var key in arguments[0]) {
                            setAttribute(this[i], key, arguments[0][key]);
                        }
                    } else setAttribute(this[i], arguments[0], arguments[1]);
                }
            }

        return this;
    }

    // 用于把数据绑定到一组结点或返回第一个结点数据
    // 可以传递函数对数据处理
    var datum = function datum(data, calcback) {

        // 获取数据
        if (arguments.length <= 0) {
            if (this.length <= 0) throw new Error('Target empty!');
            return this[0].__data__;
        }

        // 设置数据
        for (var i = 0; i < this.length; i++) {
            this[i].__data__ = typeof calcback === 'function' ? calcback(data, i) : data;
        }return this;
    };

    // 用于把一组数据绑定到一组结点或返回一组结点数据
    // 可以传递函数对数据处理
    var data = function data(datas, calcback) {

        // 获取数据
        if (arguments.length <= 0) {
            var _temp3 = [];
            for (var _i5 = 0; _i5 < this.length; _i5++) {
                _temp3[_i5] = this[_i5].__data__;
            }return _temp3;
        }

        // 设置数据
        var temp = [],
            i = void 0;
        for (i = 0; i < this.length && i < datas.length; i++) {
            this[i].__data__ = typeof calcback === 'function' ? calcback(datas[i], i) : datas[i];
            temp.push(this[i]);
        }
        var newImage2D = image2D(temp);

        // 记录需要去平衡的数据
        newImage2D.__enter__ = [];
        for (; i < datas.length; i++) {
            newImage2D.__enter__.push(typeof calcback === 'function' ? calcback(datas[i], i) : datas[i]);
        } // 记录需要去平衡的结点
        newImage2D.__exit__ = [];
        for (; i < this.length; i++) {
            newImage2D.__exit__.push(this[i]);
        }return newImage2D;
    };

    // 把过滤出来多于结点的数据部分变成结点返回
    // 需要传递一个字符串来标明新创建元素是什么
    var enter = function enter(template, type) {

        if (!this.__enter__ || this.__enter__.constructor !== Array) throw new Error('Not a data node object to be balanced!');

        var temp = [];
        for (var i = 0; i < this.__enter__.length; i++) {
            temp[i] = toNode$1(template, type);
            temp[i].__data__ = this.__enter__[i];
        }

        delete this.__enter__;
        return image2D(temp);
    };

    // 把过滤出来多于数据的结点部分返回
    var exit = function exit() {

        if (!this.__exit__ || this.__exit__.constructor !== Array) throw new Error('Not a data node object to be balanced!');

        var exitImage2D = image2D(this.__exit__);
        delete this.__exit__;
        return exitImage2D;
    };

    // 在维护的结点上轮询执行传入的方法
    // doback(data,index,image2D)
    var loop = function loop(doback) {

        for (var i = 0; i < this.length; i++) {
            doback(this[i].__data__, i, image2D(this[i]));
        }return this;
    };

    // r1和r2，内半径和外半径
    // beginA起点弧度，rotateA旋转弧度式
    function arc(beginA, rotateA, cx, cy, r1, r2, doback) {

        // 有了前置的判断，这里可以省略了
        // if (rotateA > Math.PI * 2) rotateA = Math.PI * 2;
        // if (rotateA < -Math.PI * 2) rotateA = -Math.PI * 2;

        // 保证逆时针也是可以的
        if (rotateA < 0) {
            beginA += rotateA;
            rotateA *= -1;
        }

        var temp = [],
            p = void 0;

        // 内部
        p = _rotate2(0, 0, beginA, r1, 0);
        temp[0] = p[0];
        temp[1] = p[1];
        p = _rotate2(0, 0, rotateA, p[0], p[1]);
        temp[2] = p[0];
        temp[3] = p[1];

        // 外部
        p = _rotate2(0, 0, beginA, r2, 0);
        temp[4] = p[0];
        temp[5] = p[1];
        p = _rotate2(0, 0, rotateA, p[0], p[1]);
        temp[6] = p[0];
        temp[7] = p[1];

        doback(beginA, beginA + rotateA, temp[0] + cx, temp[1] + cy, temp[4] + cx, temp[5] + cy, temp[2] + cx, temp[3] + cy, temp[6] + cx, temp[7] + cy, (r2 - r1) * 0.5);
    }

    // 文字统一设置方法
    var initText = function initText(painter, config, x, y, deg) {

        deg = deg % (Math.PI * 2);

        painter.beginPath();
        painter.translate(x, y);
        painter.rotate(deg);
        painter.font = config['font-size'] + "px " + config['font-family'];
        return painter;
    };

    // 画弧统一设置方法
    var initArc = function initArc(painter, config, cx, cy, r1, r2, beginDeg, deg) {

        if (r1 > r2) {
            var temp = r1;
            r1 = r2;
            r2 = temp;
        }

        beginDeg = beginDeg % (Math.PI * 2);

        // 当|deg|>=2π的时候都认为是一个圆环
        if (deg >= Math.PI * 2 || deg <= -Math.PI * 2) {
            deg = Math.PI * 2;
        } else {
            deg = deg % (Math.PI * 2);
        }

        arc(beginDeg, deg, cx, cy, r1, r2, function (beginA, endA, begInnerX, begInnerY, begOuterX, begOuterY, endInnerX, endInnerY, endOuterX, endOuterY, r) {
            if (r < 0) r = -r;
            painter.beginPath();
            painter.moveTo(begInnerX, begInnerY);
            painter.arc(
            // (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
            cx, cy, r1, beginA, endA, false);
            // 结尾
            if (config["arc-end-cap"] != 'round') painter.lineTo(endOuterX, endOuterY);else painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
            painter.arc(cx, cy, r2, endA, beginA, true);
            // 开头
            if (config["arc-start-cap"] != 'round') painter.lineTo(begInnerX, begInnerY);else painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
        });
        painter.closePath();
        return painter;
    };

    // 画圆统一设置方法
    var initCircle = function initCircle(painter, cx, cy, r) {
        painter.beginPath();
        painter.moveTo(cx + r, cy);
        painter.arc(cx, cy, r, 0, Math.PI * 2);
        return painter;
    };

    // 画矩形统一设置方法
    var initRect = function initRect(painter, x, y, width, height) {
        painter.beginPath();
        painter.rect(x, y, width, height);
        return painter;
    };

    // 线性渐变
    var linearGradient = function linearGradient(painter, x0, y0, x1, y1) {
        var gradient = painter.createLinearGradient(x0, y0, x1, y1);
        var enhanceGradient = {
            "value": function value() {
                return gradient;
            },
            "addColorStop": function addColorStop(stop, color) {
                gradient.addColorStop(stop, color);
                return enhanceGradient;
            }
        };
        return enhanceGradient;
    };

    // 环形渐变
    var radialGradient = function radialGradient(painter, cx, cy, r) {
        var gradient = painter.createRadialGradient(cx, cy, 0, cx, cy, r);
        var enhanceGradient = {
            "value": function value() {
                return gradient;
            },
            "addColorStop": function addColorStop(stop, color) {
                gradient.addColorStop(stop, color);
                return enhanceGradient;
            }
        };
        return enhanceGradient;
    };

    // 加强版本的画笔
    function painter_canvas2D(canvas) {

        // 获取canvas2D画笔
        var painter = canvas.getContext("2d");

        var isLayer = canvas.__image2D__layer__ == 'yes';

        // 图层是内部的，明确获取方法
        // 对外的一律使用clientXXX，区分是否显示
        var width = isLayer ? canvas.getAttribute('width') : canvas.clientWidth,
            //内容+内边距
        height = isLayer ? canvas.getAttribute('height') : canvas.clientHeight;

        if (width == 0 || height == 0) {
            console.warn('Canvas is hidden or size is zero!');

            if (canvas.__image2D__noLayer_getSize__ == 'yes') {

                width = canvas.width / 2;
                height = canvas.height / 2;
            } else {

                width = canvas.width;
                height = canvas.height;

                // 标记已经特殊获取大小了
                canvas.__image2D__noLayer_getSize__ = 'yes';
            }
        }

        // 设置显示大小
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        // 设置画布大小（画布大小设置为显示的二倍，使得显示的时候更加清晰）
        canvas.setAttribute('width', width * 2);
        canvas.setAttribute('height', height * 2);

        // 通过缩放实现模糊问题
        painter.scale(2, 2);

        // 默认配置canvas2D对象已经存在的属性
        painter.textBaseline = 'middle';
        painter.textAlign = 'left';

        // 默认配置不应该有canvas2D对象已经存在的属性
        // 这里是为了简化或和svg统一接口而自定义的属性
        var config = {
            "font-size": "16", // 文字大小
            "font-family": "sans-serif", // 字体
            "arc-start-cap": "butt", // 弧开始闭合方式
            "arc-end-cap": "butt" // 弧结束闭合方式
        };

        // 配置生效方法
        var useConfig = function useConfig(key, value) {

            /**
             * -----------------------------
             * 特殊的设置开始
             * -----------------------------
             */

            if (key == 'lineDash') {
                painter.setLineDash(value);
            }

            /**
             * -----------------------------
             * 常规的配置开始
             * -----------------------------
             */

            // 如果已经存在默认配置中，说明只需要缓存起来即可
            else if (config[key]) {
                    config[key] = value;
                }

                // 其它情况直接生效即可
                else {
                        painter[key] = value;
                    }
        };

        // 画笔
        var enhancePainter = {

            // 属性设置或获取
            "config": function config() {
                if (arguments.length === 1) {
                    if (_typeof(arguments[0]) !== 'object') return painter[arguments[0]];
                    for (var key in arguments[0]) {
                        useConfig(key, arguments[0][key]);
                    }
                } else if (arguments.length === 2) {
                    useConfig(arguments[0], arguments[1]);
                }
                return enhancePainter;
            },

            // 文字
            "fillText": function fillText(text, x, y, deg) {
                painter.save();
                initText(painter, config, x, y, deg || 0).fillText(text, 0, 0);
                painter.restore();
                return enhancePainter;
            },
            "strokeText": function strokeText(text, x, y, deg) {
                painter.save();
                initText(painter, config, x, y, deg || 0).strokeText(text, 0, 0);
                painter.restore();
                return enhancePainter;
            },
            "fullText": function fullText(text, x, y, deg) {
                painter.save();
                initText(painter, config, x, y, deg || 0);
                painter.fillText(text, 0, 0);
                painter.strokeText(text, 0, 0);
                painter.restore();
                return enhancePainter;
            },

            // 路径
            "beginPath": function beginPath() {
                painter.beginPath();return enhancePainter;
            },
            "closePath": function closePath() {
                painter.closePath();return enhancePainter;
            },
            "moveTo": function moveTo(x, y) {
                painter.moveTo(x, y);return enhancePainter;
            },
            "lineTo": function lineTo(x, y) {
                painter.lineTo(x, y);return enhancePainter;
            },
            "arc": function arc(x, y, r, beginDeg, deg) {
                painter.arc(x, y, r, beginDeg, beginDeg + deg, deg < 0);
                return enhancePainter;
            },
            "fill": function fill() {
                painter.fill();return enhancePainter;
            },
            "stroke": function stroke() {
                painter.stroke();return enhancePainter;
            },
            "full": function full() {
                painter.fill();painter.stroke();return enhancePainter;
            },

            "save": function save() {
                painter.save();return enhancePainter;
            },
            "restore": function restore() {
                painter.restore();return enhancePainter;
            },

            // 路径 - 贝塞尔曲线
            "quadraticCurveTo": function quadraticCurveTo(cpx, cpy, x, y) {
                painter.quadraticCurveTo(cpx, cpy, x, y);return enhancePainter;
            },
            "bezierCurveTo": function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
                painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);return enhancePainter;
            },

            // 擦除画面
            "clearRect": function clearRect(x, y, width, height) {
                painter.clearRect(x || 0, y || 0, width || canvas.getAttribute('width') / 2, height || canvas.getAttribute('height') / 2);return enhancePainter;
            },

            // 地址图片
            "toDataURL": function toDataURL() {
                return canvas.toDataURL();
            },

            // image
            // v1.5.0开始，做了参数调整（非向下兼容）
            "drawImage": function drawImage(img, sx, sy, sw, sh, x, y, w, h) {
                sx = sx || 0;
                sy = sy || 0;
                x = x || 0;
                y = y || 0;
                w = w ? w * 2 : canvas.getAttribute('width');
                h = h ? h * 2 : canvas.getAttribute('height');

                if (img.nodeName == 'CANVAS') {
                    // 我们不考虑别的canvas，我们认为我们面对的canvas都是自己控制的
                    // 如果有必要，未来可以对任意canvas进行向下兼容
                    w = w / 2;
                    h = h / 2;
                    sw = sw ? sw * 2 : canvas.getAttribute('width');
                    sh = sh ? sh * 2 : canvas.getAttribute('height');
                } else {
                    // 默认类型是图片
                    sw = (sw || img.width) * 2;
                    sh = (sh || img.height) * 2;
                }

                painter.drawImage(img, sx, sy, sw, sh, x, y, w, h);
                return enhancePainter;
            },

            // 弧
            "fillArc": function fillArc(cx, cy, r1, r2, beginDeg, deg) {
                initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).fill();return enhancePainter;
            },
            "strokeArc": function strokeArc(cx, cy, r1, r2, beginDeg, deg) {
                initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).stroke();return enhancePainter;
            },
            "fullArc": function fullArc(cx, cy, r1, r2, beginDeg, deg) {
                initArc(painter, config, cx, cy, r1, r2, beginDeg, deg);
                painter.fill();
                painter.stroke();
                return enhancePainter;
            },

            // 圆形
            "fillCircle": function fillCircle(cx, cy, r) {
                initCircle(painter, cx, cy, r).fill();return enhancePainter;
            },
            "strokeCircle": function strokeCircle(cx, cy, r) {
                initCircle(painter, cx, cy, r).stroke();return enhancePainter;
            },
            "fullCircle": function fullCircle(cx, cy, r) {
                initCircle(painter, cx, cy, r);
                painter.fill();
                painter.stroke();
                return enhancePainter;
            },

            // 矩形
            "fillRect": function fillRect(x, y, width, height) {
                initRect(painter, x, y, width, height).fill();return enhancePainter;
            },
            "strokeRect": function strokeRect(x, y, width, height) {
                initRect(painter, x, y, width, height).stroke();return enhancePainter;
            },
            "fullRect": function fullRect(x, y, width, height) {
                initRect(painter, x, y, width, height);
                painter.fill();
                painter.stroke();
                return enhancePainter;
            },

            /**
            * 渐变
            * -------------
            */

            //  线性渐变
            "createLinearGradient": function createLinearGradient(x0, y0, x1, y1) {
                return linearGradient(painter, x0, y0, x1, y1);
            },

            // 环形渐变
            "createRadialGradient": function createRadialGradient(cx, cy, r) {
                return radialGradient(painter, cx, cy, r);
            },

            /**
             * 变换
             * --------------
             */

            //  移动
            // 用来移动 canvas 的原点到指定的位置
            "translate": function translate(x, y) {
                painter.translate(x, y);return enhancePainter;
            },

            //  旋转
            "rotate": function rotate(deg) {
                painter.rotate(deg);return enhancePainter;
            },

            // 缩放
            "scale": function scale(x, y) {
                y = y || x;painter.scale(x, y);return enhancePainter;
            }
        };

        return enhancePainter;
    }

    function normalConfig(key, value) {

        // 文字水平对齐方式
        if (key === 'textAlign') {
            return {
                "left": "start",
                "right": "end",
                "center": "middle"
            }[value] || value;
        }

        return value;
    }
    // 文字统一设置方法
    var initText$1 = function initText$1(painter, config, x, y, deg) {
        if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'text') throw new Error('Need a <text> !');

        deg = deg % (Math.PI * 2);

        // 垂直对齐采用dy实现
        painter.attr('dy', {
            "top": config['font-size'] * 0.5,
            "middle": 0,
            "bottom": -config['font-size'] * 0.5
        }[config.textBaseline]).css({

            // 文字对齐方式
            "text-anchor": config.textAlign,
            "dominant-baseline": "central",

            // 文字大小和字体设置
            "font-size": config['font-size'] + "px",
            "font-family": config['font-family']
        }).attr({ "x": x, "y": y });

        return {
            "transform": "rotate(" + deg * 180 / Math.PI + "," + x + "," + y + ")"
        };
    };

    // 画弧统一设置方法
    var initArc$1 = function initArc$1(painter, config, cx, cy, r1, r2, beginDeg, deg) {

        if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'path') throw new Error('Need a <path> !');

        beginDeg = beginDeg % (Math.PI * 2);

        if (r1 > r2) {
            var temp = r1;
            r1 = r2;
            r2 = temp;
        }

        // 当|deg|>=2π的时候都认为是一个圆环
        if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
            deg = Math.PI * 1.999999;
        } else {
            deg = deg % (Math.PI * 2);
        }

        arc(beginDeg, deg, cx, cy, r1, r2, function (beginA, endA, begInnerX, begInnerY, begOuterX, begOuterY, endInnerX, endInnerY, endOuterX, endOuterY, r) {
            var f = endA - beginA > Math.PI ? 1 : 0,
                d = "M" + begInnerX + " " + begInnerY;
            if (r < 0) r = -r;
            d +=
            // 横半径 竖半径 x轴偏移角度 0小弧/1大弧 0逆时针/1顺时针 终点x 终点y
            "A" + r1 + " " + r1 + " 0 " + f + " 1 " + endInnerX + " " + endInnerY;
            // 结尾
            if (config["arc-end-cap"] != 'round') d += "L" + endOuterX + " " + endOuterY;else d += "A" + r + " " + r + " " + " 0 1 0 " + endOuterX + " " + endOuterY;
            d += "A" + r2 + " " + r2 + " 0 " + f + " 0 " + begOuterX + " " + begOuterY;
            // 开头
            if (config["arc-start-cap"] != 'round') d += "L" + begInnerX + " " + begInnerY;else d += "A" + r + " " + r + " " + " 0 1 0 " + begInnerX + " " + begInnerY;
            painter.attr('d', d + "Z");
        });
        return painter;
    };

    // 画圆统一设置方法
    var initCircle$1 = function initCircle$1(painter, cx, cy, r) {
        if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'circle') throw new Error('Need a <circle> !');
        painter.attr({
            "cx": cx,
            "cy": cy,
            "r": r
        });
        return painter;
    };

    // 路径统一设置方法
    var initPath = function initPath(painter, path) {
        if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'path') throw new Error('Need a <path> !');
        painter.attr('d', path);
        return painter;
    };

    // 画矩形统一设置方法
    var initRect$1 = function initRect$1(painter, x, y, width, height) {
        if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'rect') throw new Error('Need a <rect> !');

        // 由于height和宽不可以是负数，校对一下

        if (height < 0) {
            height *= -1;y -= height;
        }

        if (width < 0) {
            width *= -1;x -= width;
        }

        painter.attr({
            "x": x,
            "y": y,
            "width": width,
            "height": height
        });
        return painter;
    };

    var initDefs = function initDefs(target) {
        var defs = target.getElementsByTagName('defs');
        if (defs.length <= 0) {
            defs = [toNode$1("<defs>", "SVG")];
            target.appendChild(defs[0]);
        }
        return defs[0];
    };

    // 线性渐变
    var linearGradient$1 = function linearGradient$1(painter, target, x0, y0, x1, y1) {
        var defs = initDefs(target);
        var gradientId = "image2D-lg-" + new Date().valueOf() + "-" + Math.random();
        var gradientDom = toNode$1('<linearGradient id="' + gradientId + '" x1="' + x0 + '%" y1="' + y0 + '%" x2="' + x1 + '%" y2="' + y1 + '%"></linearGradient>');
        defs.appendChild(gradientDom);
        var enhanceGradient = {
            "value": function value() {
                return "url(#" + gradientId + ")";
            },
            "addColorStop": function addColorStop(stop, color) {
                gradientDom.appendChild(toNode$1('<stop offset="' + stop * 100 + '%" style="stop-color:' + color + ';" />'));
                return enhanceGradient;
            }
        };
        return enhanceGradient;
    };

    // 环形渐变
    var radialGradient$1 = function radialGradient$1(painter, target, cx, cy, r) {
        var defs = initDefs(target);
        var gradientId = "image2D-rg-" + new Date().valueOf() + "-" + Math.random();
        var gradientDom = toNode$1('<radialGradient id="' + gradientId + '" cx="' + cx + '%" cy="' + cy + '%" r="' + r + '%"></radialGradient>');
        defs.appendChild(gradientDom);
        var enhanceGradient = {
            "value": function value() {
                return "url(#" + gradientId + ")";
            },
            "addColorStop": function addColorStop(stop, color) {
                gradientDom.appendChild(toNode$1('<stop offset="' + stop * 100 + '%" style="stop-color:' + color + ';" />'));
                return enhanceGradient;
            }
        };
        return enhanceGradient;
    };

    function painter_svg(target, selector) {

        var painter = void 0;
        if (selector) painter = image2D(selector, target);

        // 类似canvas画笔的属性
        var _config2 = {

            // 基本设置
            "fillStyle": "#000",
            "strokeStyle": "#000",
            "lineWidth": 1,

            // 文字对齐方式
            "textAlign": "start",
            "textBaseline": "middle",

            // 文字设置
            "font-size": "16",
            "font-family": "sans-serif",

            // arc二端闭合方式['butt':直线闭合,'round':圆帽闭合]
            "arc-start-cap": "butt",
            "arc-end-cap": "butt",

            // 虚线设置
            "lineDash": []

        };

        // 路径(和canvas2D的类似)
        var path = "",
            currentPosition = [];

        // 变换（和canvas2D的类似，内部维护了用于记录）
        var transform_history = [],
            transform_current = "";

        // 画笔
        var enhancePainter = {

            // 属性设置或获取
            "config": function config() {
                if (arguments.length === 1) {
                    if (_typeof(arguments[0]) !== 'object') return _config2[arguments[0]];
                    for (var key in arguments[0]) {
                        _config2[key] = normalConfig(key, arguments[0][key]);
                    }
                } else if (arguments.length === 2) _config2[arguments[0]] = normalConfig(arguments[0], arguments[1]);
                return enhancePainter;
            },

            // 基础方法
            "bind": function bind(selector) {
                painter = image2D(selector, target);return enhancePainter;
            },
            "appendTo": function appendTo(selector) {
                painter.appendTo(selector || target, target);return enhancePainter;
            },
            "prependTo": function prependTo(selector) {
                painter.prependTo(selector || target, target);return enhancePainter;
            },
            "afterTo": function afterTo(selector) {
                painter.afterTo(selector || target, target);return enhancePainter;
            },
            "beforeTo": function beforeTo(selector) {
                painter.beforeTo(selector || target, target);return enhancePainter;
            },

            // 路径
            "beginPath": function beginPath() {
                path = "";currentPosition = [];return enhancePainter;
            },
            "closePath": function closePath() {
                path += "Z";return enhancePainter;
            },
            "moveTo": function moveTo(x, y) {
                path += "M" + x + " " + y;currentPosition = [x, y];return enhancePainter;
            },
            "lineTo": function lineTo(x, y) {
                path += (path == "" ? "M" : "L") + x + " " + y;currentPosition = [x, y];return enhancePainter;
            },
            "arc": function arc(x, y, r, beginDeg, deg) {
                var begPosition = _rotate2(x, y, beginDeg, x + r, y);
                var endPosition = _rotate2(x, y, beginDeg + deg, x + r, y);
                beginDeg = beginDeg / Math.PI * 180;
                deg = deg / Math.PI * 180;
                // 如果当前没有路径，说明是开始的，就移动到正确位置
                if (path == '') {
                    path += "M" + begPosition[0] + "," + begPosition[1];
                }
                // 如果当前有路径，位置不正确，应该画到正确位置（和canvas保持一致）
                else if (begPosition[0] != currentPosition[0] || begPosition[1] != currentPosition[1]) {
                        path += "L" + begPosition[0] + "," + begPosition[1];
                    }
                path += "A" + r + "," + r + " 0 " + (deg > 180 || deg < -180 ? 1 : 0) + "," + (deg > 0 ? 1 : 0) + " " + endPosition[0] + "," + endPosition[1];
                return enhancePainter;
            },
            "fill": function fill() {
                initPath(painter, path).attr('transform', transform_current).attr("fill", _config2.fillStyle);
                return enhancePainter;
            },
            "stroke": function stroke() {
                initPath(painter, path).attr('transform', transform_current).attr({
                    "stroke-width": _config2.lineWidth,
                    "stroke": _config2.strokeStyle,
                    "fill": "none",
                    "stroke-dasharray": _config2.lineDash.join(',')
                });
                return enhancePainter;
            },
            "full": function full() {
                initPath(painter, path).attr('transform', transform_current).attr({
                    "stroke-width": _config2.lineWidth,
                    "stroke": _config2.strokeStyle,
                    "fill": _config2.fillStyle,
                    "stroke-dasharray": _config2.lineDash.join(',')
                });
                return enhancePainter;
            },

            "save": function save() {
                transform_history.push(transform_current);
                return enhancePainter;
            },
            "restore": function restore() {
                if (transform_history.length > 0) transform_current = transform_history.pop();
                return enhancePainter;
            },

            // 路径 - 贝塞尔曲线
            "quadraticCurveTo": function quadraticCurveTo(cpx, cpy, x, y) {
                path += "Q" + cpx + " " + cpy + "," + x + " " + y;return enhancePainter;
            },
            "bezierCurveTo": function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
                path += "C" + cp1x + " " + cp1y + "," + cp2x + " " + cp2y + "," + x + " " + y;return enhancePainter;
            },

            // 文字
            "fillText": function fillText(text, x, y, deg) {
                var returnJSon = initText$1(painter, _config2, x, y, deg || 0);
                painter.attr('transform', transform_current + returnJSon.transform).attr("fill", _config2.fillStyle)[0].textContent = text;
                return enhancePainter;
            },
            "strokeText": function strokeText(text, x, y, deg) {
                var returnJSon = initText$1(painter, _config2, x, y, deg || 0);
                painter.attr('transform', transform_current + returnJSon.transform).attr({
                    "stroke": _config2.strokeStyle,
                    "fill": "none",
                    "stroke-dasharray": _config2.lineDash.join(',')
                })[0].textContent = text;
                return enhancePainter;
            },
            "fullText": function fullText(text, x, y, deg) {
                var returnJSon = initText$1(painter, _config2, x, y, deg || 0);
                painter.attr('transform', transform_current + returnJSon.transform).attr({
                    "stroke": _config2.strokeStyle,
                    "fill": _config2.fillStyle,
                    "stroke-dasharray": _config2.lineDash.join(',')
                })[0].textContent = text;
                return enhancePainter;
            },

            // 弧
            "fillArc": function fillArc(cx, cy, r1, r2, beginDeg, deg) {
                initArc$1(painter, _config2, cx, cy, r1, r2, beginDeg, deg).attr('transform', transform_current).attr("fill", _config2.fillStyle);
                return enhancePainter;
            },
            "strokeArc": function strokeArc(cx, cy, r1, r2, beginDeg, deg) {
                initArc$1(painter, _config2, cx, cy, r1, r2, beginDeg, deg).attr('transform', transform_current).attr({
                    "stroke-width": _config2.lineWidth,
                    "stroke": _config2.strokeStyle,
                    "fill": "none",
                    "stroke-dasharray": _config2.lineDash.join(',')
                });
                return enhancePainter;
            },
            "fullArc": function fullArc(cx, cy, r1, r2, beginDeg, deg) {
                initArc$1(painter, _config2, cx, cy, r1, r2, beginDeg, deg).attr('transform', transform_current).attr({
                    "stroke-width": _config2.lineWidth,
                    "stroke": _config2.strokeStyle,
                    "fill": _config2.fillStyle,
                    "stroke-dasharray": _config2.lineDash.join(',')
                });
                return enhancePainter;
            },

            // 圆形
            "fillCircle": function fillCircle(cx, cy, r) {
                initCircle$1(painter, cx, cy, r).attr('transform', transform_current).attr("fill", _config2.fillStyle);return enhancePainter;
            },
            "strokeCircle": function strokeCircle(cx, cy, r) {
                initCircle$1(painter, cx, cy, r).attr('transform', transform_current).attr({
                    "stroke-width": _config2.lineWidth,
                    "stroke": _config2.strokeStyle,
                    "fill": "none",
                    "stroke-dasharray": _config2.lineDash.join(',')
                });return enhancePainter;
            },
            "fullCircle": function fullCircle(cx, cy, r) {
                initCircle$1(painter, cx, cy, r).attr('transform', transform_current).attr({
                    "stroke-width": _config2.lineWidth,
                    "stroke": _config2.strokeStyle,
                    "fill": _config2.fillStyle,
                    "stroke-dasharray": _config2.lineDash.join(',')
                });return enhancePainter;
            },

            // 矩形
            "fillRect": function fillRect(x, y, width, height) {
                initRect$1(painter, x, y, width, height).attr('transform', transform_current).attr("fill", _config2.fillStyle);return enhancePainter;
            },
            "strokeRect": function strokeRect(x, y, width, height) {
                initRect$1(painter, x, y, width, height).attr('transform', transform_current).attr({
                    "stroke-width": _config2.lineWidth,
                    "stroke": _config2.strokeStyle,
                    "fill": "none",
                    "stroke-dasharray": _config2.lineDash.join(',')
                });return enhancePainter;
            },
            "fullRect": function fullRect(x, y, width, height) {
                initRect$1(painter, x, y, width, height).attr('transform', transform_current).attr({
                    "stroke-width": _config2.lineWidth,
                    "stroke": _config2.strokeStyle,
                    "fill": _config2.fillStyle,
                    "stroke-dasharray": _config2.lineDash.join(',')
                });return enhancePainter;
            },

            /**
             * 渐变
             * -------------
             */

            //  线性渐变
            "createLinearGradient": function createLinearGradient(x0, y0, x1, y1) {
                return linearGradient$1(painter, target, x0, y0, x1, y1);
            },

            // 环形渐变
            "createRadialGradient": function createRadialGradient(cx, cy, r) {
                return radialGradient$1(painter, target, cx, cy, r);
            },

            /**
             * 变换
             * --------------
             */

            //  移动
            "translate": function translate(x, y) {
                transform_current += ' translate(' + x + ',' + y + ')';
                return enhancePainter;
            },

            //  旋转
            "rotate": function rotate(deg) {
                transform_current += ' rotate(' + deg / Math.PI * 180 + ')';
                return enhancePainter;
            },

            // 缩放
            "scale": function scale(x, y) {
                y = y || x;
                transform_current += ' scale(' + x + ',' + y + ')';
                return enhancePainter;
            }

        };

        return enhancePainter;
    }

    // 统一画笔
    // 负责启动具体的绘图对象
    function painter() {

        // 因为绘图画布是必须的，因此在判断画布类型前，如果压根没有结点，肯定是非法的
        if (!isElement(this[0])) throw new Error('Target empty!');

        var target = this[0],
            nodeName = target.nodeName.toLowerCase();

        // canvas2D
        if (nodeName === 'canvas') return painter_canvas2D(target);

        // svg
        if (nodeName === 'svg') return painter_svg(target, arguments[0]);

        throw new Error('Painter is not a function!');
    }

    function layer() {

        if (!isElement(this[0])) throw new Error('Target empty!');

        if (this[0].nodeName.toLowerCase() !== 'canvas') throw new Error('Layer is not a function!');

        // 画笔
        var painter = this.painter(),

        // 图层集合
        layer = {},
            layer_index = [];
        var width = this[0].clientWidth,
            //内容+内边距
        height = this[0].clientHeight;

        var layerManager = {

            // 获取指定图层画笔
            "painter": function painter(id) {
                if (!layer[id]) {
                    // 初始化的图层都可见
                    layer[id] = { "visible": true };

                    // 后期可以考虑使用离线画布offScreenCanvas提高效率
                    layer[id].canvas = document.createElement('canvas');
                    // 设置大小才会避免莫名其妙的错误
                    layer[id].canvas.setAttribute('width', width);
                    layer[id].canvas.setAttribute('height', height);

                    // 标记是图层
                    layer[id].canvas.__image2D__layer__ = 'yes';

                    layer[id].painter = image2D(layer[id].canvas).painter();

                    layer_index.push(id);
                }
                return layer[id].painter;
            },

            // 删除图层
            "delete": function _delete(id) {
                // 删除索引
                for (var i = 0; i < layer_index.length; i++) {
                    if (layer_index[i] === id) {
                        layer_index.splice(i, 1);
                        break;
                    }
                } // 删除图层
                delete layer[id];
                return layerManager;
            },

            // 更新内容到画布
            "update": function update() {
                painter.clearRect(0, 0, width, height);
                painter.save();

                for (var i = 0; i < layer_index.length; i++) {
                    if (layer[layer_index[i]].visible) painter.drawImage(layer[layer_index[i]].canvas, 0, 0, width, height, 0, 0, width, height);
                }
                painter.restore();
                return layerManager;
            },

            // 隐藏图层
            "hidden": function hidden(id) {
                layer[id].visible = false;
                return layerManager;
            },

            // 显示图层
            "show": function show(id) {
                layer[id].visible = true;
                return layerManager;
            }
        };

        return layerManager;
    }

    image2D.extend({

        // 布局
        treeLayout: treeLayout$1, pieLayout: pieLayout,

        // 矩阵变换
        Matrix4: Matrix4,

        // 二维简单变换
        rotate: _rotate2, move: _move2, scale: _scale2, dot: dot,

        // 动画类
        animation: animation$1,

        // 插值类计算
        cardinal: cardinal,

        // 色彩类
        formatColor: formatColor, getRandomColors: getRandomColors,

        // 事件相关
        stopPropagation: stopPropagation, preventDefault: preventDefault,

        // 地图映射
        map: map

    });
    image2D.prototype.extend({

        // 结点操作
        appendTo: appendTo, prependTo: prependTo, afterTo: afterTo, beforeTo: beforeTo, remove: remove, filter: filter, text: text, html: html, size: size,

        // 结点属性或样式操作
        css: style, attr: attribute,

        // 结点和数据绑定
        datum: datum, data: data, enter: enter, exit: exit, loop: loop,

        // 结点事件
        bind: bind, unbind: unbind, position: position,

        // 自定义画笔
        painter: painter,

        // 图层
        layer: layer

    });

    image2D.fn = image2D.prototype;

    // 判断当前环境，如果不是浏览器环境
    if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
        module.exports = image2D;
    }
    // 浏览器环境下
    // 因为浏览器下挂载到window对象上
    // 为了防止覆盖，额外提供一个noConflict方法，用以在覆盖的时候恢复
    else {
            var
            // 保存之前的image2D，防止直接覆盖
            _image2D = window.image2D,


            // 保存之前的$$，防止直接覆盖
            _$$ = window.$$;

            image2D.noConflict = function (deep) {

                // 如果当前的$$是被最新的image2D覆盖的
                // 恢复之前的
                if (window.$$ === image2D) {
                    window.$$ = _$$;
                }

                // 如果当前的image2D是被最新的image2D覆盖的
                // 且标记需要恢复
                // 恢复之前的
                if (deep && window.image2D === image2D) {
                    window.image2D = _image2D;
                }

                // 返回当前image2D
                // 因为调用这个方法以后
                // 全局window下的image2D和$$是什么
                // 已经不一定了
                return image2D;
            };
            // 挂载库对象到根
            window.image2D = window.$$ = image2D;
        }
})();