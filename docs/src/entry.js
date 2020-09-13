import iCrush from 'icrush';

// 兼容文件
import 'promise-polyfill/src/polyfill';

// 引入启动界面
import App from './App.iCrush';

// 引入基础样式
import '@yelloxing/normalize.css';

// 引入公共样式
import './Styles/style.scss';
import './Styles/api.scss';
import './Styles/course.scss';

document.getElementById('root').innerHTML = "";

// 安装路由
import { loadRouter, goRouter } from './Service/router.config.js';
iCrush.prototype.loadRouter = loadRouter; iCrush.prototype.goRouter = goRouter;

// 引入复制指令
import './Directives/ui-copy';

//根对象
window.icrush = new iCrush({

    //挂载点
    el: document.getElementById('root'),

    // 启动iCrush
    render: createElement => createElement(App)
});