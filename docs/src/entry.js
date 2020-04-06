import iCrush from 'icrush';

// 兼容文件
import 'promise-polyfill/src/polyfill';

// 引入启动界面
import App from './App.iCrush';

// 引入基础样式
import '@yelloxing/normalize.css';

// 引入公共样式
import './style.scss';

document.getElementById('root').innerHTML="";

//根对象
window.icrush = new iCrush({

    //挂载点
    el: document.getElementById('root'),

    // 启动vue
    render: createElement => createElement(App)
});
