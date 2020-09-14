import { rotate } from '../transform';

// r1和r2，内半径和外半径
// beginA起点弧度，rotateA旋转弧度式
export default function (beginA, rotateA, cx, cy, r1, r2, doback) {

    // 有了前置的判断，这里可以省略了
    // if (rotateA > Math.PI * 2) rotateA = Math.PI * 2;
    // if (rotateA < -Math.PI * 2) rotateA = -Math.PI * 2;

    // 保证逆时针也是可以的
    if (rotateA < 0) {
        beginA += rotateA;
        rotateA *= -1;
    }

    let temp = [], p;

    // 内部
    p = rotate(0, 0, beginA, r1, 0);
    temp[0] = p[0];
    temp[1] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[2] = p[0];
    temp[3] = p[1];

    // 外部
    p = rotate(0, 0, beginA, r2, 0);
    temp[4] = p[0];
    temp[5] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[6] = p[0];
    temp[7] = p[1];

    doback(
        beginA, beginA + rotateA,
        temp[0] + cx, temp[1] + cy,
        temp[4] + cx, temp[5] + cy,
        temp[2] + cx, temp[3] + cy,
        temp[6] + cx, temp[7] + cy,
        (r2 - r1) * 0.5
    );

};
