function delayedPrint(str){
    return new Promise((resolve,reject)=>{
        console.log(str)
        setTimeout(resolve,1000)
    })
}

delayedPrint('p1 executor')
.then(()=>delayedPrint('p2 excutor'))
.then(()=>delayedPrint('p3 excutor'))
.then(()=>delayedPrint('p4 excutor'))


function delayedPrintNum(){
    let a = 0
    return new Promise((resolve,reject)=>{
        console.log(a++)
        setTimeout(resolve,3000)
    })
}

for(let i = 0;i<10;i++){
    delayedPrintNum.then(()=>delayedPrintNum())
}