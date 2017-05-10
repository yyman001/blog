#疑问问题思考,问题分析

####HTML语义化

i = em -> 代表语气助词(主要是用来强调),强调某关键词,而使句子含义不同
b = strong -> 重点性,关键词


#####编码
url包含中文的时候记得用 encodeURI 转码

#####git问题


解决 Permission denied(publicKey) 问题 (key过期)
http://senola.github.io/blog/2014/07/13/git-error/

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



Vue 2.0开发实践（组件间通讯）
https://github.com/webplus/blog/issues/10

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
父组件访问子组件：使用$children或$refs(建议用这种方式) - 子组件添加(1.0 v-ref:属性名 方式 ), (2.0 `ref="属性名"`)
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
	
在父组件中调用,通过v-on:自定义事件(子组件触发的事件=>$emit(eventName))="触发事件(父组件接收参数的方法)"
 
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

=======
////////////////////////
vue router2
////////////////////////
###编程式的导航
通过js方式执行路径切换

####router.push(location)

<router-link :to="..."> 等同于调用 router.push(...)。

声明式:`<router-link :to="...">`
编程式:`router.push(...)`

常用调用方式有
```html
/ 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

```


####router.replace(location)
不会向 history 添加新记录-替换掉当前的 history 记录。

声明式:`<router-link :to="..." replace>`
编程式:`router.replace(...)`

####router.go(number)
在 history 记录中向前或者后退多少步

常用方法
```html
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)

```
###命名路由
可以和普通路由混合书写
注意`to` 和`:to` 的书写

普通路由使用 `to` 属性方式绑定
命名路由使用 指令方式 `:to` (有冒号!有冒号!有冒号!)绑定
后面跟着表达式写法 {name:'路径名字',params:{id:'123'}}
`id`:为二级路径参数

```html```
<p>命名路由</p>
	<!--
	这个是普通路由
	<router-link to="/listName/123">ListName</router-link>
	-->
	<router-link :to="{ name:'listName' ,params: { id: 123 }} ">命名路由link</router-link>
	<!--
	也是等同于这种方式的调用
	router.push({ name: 'user', params: { userId: 123 }})
	-->
```
命名路由js定义中做一个name 参数

,{
	path:'/listName/:id',
	name:'listName', //命名路由定义,普通路由多写这个也不会报错,但在命名路由一定要写,不然会报错的
	component:routerNameDemo
}

###命名视图

以前的方式的多个组件使用一个路由进行渲染 一对多关系
使用命名视图 可以 指定组件 在指定的路由中渲染(就好比2个div,不同的组件对应不同的div进行渲染) 多对多??

为 router-view 标签添加上 `name` 属性即可
如果 router-view 没有设置名字，那么默认为 default。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,  //foo 组件默认渲染到没有名字的路由中
        a: book,  //book 组件渲染到 name=a 的路由中
        b: car   //car 组件渲染 到 name=b的路由中
      }
    }
  ]
})

```
####重定向
在路由对象中添加 redirect 属性并 指定 重定向路径(字符串)
```
{ path: '/a', redirect: '/b' } // 从a 重定向到 b
也可以是命名路由
{ path: '/a', redirect: { name: 'foo' }} 从a 重定向到 foo
还可以是一个方法
{ path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
}}

```
####别名
当访问/b 路径的时候,地址栏是/b,但访问内容映射到了/a,
既这2个路径地址都是指向A 模块的内容的
注意:
如果`/b`定义了路由,其他路由不能使用已定义的路由路径为别名
建议:别名不要跟 定义路径一样(会冲突,虽然不报错也没效果,但不建议这样写)
『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。
```
const router = new VueRouter({
  routes: [
    // {path:'/b',component:B}, //如果这个定义了,
    { path: '/a', component: A, alias: '/b' } //我的别名不能是/b,因为优先级的问题,会被忽略
  ]
})
```
####HTML5 History 模式
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
需要后台配置支持
具体可以看这章节:https://router.vuejs.org/zh-cn/essentials/history-mode.html
略过

###进阶
####导航钩子
（译者：『导航』表示路由正在发生改变。）
个人理解:说到钩子一般都由js来监控完成,所以在路由发生跳转(地址变更时,触发[捕抓]相应的钩子[事件],
可以进行干扰处理,对于要做出什么处理,看你自己需要怎么的处理)

官方翻译说法:正如其名，vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。
有多种方式可以在路由导航发生时执行钩子：`全局`的, 单个路由`独享`的, 或者`组件级`的。

先说说最长用的2个,就是`触发之前`和`触发之后`

1.router.beforeEach(guard)
2.router.afterEach(hook)

每个钩子方法接收三个参数：

to: Route: 即将要进入的目标 路由对象
from: Route: 当前导航正要离开的路由
next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
确保要调用 next 方法，否则钩子就不会被 resolved(执行)。

####全局钩子
 使用全局路由实例绑定的钩子则为 全局钩子
 eg:
```js

const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
     console.log(to,from)
     console.log(next)
	//1.如果不运行 next(); 路由不会发生跳转
	//2. 运行 next(false) , 路由一样不执行,我们可以具体打印3个参数查看下到底是怎么一回事
	
  });
Object {name: undefined, meta: Object, path: "/home", hash: "", query: Object…} Object {name: undefined, meta: Object, path: "/list", hash: "", query: Object…}

//很明显,next 参数是返回一个函数,所以要跳转必须运行函数[可以不传值]才能跳转路由
function (to) {
       if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL(true);
        abort();
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to);
        abort();
      } else {
        // confirm transition and pass on the value
        next(to);
      }
//路由跳转前会触发该钩子
next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。这尼玛我测试直接中断.没反应
=======
//同样可以注册一个全局的 after 钩子，不过它不像 before 钩子那样，after 钩子没有 next 方法，不能改变导航
不能控制导航!!!不能控制导航!!!不能控制导航!!!只是回调罢了.
router.afterEach(function(to,from,next){
	console.log('----after----')
	console.log(to,from)
	console.log(next);//undefined
});


```


####局部钩子(某个路由独享的钩子,在某个路由中添加钩子,方法跟全局一样,只是定义的地方不一样)
eg:
```js
const router = new VueRouter({
  routes: [
  //这是一个独立的路由
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]

```
####组件内的钩子 (感觉跟独立钩子一样???)
- beforeRouteEnter
- beforeRouteUpdate (2.2 新增)
- beforeRouteLeave
- watch
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是改组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}

解决:(通过vm实例传递)
不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}

这有篇文章讲解了路由钩子:http://www.cnblogs.com/faith3/p/6224235.html

####路由元信息
给路由添加meta 字段(独立标识,可能是防止匹配相同的嵌套路由判断用的吧)

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

```
官方讲解:routes 配置中的每个路由对象为 `路由记录`,路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录(就是嵌套路由,子路由)

可以使用上一节的全局钩子进行跳转前的判断,结合$route.matched 方法进行筛选

```
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```
这节还是右点模糊...后续补上

####过度动效(跟vue的使用方法大致一样)
<router-view> 是基本的动态组件,没错,跟vue 官网的动态组件一样<component>
标签一样,可以使用<transtion>标签进行嵌套完成动画的切换
<transition> 的所有功能 在这里同样适用。
如果见到的页面,可以不使用路由也可以的,因为使用路由之后,传导数据就开始编的麻烦了

```html
<transition>
	<component is:"组件名"></component>
</transition>

<!--
该用法会给所有路由设置一样的过渡效果
-->
<transition>
  <router-view></router-view>
</transition>

```
####单个路由的过渡
我个人觉得就是给组件添加 transition 吧,这样需要哪个给动画就给.
```js

const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}

<template id="list">
	<transition name="fade">
		<h2>我是列表页</h2>
	</transition>
</template>

```
####基于路由的动态过渡
还可以基于当前路由与目标路由的变化关系，动态设置过渡效果：
这里其实没多少新知识,也是vue的动态过度+钩子

```html
<!-- 使用动态的 transition name 动态指令绑定动画类名-->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length //通过判断路由长度来执行前进后退动画(url长就是进,短是后退)
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```
####数据获取(这节比较重要)
获取时机

-导航完成之后获取=>先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示。

- 导航完成之前获取=>导航完成前，在路由的 enter 钩子中获取数据，在数据获取成功后执行导航。

从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。

#####导航完成后获取数据
组件渲染完毕,马上现在loading加载提示,数据返回渲染的时候隐藏loading
```html
<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  //created () { //created方法不存在了.替换为
  computed(){
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```



#####在导航完成前获取数据
在路由跳转渲染组件之前获取到数据,使用组件的`beforeRouteEnter `钩子获取数据后调用`next`方法进行跳转(感觉比上面复杂点)
```html
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => 
      if (err) {
        // display some global error message
        next(false)
      } else {
        next(vm => {
          vm.post = post
        })
      }
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  watch: {
    $route () {
      this.post = null
      getPost(this.$route.params.id, (err, post) => {
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```

在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。

####滚动行为(注意: 这个功能只在 HTML5 history 模式下可用。)
当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：
```js
const router = new VueRouter({
  mode: 'history', //改变模式
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
	//savedPosition => Object {x: 0, y: 0}
  }
})
```
第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
返回滚动
- { x: number, y: number }
- { selector: string } (暂时没见到这个东西)

如果返回一个布尔假的值，或者是一个空对象，那么不会发生滚动。
跟`{x: 0, y: 0}`一样,不会滚动
按下 后退/前进 按钮时
```
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```
#####模拟描点滚动
```
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}

```
####路由懒加载 (需要异步组件基础,先跳过)
当路由被访问的时候才加载对应组件,结合 Vue 的 异步组件 和 Webpack 的 code splitting feature, 轻松实现路由组件的懒加载。
方式一:依赖webpack
```
const Foo = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['./Foo.vue'], () => {
    resolve(require('./Foo.vue'))
  })
}
```
方式二:把组件按组分块(基本路由配置不变)
有时候我们想把某个路由下的所有组件都打包在同个异步 chunk 中。只需要 给 chunk 命名，提供 require.ensure 第三个参数作为 chunk 的名称:
```
const Foo = r => require.ensure([], () => r(require('./Foo.vue')), 'group-foo')
const Bar = r => require.ensure([], () => r(require('./Bar.vue')), 'group-foo')
const Baz = r => require.ensure([], () => r(require('./Baz.vue')), 'group-foo')
```
Webpack 将相同 chunk 下的所有异步模块打包到一个异步块里面 —— 这也意味着我们无须明确列出 require.ensure 的依赖（传空数组就行）。




require.js
参考:http://javascript.ruanyifeng.com/tool/requirejs.html
在html中引入文件
关于根路径的定义
1.根据引入文件`require.js`中的`data-main`属性为入口路径. eq:data-main="js/main.js" => 基本路径为`./js`
2.可以在设置中是用baseUrl设置 eg:baseUrl:'js'
3.如果以上2个都没有写,则根据`require.js`所在目录为路径地址
4.1-2同时存在,2的优先级高

下面是第二种方案的完整代码示例
```javascript
require.config({
	baseUrl:'js', //如果用了第一种,这里可以省略,但也可以重写根路径
	paths: {
		"jquery": "jquery.min", //同目录下 就是 baseUrl + paths
		"a":"../module/a" //非同目录不 想加
		,"b":"../module/b"
	}
});
```
注意,全部依赖建议都写在paths里面定义,为什么这样,后期的模块定义会讲到
关于`config`的全部设置参数
```html
appDir：项目目录，相对于参数文件的位置。

baseUrl：js文件的位置。

dir：输出目录。

modules：一个包含对象的数组，每个对象就是一个要被优化的模块。

fileExclusionRegExp：凡是匹配这个正则表达式的文件名，都不会被拷贝到输出目录。

optimizeCss: 自动压缩CSS文件，可取的值包括“none”, “standard”, “standard.keepLines”, “standard.keepComments”, “standard.keepComments.keepLines”。

removeCombined：如果为true，合并后的原文件将不保留在输出目录中。

paths：各个模块的相对路径，可以省略js后缀名。

shim：配置依赖性关系。如果某一个模块不是AMD模式定义的，就可以用shim属性指定模块的依赖性关系和输出值。

generateSourceMaps：是否要生成source map文件。
```
define方法和require方法的使用的一样的,但define方法必须返回数据(给其他模块引用,不然其他模块无法引用)
`define`定义
`require`引用


###define方法：定义模块
-独立模块(不存在依赖模块)
```javascript
define(function () {
	return {
	    method1: function() {}, //抛出方法
		method2: function() {},
    };
});
//那么其他模块引用就可以 x.method1();//具体看require的时候再详细说明
```
-非独立模块(存在依赖关系)
-写法1
```javascript
define(['module1', 'module2'], function(m1, m2) {
   //...
});
define方法的第一个参数是一个数组，它的成员是当前模块所依赖的模块。
define方法的第二个参数是一个函数，当前面数组的所有成员加载成功后，它将被调用。它的参数与数组的成员一一对应
那么传入的m1,m2则是加载后的文件别名,但这种写法如果依赖过多就非常不好
```
-写法2(性能上比写法一差,解决方法,通过打包工具把代码转成写法1)
```javascript
define(
    function (require) {
        var m1 = require('module1'), //=> 这里其实是 模块调用了
            m2 = require('module2'),
    }
});

回到用过传入`require`,是用`require`方法引用模块
```
方法3:同时结合了1,2方法,第一个参数必须为`require`,后面紧跟`引用模块`(不建议用这个方法,建议使用方法2)
```
define(require,['module2', 'module3'], function(require,m2, m3) {
   //...
   var m1 = require('module1');
   m2
});

```
###require方法：`调用`模块 (怎么我感觉直接用defind就好了...),require只能写在define里面,感觉这个是动态调用的时候才用的
`建议使用数组的方式引用依赖模块`
require方法的第一个参数，是一个表示依赖关系的数组。这个数组可以写得很灵活，请看下面的例子。
`require 是一个方法，接受 模块标识 作为唯一参数，用来获取其他模块提供的接口。`
两种调用方式
1.异步 require - require({Array}ids, {Function}callback)
异步 require 中， ids 与 callback 的关系类似于 define 中 dependencies 与 factory 的关系。Loader 会负责加载 ids 中的模块，初始化完成，然后调用 callback。调用时传入的参数根据 ids 中声明的模块顺序。
2.同步 require - require({string}id)
同步 require 用于返回一个现有的模块，如果模块不存在，不允许去请求模块，必须抛出一个错误。
```javascript
require( [ window.JSON ? undefined : 'util/json2' ], function ( JSON ) {
  JSON = JSON || window.JSON;

  console.log( JSON.parse( '{ "JSON" : "HERE" }' ) );
});
```
上面代码加载JSON模块时，首先判断浏览器是否原生支持JSON对象。如果是的，则将undefined传入回调函数，否则加载util目录下的json2模块。

require方法也可以用在define方法内部。(就是引用的模块的时候)
```javascript
define(function (require) {
   var otherModule = require('otherModule'); 
});
```
全局 require和局部 require的区别在于
局部 require可以接受 Relative ID
动态加载模块
```javascript
define(function ( require ) {
    var isReady = false, foobar;
	//留意这里的require,  全局 require
    require(['foo', 'bar'], function (foo, bar) {
        isReady = true;
        foobar = foo() + bar();
    });
	/* 如果是这种写法可能会出问题
	 require(function (require) {  <== 这里的 require 可能会导致报错
        var foo = require('foo');
		var bar = require('bar'); //局部 require
    });
	
	*/
    return {
        isReady: isReady,
        foobar: foobar
    };
});
```
require方法允许添加第三个参数，即错误处理的回调函数。
```javascript
require(
    [ "backbone" ], 
    function ( Backbone ) {
        return Backbone.View.extend({ /* ... */ });
    }, 
    function (err) {
		// ...
    }
);
```
require对象还允许指定一个全局性的Error事件的监听函数
```javascript
requirejs.onError = function (err) {
    // ...
};
```
####建议:
- 模块声明不要写 ID
- 块划分应尽可能细粒度
- 在 factory 中使用 require 引用依赖模块，不要写 dependencies 参数 (require的第二种写法)
- 对于要使用的依赖模块，即用即 require
- 对于 package 依赖，require 使用 Top-Level ID(写路径)；对于相同功能模块群组下的依赖，require 使用 Relative ID
- 模块的资源引用，在 factory 头部声明
- 不要使用 paths ('conf': 'common/conf',指这种缩短路径方式)
- 使用第三方库，通过 package 引入(逻辑业务代码跟引用库划分开来)
- 业务重复的功能集合，趁早抽取 package
- package 内部模块之间的项目依赖，require 使用 Relative ID
- package 内部模块对主模块的依赖，不使用 require(‘.’)
- 可以对环境和模块进行区分，不需要太强迫症 典型的例子有 es5-shim / jquery 等。直接引入

###打包构建
[r.js](http://requirejs.org/docs/optimization.html) 是 RequireJS 附带的 optimize 工具，比较成熟，打包构建 AMD 模块的构建产物优秀。





####深入闭包问题
闭包需要几个条件:
- 闭包是在函数被调用执行的时候才被确认创建的。(但我个人认为,要视情况,有些复杂的情况,觉得是在预编译的时候就已经把这种关系确定下来)
- 闭包的形成，与作用域链的访问顺序有直接关系。
- 只有内部函数访问了上层作用域链中的变量对象时，才会形成闭包，因此，我们可以利用闭包来访问函数内部的变量。(这点就是第一点中提到的复杂情况)

用这个例子
```javascript
function foo() {
    var a = 10;

    function fn1() { // 如果改成 function fn1(a) => 调用的时候传入参数,也不是闭包了
        return a;
    }

    function fn2() {
        return 10; //无访问上层作用域变量
    }

    fn2();
}

foo();
```





谷歌浏览器57版的问题
preventDefault 事件被阻挡
解决:加上* { touch-action: none; } 





layer 弹窗插件bug
是用原生video元素的全屏会消失
原因:animation 动画属性影响
解决:
.layui-layer{
  &:-webkit-full-screen-ancestor:not(iframe){
	animation-name: none!important;
  }
}




vue-cli 离线模板初始化(window)
注意路径就尅了,到git把整个项目下载来,放到任意目录
eg:放在c盘根目录
```cmd
vue init `C:\webpack-master` `v-t`

```
支持sass,安装依赖,安装完重启服务器

npm install node-sass --save-dev
npm install sass-loader --save-dev

vue 路由:https://juejin.im/entry/58759934128fe1005838aea3


项目存放于子目录的配置如下eg: test目录
那么配置`config/index.js`
` assetsPublicPath: '/'`改为`assetsPublicPath: '/test目录/'` `test`就是要把资源文件存放在这个目录下
然后build
带来一个问题:在开发中,直接引用是静态资源,会找不到路径...这个(自己在对应目录下文件应该可以了??)


关于在vue组件开发模式中
是用 const $jquery = `require('@/js/jquery.2.1.4.min.js');`方式引用, 变量名不要跟全局抛出的一样,这个返回是一个{},跟传统的组件模块引入的不一样,所以做加个下划线或者其他名字,像jq的不要
写成 ~~`const $ = `require('@/js/jquery.2.1.4.min.js');`~~,这是不对了,



vuex
```cmd
var store =  new Vuex.Store({
    state: {
        messages: 0
    },
    mutations:{
        "ADD": function(state, msg) {
            state.messages += msg;
        }
    },
    // action不用再去外面定义 可以直接写在构建参数里
    actions:{
        "ADD" : function(store , param){
            store.commit('ADD',param)
        },
    }
})

使用常量替代 Mutation 事件类型
```cmd
mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
```
```
//页面调用需要卸载`computed`中
computed:{
   msg : function(){
      return this.$store.getters.getMessage
   }
}

Promise Action
```cmd
actions:{
    "ADD" : function(store , param){
        return new Promise(function(resolve, reject) {
            store.commit('ADD',param)
            resolve("ok");
        })
    }
}
```


MapGetters/ MapActions
mapState, mapMutations, mapGetters,mapActions

mapMutations,mapActions写在`methods`中
mapGetters,mapState 学在`computed`中




