import { isString } from '@hai2007/tool/type';

/**
 * 返回渲染后的CSS样式值
 * @param {DOM} dom 目标结点
 * @param {String} name 属性名称（可选）
 * @return {String}
 */
export default function (dom, name) {

    // 获取结点的全部样式
    let allStyle = document.defaultView && document.defaultView.getComputedStyle ?
        document.defaultView.getComputedStyle(dom, null) :
        dom.currentStyle;

    // 如果没有指定属性名称，返回全部样式
    return isString(name) ? allStyle.getPropertyValue(name) : allStyle;
};
