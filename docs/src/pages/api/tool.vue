<template>
  <div class="container">
    <p>因为绘制的时候，比如canvas2D没有图层，某个数据改变可能就意味着需要全部重新绘制等，基于这些考虑，在这一章，对前面进行必要的补充。</p>

    <h4 class="title small">图层</h4>
    <p>首先需要明确，图层服务的对象是canvas2D，svg某种意义上天生具有图层，不需要额外设计。让我们首先看看如何获取一个图层对象：</p>
    <pre class="prettyprint lang-js">var layer=imageObject.layer();</pre>

    <p>这里的图层可以类比photoshop的图层去理解，我们提供了几个类似的方法来帮助使用图层对象。</p>

    <p>图层对象管理着图层，通过传递id可以获取对应图层的画笔，如果该图层不存在会自动创建（这里的画笔就是canvas2D画笔）：</p>
    <pre class="prettyprint lang-js">var painter=layer.painter(id);</pre>

    <p>删除指定图层：</p>
    <pre class="prettyprint lang-js">layer.delete(id);</pre>

    <p>图层中的内容不会显示在画布上，为了显示在画布上，需要手动更新：</p>
    <pre class="prettyprint lang-js">layer.update();</pre>

    <p>隐藏图层：</p>
    <pre class="prettyprint lang-js">layer.hidden(id);</pre>

    <p>显示图层：</p>
    <pre class="prettyprint lang-js">layer.show(id);</pre>

    <h4 class="title small">动画轮询</h4>
    <p>绘图的时候，为了实现动画效果，你除了可以使用画布或css天然的动画相关属性，还可以使用ES绘制每一帧的方式实现。为了方便你绘制我们提供了下面方法：</p>
    <pre class="prettyprint lang-js">var stop=$$.animation(function(deep){
    // deep取值0-1，表示动画进度
}, speeds, function(deep){
    // deep和上面一样，提供的原因是有时候结束回调是stop方法触发而不是动画结束了
},timing);</pre>
    <p>该方法有四个参数：分别表示画帧方法、动画时长、动画结束回调和进度控制参数（动画时长单位毫秒，最后三个均可选）。</p>
    <p>其中timing可以为字符串或数组，字符串可选参数有："ease"、"ease-in"、"ease-in-out"、"ease-out"和"linear"（默认值），值的意义和css中的属性 transition-timing-function 基本一致，数组的话也是和这个属性保持一致，长度为4。</p>
    <p>如果你希望动画立刻结束，可以调用下面的方法强行提前停止：</p>
    <pre class="prettyprint lang-js">stop();</pre>

    <h4 class="title small">获取颜色</h4>
    <p>给定任意一个合法的css颜色字符串，把颜色统一转变成rgba格式，返回一个数组[r,g,b,a]：</p>
    <pre class="prettyprint lang-js">var rgbaArray=$$.formatColor(colorString);</pre>
    <p>传递需要的颜色个数，返回一组随机色彩：</p>
    <pre class="prettyprint lang-js">var colors=$$.getRandomColors(number);</pre>

    <p class="nav-footer">
      <a href="#/api/calculate" onclick="document.documentElement.scrollTop = 0;" class="pre">计算</a>
    </p>
  </div>
</template>

<script>
import update from "../../service/update";

export default {
  mounted() {
    update("api", "tool");
  }
};
</script>
