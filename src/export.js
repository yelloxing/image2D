/**
 * 如果是一个基于image2D开发的项目，你可以导入这份image2D来帮助你减小打包后的文件大小
 * 温馨提示：这里导出的接口是稳定的，请放心进行二次开发
 *
 * 如何拼接成一个完整的image2D?
 *
 * 第一步：导入基本的对象
 *
 * import {image2D} from 'image2d/src/export.js';
 *
 * 第二步：拼接你需要的静态方法
 *
 * // 比如你需要树布局
 * import {treeLayout} from 'image2d/src/export.js';
 * image2D.extend({
 *      treeLayout
 * });
 *
 * 第三步：拼接你需要的对象方法
 *
 * // 比如是画笔
 * import {painter} from 'image2d/src/export.js';
 * image2D.extend({
 *      painter
 * });
 *
 * 补充：比如这里的画笔，默认导入的是svg+canvas画笔，如果你只用到了一种，比如canvas,可以这样改造：
 *
 * import {painter_canvas2D} from 'image2d/src/export.js';
 * image2D.extend({
 *      painter:painter_canvas2D
 * });
 *
 * 除了一些比较重的部分外，查阅文档 { https://hai2007.gitee.io/image2d/index.html } 的时候，需要什么再挂载什么即可，
 * 无论是这个的按需导入，还是全部导入，都可以查阅文档，并保证向后兼容。
 */

import image2D from './library/core';

/**
 * 静态方法
 */
import treeLayout from './library/layout/tree';
import pieLayout from './library/layout/pie';
import Matrix4 from '@hai2007/tool/Matrix4';
import animation from './library/calculate/animation';
import cardinal from './library/interpolate/Cardinal';
import { rotate, move, scale, dot } from './library/calculate/transform';
import { formatColor, getRandomColors } from './library/calculate/color';
import { stopPropagation, preventDefault } from './library/xhtml/event';
import map from './library/map/index';

/**
 * 对象方法
 */
import { appendTo, prependTo, afterTo, beforeTo, remove, filter, text, html } from './library/xhtml/dom';
import { size } from './library/xhtml/calculate';
import style from './library/xhtml/style';
import attribute from './library/xhtml/attribute';
import { datum, data, enter, exit, loop } from './library/xhtml/data';
import { bind, unbind, position } from './library/xhtml/event';
import painter from './library/painter';
import layer from './library/canvas2D/layer';

/**
 * 部分比较重的部分，我们进行切割
 */

import painter_canvas2D from './library/canvas2D/painter';
import painter_svg from './library/svg/painter';

// 位图画笔
let painterCanvas2D = function () { return painter_canvas2D(this[0], arguments[0]); };

// 矢图画笔
let painterSVG = function () { return painter_svg(this[0], arguments[0]); };

// 校对名称和接口文档一致
let css = style;
let attr = attribute;

export {
    image2D,

    treeLayout,
    pieLayout,
    Matrix4,
    animation,
    cardinal,
    rotate,
    move,
    scale,
    dot,
    formatColor,
    getRandomColors,
    stopPropagation,
    preventDefault,
    map,

    appendTo,
    prependTo,
    afterTo,
    beforeTo,
    remove,
    filter,
    text,
    html,
    size,
    css,
    attr,
    datum,
    data,
    enter,
    exit,
    loop,
    bind,
    unbind,
    position,
    painter,
    painterCanvas2D,
    painterSVG,
    layer

};
