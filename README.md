#疑问问题思考,问题分析

#####git问题
1.git有3个版本,每个版本都有index.html,css,js文件各一个,如果现在是在第三个版本,修改了index,网上有第四版,想合并第四版,但index文件修改过,不会自动合并,可能会冲突,那该怎么处理?

2.我想把index.html 文件恢复到第二个版本,其他文件不变


######html5 canvas
1.什么情况下才用到beginPath 和 closePath
beginPath一般只在画线和弧度(圆)才用到
当使用`stroke`描边,需要使用`closePath`关闭路径,而使用`fill`填充则不需要,因为它是自动闭合路径的.但还是建议写,因为符合规范.

moveTo 和 lineTo 的区别?
moveTo是画`起点路径`
lineTo是链接moveTo的线路径



2.画圆的方法有几种,有什么区别?
arc(x, y, radius, startAngle, endAngle, anticlockwise)
arcTo(x1, y1, x2, y2, radius)
---------以上2种只是绘画出相同半径的曲线
quadraticCurveTo(cp1x, cp1y, x, y) `二次塞比尔曲线`
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) `三次塞比尔曲线`


3.canvas对写入的图片有什么限制或对图片大小支持的限制?

######webapp
1.布局问题

2.图片自适应问题

3.字体适应问题


######css
1.图片垂直居中7中方法[国外]
http://demosthenes.info/blog/723/Seven-Ways-of-Centering-With-CSS

关于居中(一)
http://www.w3ctrain.com/2015/12/07/about-center/
1.table-cell
2.幽灵法:伪类高度100%;
eq:
```css
.ghost-center {
  position: relative;
}
.ghost-center::before {
  content: " ";
  display: inline-block;
  height: 100%;
  width: 1%;
  vertical-align: middle;
}
.ghost-center p {
  display: inline-block;
  vertical-align: middle;
}
```







