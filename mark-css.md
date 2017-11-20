#### css
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