#### webpack打包大的问题
1.webpack配置文件`config/index.js`中的`productionSourceMap`属性是否设置了`true`,改为`false`即可.
2.有可能到处插件的方式不对
- 2.1 通过`缩略名`的方式,如:`import { LoadMore } from 'vux'`,有可能会把`vux`的所有组件都会导入到文件中(特别是使用了异步加载组件的方式,有时正常有些组件会打包异常,具体原因不清楚)
- 2.2 通过`具体路径`的方式,如:`mport LoadMore from 'vux/src/components/load-more'`,精准引入某个组件,这样就不会出现打包把全部组件打包到组件中去,但只会书写路径可能麻烦点.
3. 其他情况?,暂时没发现,如果你已经修改了1,2的`具体路径`还是打包大,可能是依赖的文件大吧,请自行检查.
