import { gradient } from "./gradient.d";
import { image2D_Object } from "./image2D.d";

interface painter_config {

    /**
     * 填充色或图案，默认"#000"
     */
    fillStyle: string,

    /**
     * 轮廓色或图案，默认"#000"
     */
    strokeStyle: string,

    /**
     * 线条宽度，默认1(单位px)
     */
    lineWidth: number,

    /**
     * 文字水平对齐方式，默认"left"左对齐（还有"center"居中和"right"右对齐）
     */
    textAlign: string,

    /**
     * 文字垂直对齐方式，默认"middle"垂直居中（还有"top"上对齐和"bottom"下对齐）
     */
    textBaseline: string,

    /**
     * 文字大小，默认16
     */
    "font-size": number,

    /**
     * 字体，默认"sans-serif"
     */
    "font-family": string,

    /**
     * 圆弧开始端闭合方式，默认"butt"直线闭合（还有"round"圆帽闭合）
     */
    "arc-start-cap": string,

    /**
     * 圆弧结束端闭合方式，默认"butt"直线闭合（还有"round"圆帽闭合）
     */
    "arc-end-cap": string,

    /**
     * 设置线条虚线，默认为[]表示使用实线绘制
     * 
     * 值应该是一个数组，格式：[实线长，虚线长，实线长 ...]，数组长度任意，会自动循环
     */
    lineDash: string

}

/**
 * 画笔
 */
export interface painter {

    // 配置画笔

    /**
     * 对画笔进行配置
     */
    config(option: painter_config): painter,

    // 位图画笔

    /**
     * 【canvas画笔独有】把当前绘制的图形变成base64返回
     */
    toDataURL(): string,

    /**
     * 【canvas画笔独有】擦除画笔上的一个矩形区域
     * @param x 可选，区域左上角X坐标
     * @param y 可选，区域左上角y坐标
     * @param width 可选，区域的宽
     * @param height 可选，区域的高
     */
    clearRect(x: number, y: number, width: number, height: number): painter,

    /**
     * 【canvas画笔独有】把图像、画布或视频绘制到画布的指定位置上
     * 
     * (img, x, y):在画布上定位图像。
     * 
     * (img, x, y, width, height):在画布上定位图像，并规定图像的宽度和高度。
     * 
     * (img, sx, sy, swidth, sheight, x, y, width, height):剪切图像，并在画布上定位被剪切的部分。
     */
    drawImage(): painter,

    // 矢图画笔

    /**
     * 【svg画笔独有】当前画笔绘制的目标节点
     * @param selector 选择器，查找上下文固定为当前svg画布
     */
    bind(selector: Function | Element | string | image2D_Object | Array<Element | image2D_Object>): painter,

    /**
     * 【svg画笔独有】把当前维护的结点加到目标结点内部的结尾
     * @param selector 可选，选择器，查找上下文固定为当前svg画布
     */
    appendTo(selector: Function | Element | string | image2D_Object | Array<Element | image2D_Object>): painter,

    /**
     * 【svg画笔独有】把当前维护的结点加到目标结点内部的开头
     * @param selector 可选，选择器，查找上下文固定为当前svg画布
     */
    prependTo(selector: Function | Element | string | image2D_Object | Array<Element | image2D_Object>): painter,

    /**
     * 【svg画笔独有】把当前维护的结点加到目标结点之后
     * @param selector 可选，选择器，查找上下文固定为当前svg画布
     */
    afterTo(selector: Function | Element | string | image2D_Object | Array<Element | image2D_Object>): painter,

    /**
     * 【svg画笔独有】把当前维护的结点加到目标结点之前
     * @param selector 可选，选择器，查找上下文固定为当前svg画布
     */
    beforeTo(selector: Function | Element | string | image2D_Object | Array<Element | image2D_Object>): painter,

    // 画笔上的绘图方法

    /**
     * 绘制一个实心文字
     * @param text 需要绘制的文字
     * @param x 绘制位置的x坐标
     * @param y 绘制位置的y坐标
     * @param deg 可选，文字旋转角度
     */
    fillText(text: any, x: number, y: number, deg: number): painter,

    /**
     * 绘制一个空心文字
     * @param text 需要绘制的文字
     * @param x 绘制位置的x坐标
     * @param y 绘制位置的y坐标
     * @param deg 可选，文字旋转角度
     */
    strokeText(text: any, x: number, y: number, deg: number): painter,

    /**
     * 绘制一个空实心文字
     * @param text 需要绘制的文字
     * @param x 绘制位置的x坐标
     * @param y 绘制位置的y坐标
     * @param deg 可选，文字旋转角度
     */
    fullText(text: any, x: number, y: number, deg: number): painter,

    /**
     * 绘制一个实心的圆弧
     * @param cx 圆弧的圆心x坐标
     * @param cy 圆弧的圆心y坐标
     * @param r1 圆弧的内半径
     * @param r2 圆弧的外半径
     * @param beginDeg 开始弧度
     * @param deg 跨越弧度
     */
    fillArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number): painter,

    /**
     * 绘制一个空心的圆弧
     * @param cx 圆弧的圆心x坐标
     * @param cy 圆弧的圆心y坐标
     * @param r1 圆弧的内半径
     * @param r2 圆弧的外半径
     * @param beginDeg 开始弧度
     * @param deg 跨越弧度
     */
    strokeArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number): painter,

    /**
     * 绘制一个空实心的圆弧
     * @param cx 圆弧的圆心x坐标
     * @param cy 圆弧的圆心y坐标
     * @param r1 圆弧的内半径
     * @param r2 圆弧的外半径
     * @param beginDeg 开始弧度
     * @param deg 跨越弧度
     */
    fullArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number): painter,

    /**
     * 绘制一个实心的圆
     * @param cx 圆心x坐标
     * @param cy 圆心y坐标
     * @param r 圆的半径
     */
    fillCircle(cx: number, cy: number, r: number): painter,

    /**
     * 绘制一个空心的圆
     * @param cx 圆心x坐标
     * @param cy 圆心y坐标
     * @param r 圆的半径
     */
    strokeCircle(cx: number, cy: number, r: number): painter,

    /**
     * 绘制一个空实心的圆
     * @param cx 圆心x坐标
     * @param cy 圆心y坐标
     * @param r 圆的半径
     */
    fullCircle(cx: number, cy: number, r: number): painter,

    /**
     * 绘制一个实心的矩形
     * @param x 可选，区域左上角X坐标
     * @param y 可选，区域左上角y坐标
     * @param width 可选，区域的宽
     * @param height 可选，区域的高
     */
    fillRect(x: number, y: number, width: number, height: number): painter,

    /**
     * 绘制一个空心的矩形
     * @param x 可选，区域左上角X坐标
     * @param y 可选，区域左上角y坐标
     * @param width 可选，区域的宽
     * @param height 可选，区域的高
     */
    strokeRect(x: number, y: number, width: number, height: number): painter,

    /**
     * 绘制一个空实心的矩形
     * @param x 可选，区域左上角X坐标
     * @param y 可选，区域左上角y坐标
     * @param width 可选，区域的宽
     * @param height 可选，区域的高
     */
    fullRect(x: number, y: number, width: number, height: number): painter,

    // 路径

    /**
     * 开始一段独立的路径
     */
    beginPath(): painter,

    /**
     * 闭合当前路径，也就是路径首尾闭合
     */
    closePath(): painter,

    /**
     * 画笔移动到点(x, y)，此时笔离开了画布
     */
    moveTo(x: number, y: number): painter,

    /**
     * 画笔移动到点(x, y)，此时笔没有离开画布
     */
    lineTo(x: number, y: number): painter,

    /**
     * 以(cx, cy)为圆心，半径r，从弧度beginDeg开始，跨越弧度deg画弧，此时笔没有离开画布
     */
    arc(cx: number, cy: number, r: number, beginDeg: number, deg: number): painter,

    /**
     * 二次贝塞尔曲线到
     * @param cpx 控制点x坐标
     * @param cpy 控制点y坐标
     * @param x 终点x坐标
     * @param y 终点y坐标
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): painter,

    /**
     * 三次贝塞尔曲线到
     * @param cpx1 控制点1的x坐标
     * @param cpy1 控制点1的y坐标
     * @param cpx2 控制点2的x坐标
     * @param cpy2 控制点2的y坐标
     * @param x 终点x坐标
     * @param y 终点y坐标
     */
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): painter,

    /**
     * 把当前路径包裹的区域填充颜色
     */
    fill(): painter,

    /**
     * 把当前路径上色（轮廓线）
     */
    stroke(): painter,

    /**
     * 把当前路径画上轮廓线并填充颜色到当前路径所包裹的区域
     */
    full(): painter,

    // 渐变色

    /**
     * 创建线性渐变对象
     * @param x1 渐变的起点x坐标
     * @param y1 渐变的起点y坐标
     * @param x2 渐变的终点x坐标
     * @param y2 渐变的终点y坐标
     * 
     * 特别注意：canvas画笔上述参数的单位是px，svg画笔上述参数是%
     */
    createLinearGradient(x1: number, y1: number, x2: number, y2: number): gradient,

    /**
     * 创建环形渐变对象
     * @param cx 渐变的起点x坐标
     * @param cy 渐变的起点y坐标
     * @param r 渐变半径
     * 
     * 特别注意：canvas画笔上述参数的单位是px，svg画笔上述参数是%
     */
    createRadialGradient(cx: number, cy: number, r: number): gradient,

    // 变换

    /**
     * 保存当前的绘图状态
     */
    save(): painter,

    /**
     * 恢复之前保存的绘图状态
     */
    restore(): painter,

    /**
     * 把绘图的原点x坐标增加dx，y增加dy
     */
    translate(dx: number, dy: number): painter,

    /**
     * 围绕原点旋转deg
     */
    rotate(deg: number): painter,

    /**
     * x坐标和y坐标分别缩放sx和sy倍（sy缺省取sx）
     */
    scale(sx: number, sy: number): painter

}