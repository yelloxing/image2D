/**
 * 绑定事件
 * @param {string} eventType
 * @param {function} callback
 */
export let bind = function (eventType, callback) {

    if (window.attachEvent) {
        for (let flag = 0; flag < this.length; flag++)
            this[flag].attachEvent("on" + eventType, callback); // 后绑定的先执行
    } else {
        for (let flag = 0; flag < this.length; flag++)
            this[flag].addEventListener(eventType, callback, false);// 捕获
    }

    return this;
};

/**
 * 解除绑定事件
 * @param {string} eventType
 * @param {function} handler
 */
export let unbind = function (eventType, handler) {

    if (window.detachEvent) {
        for (let flag = 0; flag < this.length; flag++)
            this[flag].detachEvent("on" + eventType, handler);
    } else {
        for (let flag = 0; flag < this.length; flag++)
            this[flag].removeEventListener(eventType, handler, false);
    }

    return this;
};

/**
 * 获取鼠标相对特定元素左上角位置
 * @param {Event} event
 */
export let position = function (event) {

    // 返回元素的大小及其相对于视口的位置
    let bounding = this[0].getBoundingClientRect();

    if (!event || !event.clientX)
        throw new Error('Event is necessary!');
    return {

        // 鼠标相对元素位置 = 鼠标相对窗口坐标 - 元素相对窗口坐标
        "x": event.clientX - bounding.left,
        "y": event.clientY - bounding.top
    };
};

/**
 * 阻止冒泡
 * @param {Event} event 
 */
export let stopPropagation = function (event) {
    event = event || window.event;
    if (event.stopPropagation) { //这是其他非IE浏览器
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
    return this;
};

/**
 * 阻止默认事件
 * @param {Event} event 
 */
export let preventDefault = function (event) {
    event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    return this;
};