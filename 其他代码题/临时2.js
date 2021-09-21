// 实现 flat 函数，可以将具备嵌套层级的数组，如 [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]]] 拍平。

// flat 函数支持两个参数，分别是 arr 数组，及 depth 深度。depth 用于控制拍平的层级，如：

// 当 depth 为 1 的时候，其仅拍平一层层级，则结果为 [1, 2, 3, 4, 1, 2, 3, [1, 2, 3, [1, 2, 3]]]

[1, [1,2,[1,2]], [1,2]]

const flatten = (arr, depth) => {
    if (depth < 0) {
        return arr
    }
    let len = arr.length
    let res = []
    for(let i = 0;i<len;i++){
        let tmp = arr[i]
        if(Array.isArray(tmp)){
            res.push(...flatten(tmp,depth-1))
        }else{
            res.push(tmp)
        }
    }
    return res
}

console.log(flatten( [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]]]), Infinity)
console.log(flatten( [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]]]), 1)