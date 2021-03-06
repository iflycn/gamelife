# 生命游戏 - Game of Life
[生命游戏](https://baike.baidu.com/item/%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F)是英国数学家[约翰·何顿·康威](https://baike.baidu.com/item/%E7%BA%A6%E7%BF%B0%C2%B7%E4%BD%95%E9%A1%BF%C2%B7%E5%BA%B7%E5%A8%81)在 1970 年发明的细胞自动机，它包括一个二维矩形世界，这个世界中的每个方格居住着一个活着的或死了的细胞。一个细胞在下一个时刻生死取决于相邻八个方格中活着的或死了的细胞的数量。

## 游戏规则
1. **人口过少**：任何活细胞如果活邻居少于2个，则死掉。
2. **正常**：任何活细胞如果活邻居为2个或3个，则继续活。
3. **人口过多**：任何活细胞如果活邻居大于3个，则死掉。
4. **繁殖**：任何死细胞如果活邻居正好是3个，则活过来。

## 游戏截图
![](https://github.com/iflycn/gamelife/blob/master/ScreenGif.gif)

## 开始游戏
[https://iflycn.github.io/gamelife/](https://iflycn.github.io/gamelife/)
### 游戏参数
- 双击信息统计可以自定义生命
- 可以接受参数来自定义细胞大小和数量
- 例如：[https://iflycn.github.io/gamelife/?s=40&w=20](https://iflycn.github.io/gamelife/?s=40&w=20)

## TODO
- [x] (5) 改用 Canvas 绘图
- [x] (4) 解决世界大小变化时，预定义生命无法正确安放
- [x] (3) 优化代码，提高游戏效率
- [x] (2) 兼容移动端
- [x] (1) 完善 README

## 相关链接
- [LifeWiki](http://www.conwaylife.com/wiki/Main_Page)