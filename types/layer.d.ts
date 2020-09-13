import { painter } from "./painter.d";

/**
 * 位图图层
 */
export interface layer {

    /**
     * 通过传递id获取对应图层的画笔
     */
    painter(id: any): painter,

    /**
    * 删除指定图层
    */
    delete(id: any): layer,

    /**
    * 图层中的内容不会显示在画布上，为了显示在画布上，需要手动更新
    */
    update(): layer,

    /**
    * 隐藏图层
    */
    hidden(id: any): layer,

    /**
    * 显示图层
    */
    show(id: any): layer

}