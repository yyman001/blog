
## vue router2
### 编程式的导航
通过js方式执行路径切换

#### router.push(location)

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

#### router.replace(location)
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
### 命名路由
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
```js
{
	path:'/listName/:id',
	name:'listName', //命名路由定义,普通路由多写这个也不会报错,但在命名路由一定要写,不然会报错的
	component:routerNameDemo
}
```
### 命名视图

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
#### 重定向
在路由对象中添加 redirect 属性并 指定 重定向路径(字符串)
```js
{ path: '/a', redirect: '/b' } // 从a 重定向到 b
也可以是命名路由
{ path: '/a', redirect: { name: 'foo' }} 从a 重定向到 foo
还可以是一个方法
{ path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
}}

```
#### 别名
当访问/b 路径的时候,地址栏是/b,但访问内容映射到了/a,
既这2个路径地址都是指向A 模块的内容的
注意:
如果`/b`定义了路由,其他路由不能使用已定义的路由路径为别名
建议:别名不要跟 定义路径一样(会冲突,虽然不报错也没效果,但不建议这样写)
『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。
```js
const router = new VueRouter({
  routes: [
    // {path:'/b',component:B}, //如果这个定义了,
    { path: '/a', component: A, alias: '/b' } //我的别名不能是/b,因为优先级的问题,会被忽略
  ]
})
```
#### HTML5 History 模式
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
需要后台配置支持
具体可以看这章节:https://router.vuejs.org/zh-cn/essentials/history-mode.html
略过
### 进阶
#### 导航钩子
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

#### 全局钩子
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
----
//同样可以注册一个全局的 after 钩子，不过它不像 before 钩子那样，after 钩子没有 next 方法，不能改变导航
不能控制导航!!!不能控制导航!!!不能控制导航!!!只是回调罢了.
router.afterEach(function(to,from,next){
	console.log('----after----')
	console.log(to,from)
	console.log(next);//undefined
});


```

#### 局部钩子(某个路由独享的钩子,在某个路由中添加钩子,方法跟全局一样,只是定义的地方不一样)
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
#### 组件内的钩子 (感觉跟独立钩子一样???)
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
#### 路由元信息
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

```js
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


#### 过度动效(跟vue的使用方法大致一样)
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
#### 单个路由的过渡
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

#### 基于路由的动态过渡
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
#### 数据获取(这节比较重要)
获取时机

-导航完成之后获取=>先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示。

- 导航完成之前获取=>导航完成前，在路由的 enter 钩子中获取数据，在数据获取成功后执行导航。

从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。

#### 导航完成后获取数据
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
#### 在导航完成前获取数据
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

#### 滚动行为(注意: 这个功能只在 HTML5 history 模式下可用。)
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
```js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

#### vue router 全局钩子`afterEach`获取url不对问题
在使用全局钩子`afterEach`中获取url地址不正确,跟`beforeEach`的一样,
解决:
```js
//延迟执行一下
setTimeout(function() {
  console.warn('afterEach', window.location.href);
  }, 100);

````

#### 模拟描点滚动
```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}

```
#### 路由懒加载 (需要异步组件基础,先跳过)
当路由被访问的时候才加载对应组件,结合 Vue 的 异步组件 和 Webpack 的 code splitting feature, 轻松实现路由组件的懒加载。
方式一:依赖webpack
```js
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
```js
const Foo = r => require.ensure([], () => r(require('./Foo.vue')), 'group-foo')
const Bar = r => require.ensure([], () => r(require('./Bar.vue')), 'group-foo')
const Baz = r => require.ensure([], () => r(require('./Baz.vue')), 'group-foo')
```
Webpack 将相同 chunk 下的所有异步模块打包到一个异步块里面 —— 这也意味着我们无须明确列出 require.ensure 的依赖（传空数组就行）。
