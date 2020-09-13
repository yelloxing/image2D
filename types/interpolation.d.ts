
/**
 * Cardinal插值函数
 */
export interface cardinal {

    /**
     * 设置张弛系数
     * @param t 该参数用于调整曲线走势，默认数值t=0，分水岭t=-1，|t-(-1)|的值越大，曲线走势调整的越严重
     */
    setT(t: number): cardinal,

    /**
     * 设置点的位置
     * @param points 格式：[[x,y],[x,y],...]
     */
    setP(pointArray: Array<Array<number>>): cardinal

}