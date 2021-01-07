ctrlapp.register.controller('fromLeftToRightTreeController', ['$remote', '$scope', function ($remote, $scope) {

  $scope.initMethod = function () {
    $remote.get('./data/flare.json', $scope.doDraw);
  };

  /**
   * 绘图入口
   * @param {any} data 数据
   */
  $scope.doDraw = function (data) {

    /*
     * -----------------------------------------
     * 变量准备
     * -----------------------------------------
     */

    // 隐藏子结点
    hiddenChild = ['operator', 'axis', 'scale','data1','util','cluster','graph','query'];

    /*
     * -----------------------------------------
     * 开始绘图
     * -----------------------------------------
     */

    // 设置画布大小并获取图层
    var layer = $$('#palette').attr({
      width: 700,
      height: 600
    }).layer();

    var painter0 = layer.painter('line');
    var painter1 = layer.painter('node');
    var painter2 = layer.painter('text');

    $$.treeLayout({

      // 获取根结点的方法
      "root": function (initTree) {
        return initTree;
      },

      // 获取结点ID方法
      "id": function (treedata) {
        return treedata.name;
      },

      // 获取子结点的方法
      "child": function (parentTree, initTree) {
        if (hiddenChild.indexOf(parentTree.name) < 0) {
          return parentTree.children;
        } else {
          return [];
        }
      }
    })

      // 配置模型
      .config({

        // 配置这是一棵怎么样的树
        // 参考文档：https://hai2007.github.io/image2D/#/api/calculate 【布局 - 树布局 - 配置模型】
        type: 'LR',
        width: 700,
        height: 600

      })

      // 配置绘制方法
      .drawer(function (data) {
        console.log(data);

        var item, i;
        for (i in data.node) {
          item = data.node[i];

          // 绘制结点
          painter1.config('strokeStyle', 'red').strokeCircle(item.left, item.top, 2);

          // 文字
          painter2.config({
            'fillStyle': "rgb(46, 52, 61)",
            'font-size': 12
          }).fillText(item.id, item.left + 10, item.top);

          // 连线条
          if (item.pid) {
            painter0.config('strokeStyle', 'rgb(207, 202, 202)').moveTo(item.left, item.top).bezierCurveTo(
              item.left - 50, item.top,
              data.node[item.pid].left + 50, data.node[item.pid].top,
              data.node[item.pid].left, data.node[item.pid].top
            ).stroke();
          }

        }

        layer.update();

      })

      // 启动
      (data);

  };

}]);
