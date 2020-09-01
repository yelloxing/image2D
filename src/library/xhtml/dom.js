import sizzle from '../../core/sizzle';
import image2D from '../core';
import { setSVG } from '../../core/polyfill';

/**
 * 把当前维护的结点加到目标结点内部的结尾
 * @param {selector} target
 * @return {image2D}
 */
export let appendTo = function (target, context) {
    let nodes = sizzle(target, context || document);
    if (nodes.length > 0) {
        for (let i = 0; i < this.length; i++)
            nodes[0].appendChild(this[i]);
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
export let prependTo = function (target, context) {
    let nodes = sizzle(target, context || document);
    if (nodes.length > 0) {
        for (let i = 0; i < this.length; i++)
            nodes[0].insertBefore(this[i], nodes[0].childNodes[0]);
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
export let afterTo = function (target, context) {
    let nodes = sizzle(target, context || document);
    if (nodes.length > 0) {
        for (let i = 0; i < this.length; i++)
            //如果第二个参数undefined,在结尾追加，目的一样达到
            nodes[0].parentNode.insertBefore(this[i], nodes[0].nextSibling);
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
export let beforeTo = function (target, context) {
    let nodes = sizzle(target, context || document);
    if (nodes.length > 0) {
        for (let i = 0; i < this.length; i++)
            nodes[0].parentNode.insertBefore(this[i], nodes[0]);
    } else {
        throw new Error('Target empty!');
    }
    return this;
};

// 删除当前维护的结点
export let remove = function () {
    for (let i = 0; i < this.length; i++)
        this[i].parentNode.removeChild(this[i]);
    return this;
};

// 筛选当前结点
export let filter = function (filterback) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        if (filterback(i, image2D(this[i]))) temp.push(this[i]);
    }
    return image2D(temp);
};

// 修改文本或获取结点文本
export let text = function (content) {
    if (arguments.length > 0) {
        for (let i = 0; i < this.length; i++) this[i].textContent = content;
        return this;
    }
    if (this.length <= 0) throw new Error('Target empty!');
    return this[0].textContent;
};

// 设置或获取结点中的xhtml字符串模板（相当于innerHTML）
export let html = function (xhtmlString) {
    if (arguments.length > 0) {
        for (let i = 0; i < this.length; i++) {

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
