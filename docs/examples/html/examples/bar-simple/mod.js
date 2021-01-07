ctrlapp.register.controller('barSimpleController', ['$remote', '$scope', function ($remote, $scope) {

  $scope.initMethod = function () {

    var width = 700,
      height = 500;

    var painter = $$("#palette")
      // 设置画布大小
      .attr({
        width,
        height
      })
      // 获取画笔
      .painter();

    var weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var data = [120, 200, 150, 80, 70, 110, 130];
    var ruler = [200, 150, 100, 50, 0];
    var maxValue = 200;

    painter
      // 绘制X轴
      .beginPath()
      .moveTo(50, height - 50)
      .lineTo(width, height - 50)
      .stroke()
      // 绘制Y轴
      .beginPath()
      .moveTo(50, 10)
      .lineTo(50, height - 50)
      .stroke();

    // 绘制X刻度
    for (var i = 0; i < weeks.length; i++) {
      painter
        // 文字
        .fillText(weeks[i], (width - 50) / 14 * (2 * i + 1) + 50, height - 30)
        // 刻度
        .fillRect((width - 50) / 7 * (i + 1) + 50, height - 50, 2, 10);
    }

    // 绘制Y刻度
    painter.config("textAlign", "right");
    for (var i = 0; i < ruler.length; i++) {
      painter
        // 文字
        .fillText(ruler[i], 30, 10 + (height - 60) / 4 * i)
        // 刻度
        .fillRect(40, 9 + (height - 60) / 4 * i, 10, 2);
    }

    // 绘制值
    painter.config("fillStyle", "#b34038");
    $$.animation(deep => {
      for (var i = 0; i < data.length; i++) {
        painter.fillRect(
          (width - 50) / 7 * i + 50 + 10,
          height - 50,
          (width - 50) / 7 - 20,
          -data[i] / maxValue * deep * (height - 60)
        );
      }
    }, 700);
  };

}]);