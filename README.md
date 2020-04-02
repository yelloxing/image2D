# 🍇 image2D
使用ECMAScript绘制二维图片。📊📈🎉 Drawing Two-Dimensional Pictures Using ECMAScript.

[![downloads](https://img.shields.io/npm/dm/image2d.svg)](https://yelloxing.github.io/npm-downloads?interval=7&packages=image2d)
[![install size](https://packagephobia.now.sh/badge?p=image2d)](https://packagephobia.now.sh/result?p=image2d)
[![CDN](https://data.jsdelivr.com/v1/package/npm/image2d/badge)](https://www.jsdelivr.com/package/npm/image2d)
[![Version](https://img.shields.io/npm/v/image2d.svg)](https://www.npmjs.com/package/image2d)
[![License](https://img.shields.io/npm/l/image2d.svg)](https://github.com/yelloxing/image2D/blob/master/LICENSE)

## 说明
开发这个库的初衷是希望越来越多的人可以更自由的发挥自己的创意，感受绘图的乐趣，并把积累的经验分享出来，推动库本身的发展，从而不断优化！因此，这个库永远都是自由、开源、讨论和进步的。

使用这个库可以帮助你更容易的绘制二维图形，同时库本身提供了一些绘图中实用的工具。

我们欢迎任何人的加入，具体的内容你可以通过访问[贡献指南](https://github.com/yelloxing/image2D/blob/master/CONTRIBUTING.md)来找到你可以参与的部分。当然，任何时候，特别是遇到疑惑，提[issue](https://github.com/yelloxing/image2D/issues)都是不错的选择！

## 文档和例子
使用中可以访问[在线接口文档](https://yelloxing.github.io/image2D/index.html)，如果想参与进来，可以访问[开发需知](https://github.com/yelloxing/image2D/blob/master/CONTRIBUTING.md)。

此外，我们还维护了[用例项目](https://github.com/yelloxing/Image-Demo)，你可以访问[在线地址](https://yelloxing.github.io/Image-Demo/index.html)，练习的话，一些有趣的例子可以添加进去。

## 帮助和版本
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/yelloxing/image2D/issues)！

另外，你可以查看[版本更新日志](https://github.com/yelloxing/image2D/blob/master/CHANGELOG)来了解每次版本更新的内容以便确定是否需要升级（请在使用的时候遇到问题的时候务必查看一下，如果升级以后依旧有问题，请提交[Error or defect design](https://github.com/yelloxing/image2D/issues/new/choose)）。

## 如何使用
如果你开发的是一个web项目，可以通过CDN引入（请选择对应的[版本](https://github.com/yelloxing/image2D/blob/master/CHANGELOG)），在代码中通过image2D或$$调用：

```html
<script src="https://cdn.jsdelivr.net/npm/image2d@1.6.6/build/image2D.min.js"></script>
```

如果你想通过npm方式管理，首先你需要通过命令行安装image2D，就像这样：

```bash
npm install --save image2d
```

安装好了以后，在需要的地方引入即可：

```js
import $$ from 'image2d';
```

或

```js
const $$ = require("image2d");
```

## 一个简单的例子
下面，我们来演示一个简单的例子，主要是帮助大家了解该库的基本用法。

- 获取画笔

绘图的第一步当然是获取画笔了，画笔分为两种：Canvas2D和SVG，我们来看看具体的代码：
```js
var painter=$$('#painter').painter();
```
上面的$$('#painter')返回一个image2D对象，通过ID选择器查找结点，然后调用对象上的painter方法就可以获取画笔了。

如何判断画笔的类型？如果结点是canvas获取的就是Canvas2D画笔，如果结点是svg获取的就是SVG画笔。

- 配置画笔

不管是什么画笔，都一样可以进行配置（当然有缺省值），比如画笔的粗细，颜色等，下面列出部分选项：
```js

painter.config({
    "font-size":"文字大小",
    "lineWidth":"线条宽度"
});

```
具体的配置选项请查看[画笔](https://yelloxing.github.io/image2D/index.html#/api/painter)一节。

- 使用画笔绘制

画笔获取并配置好了以后，直接调用画笔上的方法即可绘图，我们拿canvas举例子。
```js
$$('canvas')

// 设置画布大小
.attr({
    "with":200,
    "height":100
})

// 获取画笔
.painter()

// 配置画笔
.config({
    "lineWidth":10,
    "fillStyle":"red",
    "strokeStyle":"green"
})

// 绘制实心弧形
.fillArc(100, 0, 50, 100, 0, Math.PI)

// 绘制空心弧形
.strokeArc(100, 0, 50, 95, 0, Math.PI);
```
结果如下图:

<img src='https://github.com/yelloxing/image2D/blob/master/docs/src/assets/guider-demo1.png' >

怎么样？是不是很简单，虽然直接使用canvas或svg也可以实现，不过借助这个库绘图会更简单，你可以把更多的精力放在绘制出更有趣的作品上。开发中如果有新功能需要提供，可以点击进入[RFC issue](https://github.com/yelloxing/image2D/issues/18)告知我们，我们会尽快反馈给你结果！

## 图表组件

此外，我们还鼓励你参与基于image2D的图表组件的开发，这样可以加速日常开发并促进交流和推动本项目的改进，具体细节请[点击此处](https://github.com/image2D)进行查看！

## 开源协议

[MIT](https://github.com/yelloxing/image2D/blob/master/LICENSE)

Copyright (c) 2018-2020 走一步 再走一步
