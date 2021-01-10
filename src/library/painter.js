import painter_canvas2D from './canvas2D/painter';
import painter_svg from './svg/painter';
import { isElement } from '@hai2007/tool/type';

// 统一画笔
// 负责启动具体的绘图对象
export default function () {

    // 因为绘图画布是必须的，因此在判断画布类型前，如果压根没有结点，肯定是非法的
    if (!isElement(this[0])) throw new Error('Target empty!');

    let target = this[0], nodeName = target.nodeName.toLowerCase();

    // canvas2D
    if (nodeName === 'canvas') return painter_canvas2D(target, arguments[0]);

    // svg
    if (nodeName === 'svg') return painter_svg(target, arguments[0]);

    throw new Error('Painter is not a function!');
};
