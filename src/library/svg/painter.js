import image2D from '../core';
import normalConfig, { initText, initArc, initCircle, initPath, initRect } from './config';
import { linearGradient, radialGradient } from './Gradient';
import { rotate } from '../calculate/transform';

export default function (target, selector) {

    let painter;
    if (selector) painter = image2D(selector, target);

    // 类似canvas画笔的属性
    let config = {

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
    let path = "", currentPosition = [];

    // 变换（和canvas2D的类似，内部维护了用于记录）
    let transform_history = [], transform_current = "";

    // 画笔
    let enhancePainter = {

        // 属性设置或获取
        "config": function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== 'object') return config[arguments[0]];
                for (let key in arguments[0])
                    config[key] = normalConfig(key, arguments[0][key]);
            } else if (arguments.length === 2) config[arguments[0]] = normalConfig(arguments[0], arguments[1]);
            return enhancePainter;
        },

        // 基础方法
        "bind": function (selector) { painter = image2D(selector, target); return enhancePainter; },
        "appendTo": function (selector) { painter.appendTo(selector || target, target); return enhancePainter; },
        "prependTo": function (selector) { painter.prependTo(selector || target, target); return enhancePainter; },
        "afterTo": function (selector) { painter.afterTo(selector || target, target); return enhancePainter; },
        "beforeTo": function (selector) { painter.beforeTo(selector || target, target); return enhancePainter; },

        // 路径
        "beginPath": function () { path = ""; currentPosition = []; return enhancePainter; },
        "closePath": function () { path += "Z"; return enhancePainter; },
        "moveTo": function (x, y) { path += "M" + x + " " + y; currentPosition = [x, y]; return enhancePainter; },
        "lineTo": function (x, y) { path += (path == "" ? "M" : "L") + x + " " + y; currentPosition = [x, y]; return enhancePainter; },
        "arc": function (x, y, r, beginDeg, deg) {
            let begPosition = rotate(x, y, beginDeg, x + r, y);
            let endPosition = rotate(x, y, beginDeg + deg, x + r, y);
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
            path += "A" + r + "," + r + " 0 " + ((deg > 180 || deg < -180) ? 1 : 0) + "," + (deg > 0 ? 1 : 0) + " " + endPosition[0] + "," + endPosition[1];
            return enhancePainter;
        },
        "fill": function () {
            initPath(painter, path).attr('transform', transform_current).attr("fill", config.fillStyle);
            return enhancePainter;
        },
        "stroke": function () {
            initPath(painter, path).attr('transform', transform_current).attr({
                "stroke-width": config.lineWidth,
                "stroke": config.strokeStyle,
                "fill": "none",
                "stroke-dasharray": config.lineDash.join(',')
            });
            return enhancePainter;
        },
        "full": function () {
            initPath(painter, path).attr('transform', transform_current).attr({
                "stroke-width": config.lineWidth,
                "stroke": config.strokeStyle,
                "fill": config.fillStyle,
                "stroke-dasharray": config.lineDash.join(',')
            });
            return enhancePainter;
        },

        "save": function () {
            transform_history.push(transform_current);
            return enhancePainter;
        },
        "restore": function () {
            if (transform_history.length > 0) transform_current = transform_history.pop();
            return enhancePainter;
        },

        // 路径 - 贝塞尔曲线
        "quadraticCurveTo": function (cpx, cpy, x, y) {
            path += "Q" + cpx + " " + cpy + "," + x + " " + y; return enhancePainter;
        },
        "bezierCurveTo": function (cp1x, cp1y, cp2x, cp2y, x, y) {
            path += "C" + cp1x + " " + cp1y + "," + cp2x + " " + cp2y + "," + x + " " + y; return enhancePainter;
        },

        // 文字
        "fillText": function (text, x, y, deg) {
            let returnJSon = initText(painter, config, x, y, deg || 0);
            painter.attr('transform', transform_current + returnJSon.transform).attr("fill", config.fillStyle)[0].textContent = text;
            return enhancePainter;
        },
        "strokeText": function (text, x, y, deg) {
            let returnJSon = initText(painter, config, x, y, deg || 0);
            painter.attr('transform', transform_current + returnJSon.transform).attr({
                "stroke": config.strokeStyle,
                "fill": "none",
                "stroke-dasharray": config.lineDash.join(',')
            })[0].textContent = text;
            return enhancePainter;
        },
        "fullText": function (text, x, y, deg) {
            let returnJSon = initText(painter, config, x, y, deg || 0);
            painter.attr('transform', transform_current + returnJSon.transform).attr({
                "stroke": config.strokeStyle,
                "fill": config.fillStyle,
                "stroke-dasharray": config.lineDash.join(',')
            })[0].textContent = text;
            return enhancePainter;
        },

        // 弧
        "fillArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).attr('transform', transform_current).attr("fill", config.fillStyle);
            return enhancePainter;
        },
        "strokeArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).attr('transform', transform_current).attr({
                "stroke-width": config.lineWidth,
                "stroke": config.strokeStyle,
                "fill": "none",
                "stroke-dasharray": config.lineDash.join(',')
            });
            return enhancePainter;
        },
        "fullArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).attr('transform', transform_current).attr({
                "stroke-width": config.lineWidth,
                "stroke": config.strokeStyle,
                "fill": config.fillStyle,
                "stroke-dasharray": config.lineDash.join(',')
            });
            return enhancePainter;
        },

        // 圆形
        "fillCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).attr('transform', transform_current).attr("fill", config.fillStyle); return enhancePainter;
        },
        "strokeCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).attr('transform', transform_current).attr({
                "stroke-width": config.lineWidth,
                "stroke": config.strokeStyle,
                "fill": "none",
                "stroke-dasharray": config.lineDash.join(',')
            }); return enhancePainter;
        },
        "fullCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).attr('transform', transform_current).attr({
                "stroke-width": config.lineWidth,
                "stroke": config.strokeStyle,
                "fill": config.fillStyle,
                "stroke-dasharray": config.lineDash.join(',')
            }); return enhancePainter;
        },

        // 矩形
        "fillRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).attr('transform', transform_current).attr("fill", config.fillStyle); return enhancePainter;
        },
        "strokeRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).attr('transform', transform_current).attr({
                "stroke-width": config.lineWidth,
                "stroke": config.strokeStyle,
                "fill": "none",
                "stroke-dasharray": config.lineDash.join(',')
            }); return enhancePainter;
        },
        "fullRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).attr('transform', transform_current).attr({
                "stroke-width": config.lineWidth,
                "stroke": config.strokeStyle,
                "fill": config.fillStyle,
                "stroke-dasharray": config.lineDash.join(',')
            }); return enhancePainter;
        },

        /**
         * 渐变
         * -------------
         */

        //  线性渐变
        "createLinearGradient": function (x0, y0, x1, y1) {
            return linearGradient(painter, target, x0, y0, x1, y1);
        },

        // 环形渐变
        "createRadialGradient": function (cx, cy, r) {
            return radialGradient(painter, target, cx, cy, r);
        },

        /**
         * 变换
         * --------------
         */

        //  移动
        "translate": function (x, y) {
            transform_current += ' translate(' + x + ',' + y + ')';
            return enhancePainter;
        },

        //  旋转
        "rotate": function (deg) {
            deg = deg % (Math.PI * 2);
            transform_current += ' rotate(' + (deg / Math.PI * 180) + ')';
            return enhancePainter;
        },

        // 缩放
        "scale": function (x, y) {
            y = y || x;
            transform_current += ' scale(' + x + ',' + y + ')';
            return enhancePainter;
        }

    };

    return enhancePainter;
};
