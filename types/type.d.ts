
/**
 * 平面点的位置
 */
export interface point {

    /** 横坐标 */
    x: number,

    /** 纵坐标 */
    y: number
}

/**
 * 空间点的位置
 */
export interface point3 {

    /** X坐标 */
    x: number,

    /** Y坐标 */
    y: number,

    /** Z坐标 */
    z: number
}

/**
 * 一个矩形的大小
 */
export interface rectSize {

    /** 宽 */
    width: number,

    /** 高 */
    height: number
}

/**
 * 一个记录刻度尺如何绘制的信息对象
 */
export interface ruler {

    /** 最小值 */
    min: number,

    /** 最大值 */
    max: number,

    /** 间距 */
    distance: number,

    /** 间距个数 */
    num: number

    /** 刻度值 */
    ruler: Array<number>
}
