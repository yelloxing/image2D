import { NAMESPACE, REGEXP } from './config';
import { setSVG } from './polyfill';
import { isElement, isString } from '@hai2007/tool/type';

// 变成指定类型的结点
// type可以取：
// 1.'HTML'，html结点
// 2.'SVG'，svg结点(默认值)
let toNode = function (template, type) {
    let frame, childNodes, frameTagName = 'div';
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
            throw new Error('This template cannot be generated using div as a container:' + template + "\nPlease contact us: https://github.com/hai2007/image2D/issues");
        }
    } else {
        frame = document.createElementNS(NAMESPACE.svg, 'svg');
        // 部分浏览器svg元素没有innerHTML
        setSVG(frame, template);
    }
    childNodes = frame.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
        if (isElement(childNodes[i])) return childNodes[i];
    }
};

/**
 * 变成结点
 * @param {string} template
 * @param {string} type
 * @return {dom} 返回结点
 */
export default function (template, type) {

    // 把传递元素类型和标记进行统一处理
    if (new RegExp("^" + REGEXP.identifier + "$").test(template)) template = "<" + template + "></" + template + ">";

    let mark = /^<([^(>| )]+)/.exec(template)[1];

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
        "tr", "td", "th", "tbody", "thead"

    ].indexOf(mark.toLowerCase()) >= 0) type = 'HTML';

    return toNode(template, type);
};
