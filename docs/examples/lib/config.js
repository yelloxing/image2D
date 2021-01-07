/**
 * --------------------------------------
 * 模块定义
 * --------------------------------------
 */

// 自定义扩展模块
var libapp = angular.module("ui.libraries", []);

// 控制器模块
var ctrlapp = angular.module("ui.ctrl", []);

//主模块定义（同时引入需要的模块）
var startapp = angular.module("startApp", ['ui.router', 'ui.libraries', 'ui.ctrl']);

/**
 * --------------------------------------
 * 模块启动
 * --------------------------------------
 */
//主模块
startapp.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide", function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
  "use strict";

  //定义需要使用的方法
  ctrlapp.register = {
    controller: $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service
  };

  //异步加载控制器文件
  startapp.asyncjs = function (js) {
    return ['$q', function ($q) {

      var delay = $q.defer(),
        load = function () {
          window.$.getScript(js, function () {
            delay.resolve();
          });
        };
      load();
      return delay.promise;
    }];
  };

  /**
   * --------------------------------------
   * 定义路由
   * --------------------------------------
   */

  var addToken = function (url) {
    return url + "?_=" + new Date().valueOf();
  };

  // 返回控制器名称
  // 例如：aaa-bbb => aaaBbb
  var toCtrlName = function (name) {
    return name.replace(/\-([a-z])/g, function (item) {
      return item.toUpperCase();
    }).replace(/\-/g, '').replace(/^([A-Z])/, function (item) {
      return item.toLowerCase();
    });
  };

  var demos = [
    'money-schedule', 'tree-radial', 'multiple-x-axis', 'From-Left-to-Right-Tree',
    'bar-gradient', 'bar-simple', 'bar-polar-real-estate', 'radar-basic',
    'gauge-simple','skybox','china-map'
  ];

  var i;
  for (i = 0; i < demos.length; i++) {
    $stateProvider.state(demos[i], {
      url: "/" + demos[i],
      templateUrl: addToken("html/examples/" + demos[i] + "/mod.html"),
      resolve: {
        delay: startapp.asyncjs('html/examples/' + demos[i] + '/mod.js')
      },
      controller: toCtrlName(demos[i]) + "Controller"
    });
  }

  $stateProvider

    /*
    ===================
    入口页面
    ===================
    */

    .state("entry", {
      url: "/entry",
      templateUrl: addToken("html/entry/mod.html"),
      resolve: {
        delay: startapp.asyncjs('html/entry/mod.js')
      },
      controller: "entryController"
    })

    /*
    ===================
    菜单页面
    ===================
    */

    .state("menu", {
      url: "/menu",
      templateUrl: addToken("html/menu/mod.html"),
      resolve: {
        delay: startapp.asyncjs('html/menu/mod.js')
      },
      controller: "menuController"
    });

  $urlRouterProvider.otherwise("/entry");

}]).run(['$rootScope', '$state', function ($rootScope, $state) {
  "use strict";

  // 路由跳转
  $rootScope.goto = function (state) {
    $state.go(state);
  };

  // 打开例子在线页面
  $rootScope.loadExample = function (demo) {
    window.location.href = "https://github.com/hai2007/image2D/tree/master/docs/examples/html/examples/" + demo + "/mod.js";
  };

  // 提示
  $rootScope.alert = function (msg) {
    alert(msg);
  };

  // 返回
  $rootScope.goback = function () {
    var routerName = sessionStorage.getItem('back-router') || "entry";
    $state.go(routerName);
  };

}]);
