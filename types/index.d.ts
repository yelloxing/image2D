
interface _gradient {

    addColorStop(): _gradient,
    value(): String

}

interface _painter {

    // 配置画笔

    config(): _painter,

    // 位图画笔

    toDataURL(): String,
    clearRect(): _painter,
    drawImage(): _painter,

    // 矢图画笔

    bind(): _painter,
    appendTo(): _painter,
    prependTo(): _painter,
    afterTo(): _painter,
    beforeTo(): _painter,

    // 绘图方法

    fillText(): _painter,
    strokeText(): _painter,
    fillArc(): _painter,
    strokeArc(): _painter,
    fillCircle(): _painter,
    strokeCircle(): _painter,
    fillRect(): _painter,
    strokeRect(): _painter,

    // 路径

    beginPath(): _painter,
    closePath(): _painter,
    moveTo(): _painter,
    lineTo(): _painter,
    arc(): _painter,
    quadraticCurveTo(): _painter,
    bezierCurveTo(): _painter,
    fill(): _painter,
    stroke(): _painter,

    // 渐变色

    createLinearGradient(): _gradient,
    createRadialGradient(): _gradient,

    // 变换

    save(): _painter,
    restore(): _painter,
    translate(): _painter,
    rotate(): _painter,
    scale(): _painter

}

// 对象
interface _ {

    // 结点操作

    filter(): _
    appendTo(): _
    prependTo(): _
    afterTo(): _
    beforeTo(): _
    remove(): _
    text(): String,
    size(): { width: number, height: number },
    css(): any,
    attr(): any,
    bind(): _,
    unbind(): _,
    position(): { x: number, y: number },
    stopPropagation(): _,
    preventDefault(): _,

    // 数据绑定

    datum(): any,
    data(): any,
    enter(): _,
    exit(): _,
    loop(): _,

    // 画笔

    painter(): _painter

}

declare function image2D(): _

interface _dot {

    rotate(): _dot,
    move(): _dot,
    scale(): _dot,
    value(): Array<number>

}

interface _Matrix4 {

    value(): Array<number>,
    multiply(): _Matrix4,
    use(): Array<number>,
    move(): _Matrix4,
    scale(): _Matrix4,
    rotate(): _Matrix4

}

interface _Cardinal {

    setT(): _Cardinal,
    setP(): _Cardinal

}

interface _layout {

    drawer(): _layout,
    config(): _layout

}

interface _layer {

    painter(): _painter,
    delete(): _layer,
    update(): _layer,
    hidden(): _layer,
    show(): _layer

}

// 类
declare namespace image2D {

    // 二维坐标变换

    let rotate: () => Array<number>
    let move: () => Array<number>
    let scale: () => Array<number>
    let dot: () => _dot

    // 矩阵坐标变换

    let Matrix4: () => _Matrix4

    // 曲线插值
    let cardinal: () => _Cardinal

    // 布局

    let treeLayout: () => _layout
    let pieLayout: () => _layout

    // 位图图层

    let layer: () => _layer

    // 工具

    let animation: () => Function
    let formatColor: () => Array<number>
    let getRandomColors: () => Array<String>

}
