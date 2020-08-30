import image2D from './library/core';

/**
 * 挂载静态方法
 * -------------------
 * 这里挂载的方法可以通过image2D.XXX()形式直接调用
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
image2D.extend({

    // 布局
    treeLayout, pieLayout,

    // 矩阵变换
    Matrix4,

    // 二维简单变换
    rotate, move, scale, dot,

    // 动画类
    animation,

    // 插值类计算
    cardinal,

    // 色彩类
    formatColor, getRandomColors,

    // 事件相关
    stopPropagation, preventDefault,

    // 地图映射
    map

});

/**
 * 挂载对象方法
 * -------------------
 * 为了使用这里的方法，首先需要建立image2D对象：
 *      let imageObject=image2D(selector);
 * 然后在对象上就可以调用下面的方法了：
 *      imageObject.XXX()
 * image2D对象上调用的方法和静态方法的区别在于
 * 后者只是单纯的方法，前者是针对image2D对象维护的结点进行操作
 */
import { appendTo, prependTo, afterTo, beforeTo, remove, filter, text, html } from './library/xhtml/dom';
import { size } from './library/xhtml/calculate';
import style from './library/xhtml/style';
import attribute from './library/xhtml/attribute';
import { datum, data, enter, exit, loop } from './library/xhtml/data';
import { bind, unbind, position } from './library/xhtml/event';
import painter from './library/painter';
import layer from './library/canvas2D/layer';
image2D.prototype.extend({

    // 结点操作
    appendTo, prependTo, afterTo, beforeTo, remove, filter, text, html, size,

    // 结点属性或样式操作
    css: style, attr: attribute,

    // 结点和数据绑定
    datum, data, enter, exit, loop,

    // 结点事件
    bind, unbind, position,

    // 自定义画笔
    painter,

    // 图层
    layer

});

image2D.fn = image2D.prototype;

export default image2D;
