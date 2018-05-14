/**
 * 生命游戏 - Game of Life
 * Author: iflycn
 * E-mail: iflycn@gmail.com
 * GitHub: https://github.com/iflycn/gamelife
 */

$(function () {
  // 初始化样式
  var dom = $("#gamelife");
  var gl = new gameLife(dom);
  dom.css({
    "width": isMobile() ? "90%" : gl.size * (gl.width + 1) + 1,
    "height": isMobile() ? "90%" : gl.size * (gl.width + 1) + 1
  }).attr({
    "width": gl.size * (gl.width + 1) + 1,
    "height": gl.size * (gl.width + 1) + 1
  });
  isMobile() && $("div.scroll").height($(window).height() - dom.height() - 80);
  $("span.info:eq(1)").text(gl.speed / 1e3);
  // 初始化生命
  gl.newLife();
  // 获取生命数组
  isMobile() || $("div.log").dblclick(function () {
    $(this).find("p:eq(1)").remove();
    $(this).append("<p>" + gl.arrLife().join("|") + "</p>")
  });
  // 切换生命状态
  dom.click(function (e) {
    gl.toggleLife(e);
  });
  // 清空全部生命
  $("button.no_life").click(function () {
    gl.newLife();
  });
  // 生成生命
  $("button.give_life").click(function () {
    gl.giveLife($(this).attr("data-life") && gl.mapRenormalization($(this).attr("data-life").split("|")));
  });
  // 开始进化
  $("button.life_evolution").click(function () {
    gl.arrLife().length == 0 && gl.giveLife();
    for (var i = 0; i < ~~$(this).attr("data-time"); i++) {
      setTimeout(function () {
        gl.evolutionLife();
      }, i * gl.speed);
    }
  });
  // 地图控制
  $("button.map_control").click(function () {
    gl.mapControl($(this).attr("data-map"));
  });
});

// 对象：定义生命游戏（DOM）
function gameLife(dom) {
  this.data = [];
  this.size = ~~getVar("s") > 0 ? ~~getVar("s") : 40;
  this.width = ~~getVar("w") > 0 ? ~~getVar("w") : 10;
  this.color = "#336600";
  this.speed = this.size * this.size / 128 < 50 ? 50 : this.size * this.size / 128;

  //函数：初始化生命数组（无参数）
  gameLife.prototype.beLife = function () {
    var that = this;
    that.data = [];
    for (var i = 0; i < that.size; i++) {
      that.data.push([]);
      for (var j = 0; j < that.size; j++) {
        that.data[i].push(!1);
      }
    }
  }

  //函数：刷新生命地图（无参数）
  gameLife.prototype.reLife = function () {
    var that = this;
    var ctx = dom[0].getContext("2d");
    $.each(that.data, function (row) {
      $.each(that.data[row], function (col, n) {
        ctx.fillStyle = n ? that.color : "#222222";
        ctx.fillRect(row * (that.width + 1) + 1, col * (that.width + 1) + 1, that.width, that.width);
      });
    });
    $("span.info:eq(0)").text(that.arrLife().length);
  }

  //函数：初始化生命（无参数）
  gameLife.prototype.newLife = function () {
    var that = this;
    that.beLife();
    that.reLife();
    $("span.info:eq(2)").text("0");
  }

  //函数：返回活生命数组（无参数）
  gameLife.prototype.arrLife = function () {
    var that = this;
    var arr = [];
    $.each(that.data, function (row) {
      $.each(that.data[row], function (col, n) {
        n && arr.push([row, col]);
      });
    });
    return arr;
  }

  //函数：切换生命状态（EVENT）
  gameLife.prototype.toggleLife = function (e) {
    var that = this;
    var row = ~~((e.pageX - dom.offset().left) / ((dom.width() - 1) / that.size));
    var col = ~~((e.pageY - dom.offset().top) / ((dom.width() - 1) / that.size));
    that.data[row][col] = !that.data[row][col];
    that.reLife();
  }

  //函数：生成生命（生命数组）
  gameLife.prototype.giveLife = function (arr) {
    var that = this;
    if (!!arr) {
      that.beLife();
      $.each(arr, function (i, n) {
        if (typeof n == "string") {
          $("span.info:eq(2)").text("0");
          n = n.split(",");
        }
        that.data[n[0]][n[1]] = !0;
      });
    } else {
      $("span.info:eq(2)").text("0");
      $.each(that.data, function (row) {
        $.each(that.data[row], function (col) {
          that.data[row][col] = Math.random() > 0.7 ? !0 : !1;
        });
      });
    }
    that.reLife();
  }

  //函数：开始一次进化（无参数）
  gameLife.prototype.evolutionLife = function () {
    var that = this;
    var arr = [];
    $.each(that.data, function (row) {
      arr.push([]);
      $.each(that.data[row], function (col, n) {
        var count = n ? -1 : 0;
        for (var i = row - 1; i <= row + 1; i++) {
          for (var j = col - 1; j <= col + 1; j++) {
            i >= 0 && j >= 0 && i < that.size && j < that.size && that.data[i][j] && count++;
          }
        }
        if (n) {
          count >= 2 && count <= 3 ? arr[row].push(!0) : arr[row].push(!1);
        } else {
          count == 3 ? arr[row].push(!0) : arr[row].push(!1);
        };
      });
    });
    that.data = [].concat(arr);
    that.reLife();
    $("span.info:eq(2)").text(~~$("span.info:eq(2)").text() + 1);
  }

  //函数：地图控制（方向）
  gameLife.prototype.mapControl = function (map) {
    var that = this;
    var arr = that.arrLife();
    $.each(arr, function (i) {
      if (map == "up") {
        arr[i][1] = ~~arr[i][1] - 1 < 0 ? that.size - 1 : ~~arr[i][1] - 1;
      }
      if (map == "down") {
        arr[i][1] = ~~arr[i][1] + 1 >= that.size ? 0 : ~~arr[i][1] + 1;
      }
      if (map == "left") {
        arr[i][0] = ~~arr[i][0] - 1 < 0 ? that.size - 1 : ~~arr[i][0] - 1;
      }
      if (map == "right") {
        arr[i][0] = ~~arr[i][0] + 1 >= that.size ? 0 : ~~arr[i][0] + 1;
      }
    });
    that.giveLife(arr);
  }

  //函数：地图重正（生命数组）
  gameLife.prototype.mapRenormalization = function (arr) {
    var that = this;
    if (that.size != 40) {
      var arrRow = [];
      var arrCol = [];
      $.each(arr, function (i, n) {
        arrRow.push(n.split(",")[0]);
        arrCol.push(n.split(",")[1]);
      });
      arrRow.max = Math.max.apply(null, arrRow);
      arrRow.min = Math.min.apply(null, arrRow);
      arrCol.max = Math.max.apply(null, arrCol);
      arrCol.min = Math.min.apply(null, arrCol);
      if (arrRow.max - arrRow.min >= that.size || arrCol.max - arrCol.min >= that.size) {
        console.error("The map is too small to hold life.");
        return [];
      } else {
        var re = ~~(that.size / 2) - 20;
        if (re < 0 && ((arrRow.min != 0 && arrRow.min + re < 0) || (arrCol.min != 0 && arrCol.min + re < 0))) {
          console.error("The map is too small to renormalization life.");
          return [];
        }
      }
      var arr = [];
      $.each(arrRow, function (i) {
        if (arrRow.min > 0) {
          arrRow[i] = ~~arrRow[i] + re;
        }
        if (arrCol.min > 0) {
          arrCol[i] = ~~arrCol[i] + re;
        }
        arr.push(arrRow[i] + "," + arrCol[i]);
      });
    }
    return arr;
  }
}

//函数：判断是否移动设备（无参数）
function isMobile() {
  var v = !1,
    Agent = ["iphone", "ipod", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire"],
    thisSys = navigator.userAgent.toLowerCase();
  $.each(Agent, function (i, n) {
    thisSys.indexOf(n) != -1 && (v = !0)
  });
  return v;
}

//函数：获取URL参数（变量）
function getVar(s) {
  var r = new RegExp("(^|)" + s + "=([^\&]*)(\&|$)", "gi").exec(String(location.href));
  return !!r ? r[2] : "";
}