import { point } from './type';

/**
 * 点对象
 */
export interface dot {

    /**
     * 前进方向以当前位置为中心，旋转deg度
     * 
     * 注意：改变的是前进方向，不是当前坐标
     */
    rotate(deg: number): dot,

    /**
     * 沿着当前前进方向前进d
     */
    move(d: number): dot,

    /**
     * 围绕中心坐标缩放
     */
    scale(times: number): dot,

    /**
     * 返回当前位置
     */
    value(): point

}