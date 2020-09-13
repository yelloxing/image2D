import { image2D_Object } from "./image2D.d";
import { point } from './type.d';
import { dot } from './dot.d';
import { matrix4 } from './matrix4.d';
import { cardinal } from './interpolation.d';
import { treeLayout_options, treeLayout, pieLayout_options, pieLayout } from './layout.d';
import { map_options, map } from './map.d';

/**
 * 返回image2D对象
 * @param selector 选择器
 * @param context 可选，查找上下文
 */
declare function image2D(selector: Function | Element | string | image2D_Object | Array<Element | image2D_Object>, context: Element): image2D_Object;

export default image2D;

/**
 * image2D静态方法
 */

// 事件

/**
 * 阻止冒泡
 */
image2D.stopPropagation = (event: Event): image2D => { };

/**
 * 阻止默认事件
 */
image2D.preventDefault = (event: Event): image2D => { };

// 二维坐标变换

/**
 * 点（x,y）围绕中心（cx,cy）旋转deg度
 */
image2D.rotate = (cx: number, cy: number, deg: number, x: number, y: number): point => { };

/**
 * 点（x,y）沿着向量（ax,ay）方向移动距离d
 */
image2D.move = (ax: number, ay: number, d: number, x: number, y: number): point => { };

/**
 * 点（x,y）围绕中心（cx,cy）缩放times倍
 */
image2D.scale = (cx: number, cy: number, times: number, x: number, y: number): point => { };

/**
 * 获取一个dot实例
 */
image2D.dot = (init: {
    d: [dx: number, dy: number],
    c: [cx: number, cy: number],
    p: [x: number, y: number]
}): dot => { };

/**
 * 返回一个矩阵对象
 * @param initMatrix4 一个初始化矩阵或默认采用单位矩阵E初始化
 */
image2D.Matrix4 = (initMatrix4): matrix4 => { };

// 曲线插值

/**
 * 获取Cardinal插值对象实例
 */
image2D.cardinal = (): cardinal => { };

// 布局

/**
 *  树布局
 */
image2D.treeLayout = (config: treeLayout_options): treeLayout => { };

/**
 * 饼布局
 */
image2D.pieLayout = (config: pieLayout_options): pieLayout => { };

// 地图坐标映射

/**
 * 获取地图投影对象
 */
image2D.map = (config: map_options): map => { };

// 一些补充

/**
 * 动画方法
 */
image2D.animation = (doit: Function, speeds: number, endBack: Function, timing): Function => { };

/**
 * 定任意一个合法的css颜色字符串，把颜色统一转变成rgba格式，返回一个数组[r,g,b,a]
 */
image2D.formatColor = (colorString: string): Array => { };

/**
 * 传递需要的颜色个数，返回一组随机色彩
 */
image2D.getRandomColors = (num: number): Array => { };