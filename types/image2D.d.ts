import { painter } from "./painter.d";
import { point, rectSize } from "./type.d";
import { layer } from "./layer.d";

/**
 * image2D对象
 */
export interface image2D_Object {

    // 基本的DOM操作

    /**
     * 对维护的结点进行筛选后获取新的结点对象
     * @param filterback 通过返回true或false来判断是否把当前面对的结点加入新创建的结点对象中
     */
    filter(filterback: (index: number, node: Element) => boolean): image2D_Object,

    /**
     * 把当前维护的结点加到目标结点内部的结尾
     * @param target 目标节点
     * @param context 可选，查找上下文
     */
    appendTo(target: Function | Element | string | image2D_Object | Array<Element | image2D_Object>, context: Element): image2D_Object,

    /**
     * 把当前维护的结点加到目标结点内部的开头
     * @param target 目标节点
     * @param context 可选，查找上下文
     */
    prependTo(target: Function | Element | string | image2D_Object | Array<Element | image2D_Object>, context: Element): image2D_Object,

    /**
     * 把当前维护的结点加到目标结点之后
     * @param target 目标节点
     * @param context 可选，查找上下文
     */
    afterTo(target: Function | Element | string | image2D_Object | Array<Element | image2D_Object>, context: Element): image2D_Object,

    /**
     * 把当前维护的结点加到目标结点之前
     * @param target 目标节点
     * @param context 可选，查找上下文
     */
    beforeTo(target: Function | Element | string | image2D_Object | Array<Element | image2D_Object>, context: Element): image2D_Object,

    /**
     * 从页面中删除当前维护的结点
     */
    remove(): image2D_Object,

    // 结点查询等

    /**
     * 设置或获取结点中的文本
     * @param content 可选,文本
     */
    text(content: string): string | image2D_Object,

    /**
     * 设置或获取结点中的xhtml字符串模板（相当于innerHTML）
     * @param xhtmlString 可选，xhtml字符串模板
     */
    html(xhtmlString: string): string | image2D_Object,

    /**
     * 计算结点大小
     * @param type 尺寸类型，有如下可选：
     * 
     * "content":包含内容部分的尺寸。
     * 
     * "padding":内容+内边距。
     * 
     * "border":内容+内边距+边框（默认值）。
     * 
     * "scroll":包含滚动的尺寸（不包括border）
     */
    size(type: 'content' | 'padding' | 'border' | 'scroll'): rectSize,

    /**
     * 修改或获取结点样式:
     * 
     * (key):获取指定样式。
     * 
     * (key,value):设置指定样式。
     * 
     * ():获取全部样式。
     * 
     * (json):设置大量样式。 
     */
    css(): string | image2D_Object,

    /**
     * 设置或获取结点属性:
     * 
     * (attr):获取属性。
     * 
     * (attr,value):设置指定属性值。
     * 
     * (json):设置大量属性。
     */
    attr(): string | image2D_Object,

    // 事件

    /**
     * 给维护的结点绑定事件
     */
    bind(eventType: string, callback: Function): image2D_Object,

    /**
     * 给维护的结点解除绑定事件
     */
    unbind(eventType: string, handler: Function): image2D_Object,

    /**
     * 获取鼠标相对当前维护的元素左上角位置
     * @param event 事件
     */
    position(event: Event): point,

    // 数据绑定

    /**
     * 把数据绑定到一组结点或返回第一个结点数据
     * 
     * 通过具体的参数来判断是获取还是绑定，有下列参数选项可选：
     * 
     * ():不带任何参数表示获取数据。
     * 
     * (data):带一个参数表示设置结点对象维护的全部结点数据为data。
     * 
     * (data, calcback):和带一个参数类似，只不过绑定的数据是经过calcback函数重新计算后返回的值，该函数有二个形参：data和index。
     */
    datum(): image2D_Object,

    /**
     * 把一组数据绑定到一组结点或返回一组结点数据
     * 
    * 通过具体的参数来判断是获取还是绑定，有下列参数选项可选：
    * 
    * ():不带任何参数表示获取数据。
    * 
    * (data):带一个参数表示设置结点对象维护的全部结点数据为data。
    * 
    * (data, calcback):和带一个参数类似，只不过绑定的数据是经过calcback函数重新计算后返回的值，该函数有二个形参：data和index。
    * 
    * @return update
    */
    data(): image2D_Object,

    /**
    * update上的节点追加方法
    * 
    * @param template 模板字符串
    * @param type 可选，表示模板字符串类型
    * 
    * @return enter
    */
    enter(template: string, type: 'svg' | 'html'): image2D_Object,

    /**
     * update上的节点删除方法
     * 
     * 如果结点多于数据，调用exit方法获取多余的结点
     * 
     * @return exit
     */
    exit(): image2D_Object,

    /**
     * 因为当前有用的结点其实是原来的和追加的，因此需要拼接这两者
     * 
     * $$([imageObject, enter]).loop(function(data,index,target){
     * 
     *      //绘制图像
     * 
     *      // data是当前结点对象target维护的数据，index是当前结点对象序号
     * 
     * });
     */
    loop(doback: Function): image2D_Object,

    // 画笔

    /**
     * 画笔：根据当前绑定的结点不同，获取的是不同类型的画笔，目前支持svg和canvas2D画笔
     */
    painter(): painter,

    // 补充

    /**
     * 获取位图图层
     */
    layer(): layer

}