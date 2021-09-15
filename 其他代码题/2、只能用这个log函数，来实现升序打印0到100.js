// 只能用这个log函数，来实现升序打印0到100
const log=(callback)=>{
    log.count = log.count || 0;
    var count = log.count++
    setTimeout(()=>{
        console.log(count)
        callback && callback()
    },Math.random()*1000%10)
}

// (function(){
//     for(let i = 0;i<100;i++){
//         setTimeout(()=>{
//             log()
//         },parseInt(log.count + '000'))
//     } 
// })()
for(let i = 0;i<10;i++){
    // setTimeout(()=>{
    //     log()
    // },parseInt(log.count + '000'))
    log()
    console.log('哈哈',log.count)
} 

