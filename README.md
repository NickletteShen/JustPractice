# JustPractice
JS
1、数据类型
7种基本数据类型：null、undefined、boolean、string、symbol、bigInt、number
引用类型：object
1.1 弱语言类型与TypeScript的诞生
js是弱语言类型，即可以不提前声明变量类型，也可以用同一个变量保存不同类型的值   var foo = 42 //此时是number    foo = 'a' //此时是string
Typescript 将js'变成'了强类型语言，即各个类型之间无法转换，加了层隔阂，会更好的维护/避免类型错误
1.2 判断数据类型
typeof
instanceof 原型链
Object.prototype.toString().call()
constructor 构造函数
1.2.1 typeof
无法判断null、数组，返回object
手写？借助Object.prototype.toString().call()
typeof null为object   原因：js中的值是由一个表示类型的标签和实际数据值表示的。32比特存储值，值的低1/3位识别类型。对象的类型标签为000，由于null代表空指针，低三位为000，所以...
其他类型标签 1（整型int） 010（双精度浮点型double） 100（字符串string） 110（布尔型）
1.2.2 instanceof
原型链
手写
1.2.3 toString().call()
1.2.4 constructor
通过构造函数实例化的实例，拥有constructor属性   PS因为是属性，可以修改，所以不建议这样判断
1.3 null和undefined
null表示空对象指针，即此处不应该有值（联想原型链的终点都为null）
undefined表示未定义的变量，即此处应该有个值，只是还没有定义。以下情形为undefined：
声明了一个变量但没有赋值
调用函数，没有提供应该提供的参数，该参数此时为undefined
对象没有赋值的属性  let o = new Object(); o.p 
没有返回值的函数默认返回undefined
Number(null) //0   Number(undefined) //NaN 
判空 5种空值和假值：undefined、null、false、''、0、NaN
a ||  只要a是5种其中之一，就会输出后面的值
a ?? ??空值合并操作符，只当左侧为null、undefined时返回右侧值
1.4 Number 0.1+0.2!=0.3
输出0.30000000000000004  【在进制转换中精度损失，所以...】
JS以64位双精度浮点数存储Number类型的值，按IEEE754规范，0.1的二进制保留52位有效数字

解决方案
将小数转换为整数 相加后再除以baseNum
类库 math.js
ES6在Number对象上新增了一个极小的常量Number.EPSILON
Number.EPSILON // 2.220446049250313e-16 Number.EPSILON.toFixed(20)  // 保留20位小数
可以为浮点数计算设置一个误差范围，如果误差小于EPSILON，则认为结果是可靠的
function withinErroeMargin(left,right) { return Math.abs( left- right)<Number.EPSILON }
withinErroeMargin(0.1+0.2, 0.3)
类似于BigInt扩展JS的正数边界(超过2^53安全数)，未来可能引入decimal/后缀m来声明这个数字是十进制运算 0.1m+0.2m===0.3m
1.5 BigInt
Number是64位双精度浮点类型，包括符号位、尾数位、指数位，在JS中最大数为2^53=9007199254740992（16个）
BigInt表示任意精度的数字类型，即可以表示任意大的整数，写法123n或者BigInt(123)
就解决了Math.pow(2,53)+1还是9007199254740992的问题
BigInt(Number.MAX_SAFE_INTEGER)+2n为9007199254740993n
1.6 SymBol
表示独一无二的值 写法let s = Symbol()
场景 作为对象属性名，PS 只有字符串和Symbol类型才能作为对象属性名
symbol不会出现在Object.keys()结果中，可以用来模拟私有属性 let obj = { [s]:1, a:2 } 注意对象属性名为变量时要加括号！！
也不会出现在JSON.stringfy()结果中，JSON.stringfy()会忽略symbol属性名和属性值
可以用Object.getOwnPropertySymbols()拿到私有属性
1.7 数组
类数组
判断数组的方法
Object.prototype.toString().call()  因为每个继承Object的对象都有toString方法（？）
Array.isArray()   是ES5新增的方法，挂在哪（？）
2、闭包
3、原型链



4、跨域
浏览器有同源策略，同源指的是 域名、协议、端口相同。不同源之间的页面，不准互相访问数据。

4.2 如何解决跨域
JSONP解决跨域：只能解决GET跨域
CORS操作：Cross-origin resource sharing 跨域资源共享：允许浏览器向跨域服务器发出XMLHttpRequest请求，从而克服跨域问题，他需要浏览器和服务器的同时支持
nginx代理跨域 
nodejs 中间件代理跨域 
WebSocket协议跨域 
window.name + iframe跨域
4.2.1 JSONP
通过一些标签发送的请求不会被进行同源检查，如<script><img><link><iframe>、页面中的链接
理解：通过标签的形式发送请求，需要和后端一起完成，只能使用get请求(?)
客户端准备一个接受数据的全局函数
客户端解析到script标签，发送请求
服务端接收到请求，返回函数调用（？）和数据
客户端收到数据，执行回调
实现 https://www.yuque.com/nicklette/lga0s0/bsmzwp#E177n 
缺点：
只能get请求；
存在安全性问题，任何网站都能拿到b.com/1.txt里的数据=>Referer检验和Token检验
a.com可能被注入恶意代码，篡改页面内容=>字符串过滤
4.2.2 CORS
需要浏览器和服务器同时支持，整个CORS通信过程中，浏览器自动完成，浏览器一旦发现跨域，会添加一些附加的头信息。
对简单请求，浏览器自动在发送CORS请求时在头信息里增加一个origin字段。服务端根据这个值决定是否同意这次请求，同意=>服务器在response里增加响应头字段Access-Control-*，浏览器收到response，CORS机制检查Access-Control-Allow-Origin是否等于request的origin值；不同意=>返回一个正常的HTTP回应，浏览器发现没有Access-Control-Allow-Origin，就抛出错误。
请求-头信息

response header

其他的响应头字段：Access-Control-Allow-Methods: ['GET','POST','HEAD']
浏览器将CORS请求分为简单请求和复杂/预检请求。
简单请求：同时满足两种情况
请求方式：GET、POST、HEAD 三者之一
HTTP头信息不超出这些字段：Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type（只限于application/x-www-form-urlencoded、mulitipart/form-data、text/plain三个值）
预检请求：
当PUT、PATCH、DELETE，客户端先用OPTIONS方法发起一个预检请求，告诉服务器要用到的请求方式、附带的自定义请求首部字段是什么

服务端收到预检请求之后，返回一个没有body的HTTP响应，标记了服务器允许的HTTP方法和HTTP Header字段

浏览器收到预检响应，检查是否一致。
检测通过，浏览器会将实际请求发送到服务器，服务器返回资源；预检响应没有通过，CORS会阻止跨域访问，实际请求永远不会发送
在跨域请求中包含身份信息，可以基于Cookies和HTTP认证信息发送身份凭证（？）
浏览器fetch请求：fetch('http://b.com', { credentials:"include" })
浏览器XHR请求：let xhr = new XHRHttpRequest()
			     xhr.withCredentials = true
服务器增加响应头字段：HTTP/1.1 200 OK
					Access-Control-Allow-Credentials: true

css
1、盒模型
2、display:none、visility、opacity
3、水平垂直居中，还有呢
网络
react
算法
