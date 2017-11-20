#### require.js
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
