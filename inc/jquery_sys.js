$(function () {
  // 基础信息
  console.table(["Author: iflycn", "E-mail: iflycn@gmail.com", "GitHub: https://github.com/iflycn/gamelife"]);
  // 初始化生命
  var dom = $("#gamelife");
  var lifeSize = 40;
  for (var i = 0; i < lifeSize; i++) {
    for (var j = 0; j < lifeSize; j++) {
      dom.append("<span></span>");
    }
  }
  var liftWidth = 10;
  dom.css({
    "width": isMobile() ? "90%" : lifeSize * (liftWidth + 1) + 1,
    "height": isMobile() ? "90%" : lifeSize * (liftWidth + 1) + 1
  }).find("span").css({
    "width": isMobile() ? dom.width() / lifeSize - 1 : liftWidth,
    "height": isMobile() ? dom.width() / lifeSize - 1 : liftWidth
  });
  isMobile() && $("div.scroll").height($(window).height() - dom.height() - 80);
  var speed = lifeSize * lifeSize / 16;
  $("span.info:eq(1)").text(speed / 1e3);
  // 获取生命数组
  isMobile() || $("div.log").dblclick(function () {
    $(this).find("p:eq(1)").remove();
    $(this).append("<p>" + arrLife(dom.find("span")) + "</p>")
  });
  // 切换生命状态
  dom.find("span").click(function () {
    toggleLife($(this));
  });
  // 清空全部生命
  $("button.no_life").click(function () {
    noLife(dom.find("span"));
  });
  // 生成生命
  $("button.give_life").click(function () {
    giveLife(dom.find("span"), $(this).attr("data-life"));
  });
  // 开始进化
  $("button.life_evolution").click(function () {
    for (var i = 0; i < $(this).attr("data-time"); i++) {
      setTimeout(function () {
        lifeEvolution(dom.find("span"), lifeSize);
      }, i * speed);
    }
  });
  // 地图控制
  $("button.map_control").click(function () {
    mapControl(dom.find("span"), lifeSize, $(this).attr("data-map"));
  });
});

//函数：判断是否移动设备（无参数）
function isMobile() {
  var v = !1,
    Agent = ["iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire"],
    thisSys = navigator.userAgent.toLowerCase();
  $.each(Agent, function (i, n) {
    thisSys.indexOf(n) != -1 && (v = !0)
  });
  return v;
}

//函数：返回生命数组（DOM）
function arrLife(dom) {
  var arr = [];
  dom.each(function (n) {
    $(this).hasClass("living") && arr.push(n);
  });
  return arr;
}

//函数：计算生命数量（无参数）
function countLife() {
  $("span.info:eq(0)").text($(".living").size());
}

//函数：计算计划层次（无参数）
function countEvolution() {
  $("span.info:eq(2)").text(~~$("span.info:eq(2)").text() + 1);
}

//函数：切换生命状态（DOM）
function toggleLife(dom) {
  dom.toggleClass("living");
  countLife();
}

//函数：清空全部生命（DOM）
function noLife(dom) {
  dom.removeClass();
  countLife()
  $("span.info:eq(2)").text("0");
}

//函数：生成生命（DOM，生命数组）
function giveLife(dom, arr) {
  dom.empty().removeClass("living");
  if (!!arr) {
    if (typeof arr == "string") {
      $("span.info:eq(2)").text("0");
      arr = arr.split(",");
    }
    $.each(arr, function (n, v) {
      dom.eq(v).addClass("living");
    });
    // console.log(arr);
  } else {
    $("span.info:eq(2)").text("0");
    dom.each(function () {
      var isLiving = Math.random() > 0.7 ? !0 : !1;
      isLiving && $(this).addClass("living");
    });
  }
  countLife();
}

//函数：开始一次进化（DOM，生命矩阵大小）
function lifeEvolution(dom, lifeSize) {
  $(".living").size() == 0 && giveLife(dom);
  var arr = [];
  dom.each(function (n) {
    var life = [~~(n / lifeSize), n % lifeSize];
    var count = $(this).hasClass("living") ? -1 : 0;
    for (var i = life[0] - 1; i <= life[0] + 1; i++) {
      for (var j = life[1] - 1; j <= life[1] + 1; j++) {
        i >= 0 && j >= 0 && dom.eq(i * lifeSize + j).hasClass("living") && count++;
      }
    }
    // $(this).text(count);
    if ($(this).hasClass("living")) {
      count >= 2 && count <= 3 && arr.push(n);
    } else {
      count == 3 && arr.push(n);
    };
  });
  giveLife(dom, arr);
  countEvolution();
}

//函数：地图控制（DOM，生命矩阵大小，方向）
function mapControl(dom, lifeSize, map) {
  arr = arrLife(dom);
  $.each(arr, function (n, v) {
    if (map == "up") {
      arr[n] -= lifeSize;
    }
    if (map == "down") {
      // arr[n] += lifeSize;
      arr[n] = (arr[n] + lifeSize) % (lifeSize * lifeSize);
    }
    if (map == "left") {
      // arr[n] -= 1;
      arr[n] == 0 ? arr[n] = lifeSize - 1 : arr[n] = ((arr[n] - 1) % lifeSize) + (~~(arr[n] / lifeSize) * lifeSize);
    }
    if (map == "right") {
      // arr[n] += 1;
      arr[n] = ((arr[n] + 1) % lifeSize) + (~~(arr[n] / lifeSize) * lifeSize);
    }
  });
  giveLife(dom, arr);
}