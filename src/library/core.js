/**
 * 设计需求是：
 * image2D和image2D(selector[, context])
 * 分别表示绘图类和绘图对象
 *
 * 题外：为什么不选择image2D和new image2D(selector[, context])?
 * 只是感觉没有前面的写法用起来简洁
 *
 * 为了实现需求，第一反应是：
 * let image2D=function(selector,context){
 *      return new image2D();
 * };
 *
 * 在image2D上挂载静态方法，在image2D.prototype上挂载对象方法，
 * 看起来稳的很，其实这明显是一个死循环。
 *
 * 为了解决这个问题，我们在image2D的原型上定义了一个方法：
 * image2D.prototype.init=function(selector,context){
 *      return this;
 * };
 *
 *  执行下面的方法：
 *  let temp=image2D.prototype.init(selector, context);
 *  上面返回的temp很明显就是image2D.prototype，其实就是image2D对象
 * （例如：new A()，其实就是取A.prototype，这样对比就很好理解了）
 *
 * 因此可以改造代码如下：
 *
 * 这样image2D和new image2D(selector[, context])就分别表示类和对象。
 *
 * 问：看起来是不是实现了？
 * 答：是的，实现了。
 * 问：可是总感觉有点不好，说不出为什么。
 * 答：是不是感觉image2D()打印出来的东西有点多？
 * 问：是的。
 *
 * 事实上，因为直接取image2D.prototype作为new image2D(),
 * 理论上说，使用上区别不大，唯一不足的是，
 * 挂载在image2D.prototype上的方法会在打印image2D对象的时候看见，不舒服。
 *
 * 为了看起来好看些，代码再次改造：
 * let image2D = function (selector, context) {
 *      return new image2D.prototype.init(selector, context);
 * };
 *
 * 为了让image2D(selector, context)返回的是image2D对象，需要修改image2D.prototype.init的原型：
 * image2D.prototype.init.prototype = image2D.prototype;
 *
 * 这样：
 *      image2D(selector, context) ==
 *      return new image2D.prototype.init(selector, context) ==
 *      image2D.prototype.init.prototype ==
 *      image2D.prototype ==
 *      new image2D(selector, context)
 *
 * 此时需求就实现了，
 * 而且打印image2D(selector, context)的时候，
 * 对象上的方法都在原型上，看起来就比较舒服了。
 */

import sizzle from '../core/sizzle';
import { isObject } from '@hai2007/tool/type';

let image2D = function (selector, context) {
    return new image2D.prototype.init(selector, context);
};

image2D.prototype.init = function (selector, context) {

    // 如果没有传递，默认使用document作为上下文
    this.context = context = context || document;

    // 使用sizzle获取需要维护的结点，并把结点维护到image2D对象中
    let nodes = sizzle(selector, context), flag;
    for (flag = 0; flag < nodes.length; flag++) {
        this[flag] = nodes[flag];
    }

    // 设置结点个数
    this.length = nodes.length;
    return this;
};

// 扩展方法
// 在image2D和image2D.prototype上分别调用extend方法就可以在类和对象上扩展方法了
image2D.prototype.extend = image2D.extend = function () {

    var target = arguments[0] || {};
    var source = arguments[1] || {};
    var length = arguments.length;

    /*
     * 确定复制目标和源
     */
    if (length === 1) {
        //如果只有一个参数，目标对象是自己
        source = target;
        target = this;
    }
    if (!isObject(target)) {
        //如果目标不是对象或函数，则初始化为空对象
        target = {};
    }

    /*
     * 复制属性到对象上面
     */
    for (let key in source) {
        try {
            target[key] = source[key];
        } catch (e) {

            // 为什么需要try{}catch(e){}？
            // 一些对象的特殊属性不允许覆盖，比如name
            // 执行：image2D.extend({'name':'新名称'})
            // 会抛出TypeError
            throw new Error("Illegal property key：" + key + "！");
        }
    }

    return target;
};

image2D.prototype.init.prototype = image2D.prototype;

export default image2D;
