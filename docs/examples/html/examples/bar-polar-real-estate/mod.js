ctrlapp.register.controller('barPolarRealEstateController', ['$remote', '$scope', function ($remote, $scope) {

  $scope.initMethod = function () {

    var size = 600;

    var painter = $$("#palette")
      // 设置画布大小
      .attr({
        width: size,
        height: size
      })
      // 获取画笔
      .painter();

    var data = [
      // 最低，最高，平均
      [5000, 10000, 6785.71],
      [4000, 10000, 6825],
      [3000, 6500, 4463.33],
      [2500, 5600, 3793.83],
      [2000, 4000, 3060],
      [2000, 4000, 3222.33],
      [2500, 4000, 3133.33],
      [1800, 4000, 3100],
      [2000, 3500, 2750],
      [2000, 3000, 2500],
      [1800, 3000, 2433.33],
      [2000, 2700, 2375],
      [1500, 2800, 2150],
      [1500, 2300, 2100],
      [1600, 3500, 2057.14],
      [1500, 2600, 2037.5],
      [1500, 2417.54, 1905.85],
      [1500, 2000, 1775],
      [1500, 1800, 1650]
    ];
    var cities = [
      "北京",
      "上海",
      "深圳",
      "广州",
      "苏州",
      "杭州",
      "南京",
      "福州",
      "青岛",
      "济南",
      "长春",
      "大连",
      "温州",
      "郑州",
      "武汉",
      "成都",
      "东莞",
      "沈阳",
      "烟台"
    ];

    // 绘制圆形刻度尺
    painter.strokeCircle(size / 2, size / 2, size / 2 - 50).config({
      textAlign: "center"
    });
    for (var i = 0; i < cities.length; i++) {
      var p = $$.rotate(
        size / 2,
        size / 2,
        Math.PI / cities.length * 2 * (i + 0.5) - Math.PI / 2,
        size - 30,
        size / 2
      );
      painter
        // 刻度
        .fillArc(
          size / 2,
          size / 2,
          size / 2 - 50,
          size / 2 - 40,
          Math.PI / cities.length * 2 * i - Math.PI / 2 - 0.003,
          0.006
        )
        // 文字
        .fillText(cities[i], p[0], p[1]);
    }

    // 绘制几个灰色圈
    painter.config("strokeStyle", "gray");
    for (var i = 1; i <= 4; i++) {
      painter.strokeCircle(
        size / 2,
        size / 2,
        i * (size / 2 - 50) / 5,
        0,
        Math.PI * 2
      );
    }

    painter
      .config("strokeStyle", "black")
      // 绘制垂直刻度尺
      .beginPath()
      .moveTo(size / 2, size / 2)
      .lineTo(size / 2, 50)
      .stroke();

    var rules = ["0", "2,000", "4,000", "6,000", "8,000", "10,000"];

    painter.config({
      "font-size": 12,
      textAlign: "right"
    });
    for (var i = 0; i < rules.length; i++) {
      painter
        // 文字
        .fillText(
          rules[i],
          size / 2 - 15,
          size / 2 - (size / 2 - 50) / (rules.length - 1) * i
        )
        // 刻度
        .beginPath()
        .moveTo(
          size / 2 - 10,
          size / 2 - (size / 2 - 50) / (rules.length - 1) * i
        )
        .lineTo(size / 2, size / 2 - (size / 2 - 50) / (rules.length - 1) * i)
        .stroke();
    }

    $$.animation(
      deep => {
        // 绘制扇形
        for (var i = 0; i < data.length; i++) {
          painter
            // 最高和最低
            .config("fillStyle", "rgb(194, 55, 54)")
            .fillArc(
              size / 2,
              size / 2,
              data[i][0] / 10000 * (size / 2 - 50),
              (data[i][1] * deep > data[i][0]
                ? data[i][1] * deep
                : data[i][0]) /
              10000 *
              (size / 2 - 50),
              Math.PI / cities.length * 2 * i - Math.PI / 2 + 0.04,
              Math.PI * 2 / data.length - 0.08
            );
        }
      },
      700,
      () => {
        // 绘制平均值
        for (var i = 0; i < data.length; i++) {
          painter
            .config("fillStyle", "#000")
            .fillArc(
              size / 2,
              size / 2,
              data[i][2] / 10000 * (size / 2 - 50) - 2,
              data[i][2] / 10000 * (size / 2 - 50) + 2,
              Math.PI / cities.length * 2 * i - Math.PI / 2 + 0.04,
              Math.PI * 2 / data.length - 0.08
            );
        }
      }
    );
  };

}]);