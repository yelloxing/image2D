import { gradient } from "./gradient.d";

interface painter_config {

    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
    textAlign: string,
    textBaseline: string,
    "font-size": number,
    "font-family": string,
    "arc-start-cap": string,
    "arc-end-cap": string,
    lineDash: string

}

export interface painter {

    // 配置画笔

    config(option: painter_config): painter,

    // 位图画笔

    toDataURL(): string,
    clearRect(x: number, y: number, width: number, height: number): painter,
    drawImage(): painter,

    // 矢图画笔

    bind(): painter,
    appendTo(): painter,
    prependTo(): painter,
    afterTo(): painter,
    beforeTo(): painter,

    // 画笔上的绘图方法

    fillText(text: any, x: number, y: number, deg: number): painter,
    strokeText(text: any, x: number, y: number, deg: number): painter,
    fullText(text: any, x: number, y: number, deg: number): painter,

    fillArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number): painter,
    strokeArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number): painter,
    fullArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number): painter,

    fillCircle(cx: number, cy: number, r: number): painter,
    strokeCircle(cx: number, cy: number, r: number): painter,
    fullCircle(cx: number, cy: number, r: number): painter,

    fillRect(x: number, y: number, width: number, height: number): painter,
    strokeRect(x: number, y: number, width: number, height: number): painter,
    fullRect(x: number, y: number, width: number, height: number): painter,

    // 路径

    beginPath(): painter,
    closePath(): painter,
    moveTo(x: number, y: number): painter,
    lineTo(x: number, y: number): painter,
    arc(cx: number, cy: number, r: number, beginDeg: number, deg: number): painter,
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): painter,
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): painter,
    fill(): painter,
    stroke(): painter,
    full(): painter,

    // 渐变色

    createLinearGradient(x1: number, y1: number, x2: number, y2: number): gradient,
    createRadialGradient(cx: number, cy: number, r: number): gradient,

    // 变换

    save(): painter,
    restore(): painter,
    translate(dx: number, dy: number): painter,
    rotate(deg: number): painter,
    scale(sx: number, sy: number): painter

}