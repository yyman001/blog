
#### vuex
`刷新值会丢失！刷新值会丢失！刷新值会丢失！`
```js
var store =  new Vuex.Store({
    state: {
        messages: 0
    },
    mutations:{
	//主要为同步时间操作
        "ADD": function(state, msg) {
            state.messages += msg;
        }
    },
    actions:{
	//通过 actions 来处罚 mutations 中的事件，因为 actions 可能是异步操作
        "ADD" : function(store , param){
			//通过 store.commit('mutations的事件名',param)
            store.commit('ADD',param)
        },
    }
});



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

mapState => 直接获取state里面的值，又可以重名赋予给其他变量/相当于映射

MapGetters/ MapActions
mapState, mapMutations, mapGetters,mapActions

mapMutations,mapActions写在`methods`中
mapGetters,mapState 写在`computed`中，但也可以写在`methods`中

//时间触发
this.$store.dispatch => 派发(触发) actions 中的 事件

router.replace(location) //跳转

dispatch = > actions：表明有某些事件发生的意向（可能是异步操作产生的副作用）。
actions = > mutation => commit：说明会使实际状态发生改变的同步操作。
dispatch出发 actions 的事件（可能异步）出发了 mutation的 commit 同步操作
```

#### 局部状态state
非全局的状态可以使用模块方法进行局部的书写

模块一样是有自己的state，getters，mutations,actions 状态
就调用写起来麻烦点

静态模块
```js
cost store = new Vuex.Store({
    modules:{
       mod:A
    }
})
```	

动态加载模块
```js
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
store.unregisterModule(moduleName) 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。
//之后就可以通过 store.state.myModule 和 store.state.nested.myModule 访问模块的状态。
```
具体写法参考：https://vuex.vuejs.org/zh-cn/modules.html


#### 相关文章
- [vuex2 中文文档](https://vuex.vuejs.org/zh-cn/api.html)
- [vuex v2 中的一些变化](http://kingsongao.com/blog/2016/07/24/vuex-v2-%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%98%E5%8C%96/)
- [Vuex 2.0 入门 —— 读 Vuex 2.0 英文文档笔记](https://juejin.im/entry/57fde6560bd1d00058da4c5d)
- [低仿饿了么H5-纯前端Vue版 + 手把手教学](http://www.jianshu.com/p/65c957b228e9)
- [技术胖的vuex视频教程](http://jspang.com/2017/05/03/vuex/)
- [vue2.0一起在懵逼的海洋里越陷越深](http://leenty.com/tags/vuejs/)
- [Vuex中Actions参数传递](http://www.jianshu.com/p/73e3677e9dd2)


