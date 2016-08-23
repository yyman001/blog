#疑问问题思考,问题分析

#####git问题

1.git有3个版本,每个版本都有index.html,css,js文件各一个,如果现在是在第三个版本,修改了index,网上有第四版,想合并第四版,但index文件修改过,不会自动合并,可能会冲突,那该怎么处理?

2.我想把index.html 文件恢复到第二个版本,其他文件不变
--1.命令的不知道怎么操作-,命令的思路:把当前文件保存到缓存区,切换回到第二版本,把第二版的index.html提取出来,再切换到最新的工作区,把缓存区内容切换回来,替换index.html
--2.如果是使用SourceTree图形,选中第二版本的index.html,copy内容到你当前的index.html即可

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
img透明图
伪类填充比例h/w比pt%值

3.字体适应问题
rem
媒体查询

4.手机端获取pageX,pgaeY
--1.参考答案http://stackoverflow.com/questions/7100153/jquery-swipe-vs-touch-pagex-and-pagey-keep-returning-0
使用`e.originalEvent.touches[0].pageX` 或 `event.targetTouches[0].pageY` 而非e.touches[0](多点触控会出问题)

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

2.关于使用伪类进行高度扩展自适应,父级的容器必须有宽度(遇上圣杯布局和双翼布局要特别注意布局是不正确编写易导致,伪类无法撑开正常的宽度)
伪类扩展高度
```css
.cover-img{
  &:after{
    content:'';
    display:block;
    padding-top:?%;//父级高/宽 * 100
  }
}


```



黑白灰度滤镜兼容全浏览器
软文链接:http://www.majas-lapu-izstrade.lv/cross-browser-grayscale-image-example-using-css3-js-v2-0-with-browser-feature-detection-using-modernizr/
demo:http://www.majas-lapu-izstrade.lv/cross-browser-grayscale-ie11-v2/


###开发
1.如何使用sass 更好管理项目模块?
现状:文件太多,结构太深,对于资源文件的引用比较麻烦

2.页面布局与布局命名与组件划分管理?
布局更灵活/简单/清晰


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
  





/////////////////////////////////////////////////////////////
关于jq 中的 $.when 与及 Deferred 对象的一些有趣研究
/////////////////////////////////////////////////////////////

```javascript
var _tools = {
		   ajax:function(data){
			var $d = $.Deferred();
			$.ajax({
				type: data.type,
				url: data.url,
				data: data.data,
				cache: data.cache,
				dataType: data.dataType,
				beforeSend:data.beforeSend
			}).done(function(data){
				$d.resolve(data);
			}).fail(function(){
				console.log('//////////////fail/////////////');
				$d.reject('fail');
			});

			return $d.promise();
		},
		ajax2:function(data){
		var deferred = $.Deferred();
		    $.ajax({
				type: data.type,
				url: data.url,
				data: data.data,
				cache: data.cache,
				dataType: data.dataType,
				beforeSend:data.beforeSend
			}).done(function(response){
				var r = String(response);
                deferred.resolve(response);
				//$d.resolve(data);
			}).fail(function(){
				console.log('//////////////fail2/////////////');
				deferred.reject('fail');
			});
		
		
         return $.when(deferred.promise());
		}
		
	}
	
	/*
	方式1: 需要$.when 开头
	$.when(_tools.ajax({
		url:"http://activity.appgame.com/activity/common/session_login.php",//登陆接口
		type:"GET",
		cache:false,
		data:{time:new Date().getTime()},
		dataType:"jsonp"
	})).then(function(data){
		var login_name_tmp = data.login_name_tmp;//用户名
			console.log('检查登录2',login_name_tmp);
			if(login_name_tmp){
				    $('.regLogTab0').hide();//隐藏登陆
					$('.username').html(login_name_tmp);//用户名赋值
					$('#username').html(login_name_tmp);//用户名赋值
					$('.regLogTab1').show();//显示用户名
			}
	})*/
	
	//方式2: 忽略 $when 开头,直接定义在 Deferred 封装的函数里面
	_tools.ajax2({
		url:"http://activity.appgame.com/activity/common/session_login.php",//登陆接口
		type:"GET",
		cache:false,
		data:{time:new Date().getTime()},
		dataType:"jsonp"
	}).then(function(data){
		
		console.log('检查登录3',data);
		
		return _tools.ajax2({
		url:"http://activity.appgame.com/activity/common/session_login.php",//登陆接口
		type:"GET",
		cache:false,
		data:{time:new Date().getTime()},
		dataType:"jsonp"
		})
	}).then(function(data){
		console.log('检查登录2',data);
	})

```
/////////////////////////////////////////////////////////////
代码中,可以 直接 是用 $.when 来执行 Deferred 定义的异步 --> 需要是用 $.when 来调用 Deferred 定义的异步,之后可以在 then 中返回 Deferred定义的函数 ,看起来要 $.when 带头 
     也可以 在定义 Deferred 的时候 把返回 $.when 的执行 --> 就会 开始调用 Deferred 的函数 不用是用$.when ,看起来比较正常点,但感觉在定义在 Deferred 里面有点多余 
	 到底2种写法哪里更好?个人不的而知,不过我还是建议使用第一种
/////////////////////////////////////////////////////////////













