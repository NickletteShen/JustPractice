// 由http://localhost:3000/index.html向http://localhost:4000发跨域请求

// index.html
let xhr = new XMLHttpRequest()  
document.cookie = 'name=Nick'
xhr.withCredentials = true
xhr.open('PUT', 'http://localhost:4000/getData', true)
xhr.sendRequestHeader('name','Nick')
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status>=200 && xhr.status <=300 || xhr.status === 304){
            console.log(xhr.response)
            // 得到响应头，后台需要设置Access-Control-Expose-Headers
            console.log(xhr.getResponseHeader('name'))
        }
    }
}
xhr.send()

// 服务端
// service1.js
let express1 = require('express')
let app = express1()
app.use(express.static(__dirname))
app.listen(3000)

// service2.js
let express = require('express')
let app = express()
let whiteList = ['http://localhost:3000'] //设置白名单
app.use(function(req,res,next){
    let origin = req.headers.origin
    if(whiteList.includes(origin)){
        // 设置哪个源可以访问我
        res.setHeader('Access-Control-Allow-Origin',origin)
        // 允许携带哪个头访问我
        res.setHeader('Access-Control-Allow-Headers','name')
        // 允许哪个方法访问我
        res.setHeader('Access-Control-Allow-Methods','PUT')
        // 允许携带cookie
        res.setHeader('Accsee-Control-Allow-Credentials',true)
        // 预检存活时间
        res.setHeader('Access-Control-Max-Age',6)
        // 允许返回的头
        res.setHeader('Access-Control-Expose-Headers','name')
        if(req.method === 'OPTIONS'){
            res.end() // 预检请求不做任何处理
        }
    }
    next()
})
app.put('/getData',function(req,res){
    console.log(req.headers);
    res.end('emmmm')
})
app.use(express.static(_dirname))
app.listen(4000)