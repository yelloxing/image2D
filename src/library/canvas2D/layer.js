import image2D from '../core';
import { isElement } from '@hai2007/tool/type';

export default function () {

    if (!isElement(this[0])) throw new Error('Target empty!');

    if (this[0].nodeName.toLowerCase() !== 'canvas') throw new Error('Layer is not a function!');

    // 画笔
    let painter = this.painter(),
        // 图层集合
        layer = {},
        layer_index = [];
    let width = this[0].clientWidth,//内容+内边距
        height = this[0].clientHeight;

    let layerManager = {

        // 获取指定图层画笔
        "painter": function (id) {
            if (!layer[id]) {
                // 初始化的图层都可见
                layer[id] = { "visible": true };

                // 后期可以考虑使用离线画布offScreenCanvas提高效率
                layer[id].canvas = document.createElement('canvas');
                // 设置大小才会避免莫名其妙的错误
                layer[id].canvas.setAttribute('width', width);
                layer[id].canvas.setAttribute('height', height);

                // 标记是图层
                layer[id].canvas.__image2D__layer__ = 'yes';

                layer[id].painter = image2D(layer[id].canvas).painter();

                layer_index.push(id);
            }
            return layer[id].painter;
        },

        // 删除图层
        "delete": function (id) {
            // 删除索引
            for (let i = 0; i < layer_index.length; i++)
                if (layer_index[i] === id) {
                    layer_index.splice(i, 1);
                    break;
                }
            // 删除图层
            delete layer[id];
            return layerManager;
        },

        // 更新内容到画布
        "update": function () {
            painter.clearRect(0, 0, width, height);
            painter.save();

            for (let i = 0; i < layer_index.length; i++) {
                if (layer[layer_index[i]].visible)
                    painter.drawImage(layer[layer_index[i]].canvas, 0, 0, width, height, 0, 0, width, height);
            }
            painter.restore();
            return layerManager;
        },

        // 隐藏图层
        "hidden": function (id) {
            layer[id].visible = false;
            return layerManager;
        },

        // 显示图层
        "show": function (id) {
            layer[id].visible = true;
            return layerManager;
        }
    };

    return layerManager;
};
