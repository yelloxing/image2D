import { painter } from "./painter.d";

export interface image2D_Object {

    // 基本的DOM操作

    filter(): image2D_Object,
    appendTo(): image2D_Object,
    prependTo(): image2D_Object,
    afterTo(): image2D_Object,
    beforeTo(): image2D_Object,
    remove(): image2D_Object,

    // 结点查询等

    text(): any,
    html(): any,
    size(): {
        width: number,
        height: number
    },
    css(): any,
    attr(): any,

    // 事件

    bind(): image2D_Object,
    unbind(): image2D_Object,
    position(): {
        x: number,
        y: number
    },

    // 数据绑定

    datum(): image2D_Object,
    data(): image2D_Object,
    enter(): image2D_Object,
    exit(): image2D_Object,
    loop(): image2D_Object,

    // 画笔

    painter(): painter

}