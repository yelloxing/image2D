ctrlapp.register.controller('treeRadialController', ['$remote', '$scope', function ($remote, $scope) {

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

        // 记录改变前结点位置，方便动画过渡计算
        var oldData = { "node": {} };

        // 记录已经展示在页面的结点
        var hadDisplay = ['flare'];

        // 记录是不是处于初始化状态
        var isInit = true;

        // 旋转角度
        beginDeg = Math.PI / 2;

        // 隐藏子结点
        hiddenChild = ['operator', 'axis', 'scale'];

        /*
         * -----------------------------------------
         * 开始绘图
         * -----------------------------------------
         */

        // 设置画布大小并获取画笔
        var painter = $$('#palette').attr({
            width: 700,
            height: 700
        }).painter();

        var layout = $$.treeLayout({

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
                if (hadDisplay.indexOf(parentTree.name) > -1 && hiddenChild.indexOf(parentTree.name) < 0) {
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
                type: 'circle',
                cx: 350,
                cy: 350,
                radius: 60,
                'begin-deg': beginDeg / 5

            });

        layout.drawer(function (newData) {

            // 准备结点
            for (var id in newData.node) {
                if (!oldData.node[id]) {

                    // 追加圆圈
                    $$('<circle>').attr('id', "circle_" + id).appendTo('#paletteCircle');

                    // 追加文字
                    $$('<text>').attr('id', "text_" + id).appendTo('#paletteText');

                    if (newData.node[id].pid != null) {

                        // 追加连线
                        $$('<path>').attr('id', "path_" + id).appendTo('#paletteLine');

                    }

                }
            }

            $$.animation(function (deep) {

                // 更新每个点的位置
                // old->new (deep)
                var nodeP = {};
                for (var id in newData.node) {

                    var node = newData.node[id];

                    if (node.pid == null) {
                        nodeP[id] = [node.left, node.top];
                    } else {

                        var oldNode = oldData.node[id];
                        if (!oldNode) oldNode = oldData.node[node.pid] || {
                            top: 350,
                            left: 350
                        };

                        nodeP[id] = [
                            (node.left - oldNode.left) * deep + oldNode.left,
                            (node.top - oldNode.top) * deep + oldNode.top
                        ];

                    }

                }

                // 绘制树图
                for (var id in newData.node) {

                    var isHad = oldData.node[id],

                        // 文字坐对齐还是右对齐
                        textAlign = (newData.node[id].deg < Math.PI / 2 || newData.node[id].deg > Math.PI / 2 * 3) ? 'left' : 'right';

                    // 画结点
                    painter.bind('#circle_' + id);

                    if (hiddenChild.indexOf(id) < 0) {
                        painter.config('strokeStyle', 'rgb(194, 53, 49)').strokeCircle(nodeP[id][0], nodeP[id][1], isHad ? 2 : 2 * deep);
                    } else {
                        painter.config('fillStyle', 'rgb(194, 53, 49)').fillCircle(nodeP[id][0], nodeP[id][1], isHad ? 2.5 : 2.5 * deep);
                    }



                    // 写文字
                    painter.bind('#text_' + id).config({
                        'fillStyle': "rgb(46, 52, 61)",
                        'font-size': isHad ? 7 : 7 * deep,
                        'textBaseline': 'middle',
                        'textAlign': textAlign
                    }).fillText("- " + id + " -", nodeP[id][0], nodeP[id][1], textAlign == 'right' ? newData.node[id].deg - Math.PI : newData.node[id].deg);

                    if (newData.node[id].pid != null) {

                        var ctrlP1 = $$.move(340 - nodeP[id][0], 340 - nodeP[id][1], 20, nodeP[id][0], nodeP[id][1]);
                        var ctrlP2 = $$.move(nodeP[newData.node[id].pid][0] - 340, nodeP[newData.node[id].pid][1] - 340, 20, nodeP[newData.node[id].pid][0], nodeP[newData.node[id].pid][1]);

                        painter

                            // 绘制连线
                            .bind('#path_' + id).config({
                                'strokeStyle': 'rgb(207, 202, 202)'
                            }).beginPath().moveTo(nodeP[id][0], nodeP[id][1]).bezierCurveTo(
                                ctrlP1[0], ctrlP1[1],
                                ctrlP2[0], ctrlP2[1],
                                nodeP[newData.node[id].pid][0], nodeP[newData.node[id].pid][1]
                            ).stroke();

                    }

                }

            }, 1000, function () {

                // 更新已经打开的结点信息
                hadDisplay = [];
                for (var id in newData.node) {
                    hadDisplay.push(id);
                }

                oldData = newData;
                // 如果还是初始化状态，启动下一层追加
                if (isInit) {

                    // 如果计算完毕，标记初始化完毕
                    if (newData.deep >= 5) isInit = false;

                    layout.config({
                        'radius': 60 * newData.deep,
                        'begin-deg': beginDeg / 5 * newData.deep
                    })(data);
                }

            });

        });

        layout(data);

    };

}]);
