var a = 10
var obj = {
    a: 20,
    say: () => {
        console.log(this.a)
    },
    say2: function() {
        console.log(this.a)
    }
}
}

var f = obj.say

f() // 第一次 10
f.call(obj) // 第二次 10


var f = obj.say2

f() // 第一次 10
f.call(obj) // 第二次 10