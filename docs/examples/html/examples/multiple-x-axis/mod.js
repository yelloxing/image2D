ctrlapp.register.controller('multipleXAxisController', ['$remote', '$scope', function ($remote, $scope) {

    $scope.initMethod = function () {
        $remote.get('./data/moisture.json', $scope.doDraw);
    };

    /**
     * 绘图入口
     * @param {any} data 数据
     */
    $scope.doDraw = function (data) {

        // 设置画布大小并获取图层
        var layer = $$('#palette').attr({
            "width": "648.75",
            "height": "495"
        }).layer();

        // 获取绘制背景的画笔
        var bgPainter = layer.painter('background-image');

        // 绘制二条水平刻度尺
        $scope.rulerX(bgPainter, data[0].color, data[0].date, 60, -1);
        $scope.rulerX(bgPainter, data[1].color, data[1].date, 472.5, 1);

        // 绘制垂直刻度尺
        $scope.rulerY(bgPainter);

        // 绘制标题
        $scope.drawerTitle(bgPainter, 240, data[0].color, data[0].name);
        $scope.drawerTitle(bgPainter, 352.5, data[1].color, data[1].name);

        // 绘制背景灰线条
        var i, y;
        bgPainter.config('strokeStyle', 'gray');
        for (i = 0; i < 4; i++) {
            y = 390 - i * 82.5;
            bgPainter.beginPath().moveTo(22.5, y).lineTo(626.25, y).stroke();
        }

        // 绘制曲线
        $scope.lineData(layer, layer.painter('data'), data);

        // 背景绘制完毕，更新内容到画布
        layer.update();

    };

    /**
     * 绘制X坐标轴
     * @param {image2D.painter} painter 画笔
     * @param {string} color 坐标轴主题颜色 
     * @param {Array<string>} texts 刻度文字 
     * @param {number} y 坐标轴Y坐标 
     * @param {-1|1} help 标记文字在坐标轴上面还是下面 
     */
    $scope.rulerX = function (painter, color, texts, y, help) {

        painter

            // 设置刻度尺色调
            .config({
                'strokeStyle': color,
                'fillStyle': color,
                'textAlign': 'center',
                'font-size': 12
            })

            // 绘制刻度尺底线
            .beginPath().moveTo(22.5, y).lineTo(626.25, y).stroke();

        var i, x;
        for (i = 0; i < texts.length; i++) {

            x = (i + 0.25) * 52.5 + 22.5;

            painter

                // 绘制小刻度
                .beginPath().moveTo(x, y).lineTo(x, y + help * 7.5).stroke()

                // 绘制文字
                .fillText(texts[i], x, y + help * 15);

        }

    };


    /**
     * 绘制Y坐标轴
     * @param {image2D.painter} painter 画笔 
     */
    $scope.rulerY = function (painter) {

        painter

            // 设置刻度尺色调
            .config({
                'strokeStyle': '#000',
                'fillStyle': '#000',
                'textAlign': 'right',
                'font-size': 10
            })

            // 绘制刻度尺底线
            .beginPath().moveTo(22.5, 60).lineTo(22.5, 472.5).stroke();

        var i, y;
        for (i = 0; i < 6; i++) {

            y = 472.5 - i * 82.5;

            painter

                // 绘制小刻度
                .beginPath().moveTo(18.75, y).lineTo(22.5, y).stroke()

                // 绘制文字
                .fillText(i * 50, 17, y);

        }

    };

    /**
     * 绘制标题
     * @param {image2D.painter} painter 画笔 
     * @param {number} x 标题起点X坐标 
     * @param {string} color 标题颜色
     * @param {string} title 标题 
     */
    $scope.drawerTitle = function (painter, x, color, title) {

        painter.config({
            'strokeStyle': color,
            'fillStyle': '#fff',
            'textAlign': 'left',
            'font-size': 14
        })

            // 绘制文字前的小图标
            .beginPath().moveTo(x, 18.75).lineTo(x + 22.5, 18.75).stroke()
            .strokeCircle(x + 11.25, 18.75, 3.75).fillCircle(x + 11.25, 18.75, 3.75)

            // 绘制文字
            .config('fillStyle', '#000')
            .fillText(title, x + 26.25, 18.75);

    };

    /**
     * 把2015或2016的数据绘制到页面
     * @param {image2D.layer} layer 图层管理对象 
     * @param {image2D.painter} painter 画笔 
     * @param {any} data 数据 
     */
    $scope.lineData = function (layer, painter, data) {

        // 把数据变成页面上对应的坐标
        var toPoints = function (orgData) {
            var i, points = [];
            for (i = 0; i < orgData.length; i++) {
                points.push([
                    22.5 + (0.25 + i) * 52.5,
                    472.5 - orgData[i] * 1.65
                ]);
            }
            return points;
        };

        var points2015 = toPoints(data[0].data);
        var points2016 = toPoints(data[1].data);

        // 根据点获取二条回归直线
        var line2015 = $$.cardinal().setP(points2015);
        var line2016 = $$.cardinal().setP(points2016);

        $$.animation(function (deep) {

            // 擦干净数据图层
            painter.clearRect();

            var begX = 35.625,
                endX = (11 * deep + 0.25) * 52.5 + 22.5;

            // 绘制2015和2016
            $scope.lineImage(painter.config('strokeStyle', data[0].color), begX, endX, line2015);
            $scope.lineImage(painter.config('strokeStyle', data[1].color), begX, endX, line2016);

            layer.update();

        }, 2000, function () {

            // 绘制白点
            var i;
            for (i = 0; i < 12; i++) {

                var x = 35.625 + 52.5 * i;
                painter
                    // 大圈
                    .config('fillStyle', data[0].color).fillCircle(x, line2015(x), 2.5)
                    .config('fillStyle', data[1].color).fillCircle(x, line2016(x), 2.5)
                    // 小圈
                    .config('fillStyle', 'white').fillCircle(x, line2015(x), 2).fillCircle(x, line2016(x), 2);
            }

            layer.update();

            // 启动悬浮交互
            $scope.hoverInfo(layer, layer.painter('hover'), data, line2015, line2016);

        });

    };

    /**
     * 绘制2015或2016插值曲线
     * @param {image2D.painter} painter 画笔
     * @param {number} begX 开始X坐标
     * @param {number} endX 结束X坐标
     * @param {function} lineFun 曲线插值函数 
     */
    $scope.lineImage = function (painter, begX, endX, lineFun) {

        var i;
        painter.beginPath()
        for (i = begX; i < endX; i += 1) {
            painter.lineTo(i, lineFun(i));
        }
        painter.stroke();

    };

    $scope.hoverInfo = function (layer, painter, data, line2015, line2016) {

        painter.config({
            'textAlign': 'center',
            'font-size': 10
        });

        $$('#palette').bind('mousemove', function (event) {
            painter.clearRect();

            var position = $$(this).position(event || window.event);
            if (position.x > 22.5 && position.x < 626.25 && position.y > 60 && position.y < 472.5) {

                painter

                    // 绘制交叉直线
                    .config("strokeStyle", "gray")
                    .beginPath().moveTo(22.5, position.y).lineTo(625.25, position.y).stroke()
                    .beginPath().moveTo(position.x, 60).lineTo(position.x, 472.5).stroke()

                    // 绘制Y刻度值
                    .config("fillStyle", '#000').fillRect(2.5, position.y - 8, 40, 16)
                    .config('fillStyle', '#fff').fillText((250 - (position.y - 60) / 1.65).toFixed(2), 22.5, position.y);

                var index = Math.floor((position.x - 9.375) / 52.5);
                var x = 22.5 + (index + 0.25) * 52.5;

                painter

                    // 绘制2015提示文字
                    .config('fillStyle', data[0].color).fillRect(position.x - 55, 44, 110, 16)
                    .config('fillStyle', 'white').fillText("降水量 " + data[0].date[index] + " : " + data[0].data[index], position.x, 52)

                    // 绘制2016提示文字
                    .config('fillStyle', data[1].color).fillRect(position.x - 55, 472.5, 110, 16)
                    .config('fillStyle', 'white').fillText("降水量 " + data[1].date[index] + " : " + data[1].data[index], position.x, 480.5)

                    // 绘制2015圆圈
                    .config('fillStyle', data[0].color).fillCircle(x, line2015(x), 5)
                    .config('fillStyle', 'white').fillCircle(x, line2015(x), 4)

                    // 绘制2016圆圈
                    .config('fillStyle', data[1].color).fillCircle(x, line2016(x), 5)
                    .config('fillStyle', 'white').fillCircle(x, line2016(x), 4);


            }

            layer.update();
        });

    };

}]);