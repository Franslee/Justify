# Justify #
 
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/franslee/Justify/LICENSE)

Justify 是一个实现元素两端自适应对齐、均分宽度布局的javascript控件。控件对最后一行对齐做了处理，使最后一行的元素能居左依次与上一行的元素垂直对齐，并支持去除部分DOCTYPE下最后一行产生的空隙。控件为移动web编写，支持移动设备旋转事件。暂不支持桌面IE浏览器低版本。效果图如下：
#![github](http://franslee.github.io/Justify/demo.png 'demo png')

元素均分宽度、两端自适应对齐的布局在移动web项目中的需求还是挺多的，使用inline-block元素，配合text-align:justify，再注意处理好一些细节问题，便可以在现代浏览器上实现两端对齐，但是最后一行的处理却是个难题。很多时候我们希望最后一行元素不是两端对齐，而是居左排列，并且依次与上一行的元素垂直对齐。CSS3中有一个属性叫text-align-last，可以用来设置最后一行的对齐方式，遗憾的是它的备选值中并没有上面提到的这种方式，另一方面这个属性大部分浏览器还不支持，尤其在移动端，尚存在严重的兼容性问题。本控件就是为处理这些问题而生。

## DEMO ##
请用手机扫描以下二维码,以访问DEMO页面。
#[![github](http://franslee.github.io/Justify/qr_code.png "Justify.js DEMO")](http://franslee.github.io/Justify/demo/demo.html)

## 用法 ##

HTML结构，本组件目前只支持对无序列表ul应用：

```html
<ul class="justify-list" id="test">
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
</ul>
```

在页面中引入组件所需样式表文件justify.css

```html
<link rel="stylesheet" href="../dist/justify.css">
```

引入justify.min.js或justify.js文件

```html
<script src='../dist/justify.js'></script>
```

在确保页面**DOM加载完毕**之后，初始化组件, 比如写在DOMContentLoaded事件处理函数中：

```js
 window.addEventListener("DOMContentLoaded",function(){
 	//取得ul标签对应的DOM对象
	var oUl = document.getElementById('test');
	//应用Justify,将ul标签对应的DOM对象传入
	Justify.apply(oUl);
 },false);
```

如果页面已经引入了jquery或zepto等类库，也可以写在$(document).ready()中：

```js
$(function() {
	//取得ul标签对应的DOM对象
	var oUl = document.getElementById('test');
	//应用Justify,将ul标签对应的DOM对象传入
	Justify.apply(oUl);
});
```

当然您还可以直接在页面底部初始化组件。


## 设置 options ##

初始化Justify组件时，支持传入两个参数，第一个参数是ul的DOM对象，必传。第二个参数是一个对象，可以通过它对组件的一些功能进行配置。

```js
Justify.apply(ul,options);
```

* 参数ul是将要应用本组件的ul标签对应的DOM对象，必传
* 参数options也可以是一个json对象，可选，通过它对组件的一些功能进行配置, 允许的keys见下表

<table>
	<tr>
		<th>key</th>
		<th>类型</th>
		<th>默认值</th>
		<th>描述</th>
	</tr>
	<tr>
		<td>removeBtmGap</td>
		<td>boolean</td>
		<td>false</td>
		<td>在html5的doctype下，ul列表的底部会产生空隙，本选项用以设置是否移除这些空隙，默认不启用。本组件是通过将ul的font-size值置为0来清除这些空隙的。如果ul中的li元素的font-size值是从该ul继承来的，那么ul原来的font-size值会通过js直接设置到该li元素的style属性里。由于内联样式优先级比较高，有可能给之后的开发带来不便，建议小伙伴们直接在css中处理这个问题。</td>
	</tr>
</table>

```js
var oUl = document.getElementById('test');
Justify.apply(oUl,{removeBtmGap:true});
```
