# 生命游戏 - Game of Life
[生命游戏](https://baike.baidu.com/item/%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F)是英国数学家[约翰·何顿·康威](https://baike.baidu.com/item/%E7%BA%A6%E7%BF%B0%C2%B7%E4%BD%95%E9%A1%BF%C2%B7%E5%BA%B7%E5%A8%81)在 1970 年发明的细胞自动机，它包括一个二维矩形世界，这个世界中的每个方格居住着一个活着的或死了的细胞。一个细胞在下一个时刻生死取决于相邻八个方格中活着的或死了的细胞的数量。

## 游戏规则
1. **人口过少**：任何活细胞如果活邻居少于2个，则死掉。
2. **正常**：任何活细胞如果活邻居为2个或3个，则继续活。
3. **人口过多**：任何活细胞如果活邻居大于3个，则死掉。
4. **繁殖**：任何死细胞如果活邻居正好是3个，则活过来。

## 开始游戏
[https://iflycn.github.io/gamelife/dist](https://iflycn.github.io/gamelife/dist)

## TODO
- [ ] 优化代码，提高游戏效率
- [x] 完善 README

## 相关链接
- [LifeWiki](http://www.conwaylife.com/wiki/Main_Page)