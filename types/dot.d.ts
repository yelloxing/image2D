import { point } from './type';

/**
 * 点
 */
export interface dot {

    /**
     * 前进方向以当前位置为中心，旋转deg度
     * 
     * 注意：改变的是前进方向，不是当前坐标
     */
    rotate(deg): dot,

    /**
     * 沿着当前前进方向前进d
     */
    move(d): dot,

    /**
     * 围绕中心坐标缩放
     */
    scale(times): dot,

    /**
     * 返回当前位置
     */
    value(): point

}