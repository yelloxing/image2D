import { point3 } from './type.d';

/**
 * 矩阵对象
 */
export interface matrix4 {

    /**
     * 返回matrix4当前记录的内部矩阵
     */
    value(),

    /**
     * 二个矩阵相乘
     * @param newMatrix4 矩阵对象
     * @param flag 可选，默认false，表示左乘，即newMatrix4 × matrix4，如果设置true，表示右乘
     */
    multiply(newMatrix4: matrix4, flag: boolean): matrix4,

    /**
     * 把变换矩阵作用在具体的点上
     */
    use(x: number, y: number, z: number, w: number): point3,

    /**
     * 沿着向量(a, b, c)方向移动距离dis（其中c可以不传，默认0）
     */
    move(dis: number, a: number, b: number, c: number): matrix4,

    /**
     * 以点(cx, cy, cz)为中心，分别在x、y和z方向上缩放xTimes、yTimes和zTimes倍（其中cx、cy和cz都可以不传递，默认0）
     */
    scale(xTimes: number, yTimes: number, zTimes: number, cx: number, cy: number, cz: number): matrix4,

    /**
     * 围绕射线(a1, b1, c1) -> (a2, b2, c2)旋转deg度（方向由右手法则确定）
     */
    rotate(deg: number, a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): matrix4,

}