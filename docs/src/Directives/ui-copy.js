import iCrush from 'icrush';
import $$ from 'image2d';

// 错误提示
let errorback = function () {

};

// 正确提示
let callback = function () {

};

iCrush.directive('uiCopy', {

    inserted: el => {
        $$('<span class="copy-btn" title="复制到剪切板">复制<span>').appendTo(el).bind('click', () => {

            // 初始化准备好结点和数据
            let random = (Math.random() * 10000).toFixed(0),
                text = el.getElementsByTagName('pre')[0].innerText,
                body = document.getElementsByTagName('body')[0],
                textarea = $$('<textarea id="luna-clipboard-textarea-' + random + '" style="position:absolute">' + text + '</textarea>')[0];

            // 添加到页面
            body.insertBefore(textarea, body.childNodes[0]);

            // 执行复制
            document.getElementById("luna-clipboard-textarea-" + random).select();
            try {
                let result = window.document.execCommand("copy", false, null);

                if (result) {
                    callback();
                } else {
                    errorback();
                }
            } catch (e) {
                errorback();
            }

            // 结束后删除
            body.removeChild(document.getElementById("luna-clipboard-textarea-" + random));

        });
    }

});