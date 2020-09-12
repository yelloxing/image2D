
/**
 * 渐变色
 */
export interface gradient {

    /**
     * 设置渐变范围以后，你需要在渐变范围中添加渐变色，可以添加任意多个
     * @param deep 取值为闭区间[0, 1]
     * @param color 以是任意合法的颜色值
     */
    addColorStop(deep: number, color: string): gradient,

    /**
     * 返回渐变色，你可以把它看成一种特殊的颜色使用
     */
    value(): any

}