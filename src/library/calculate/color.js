import getStyle from '../../core/get-style';
import { REGEXP } from '../../core/config';

// 把颜色统一转变成rgba(x,x,x,x)格式
// 返回数字数组[r,g,b,a]
export let formatColor = function (color) {
    let colorNode = document.getElementsByTagName('head')[0];
    colorNode.style['color'] = color;
    let rgba = getStyle(colorNode, 'color');
    let rgbaArray = rgba.replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,' + REGEXP.whitespace));
    return [+rgbaArray[0], +rgbaArray[1], +rgbaArray[2], rgbaArray[3] == undefined ? 1 : +rgbaArray[3]];
};

// 获取一组随机色彩
export let getRandomColors = function (num) {
    let temp = [];
    for (let flag = 1; flag <= num; flag++) {
        temp.push('rgb(' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ')');
    }
    return temp;
};