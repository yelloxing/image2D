/**
 * 公共资源路径加载配置
 */
(function () {
  var cssFiles = [
    'lib/min/plugin/prettify.css', // 代码格式化
    'style/common.css', // 公共样式
    'style/entry.css', // 入口
    'style/header.css', // 头部
    'style/examples.css', // 菜单
  ];
  var jsFiles = [

    /* 基本文件 */
    'lib/min/jquery.js', // jquery
    'lib/min/angular.js', // angular.js
    // 'lib/min/image2D.js', // image2D
    'lib/min/plugin/prettify.js', // 代码格式化
    'lib/min/angular-ui-router.js', // 路由

    /* 配置文件 */
    'lib/config.js', // 项目配置文件

  ];

  for (var i = 0; i < cssFiles.length; i++) {
    loadCss(cssFiles[i]);
  }
  for (var i = 0; i < jsFiles.length; i++) {
    loadJs(jsFiles[i]);
  }

  function loadJs(path) {
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = path + "?_=" + new Date().valueOf();
    document.write(outerHTML(scriptTag));
  }

  function outerHTML(node) {
    return (
      node.outerHTML ||
      (function (n) {
        var div = document.createElement('div'),
          h;
        div.appendChild(n);
        h = div.innerHTML;
        div = null;
        return h;
      })(node)
    );
  }

  function loadCss(path) {
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = path + "?_=" + new Date().valueOf();
    document.getElementsByTagName('head')[0].appendChild(cssLink);
  }
})();