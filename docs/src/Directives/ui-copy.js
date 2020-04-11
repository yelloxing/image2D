import iCrush from 'icrush';
import $$ from 'image2d';

iCrush.directive('uiCopy', {

    inserted: el => {
        $$('<span class="copy-btn" title="复制到剪切板">复制<span>').appendTo(el).bind('click', () => {
            alert('功能开发中');
        });
    }

});