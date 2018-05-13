// 基础信息
console.log(["Author: iflycn", "E-mail: iflycn@gmail.com", "GitHub: https://github.com/iflycn/gamelife"]);

// 定义全局变量
var dom = $("#gamelife");
var life = [];
var lifeSize = ~~getVar("s") > 0 ? ~~getVar("s") : 40;
var lifeWidth = ~~getVar("w") > 0 ? ~~getVar("w") : 10;
var speed = lifeSize * lifeSize / 20;

$(function () {
  // 初始化样式
  $("head").append("<style></style>");
  $("head style").append("#gamelife{width:" + (isMobile() ? "90%" : lifeSize * (lifeWidth + 1) + 1) + "px;height:" + (isMobile() ? "90%" : lifeSize * (lifeWidth + 1) + 1) + "px}");
  $("head style").append("#gamelife span{width:" + (isMobile() ? dom.width() / lifeSize - 1 : lifeWidth) + "px;height:" + (isMobile() ? dom.width() / lifeSize - 1 : lifeWidth) + "px}");
  isMobile() && $("div.scroll").height($(window).height() - dom.height() - 80);
  $("span.info:eq(1)").text(speed / 1e3);
  // 初始化生命
  newLife();
  // 获取生命数组
  isMobile() || $("div.log").dblclick(function () {
    $(this).find("p:eq(1)").remove();
    $(this).append("<p>" + arrLife().join("|") + "</p>")
  });
  // 切换生命状态
  dom.on("click", "span", function () {
    toggleLife($(this));
  });
  // 清空全部生命
  $("button.no_life").click(function () {
    newLife();
  });
  // 生成生命
  $("button.give_life").click(function () {
    giveLife($(this).attr("data-life") && $(this).attr("data-life").split("|"));
  });
  // 开始进化
  $("button.life_evolution").click(function () {
    $(".living").size() == 0 && giveLife();
    for (var i = 0; i < ~~$(this).attr("data-time"); i++) {
      setTimeout(function () {
        lifeEvolution();
      }, i * speed);
    }
  });
  // 地图控制
  $("button.map_control").click(function () {
    mapControl($(this).attr("data-map"));
  });
});

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

//函数：初始化生命数组（无参数）
function newGamelife() {
  life = [];
  for (var i = 0; i < lifeSize; i++) {
    life.push([]);
    for (var j = 0; j < lifeSize; j++) {
      life[i].push(!1);
    }
  }
}

//函数：计算生命数量（无参数）
function countLife() {
  $("span.info:eq(0)").text($(".living").size());
}

//函数：刷新生命地图（无参数）
function reLife() {
  var spans = "";
  $.each(life, function (i) {
    $.each(life[i], function (j, n) {
      var span = "<span data-id=\"" + i + "," + j + "\"";
      span += n ? " class=\"living\"></span>" : "></span>";
      spans += span;
    });
  });
  dom.html(spans);
  countLife();
}

//函数：初始化生命（无参数）
function newLife() {
  newGamelife();
  reLife();
  $("span.info:eq(2)").text("0");
}

//函数：返回活生命数组（无参数）
function arrLife() {
  var arr = [];
  $(".living").each(function () {
    arr.push($(this).attr("data-id").split(","));
  });
  return arr;
}

//函数：切换生命状态（生命）
function toggleLife(span) {
  var id = span.attr("data-id").split(",");
  life[id[0]][id[1]] = !life[id[0]][id[1]];
  reLife();
}

//函数：生成生命（生命数组）
function giveLife(arr) {
  if (!!arr) {
    newGamelife();
    $.each(arr, function (i, n) {
      if (typeof n == "string") {
        $("span.info:eq(2)").text("0");
        n = n.split(",");
      }
      life[n[0]][n[1]] = !0;
    });
  } else {
    $("span.info:eq(2)").text("0");
    $.each(life, function (i) {
      $.each(life[i], function (j) {
        life[i][j] = Math.random() > 0.7 ? !0 : !1;
      });
    });
  }
  reLife();
}

//函数：开始一次进化（无参数）
function lifeEvolution() {
  var arr = [];
  $.each(life, function (i) {
    arr.push([]);
    $.each(life[i], function (j, n) {
      var count = n ? -1 : 0;
      for (var ii = i - 1; ii <= i + 1; ii++) {
        for (var jj = j - 1; jj <= j + 1; jj++) {
          ii >= 0 && jj >= 0 && ii < lifeSize && jj < lifeSize && life[ii][jj] && count++;
        }
      }
      if (n) {
        count >= 2 && count <= 3 ? arr[i].push(!0) : arr[i].push(!1);
      } else {
        count == 3 ? arr[i].push(!0) : arr[i].push(!1);
      };
    });
  });
  life = [].concat(arr);
  reLife();
  $("span.info:eq(2)").text(~~$("span.info:eq(2)").text() + 1);
}

//函数：地图控制（方向）
function mapControl(map) {
  arr = arrLife();
  $.each(arr, function (i) {
    if (map == "up") {
      arr[i][0] = ~~arr[i][0] - 1 < 0 ? lifeSize - 1 : ~~arr[i][0] - 1;
    }
    if (map == "down") {
      arr[i][0] = ~~arr[i][0] + 1 >= lifeSize ? 0 : ~~arr[i][0] + 1;
    }
    if (map == "left") {
      arr[i][1] = ~~arr[i][1] - 1 < 0 ? lifeSize - 1 : ~~arr[i][1] - 1;
    }
    if (map == "right") {
      arr[i][1] = ~~arr[i][1] + 1 >= lifeSize ? 0 : ~~arr[i][1] + 1;
    }
  });
  giveLife(arr);
}