/**
 * Cardinal三次插值
 * ----------------------------
 * Hermite拟合的计算是，确定二个点和二个点的斜率
 * 用一个y=ax(3)+bx(2)+cx+d的三次多项式来求解
 * 而Cardinal是建立在此基础上
 * 给定需要拟合的二个点和第一个点的前一个点+最后一个点的后一个点
 * 第一个点的斜率由第一个点的前一个点和第二个点的斜率确定
 * 第二个点的斜率由第一个点和第二个点的后一个点的斜率确定
 */

import hermite from '@hai2007/tool/Hermite.js';
import { initConfig } from '../../core/config';

export default function (config) {

    config = initConfig({
        // 该参数用于调整曲线走势，默认数值t=0，分水岭t=-1，|t-(-1)|的值越大，曲线走势调整的越严重
        "t": 0
    }, config);

    let HS, i;

    // 根据x值返回y值
    let cardinal = function (x) {

        if (HS) {
            i = -1;
            // 寻找记录x实在位置的区间
            // 这里就是寻找对应的拟合函数
            while (i + 1 < HS.x.length && (x > HS.x[i + 1] || (i == -1 && x >= HS.x[i + 1]))) {
                i += 1;
            }
            if (i == -1 || i >= HS.h.length)
                throw new Error('Coordinate crossing!');
            return HS.h[i](x);
        } else {
            throw new Error('You shoud first set the position!');
        }

    };

    // 设置张弛系数【应该在点的位置设置前设置】
    cardinal.setT = function (t) {

        if (typeof t === 'number') {
            config.t = t;
        } else {
            throw new Error('Expecting a figure!');
        }
        return cardinal;

    };

    // 设置点的位置
    // 参数格式：[[x,y],[x,y],...]
    // 至少二个点
    cardinal.setP = function (points) {

        HS = {
            "x": [],
            "h": []
        };
        let flag,
            slope = (points[1][1] - points[0][1]) / (points[1][0] - points[0][0]),
            temp;
        HS.x[0] = points[0][0];
        for (flag = 1; flag < points.length; flag++) {
            if (points[flag][0] <= points[flag - 1][0]) throw new Error('The point position should be increamented!');
            HS.x[flag] = points[flag][0];
            // 求点斜率
            temp = flag < points.length - 1 ?
                (points[flag + 1][1] - points[flag - 1][1]) / (points[flag + 1][0] - points[flag - 1][0]) :
                (points[flag][1] - points[flag - 1][1]) / (points[flag][0] - points[flag - 1][0]);
            // 求解二个点直接的拟合方程
            // 第一个点的前一个点直接取第一个点
            // 最后一个点的后一个点直接取最后一个点
            HS.h[flag - 1] = hermite({
                "u": (1 - config.t) * 0.5
            }).setP(points[flag - 1][0], points[flag - 1][1], points[flag][0], points[flag][1], slope, temp);
            slope = temp;
        }
        return cardinal;

    };

    return cardinal;
};
