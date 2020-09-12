import { image2D_Object } from "./image2D.d";

/**
 * 返回image2D对象
 * @param selector 选择器
 * @param context 可选，查找上下文
 */
declare function image2D(selector: Function | Element | string | image2D_Object | Array<Element | image2D_Object>, context: Element): image2D_Object;

export default image2D;