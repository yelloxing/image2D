import isElement from '@yelloxing/core.js/isElement';
import isFunction from '@yelloxing/core.js/isFunction';
import isString from '@yelloxing/core.js/isString';
import { REGEXP } from './config';
import toNode from './to-node';
import image2D from '../library/core';

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
export default function (selector, context) {

    // 如果是字符串
    // context如果是字符串（应该是'html'或'svg'）表示这是生成结点，也走这条路线
    if (isString(context) || isString(selector)) {
        selector = selector.trim().replace(new RegExp(REGEXP.blank, 'g'), '');

        // 如果以'<'开头表示是字符串模板
        if (typeof context == 'string' || /^</.test(selector)) {
            let node = toNode(selector, context);
            if (isElement(node)) return [node];
            else return [];
        }

        // *表示查找全部
        else if (selector === '*') {
            return context.getElementsByTagName('*');
        }

        let id = selector.match(new RegExp('#' + REGEXP.identifier, 'g'));
        // ID选择器
        // 此选择器会忽略上下文
        if (id) {
            let node = document.getElementById(id[0].replace('#', ''));
            if (isElement(node)) return [node];
            else return [];
        }

        let cls = selector.match(new RegExp('\\.' + REGEXP.identifier, 'g')),
            tag = selector.match(new RegExp('^' + REGEXP.identifier));

        // 结点和class混合选择器
        if (tag || cls) {
            let allNodes = context.getElementsByTagName(tag ? tag[0] : "*"), temp = [];
            for (let i = 0; i < allNodes.length; i++) {
                let clazz = " " + allNodes[i].getAttribute('class') + " ", flag = true;
                for (let j = 0; cls && j < cls.length; j++) {
                    if (!clazz.match(" " + (cls[j].replace('.', '')) + " ")) {
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
        let temp = [];
        for (let i = 0; i < selector.length; i++) {
            if (isElement(selector[i])) temp.push(selector[i]);
            else if (selector[i] && selector[i].constructor === image2D) {
                for (let j = 0; j < selector[i].length; j++) {
                    temp.push(selector[i][j]);
                }
            }
        }
        return temp;
    }

    // 如果是image2D对象
    else if (selector && selector.constructor === image2D) {
        return selector;
    }

    // 如果是函数
    else if (isFunction(selector)) {
        let allNodes = context.getElementsByTagName('*'), temp = [];
        for (let i = 0; i < allNodes.length; i++) {
            // 如果选择器函数返回true，表示当前面对的结点被接受
            if (selector(allNodes[i])) temp.push(allNodes[i]);
        }
        return temp;
    }

    // 未知情况，报错
    else {
        throw new Error('Unknown selector:' + selector);
    }
};
