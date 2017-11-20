### vue 组件注册
- Vue.extend()是Vue构造器的扩展，调用Vue.extend()创建的是一个组件构造器。 
- Vue.extend()构造器有一个选项对象，选项对象的template属性用于定义组件要渲染的HTML。 
- 使用Vue.component()注册组件时，需要提供2个参数，第1个参数时组件的标签，第2个参数是组件构造器。 
- 组件应该挂载到某个Vue实例下，否则它不会生效。

#### 1.页面全局部注册
```js
@1
// 1.创建一个组件构造器
var myComponent = Vue.extend({
	template: '<div>This is my first component!</div>'
})

// 2.注册组件，并指定组件的标签，组件的HTML标签为<my-component>
Vue.component('my-component', myComponent)  //需要提供2个参数，第1个参数时组件的标签，第2个参数是组件构造器。 

new Vue({
	el: '#app'
});

@2//另一写法 - 语法糖
// 全局注册，my-component1是标签名称
Vue.component('my-component1',{
    template: '<div>This is the first component!</div>'
})

var vm1 = new Vue({
    el: '#app1'
})
```

#### 2.页面局部
```js
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

#### 组件的嵌套 	
- 子组件只能在父组件的template中使用
- 使用script或template标签

##### 1.使用`<script>`标签 `比较少使用这种方式`

```js
<script type="text/x-template" id="myComponent">
	<div>This is a component!</div>
</script>

 Vue.component('my-component',{
	template: '#myComponent'
})
        
```

##### 2.使用`<template>`标签

```js
<template id="myComponent">
	<div>This is a component!</div>
</template>

Vue.component('my-component',{
	template: '#myComponent'
})

```

#### 动态组件

Vue 2.0开发实践（组件间通讯）
https://github.com/webplus/blog/issues/10

Vue2 利用 v-model 实现组件props双向绑定的优美解决方案(这个方案也很好解决类似弹窗的数据传递问题)
https://segmentfault.com/a/1190000008662112

如何在Vue2中实现组件props双向绑定[作者自己编写了一个mixin用于双向绑定]
http://www.cnblogs.com/xxcanghai/p/6124699.html

#### 组件之间的数据传递
```js
//父 -> 子 

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
```

```cmd
父组件访问子组件：使用$children或$refs(建议用这种方式) - 子组件添加(1.0 v-ref:属性名 方式 ), (2.0 `ref="属性名"`)
子组件访问父组件：使用$parent
子组件访问根组件：使用$root

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
可以看这:	
http://www.cnblogs.com/wisewrong/p/6266038.html
注意事件的监听书写
```

#### 内容分发
```js
是用 slot 标签作为占位符,并是用 name 属性 指定

套用:
标签元素 slot="name的值"
eg:
<div>
    <slot name="text">分布内容</slot>
</div>

<p slot="text">我是内容</p>

既可 替换 占位符内容
```
#### vuex
```js
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
```
使用常量替代 `Mutation` 事件类型
```js
mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
```

//页面调用需要卸载`computed`中
```js
computed:{
   msg : function(){
      return this.$store.getters.getMessage
   }
}
```
Promise Action
```js
actions:{
    "ADD" : function(store , param){
        return new Promise(function(resolve, reject) {
            store.commit('ADD',param)
            resolve("ok");
        })
    }
}
```
computed属性可以在输出前(未渲染数据)，对data中的值进行改变
映射的方法不用带(),有参数就不知道了..

如:
```js
`store.js`
getters: {
    getIntegral: (state) => state.integral,
}
`组件`
,computed:{...mapGetters(['getIntegral'])}
`组件里面调用`
注意getIntegral`不带括号[不然会报错]`~(虽然组件有同名的方法,可能会覆盖哦~)
console.log('this.getIntegral():',this.getIntegral); => 会输出 `state.integral`的值

MapGetters/ MapActions
mapState, mapMutations, mapGetters,mapActions

mapMutations,mapActions写在`methods`中
mapGetters,mapState 学在`computed`中

this.$store.dispatch => 派发(触发) actions 中的 事件

router.replace(location) //跳转

dispatch = > actions：表明有某些事件发生的意向（可能是异步操作产生的副作用）。
actions = > mutation => commit：说明会使实际状态发生改变的同步操作。
```

##### 相关文章
vuex v2 中的一些变化
http://kingsongao.com/blog/2016/07/24/vuex-v2-%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%98%E5%8C%96/

Vuex 2.0 入门 —— 读 Vuex 2.0 英文文档笔记
https://juejin.im/entry/57fde6560bd1d00058da4c5d

低仿饿了么H5-纯前端Vue版 + 手把手教学
http://www.jianshu.com/p/65c957b228e9

vue2.0一起在懵逼的海洋里越陷越深
http://leenty.com/2016/10/21/vue2-1/ 1
http://leenty.com/tags/vuejs/ 2-5

技术胖的vuex视频教程
http://jspang.com/2017/05/03/vuex/





