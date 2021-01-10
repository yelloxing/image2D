import animation from '@hai2007/tool/animation.js';
import { isFunction, isArray } from '@hai2007/tool/type';
import Hermite from '@hai2007/tool/Hermite';

/**
 * 轮询动画
 * @param {function} doback 轮询触发方法
 * @param {number} time 动画时长，可选
 * @param {function} callback 动画结束回调，可选
 * @param {array|string} timing 动画进度控制参数，可选
 *
 * @return {function} stop函数，可以提前停止动画
 */
export default function (doback, time, callback, timing) {

    if (!isFunction(callback)) {
        timing = callback;
        callback = false;
    }

    // 获取插值计算参数
    let transition_timing = {
        "ease": [0.25, 0.1, 0.5, 1],
        "ease-in": [0.5, 0.0, 0.75, 0.6],
        "ease-in-out": [0.43, 0.01, 0.58, 1],
        "ease-out": [0.25, 0.6, 0.5, 1],
        "linear": "default"
    }[timing] || timing;

    let transition_timing_function = deep => deep;
    if (transition_timing && isArray(transition_timing) && transition_timing.length == 4) {
        transition_timing_function = Hermite({
            "u": 1
        }).setP(0, 0, 1, 1, transition_timing[1] / transition_timing[0], (1 - transition_timing[3]) / (1 - transition_timing[2]));
    }

    return animation(deep => {
        doback(transition_timing_function(deep));
    }, time, deep => {
        if (isFunction(callback)) {
            if (deep != 1) deep = transition_timing_function(deep);
            callback(deep);
        }
    });

};
