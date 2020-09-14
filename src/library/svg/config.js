import isElement from '@yelloxing/core.js/isElement';
import arc from '../calculate/graphic/arc';
import toNode from '../../core/to-node';

export default function (key, value) {

    // 文字水平对齐方式
    if (key === 'textAlign') {
        return {
            "left": "start",
            "right": "end",
            "center": "middle"
        }[value] || value;
    }

    return value;
};

// 文字统一设置方法
export let initText = function (painter, config, x, y, deg) {
    if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'text') throw new Error('Need a <text> !');

    deg = deg % (Math.PI * 2);

    // 垂直对齐采用dy实现
    painter.attr('dy', {
        "top": config['font-size'] * 0.5,
        "middle": 0,
        "bottom": -config['font-size'] * 0.5,
    }[config.textBaseline])
        .css({

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
export let initArc = function (painter, config, cx, cy, r1, r2, beginDeg, deg) {

    if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'path') throw new Error('Need a <path> !');

    beginDeg = beginDeg % (Math.PI * 2);

    if (r1 > r2) {
        let temp = r1;
        r1 = r2;
        r2 = temp;
    }

    // 当|deg|>=2π的时候都认为是一个圆环
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 1.999999;
    } else {
        deg = deg % (Math.PI * 2);
    }

    arc(beginDeg, deg, cx, cy, r1, r2, function (
        beginA, endA,
        begInnerX, begInnerY,
        begOuterX, begOuterY,
        endInnerX, endInnerY,
        endOuterX, endOuterY,
        r
    ) {
        let f = (endA - beginA) > Math.PI ? 1 : 0,
            d = "M" + begInnerX + " " + begInnerY;
        if (r < 0) r = -r;
        d +=
            // 横半径 竖半径 x轴偏移角度 0小弧/1大弧 0逆时针/1顺时针 终点x 终点y
            "A" + r1 + " " + r1 + " 0 " + f + " 1 " + endInnerX + " " + endInnerY;
        // 结尾
        if (config["arc-end-cap"] != 'round')
            d += "L" + endOuterX + " " + endOuterY;
        else
            d += "A" + r + " " + r + " " + " 0 1 0 " + endOuterX + " " + endOuterY;
        d += "A" + r2 + " " + r2 + " 0 " + f + " 0 " + begOuterX + " " + begOuterY;
        // 开头
        if (config["arc-start-cap"] != 'round')
            d += "L" + begInnerX + " " + begInnerY;
        else
            d += "A" + r + " " + r + " " + " 0 1 0 " + begInnerX + " " + begInnerY;
        painter.attr('d', d + "Z");
    });
    return painter;
};

// 画圆统一设置方法
export let initCircle = function (painter, cx, cy, r) {
    if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'circle') throw new Error('Need a <circle> !');
    painter.attr({
        "cx": cx,
        "cy": cy,
        "r": r
    });
    return painter;
};

// 路径统一设置方法
export let initPath = function (painter, path) {
    if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'path') throw new Error('Need a <path> !');
    painter.attr('d', path);
    return painter;
};

// 画矩形统一设置方法
export let initRect = function (painter, x, y, width, height) {
    if (!painter || painter.length <= 0 || painter[0].nodeName.toLowerCase() !== 'rect') throw new Error('Need a <rect> !');

    // 由于height和宽不可以是负数，校对一下

    if (height < 0) { height *= -1; y -= height; }

    if (width < 0) { width *= -1; x -= width; }

    painter.attr({
        "x": x,
        "y": y,
        "width": width,
        "height": height
    });
    return painter;
};

export let initDefs = function (target) {
    let defs = target.getElementsByTagName('defs');
    if (defs.length <= 0) {
        defs = [toNode("<defs>", "SVG")];
        target.appendChild(defs[0]);
    }
    return defs[0];
};
