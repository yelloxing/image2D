
/**
 * 平面点的位置
 */
export interface point {
    x: number,
    y: number
}

/**
 * 空间点的位置
 */
export interface point3 {
    x: number,
    y: number,
    z: number
}

/**
 * 一个矩形的大小
 */
export interface rectSize {
    width: number,
    height: number
}

/**
 * 一个记录刻度尺如何绘制的信息对象
 */
export interface ruler {
    min: number,
    max: number,
    distance: number,
    num: number
    ruler: Array<number>
}
