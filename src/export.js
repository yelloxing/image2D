/**
 * 如果是一个基于image2D开发的项目，你可以导入这份image2D来帮助你减小打包后的文件大小
 * 温馨提示：这里导出的接口是稳定的，请放心进行二次开发
 */

import image2D from './library/core';

/**
 * 静态方法
 */
import treeLayout from './library/layout/tree';
import pieLayout from './library/layout/pie';
import Matrix4 from '@yelloxing/core.js/tools/Matrix4';
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
    style,
    attribute,
    datum,
    data,
    enter,
    exit,
    loop,
    bind,
    unbind,
    position,
    painter,
    layer

};