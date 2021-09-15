// 实现一个函数sum, 同时支持sum(x,y)和sum(x)(y)
function sum(){
    if(arguments.length===2){
        return arguments[0]+arguments[1]
    }else{
        let a = arguments[0]
        return function(x){
            return x+a
        }
    }
}
console.log(sum(1,3))
console.log(sum(3)(2))
// 总结: 
// 1、arguments 函数实参
// 2、fn()() 返回函数即可