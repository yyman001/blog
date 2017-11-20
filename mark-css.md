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

#### css3d动画秘诀
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

