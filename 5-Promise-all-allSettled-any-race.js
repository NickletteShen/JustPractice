// 要处理下特殊情况，输入为空/输入的不是promise

// .all  所有都resolve才resolve，有一个reject就reject
const promiseAll = (promises)=>{
    if(promises.length === 0){
        return Promise.resolve([])
    }
    return new Promise((resolve,reject)=>{
        let result = []
        let count = 0
        const check = ()=>{
            if(count === promises.length){
                // 不能写result.length===promise.lenght，因为不是按顺序返回的
                // 可能最后一个先解决，result=[undefined,undefined,undefined,1]
                resolve(result)
            }
        }
        promises.forEach((item, index)=>{
            Promise.resolve(item).then(
                res=>{
                    result[index] = res
                    count++
                    check()
                },
                err=>{
                    reject(err)
                }
            )
        })
    })
}

// .allSettled 所有状态都变化了就resolve
const promiseAllSettled = (promises)=>{
    if(promises.length) return Promise.resolve([])

    return new Promise((resolve,reject)=>{
        let result = []
        let count = 0
        const check = ()=>{
            if(count === promises.length){
                return resolve(result)
            }
        }
        promises.forEach((item,index)=>{
            Promise.resolve(item).then(
                res =>{
                    result[index] = {status: 'fullfilled', value: res}
                    count++
                    check()
                },
                err =>{
                    result[index] = {status: 'rejected', value: err}
                    count++
                    check()
                }
            )
        })
    })
}

// .any 任何一个resolve就resolve，所有的都reject就reject
const promiseAny = (promises)=>{
    if(promises.length === 0){
        reject(new AggregateError('No Promise in Promises.any was resolved'))
    }
    return new Promise((resolve, reject)=>{
        let result = []
        let count = 0
        const check = ()=>{
            if(count === promises.length){
                reject(new AggregateError('No Promise in Promises.any was resolved'))
            }
        }
        promises.forEach((item,index)=>{
            Promise.resolve(item).then(
                res=>{
                    resolve(res)
                },
                err=>{
                    result[index] = err
                    count++
                    check()
                }
            )
        })
    })
}

// .race()  返回第一个resolve
const promiseRace = (promises)=>{
    if(promises.length === 0) return Promise.resolve()
    return new Promise((resolve, reject)=>{
        promises.forEach(item=>{
            // ????
            item.then(resolve,reject)
        })
    })
}