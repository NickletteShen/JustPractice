// 会多次触发的函数，假设是ajax请求
const ajax = (content)=>{
    console.log('发送请求',content)
}
// -------------------------

// 防抖 事件被触发，等待n秒后执行回调; 如果n秒内被再次触发，则重新计算时间
// 参数: 指定的回调函数/n秒 返回函数
let timer = null;
const debounce = (fn, wait)=>{
    return function(args){
        if(timer){
            clearTimeout(timer)
        }
        // timer = setTimeout(fn,wait)
        //注意把fn作为参数传入防抖函数，因为不确定fn里的参数，所以调用时要修改this指向
        timer = setTimeout(function(){fn.call(this,args)}, wait)
    }
}
// 调用
let b = document.getElementById('debounce');
let debounceAjax = debounce(ajax, 3000)
b.addEventListener('keyup',function(e){
    debounceAjax(e.target.value)
})
// -----------------------

// 节流 在n秒内只触发1次，如果n秒内多次触发，则只有1次生效; 即规定死间隔n秒执行
// 都是返回函数？
const throttle = (fn, wait)=>{
    let last,timer
    return function(args){
        let now = +new Date()
        if(last && now < last+wait){
            clearTimeout(timer)
            timer = setTimeout(function(){last=now;fn.call(this,args)}, wait)
        }else{
            last = now
            fn.call(this, args)
        }
    }
}
// 调用
let c = document.getElementById('throttle')
let throttleAjax = throttle(ajax, 3000)
c.addEventListener('keyup', function(e){
    throttleAjax(e.target.value)
})

let biubiu = function(){
    console.log('biubiu',new Date().getUTCSeconds())
}
setInterval(throttle(biubiu, 2000), 10)
// -----------------------

// 无操作
let a = document.getElementById('nothing');
a.addEventListener('keyup', function(e){
    ajax(e.target.value)
})

