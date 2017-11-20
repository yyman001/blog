#### 关于jq 中的 $.when 与及 Deferred 对象的一些有趣研究

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

`单个 Deferred 可以不用 $.when 来执行`
```js
代码中,可以 直接 是用 $.when 来执行 Deferred 定义的异步 --> 需要是用 $.when 来调用 Deferred 定义的异步,之后可以在 then 中返回 Deferred定义的函数 ,看起来要 $.when 带头 
     也可以 在定义 Deferred 的时候 把返回 $.when 的执行 --> 就会 开始调用 Deferred 的函数 不用是用$.when ,看起来比较正常点,但感觉在定义在 Deferred 里面有点多余 
	 到底2种写法哪里更好?个人不的而知,不过我还是建议使用第一种

建议:在同时执行多个 Deferred 或者 队列 Deferred 才使用 $.when
	 相关问题:http://stackoverflow.com/questions/5627284/pass-in-an-array-of-deferreds-to-when/5627301#5627301 
	  demo: http://jsfiddle.net/YNGcm/21/
	  
	  $.when.apply($, my_array);
	  $.when.apply(null , my_array);
	  第一个参数 $ , null 的区别? 2个都可以执行,好像没看出有什么区别
      
```