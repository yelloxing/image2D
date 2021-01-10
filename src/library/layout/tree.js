import treeLayout from '@hai2007/algorithm/tree.js';
import { initConfig } from '../../core/config';
import { rotate } from '../calculate/transform';
import { isFunction } from '@hai2007/tool/type';

export default function (config) {

    config = initConfig({

        // 类型：如果不是下面五种之一，就认为是原始类型
        // type:LR|RL|BT|TB|circle

        // 如果类型是LR|RL|BT|TB需要设置如下参数
        // width,height:宽和高

        // 如果类型是circle需要设置如下参数
        // 1.cx,cy：圆心；2.radius:半径；3.begin-deg,deg：开始和跨越弧度（可选）
        "begin-deg": 0,
        "deg": Math.PI * 2

    }, config);

    let treeCalc = treeLayout()
        // 配置数据格式
        .root(config.root).child(config.child).id(config.id);

    let treeObj = function (initData) {

        // 计算初始坐标
        let orgData = treeCalc(initData);

        // 计算deep
        for (let key in orgData.node) {
            orgData.node[key].deep = orgData.node[key].left - 0.5;
        }

        if (config.type === 'LR' || config.type === 'RL') {

            // 每层间隔
            let dis1 = config.width / orgData.deep;
            if ("RL" === config.type) dis1 *= -1;
            // 兄弟间隔
            let dis2 = config.height / (orgData.size - (-0.5));
            for (let i in orgData.node) {
                let node = orgData.node[i];
                orgData.node[i].left = +(("RL" == config.type ? config.width : 0) - -node.left * dis1).toFixed(7);
                orgData.node[i].top = +(node.top * dis2).toFixed(7);
            }

        } else if (config.type === 'TB' || config.type === 'BT') {

            // 每层间隔
            let dis1 = config.height / orgData.deep;
            if ("BT" == config.type) dis1 *= -1;
            // 兄弟间隔
            let dis2 = config.width / (orgData.size - (-0.5));
            let _left, _top;
            for (let i in orgData.node) {
                let node = orgData.node[i];
                _left = node.left;
                _top = node.top;
                orgData.node[i].top = +(("BT" == config.type ? config.height : 0) - -_left * dis1).toFixed(7);
                orgData.node[i].left = +(_top * dis2).toFixed(7);
            }

        } else if (config.type === 'circle') {

            // 如果只有一个结点
            if (orgData.deep == 1 && orgData.size == 1) {
                orgData.node[orgData.root].left = config.cx;
                orgData.node[orgData.root].top = config.cy;
            }

            // 如果有多个结点
            else {

                // 每层间距
                let dis1 = config.radius / (orgData.deep - 1);
                // 兄弟间隔弧度
                let dis2 = config.deg / (orgData.size - (-0.5));
                for (let i in orgData.node) {
                    let node = orgData.node[i];
                    orgData.node[i].deg = (config['begin-deg'] - (-dis2 * node.top)) % (Math.PI * 2);
                    let pos = rotate(config.cx, config.cy, orgData.node[i].deg, config.cx - (-dis1 * (node.left - 0.5)), config.cy);
                    orgData.node[i].left = +pos[0];
                    orgData.node[i].top = +pos[1];
                }
            }

        }

        // 启动绘图
        if (isFunction(config.drawer)) {

            // 如果配置了绘图方法，就调用绘图方法
            config.drawer(orgData);
            return treeObj;
        } else {

            // 否则返回数据
            return orgData;
        }

    };

    // 配置
    treeObj.config = function (_config) {
        config = initConfig(config, _config);
        return treeObj;
    };

    // 设置绘图方法
    treeObj.drawer = function (drawerback) {
        config.drawer = drawerback;
        return treeObj;
    };

    return treeObj;
};
