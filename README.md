#疑问问题思考,问题分析

#####git问题
1.git有3个版本,每个版本都有index.html,css,js文件各一个,如果现在是在第三个版本,修改了index,网上有第四版,想合并第四版,但index文件修改过,不会自动合并,可能会冲突,那该怎么处理?

2.我想把index.html 文件恢复到第二个版本,其他文件不变


######html5 canvas
1.什么情况下才用到beginPath 和 closePath
beginPath一般只在画线和圆才用到
当使用`stroke`描边,需要使用`closePath`关闭路径,而使用`fill`填充则不需要,因为它是自动闭合路径的.

moveTo 和 lineTo 的区别?
moveTo是画`起点路径`
lineTo是用来画`直线路径`



2.画圆的方法有几种,有什么区别?
arc(x, y, radius, startAngle, endAngle, anticlockwise)
arcTo(x1, y1, x2, y2, radius)
quadraticCurveTo(cp1x, cp1y, x, y)
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)


3.canvas对写入的图片有什么限制或对图片大小支持的限制?




######css
1.图片垂直居中7中方法[国外]
http://demosthenes.info/blog/723/Seven-Ways-of-Centering-With-CSS
