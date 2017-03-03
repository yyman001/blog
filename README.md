#疑问问题思考,问题分析

####HTML语义化

i = em -> 代表语气助词(主要是用来强调),强调某关键词,而使句子含义不同
b = strong -> 重点性,关键词




#####git问题

1.git有3个版本,每个版本都有index.html,css,js文件各一个,如果现在是在第三个版本,修改了index,网上有第四版,想合并第四版,但index文件修改过,不会自动合并,可能会冲突,那该怎么处理?
-先提交,再拉去合并,去冲突,再次提交.
2.我想把index.html 文件恢复到第二个版本,其他文件不变
--1.命令的不知道怎么操作-,命令的思路:把当前文件保存到缓存区,切换回到第二版本,把第二版的index.html提取出来,再切换到最新的工作区,把缓存区内容切换回来,替换index.html
--2.如果是使用SourceTree图形,选中第二版本的index.html,copy内容到你当前的index.html即可

2.1 查看hard
git log
git log --oneline

3.在各个版本之前切换(会删除之前的历史提交)
git reset --hard SHA

3.1 改变 HEAD 的指向 (不删除之前的历史提交,但文件可能会出现冲突之类的)
图形( 检出 )
命令: git checkout sha 或 创建一个新分支再切换

技巧:在分支上作业,可以先存个空白节点为无内容修改存点,为之后可以切换回来留下一个切换点

4.倒退到指定时间点指定文件
git checkout SHA filename

5.合并最近几个提交
git rebase -i sha

6.撤销
6.1 (回滚提交),创建一个新的[commit]来覆盖指定一个[commit]进行回滚(旧提交不删除,对指定[commit]反向操作) 可以针对历史中任何一个提交
git revert sha 

6.2 git reset (重置提交) 只能从当前提交向前回溯
git reset <commit> 重新提交项目历史,以前的提交将存放到缓冲区
git reset --hard 它清除了所有未提交的更改,
git reset --hard <commit> 将当前分支的末端移到<commit>,它清除了所有未提交的更改,清除了<commit>之后的所有提交


7.合并一个提交到当前分支
git cherry-pick [commit]

8.显示最近几个提交的历史记录
git reflog 
[

git reflog不会永远存在。
reflog只是你个人的。
]

使用撤销命令：git reflog /git reset [重设完全地移除了一堆更改] /git revert [撤销保留了原来的更改] / git checkout


9.git clean 将未跟踪的文件从你的工作目录中移除

git clean -df 移除未跟踪的文件，以及目录。
git clean -xf 移除当前目录下未跟踪的文件，以及Git一般忽略的文件。

10.重写项目历史
git commit --amend

git rebase <base>（ID、分支名、标签，或是HEAD的相对引用）



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
	
	
	方式1: 需要$.when 开头 (单个 Deferred 可以不用 $.when 来执行)
	
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
	})
	
	方式1-2:
	_tools.ajax({
		url:"http://activity.appgame.com/activity/common/session_login.php",//登陆接口
		type:"GET",
		cache:false,
		data:{time:new Date().getTime()},
		dataType:"jsonp"
	}).then(function(data){
		var login_name_tmp = data.login_name_tmp;//用户名
			console.log('检查登录2',login_name_tmp);
			if(login_name_tmp){
				    $('.regLogTab0').hide();//隐藏登陆
					$('.username').html(login_name_tmp);//用户名赋值
					$('#username').html(login_name_tmp);//用户名赋值
					$('.regLogTab1').show();//显示用户名
			}
	})
	
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

单个 Deferred 可以不用 $.when 来执行

代码中,可以 直接 是用 $.when 来执行 Deferred 定义的异步 --> 需要是用 $.when 来调用 Deferred 定义的异步,之后可以在 then 中返回 Deferred定义的函数 ,看起来要 $.when 带头 
     也可以 在定义 Deferred 的时候 把返回 $.when 的执行 --> 就会 开始调用 Deferred 的函数 不用是用$.when ,看起来比较正常点,但感觉在定义在 Deferred 里面有点多余 
	 到底2种写法哪里更好?个人不的而知,不过我还是建议使用第一种

建议:在同时执行多个 Deferred 或者 队列 Deferred 才使用 $.when
	 相关问题:http://stackoverflow.com/questions/5627284/pass-in-an-array-of-deferreds-to-when/5627301#5627301 
	  demo: http://jsfiddle.net/YNGcm/21/
	  
	  $.when.apply($, my_array);
	  $.when.apply(null , my_array);
	  第一个参数 $ , null 的区别? 2个都可以执行,好像没看出有什么区别
/////////////////////////////////////////////////////////////


动画秘诀 本人做的笔记，不明白自己看手册吧。
一个视点（perspective）、两种模式（2D，3D）、三条轴线（X,Y,Z）、四种变化（旋转、移动 、缩放、扭曲）
perspective
perspective（视点) 眼睛到显示器的距离，数值越大，离的越远，看得越小，反之。创建3D动画必须声明的属性！定义有两种方式，一种是基于舞台 perspective:800px; 、一种是基于自身 transform：perspective(800px;)
perspective-origin
perspective-origin 此属性必须跟随上面的 perspective 一起使用！该属性作用是设置视点的观看坐标。perspective-origin(x,y)，x[left,center,right]、y[top,center,bottom]、也可以设置为百分比，可以负值。
transform-style
transform-style 设置子元素位于此元素所在平面或三维空间内。transform-style：flat | preserve-3d
transform-origin
transform-origin 设置该元素按某个原点进行转换。transform-origin(x,y)，x[left,center,right]、y[top,center,bottom]、也可以设置为百分比，可以负值。
backface-visibility
backface-visibility 设置一个元素背面面向用户时是否可见。backface-visibility：visible | hidden



js原型
实例中的指针仅指向原型，而不指向构造函数。

所有函数的默认原型都是 Object 的实例，因此默认原型都会包含一个内部指针 __proto__，指向 Object.prototype。




//////
Vue主要有以下几个关键字
v-model 绑定模型
v-if 判断是否显示该dom
v-show 判断是否将该dom的display设为none
v-else if或者show为false时显示该dom
v-for 迭代
v-bind 绑定属性
v-on 绑定方法

设计模式
-创建型设计模式 => 构造器模式（Constructor）,工厂模式（Factory）,抽象工厂模式 （Abstract）,原型模式 （Prototype）,单例模式 （Singleton）以及 建造者模式（Builder）。
-结构设计模式 => 装饰模式，外观模式，享元模式，适配器模式和代理模式。
-行为设计模式 => 迭代模式，中介者模式，观察者模式和访问者模式。

Object 
Abstract Factory(抽象工厂)       建立若干族类的一个实例，这个实例不需要具体类的细节信息。（抽象类）

Builder (建造者)                     将对象的构建方法和其表现形式分离开来，总是构建相同类型的对象。

Prototype(原型)                      一个完全初始化的实例，用于拷贝或者克隆。

Singleton(单例)                      一个类只有唯一的一个实例，这个实例在整个程序中有一个全局的访问点。

Structural                             根据构建对象块的方法分成下面几类。

Class                                    

Adapter(适配器)                       将不同类的接口进行匹配，调整，这样尽管内部接口不兼容但是不同的类还是可以协同工作的。

Bridge(桥接模式)                      将对象的接口从其实现中分离出来，这样对象的实现和接口可以独立的变化。

Composite(组合模式)                通过将简单可组合的对象组合起来，构成一个完整的对象，这个对象的能力将会超过这些组成部分的能力的总和，即会有新的能力产生。

Decorator(装饰器)                    动态给对象增加一些可替换的处理流程。

Facada(外观模式)                     一个类隐藏了内部子系统的复杂度，只暴露出一些简单的接口。

Flyweight(享元模式)                  一个细粒度对象，用于将包含在其它地方的信息 在不同对象之间高效地共享。

Proxy(代理模式)                       一个充当占位符的对象用来代表一个真实的对象。

Behavioral                            基于对象间作用方式来分类。

Class

Interpreter(解释器)                  将语言元素包含在一个应用中的一种方式，用于匹配目标语言的语法。

Template Method(模板方法)       在一个方法中为某个算法建立一层外壳，将算法的具体步骤交付给子类去做。

Object         

Chain of Responsibility(响应链)              一种将请求在一串对象中传递的方式，寻找可以处理这个请求的对象。

Command(命令)                                  封装命令请求为一个对象，从而使记录日志，队列缓存请求，未处理请求进行错误处理 这些功能称为可能。

Iterator(迭代器)                                  在不需要直到集合内部工作原理的情况下，顺序访问一个集合里面的元素。

Mediator(中介者模式)                           在类之间定义简化的通信方式，用于避免类之间显式的持有彼此的引用。

Observer(观察者模式)                          用于将变化通知给多个类的方式，可以保证类之间的一致性。

State(状态)                                        当对象状态改变时，改变对象的行为。

Strategy(策略)                                    将算法封装到类中，将选择和实现分离开来。

Visitor(访问者)                                    为类增加新的操作而不改变类本身。
















vue 组件注册
------------
1. Vue.extend()是Vue构造器的扩展，调用Vue.extend()创建的是一个组件构造器。 
2. Vue.extend()构造器有一个选项对象，选项对象的template属性用于定义组件要渲染的HTML。 
3. 使用Vue.component()注册组件时，需要提供2个参数，第1个参数时组件的标签，第2个参数是组件构造器。 
4. 组件应该挂载到某个Vue实例下，否则它不会生效。
------------

1.页面全局部注册
	
// 1.创建一个组件构造器
var myComponent = Vue.extend({
	template: '<div>This is my first component!</div>'
})

// 2.注册组件，并指定组件的标签，组件的HTML标签为<my-component>
Vue.component('my-component', myComponent)  //需要提供2个参数，第1个参数时组件的标签，第2个参数是组件构造器。 

new Vue({
	el: '#app'
});

另一写法 - 语法糖

/ 全局注册，my-component1是标签名称
Vue.component('my-component1',{
    template: '<div>This is the first component!</div>'
})

var vm1 = new Vue({
    el: '#app1'
})

/////////

2.页面局部
 // 1.创建一个组件构造器
var myComponent = Vue.extend({
	template: '<div>This is my first component!</div>'
})

//Vue.component('my-component', myComponent)  取消这一步

new Vue({
	el: '#app',
	components: {
		// 2. 将myComponent组件注册到Vue实例下   <== 注册到这个实例
		'my-component' : myComponent,
		data: function () {  
           return {};
        }  
	}
});

------语法糖
```html
var vm2 = new Vue({
el: '#app2',
components: {
	// 局部注册，my-component2是标签名称
	'my-component2': {
		template: '<div>This is the second component!</div>'
	},
	// 局部注册，my-component3是标签名称
	'my-component3': {
		template: '<div>This is the third component!</div>'
	}
}
})	
```		
		
///////////////		

组件的嵌套 	
	子组件只能在父组件的template中使用

	
	
////////////
使用script或template标签

1.使用<script>标签   --- 比较少使用这种方式

```html
<script type="text/x-template" id="myComponent">
	<div>This is a component!</div>
</script>

 Vue.component('my-component',{
	template: '#myComponent'
})
        
```



2.使用<template>标签

```html
<template id="myComponent">
	<div>This is a component!</div>
</template>

Vue.component('my-component',{
	template: '#myComponent'
})

```
	
	
	
	
	
	
///////  动态组件




组件之间的数据传递


父 -> 子 

<div id="app">
    <my-component v-bind:my-name="name" v-bind:my-age="age"></my-component>
</div>

<template id="myComponent">
    <table>
        <tr>
            <th colspan="2">
                子组件数据
            </th>
        </tr>
        <tr>
            <td>my name</td>
            <td>{{ myName }}</td>
        </tr>
        <tr>
            <td>my age</td>
            <td>{{ myAge }}</td>
        </tr>
    </table>
</template>

var vm = new Vue({
    el: '#app',
    data: {
        name: 'keepfool',
        age: 28
    },
    components: {
        'my-component': {
            template: '#myComponent',
            props: ['myName', 'myAge'] // myName => 子组件的值
			//也可以通过以下这种方式获取,但官网没提到,this.$root 获取到父级 vm实例
			,data:function (){
				retuen {
					myName:this.$root.name,
					myAge:this.$root.age
				}
			}
        }
    }
})

```cmd
父组件访问子组件：使用$children或$refs(建议用这种方式) - 子组件添加v-ref:属性名 方式
子组件访问父组件：使用$parent
子组件访问根组件：使用$root
```

注意:得到父元素数据,必须用 props 中定义的名称 读取变量,非 父元素 属性名

				 v-bind:子组件的值="父组件的属性"
<child-component v-bind:子组件prop="父组件数据属性"></child-component>

在模板把父的数据通过属性传递,子 在js 中 props 传递属性 接收 数据
	
自定义事件

子 -> 父 
	
使用 $on(eventName) 监听事件    父元素监听事件
使用 $emit(eventName) 触发事件  子元素抛出事件
	
eventName => 要规范属性,建议用全小写,不要用峰驼式(不支持)
	eg:
              峰驼:	 clickA  (不支持)
         小写+数字:	 click1  (支持)
     小写+小写字母:	 click-a (支持)
小写+横杆+大写字母:	 click-A (不支持)
            全大写:	 CLICK   (不支持)
	
在父组件中调用,通过v-on:自定义事件="触发事件"
 
 <view-cont1 v-bind:items="items" @show-win="showWin"></view-cont1>
=

可以看这:	
http://www.cnblogs.com/wisewrong/p/6266038.html
	

----------注意事件的监听书写

----------
	
/////////////////内容分发
是用 slot 标签作为占位符,并是用 name 属性 指定



套用:
标签元素 slot="name的值"
eg:
<div>
    <slot name="text">分布内容</slot>
</div>

<p slot="text">我是内容</p>

既可 替换 占位符内容

=======================
如何禁止浏览器滚动条滚动，但是又不让它消失？(https://www.zhihu.com/question/21865401)
1.依然保留滚动条,上鼠标上下滚轮事件取消 http://output.jsbin.com/disable-scrolling/1
2.直接隐藏滚动条,并补回消失的滚动条宽度(m,p的值都可以) http://yujiangshui.com/review-how-to-make-popup-mask-effect/
建议:蒙版层可以 深色一点




	
	

