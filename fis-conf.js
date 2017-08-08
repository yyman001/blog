/* 
常用插件列表:http://fis.baidu.com/fis3/docs/common-plugin.html
编译打包:fis3 release -d ./dist
*/

//md5缓存方案
fis.match('*.{css,js,html}',  {
  useHash: true
});

 // fis-optimizer-uglify-js 插件进行压缩，已内置
fis.match('*.js', { 
  optimizer: fis.plugin('uglify-js')
});
//png 压缩
fis.match('*.png', {
    optimizer : fis.plugin('png-compressor')
});

/* 
让 fis3 产出能够支持相对路径。
npm install -g fis3-hook-relative
https://github.com/fex-team/fis3-hook-relative
不改变原有的路径地址
*/
fis.hook('relative');
fis.match('**', {
  relative: true
}) 

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true,
});

//修正生成雪碧图位置
fis.match('css/(**.png)', {
release: 'images/$1'
});
//css压缩
fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

/* 
自动给 css 属性添加前缀，让标准的 css3 支持更多的浏览器.
fis3-preprocessor-autoprefixer => npm install [-g] fis3-preprocessor-autoprefixer
https://www.npmjs.com/package/fis3-preprocessor-autoprefixer
*/

fis.match('*.css', {
  preprocessor: fis.plugin('autoprefixer', {
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  })
})

