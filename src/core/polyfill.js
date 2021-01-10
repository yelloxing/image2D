import { NAMESPACE, XLINK_ATTRIBUTE } from './config';
import { isText } from '@hai2007/tool/type';

/**
 * 设置svg字符串
 * @param {dom} target
 * @param {string} svgstring
 */
export let setSVG = function (target, svgstring) {
    if ('innerHTML' in SVGElement.prototype === false || 'innerHTML' in SVGSVGElement.prototype === false) {

        // 创建一个非svg结点，用例帮助解析
        // 这样比直接解析字符串简单
        let frame = document.createElement("div");
        frame.innerHTML = svgstring;

        let toSvgNode = function (htmlNode) {

            // 创建svg结点，并挂载属性
            let svgNode = document.createElementNS(NAMESPACE.svg, (htmlNode.tagName).toLowerCase());
            let attrs = htmlNode.attributes;

            for (let i = 0; attrs && i < attrs.length; i++) {

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

        let rslNode = toSvgNode(frame.firstChild);

        (function toSVG(pnode, svgPnode) {
            let node = pnode.firstChild;

            // 如果是文本结点
            if (isText(node)) {
                svgPnode.textContent = pnode.innerText;
                return;
            }

            // 不是文本结点，就拼接
            while (node) {
                let svgNode = toSvgNode(node);
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
