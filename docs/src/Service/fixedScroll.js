import $$ from 'image2d';
import getUrlParam from './getUrlParam';

export default function (element, overValue) {

    overValue = overValue || 0;

    element = element || document.documentElement;

    let fixed = getUrlParam().fixed;
    if (fixed) {

        // 获取滚动调整结点
        let fixedDom = $$('#fixed-' + fixed);
        if (fixedDom.length > 0) {
            let offsetTop = fixedDom[0].offsetTop - overValue;
            let currentScrollTop = element.scrollTop || 0;
            $$.animation(deep => {
                element.scrollTop = (offsetTop - currentScrollTop) * deep + currentScrollTop;
            }, 500, () => {
                element.scrollTop = offsetTop;
            });
        }

    } else {
        element.scrollTop = 0;
    }

};
