import { initConfig } from '../../core/config';
import { rotate } from '../calculate/transform';
import { isFunction, isNumber } from '@hai2007/tool/type';

export default function (config) {

    config = initConfig({

        // 饼图的开始和跨域角度[可选]
        "begin-deg": -Math.PI / 2,
        "deg": Math.PI * 2,

        // 饼图中一个瓣的中心参考半径，可以有多个[可选]
        "radius": [],
        // "cx": "",
        // "cy": "",

        // 设置数据结构[必选]
        // "value": function (data, key, index) { }

    }, config);

    if (!isFunction(config.value)) {
        throw new Error('config.value must be a function!');
    }

    let pieObj = function (initData) {

        let i = 0, innerData = [], allData = 0;
        for (let key in initData) {
            innerData.push({
                "value": config.value(initData[key], key, i),
                "data": initData[key],
                "key": key,
                "index": i,
                "dots": []
            });
            allData += innerData[i].value;
            i += 1;
        }

        for (i = 0; i < innerData.length; i++) {

            // 起始弧度
            innerData[i].beginDeg = i === 0 ? config['begin-deg'] : (innerData[i - 1].beginDeg + innerData[i - 1].deg);

            // 百分比
            let percent = innerData[i].value / allData;

            // 跨越弧度
            innerData[i].deg = percent * config.deg;

            innerData[i].percent = new Number(percent * 100).toFixed(2);

        }

        // 中心点（用于辅助绘制折线）
        if (isNumber(config.cx) && isNumber(config.cy)) {
            for (i = 0; i < config.radius.length; i++) {

                for (let j = 0; j < innerData.length; j++) {
                    innerData[j].dots.push(rotate(
                        config.cx, config.cy,
                        innerData[j].beginDeg + innerData[j].deg * 0.5,
                        config.cx + config.radius[i], config.cy
                    ));
                }

            }
        }

        // 启动绘图
        if (isFunction(config.drawer)) {
            config.drawer(innerData);
            return pieObj;
        } else {
            return innerData;
        }

    };

    // 配置
    pieObj.config = function (_config) {
        config = initConfig(config, _config);
        return pieObj;
    };

    // 设置绘图方法
    pieObj.drawer = function (drawerback) {
        config.drawer = drawerback;
        return pieObj;
    };

    return pieObj;
};
