
/* 等角斜方位投影 */

let
    // 围绕X轴旋转
    _rotateX = function (deg, x, y, z) {
        let cos = Math.cos(deg), sin = Math.sin(deg);
        return [x, y * cos - z * sin, y * sin + z * cos];
    },
    // 围绕Y轴旋转
    _rotateY = function (deg, x, y, z) {
        let cos = Math.cos(deg), sin = Math.sin(deg);
        return [z * sin + x * cos, y, z * cos - x * sin];
    },
    // 围绕Z轴旋转
    _rotateZ = function (deg, x, y, z) {
        let cos = Math.cos(deg), sin = Math.sin(deg);
        return [x * cos - y * sin, x * sin + y * cos, z];
    };

let p = [];

export default function (config, longitude, latitude) {
    /**
     * 通过旋转的方法
     * 先旋转出点的位置
     * 然后根据把地心到旋转中心的这条射线变成OZ这条射线的变换应用到初始化点上
     * 这样求的的点的x,y就是最终结果
     *
     *  计算过程：
     *  1.初始化点的位置是p（x,0,0）,其中x的值是地球半径除以缩放倍速
     *  2.根据点的纬度对p进行旋转，旋转后得到的p的坐标纬度就是目标纬度
     *  3.同样的对此刻的p进行经度的旋转，这样就获取了极点作为中心点的坐标
     *  4.接着想象一下为了让旋转中心移动到极点需要进行旋转的经纬度是多少，记为lo和la
     *  5.然后再对p进行经度度旋转lo获得新的p
     *  6.然后再对p进行纬度旋转la获得新的p
     *  7.旋转结束
     *
     * 特别注意：第5和第6步顺序一定不可以调换，原因来自经纬度定义上
     * 【除了经度为0的位置，不然纬度的旋转会改变原来的经度值，反过来不会】
     *
     */
    p = _rotateY((360 - latitude) / 180 * Math.PI, 100 * config.scale, 0, 0);
    p = _rotateZ(longitude / 180 * Math.PI, p[0], p[1], p[2]);
    p = _rotateZ((90 - config.center[0]) / 180 * Math.PI, p[0], p[1], p[2]);
    p = _rotateX((90 - config.center[1]) / 180 * Math.PI, p[0], p[1], p[2]);

    return [
        -p[0],//加-号是因为浏览器坐标和地图不一样
        p[1],
        p[2]
    ];
}
