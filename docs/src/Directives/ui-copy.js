import iCrush from 'icrush';
import $$ from 'image2d';
import notify from '../Service/notify';

iCrush.directive('uiCopy', {

    inserted: el => {
        $$('<span class="copy-btn" title="复制到剪切板">复制<span>').appendTo(el).bind('click', () => {

            // 初始化准备好结点和数据
            let random = (Math.random() * 10000).toFixed(0),
                text = el.getElementsByTagName('pre')[0].innerText,
                body = document.getElementsByTagName('body')[0],
                textarea = $$('<textarea id="iCrush-clipboard-textarea-' + random + '" style="position:absolute">' + text + '</textarea>')[0];

            // 添加到页面
            body.insertBefore(textarea, body.childNodes[0]);

            // 执行复制
            document.getElementById("iCrush-clipboard-textarea-" + random).select();
            try {
                let result = window.document.execCommand("copy", false, null);

                if (result) {
                    notify('复制结果', '已经复制到剪切板！');
                } else {
                    notify('复制结果', '复制到剪切板失败！');
                }
            } catch (e) {
                console.error(e);
                notify('复制结果', '复制到剪切板失败！');
            }

            // 结束后删除
            body.removeChild(document.getElementById("iCrush-clipboard-textarea-" + random));

        });
    }

});