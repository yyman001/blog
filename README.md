#疑问问题思考,问题分析

#### HTML语义化

i = em -> 代表语气助词(主要是用来强调),强调某关键词,而使句子含义不同
b = strong -> 重点性,关键词


#### 编码
url包含中文的时候记得用 encodeURI 转码





#### html5 canvas

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

#### webapp

微信坑
关于css动画 用js写内联属性的动画会出现点击元素被强制清除动画(某些苹果机会出现这样的情况,部分不会,安卓没有这个问题)
基于判断问题出在微信对 动画性能上,所以建议动画写在css文件里面,如果不是一直处理活动状态的css动画,可以忽略,不然还是建议写在文件是用类名进行调用.


1.布局问题

2.图片自适应问题
img透明图
伪类填充比例h/w比pt%值

3.字体适应问题
rem
媒体查询

4.手机端获取pageX,pgaeY
--1.参考答案http://stackoverflow.com/questions/7100153/jquery-swipe-vs-touch-pagex-and-pagey-keep-returning-0
使用`e.originalEvent.touches[0].pageX` 或 `event.targetTouches[0].pageY` 而非e.touches[0](多点触控会出问题)


关于css3 文本省略号溢出bug的问题
注意:文本省略不能是用于 带有 `href属性`的  <a> 标签,其他标签可以是用
相关测试demo:http://jsfiddle.net/qb62mjbr/
其他实现方案:http://lomu.me/post/css-multiline-text-overflow





#### 开发
1.如何使用sass 更好管理项目模块?
现状:文件太多,结构太深,对于资源文件的引用比较麻烦

2.页面布局与布局命名与组件划分管理?
布局更灵活/简单/清晰
是用 `BEM` 命名

####38活动动画问题以及开发的问题
css动画方案

1.纯css
  -> 1.1 添加class(动画全部属性写在class)
  -> 1.2 标签属性定义动画名,持续时间,延迟事件(js 添加class)
  -事件回调,使用js回调	

2.js写
  -> 其他插件实现
GSAP 插件

========页面切换(不使用2方案),使用 class添加方案+回调|| 1.1 + 1.2 混合方案

animate-effect="fadeInUp" animation-duration=".75s" animate-delay="1.2s"

// bug:同步执行动画(带有延迟的,已经变成可视,但动画还没开始) [重复css导致]


=====================================插件
#### iScroll5

#####不能复制文本
  解决方案:http://www.voidcn.com/blog/xw505501936/article/p-6094669.html
  方法二（参数设置）： 
  iScroll5版本： 
  参数中preventDefault: true 修改为 preventDefault: false即可，但是此方法是处理了所有的冒泡传递事件，虽然也可解决当前问题； 
  但是会对iscroll设计初衷流畅度有所影响 

#####不能点击click/点击事件无效
  添加 click: true 参数即可  
  

////////
ISO  移动端 input 无法输入文本
现象：安卓机正常，苹果手机输入没有显示，input没有值。
```css
-webkit-user-select:none;
```
请勿包含这个属性,



如何禁止浏览器滚动条滚动，但是又不让它消失？(https://www.zhihu.com/question/21865401)
1.依然保留滚动条,上鼠标上下滚轮事件取消 http://output.jsbin.com/disable-scrolling/1
2.直接隐藏滚动条,并补回消失的滚动条宽度(m,p的值都可以) http://yujiangshui.com/review-how-to-make-popup-mask-effect/
建议:蒙版层可以 深色一点







#### 谷歌浏览器57版的不支持preventDefault事件解决方案
新版谷歌的`preventDefault`事件会被阻挡,低版本没有问题,在需要的element元素上使用(需要拖动的element),不建议使用`*`会有问题的
解决:加上
```css
* { touch-action: none; } 
```




#### layer弹窗插件bug
是用原生video元素的全屏会消失,没错,是整个video元素都消失了
原因:animation 动画属性影响
解决:
```sass
.layui-layer{
  &:-webkit-full-screen-ancestor:not(iframe){
	animation-name: none!important;
  }
}
```



#### vue-cli 离线/本地初始化手架(window)
官方有`linux`的讲解方法,但`window`就懵逼了
注意`路径`就可以了,到git把整个项目下载来,放到任意目录(完整下载,不建议用git拉,会很慢)
eg:把下载包完整解压放到`c`盘根目录
```cmd
vue init `C:\webpack-master` `v-t`
vue init `文件路径` `模板名称`
```
然后就可以愉快的使用了,开始你的vue之旅吧.



支持sass,安装依赖,安装完重启服务器

npm install node-sass --save-dev
npm install sass-loader --save-dev

vue 路由:https://juejin.im/entry/58759934128fe1005838aea3


项目存放于子目录的配置如下eg: test目录
那么配置`config/index.js`
` assetsPublicPath: '/'`改为`assetsPublicPath: '/test目录/'` `test`就是要把资源文件存放在这个目录下
然后build
带来一个问题:在开发中,直接引用是静态资源,会找不到路径...这个(自己在对应目录下文件应该可以了??)








