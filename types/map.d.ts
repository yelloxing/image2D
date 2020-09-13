
export interface map_options {

    /**
     * 配置统一类型，默认‘eoap’，表示使用「等角斜方位投影」
     */
    type: string,

    /**
     * 设置缩放比例，默认1
     */
    scale: number,

    /**
     * 设置旋转中心，你可以把你绘制的部分的中心的经纬度设置为中心，默认[107, 36]
     */
    center: [longitude: number, latitude: number]
}

/**
 * 地图投影对象
 */
export interface map {

    /**
     * 配置地图投影 
     */
    config(config: map_options): map

}