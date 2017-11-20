#### flex伸缩容器
父元素属性
 - flex-direction: row; `Initial: row.`
 - flex-wrap: nowrap; `Initial: nowrap.`
 - flex-flow: row nowrap;`Initial: row nowrap.` 为`flex-direction`和`flex-wrap`的缩写
 - justify-content: flex-start;`Initial: flex-start.` 主轴方向元素布局方式(X) `flex-start`左对齐,`flex-end`右对齐,`center`居中,`space-between`两端对齐,`space-around`每个元素间隔平均
 - align-content: flex-start; `Initial: stretch.` 副轴方向元素布局方式(Y),多行-需要flex-wrap:wrap; `flex-start`左对齐,`flex-end`右对齐,`center`居中,`space-between`两端对齐,`space-around`每个元素间隔平均,`stretch`伸展铺满,不留空隙;
 - align-items: center; `Initial: stretch.` 控制元素布局,跟副轴的很像(单行,需要flex-wrap:nowrap)`flex-start`左对齐,`flex-end`右对齐,`center`居中,`

子元素属性
 - order: -1; `Initial: 0.` 控制元素排序位置,越小越前,越大越后
 - align-self: flex-start; `Initial: auto.` 控制自己布局方式
 - flex-grow: 0; `Initial: 0.`
 - flex-shrink: 1; `Initial: 1.`
 - flex-basis: content;`Initial: auto.`


#### 弹性布局的公式总结(em)
因为`font-size`是有继承性的
- 子元素自身`没有设置字号大小`时，元素的`width、height、line-height、margin、padding、border`等值转换都按下面公式转换：
1 ÷ 父元素的font-size × 需要转换的像素值 = em <=> 需要转换的像素值/父元素的font-size
- 子元素自身有设置`font-size`的时候,如果要计算`font-siz的em值`,一样是上面的公式,但其他的em值则根据自身`font-size`值进行计算
公式应该为:需要转换的像素值/子元素的font-size

1、浏览器的默认字体大小是16px
参考:http://www.w3cplus.com/css/px-to-em