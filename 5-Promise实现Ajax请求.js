const ajaxGetJson = (url)=>{
    return new Promise((resolve,reject)=>{

        const client = new XMLHttpRequest()
        client.open('GET', url)
        // readyState存着XMLHttpRequest的状态0-4
        // 0-请求未初始化，1-服务器建立连接，2-请求已接收，3-请求处理中，4-请求已完成，且响应已就绪
        // 当readyState改变时，就会调用 onreadystatechange
        client.onreadystatechange = function(){
            if(client.readyState !==4){return}
            if(client.readyState===4 && client.status === 200){
                resolve(client.response)
            }else{
                reject(new Error(this.statusText))
            }
        }
        // 请问的数据为json
        client.responseType = 'json'
        client.setRequestHeader('Accept','application/json')
        client.send()
    })
}

// 调用ajax请求
ajaxGetJson('/X.json').then((data)=>{
    console.log(`返回的数据：${data}`)
},(error)=>{
    console.error(`出错了，${error}`)
})

// 链式then
ajaxGetJson("/X.json").then(
    post => ajaxGetJson(post.commentURL)
  ).then(
    comments => console.log("resolved: ", comments),
    err => console.log("rejected: ", err)
  );