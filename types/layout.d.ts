
export interface treeLayout_options {
    /**
     * 配置树图的类型（默认原始模型，会忽略下列全部设置）
     */
    type: "LR" | "RL" | "BT" | "TB" | "circle",

    /**
     * 设置树图的宽（如果类型是LR|RL|BT|TB需要设置）
     */
    width: number,

    /**
     * 设置树图的高（如果类型是LR|RL|BT|TB需要设置）
     */
    height: number,

    /**
     * 设置圆心x（如果类型是circle需要设置）
     */
    cx: number,

    /**
     * 设置圆心y（如果类型是circle需要设置）
     */
    cy: number,

    /**
     * 设置树图半径（如果类型是circle需要设置）
     */
    radius: number,

    /**
     * 开始弧度（可选，如果类型是circle设置该参数有效）
     */
    "begin-deg": number,

    /**
     * 跨越弧度（可选，如果类型是circle设置该参数有效）
     */
    deg: number
}

/**
 * 树布局
 */
export interface treeLayout {

    /**
     * 配置绘图方法
     */
    drawer(doit: Function): treeLayout,

    /**
     * 配置布局
     */
    config(config: treeLayout_options): treeLayout

}


export interface pieLayout_options {

    /**
     * 饼图中一个瓣的中心参考半径，可以有多个[可选]
     */
    "radius": Array<number>,

    /**
     * 饼图中心坐标x
     */
    "cx": number,

    /**
     * 饼图中心坐标y
     */
    "cy": number

}

/**
 * 饼布局
 */
export interface pieLayout {

    /**
    * 配置绘图方法
    */
    drawer(doit: Function): pieLayout,

    /**
     * 配置布局
     */
    config(config: pieLayout_options): pieLayout

}