import $$ from 'image2d';
import getUrlParam from './getUrlParam';

export default function () {

    let fixed = getUrlParam().fixed;
    if (fixed) {

        // 获取滚动调整结点
        let fixedDom = $$('#fixed-' + fixed);
        if (fixedDom.length > 0) {
            $$.animation(deep => {
                document.documentElement.scrollTop = fixedDom[0].offsetTop * deep;
            }, 500, () => {
                document.documentElement.scrollTop = fixedDom[0].offsetTop;
            });
        }

    }else{
        document.documentElement.scrollTop=0;
    }

};