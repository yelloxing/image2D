
- 开源不易，去 <i>[Github给个Star](https://github.com/yelloxing/image2D) </i>吧！

<p align="center"><a href="https://yelloxing.gitee.io/image2D/index.html" target="_blank" rel="noopener noreferrer">
<img width="100" src="https://yelloxing.gitee.io/image2D/dist/image2D.png" alt="image2D logo"></a></p>

<p align="center">
  <a href="https://yelloxing.gitee.io/npm-downloads?interval=7&packages=image2d"><img src="https://img.shields.io/npm/dm/image2d.svg" alt="downloads"></a>
  <a href="https://packagephobia.now.sh/result?p=image2d"><img src="https://packagephobia.now.sh/badge?p=image2d" alt="install size"></a>
  <a href="https://www.jsdelivr.com/package/npm/image2d"><img src="https://data.jsdelivr.com/v1/package/npm/image2d/badge" alt="CDN"></a>
  <a href="https://www.npmjs.com/package/image2d"><img src="https://img.shields.io/npm/v/image2d.svg" alt="Version"></a>
  <a href="https://github.com/yelloxing/image2D/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/image2d.svg" alt="License"></a>
</p>

<h2 align="center" style='padding:10px 0 20px 0;color:red;'>🚀 关于项目</h2>

使用ECMAScript绘制二维图片,开发这个库的初衷是希望越来越多的人可以更自由的发挥自己的创意，感受绘图的乐趣，并把积累的经验分享出来，推动库本身的发展，从而不断优化！因此，这个库永远都是自由、开源、讨论和进步的。

```html
<script src="https://cdn.jsdelivr.net/npm/image2d@1.9.0/build/image2D.min.js"></script>
```

你可以通过CDN的方式引入（[版本历史](https://github.com/yelloxing/image2D/blob/master/CHANGELOG)），在代码中通过image2D或$$调用，当然，你也可以通过npm的方式引入。

```bash
npm install --save image2d
```

安装好了以后，在需要的地方引入即可：

```js
import $$ from 'image2d';
```

具体的接口或相关说明请查阅[接口文档](https://yelloxing.gitee.io/image2d/index.html)或者在遇到困难的时候通过[issue](https://github.com/yelloxing/image2D/issues)和我们取得联系！

<h2 align="center" style='padding:10px 0 20px 0;color:red;'>🚀 图表用例</h2>

<p align="center"><a href="http://yelloxing.gitee.io/image2d-examples/index.html" target="_blank" rel="noopener noreferrer">
<img width="700" src="https://yelloxing.gitee.io/image2d/inline/examples.png" alt="image2D 用例截图"></a></p>

如果想加入其中可以通过[issue](https://github.com/yelloxing/image2D/issues)联系我们

<h2 align="center" style='padding:10px 0 20px 0;color:red;'>🚀 快速使用</h2>

> 下面我们来演示如何绘制一个圆弧（更复杂的图形，比如树图、地图等请通过[教程](https://yelloxing.gitee.io/image2d/#/course)进行学习）！

- 获取画笔

绘图的第一步当然是获取画笔了，画笔分为两种：Canvas2D 和 SVG，我们来看看具体的代码：

```js
// 我们假定我们现在在页面有一个canvas标签：<canvas id='painter'></canvas>
var painter=$$('#painter').attr({
  "width":300,
  "height":300
}).painter();
```

上面的$$('#painter')返回一个 image2D 对象，通过 ID 选择器查找结点，我们设置了画布的大小，然后调用对象上的 painter 方法就可以获取画笔了。

如何判断画笔的类型？如果结点是 canvas 获取的就是 Canvas2D 画笔，如果结点是 SVG 获取的就是 SVG 画笔，因此这里是Canvas2D画笔。

- 配置画笔

不管是什么画笔，都一样可以进行配置（当然有缺省值），比如画笔的粗细，颜色等，下面来配置圆弧的颜色和线条粗细和类型：

```js
painter.config({
  'strokeStyle':'red',
  'lineWidth':3,
  'lineDash':[5]
});
```

- 绘制

画笔获取并配置好了以后，直接调用画笔上的方法即可绘图：

```js
painter.strokeArc(150, 150, 100, 130, Math.PI/2, Math.PI/2*3);
```

这样，一个圆弧就绘制好了，可以[点击此次](https://yelloxing.gitee.io/image2d/inline/example-1.html)查看运行效果。

怎么样？是不是很简单，虽然直接使用 Canvas2D 或 SVG 也可以实现，不过借助这个库绘图会更简单（我们主要解决了浏览器兼容和复杂计算上的问题，并使得SVG和Canvas2D绘图习惯保持一致，同时抽象了部分有用的概念）。

你可以把更多的精力放在绘制出更有趣的作品上（如果借助本库开发了有趣的作品，可以去[这里添加](https://github.com/yelloxing/2D-Examples)，如果使用过程中有好的意见，可以来[issue](https://github.com/yelloxing/image2D/issues)中提出）。

<h2 align="center" style='padding:10px 0 20px 0;color:red;'>🚀 加入我们</h2>

目前image2D主要由 [心叶](http://yelloxing.gitee.io/homepage) 维护，当然也有来自一些使用者的 [意见](https://github.com/yelloxing/image2D/issues) 和 [Pull requests](https://github.com/yelloxing/image2D/pulls) 在帮忙我们不断改进和完善，在此我们表示由衷的感谢，我们会带着初心矢志不渝的坚持维护，并永远保持自由、开源、讨论和进步，期待你的加入。

## 当前在做什么？
如果你想知道我们在做什么，你可以查看 [开发或BUG任务清单](https://github.com/yelloxing/image2D/projects/4) 页面，其中分为三个阶段：

- To do：准备做的，列在日程表中，不过还没有准备做的任务。
- In progress：正在做的，当前已经被领取的任务，表示已经有人在完成这件事了，只是还没有完成。
- Done：已经完成的，进入这个阶段就意味着该任务已经关闭。

## 新任务如何产生？

主要来自 [issue](https://github.com/yelloxing/image2D/issues) 和前端本身的发展（可能一些新的技术等原因，催促一些改变是有意义的），如果你对未来版本有什么期望，也可以告诉我们。

当前，这也包括 [接口文档](https://yelloxing.gitee.io/image2d) 和 [教程](https://yelloxing.gitee.io/image2d/#/course) 等，甚至包括 [用例](http://yelloxing.gitee.io/image2d-examples/#/entry) ，一切围绕或和image2D相关的都可以提。

## 为什么要加入我们？

虽然通过提 [issue](https://github.com/yelloxing/image2D/issues) 和 [Pull requests](https://github.com/yelloxing/image2D/pulls) 也可以很好的参与贡献，不过你无法完全的融入进来，无法更全面的把控image2D的发展规划。通过加入我们成为长期稳定的贡献者，和我们保持密切的联系，这非常利于你，因为你有了一定的主动权。

加入我们并不意味着就是代码的维护，你可以选择下列一项或多项进行参与：

- 代码维护：由于新功能或一些BUG的出现，对代码进行维护和升级。
- 文档编辑：主要是接口文档和教程需要编辑，这很重要。
- 用例开发和测试：在项目的test文件夹下有一些测试，而在examples项目中维护了一些用例。
- 参与讨论：主要是讨论image2D未来如何发展，改造的方向等。

如果有意向加入我们，你可以通过邮箱 <i>yelloxing@gmail.com</i> 或 <i>1276327934@qq.com</i> 和我们取到联系，请在邮件中简单说明一下情况，我们会尽快回复。

你可以查看[.mailmap](https://github.com/yelloxing/image2D/blob/master/.mailmap)文件了解当前主要维护人员，查看[AUTHORS.txt](https://github.com/yelloxing/image2D/blob/master/AUTHORS.txt)了解所有的贡献者。


## 开源协议

[MIT](https://github.com/yelloxing/image2D/blob/master/LICENSE)

Copyright (c) 2018-2020 走一步 再走一步
