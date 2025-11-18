## Promise链式调用

1.then方法必定返回一个新的Promise任务

2.新任务的状态取决于后续处理

   若后续未进行处理，则继承上一个任务状态，数据同样继承

   若有后续处理但未执行，则新任务挂起

   若后续处理执行了，则根据处理确定新任务的状态，若后续执行后返回一个新任务对象，则新任务对象的状态和数据与该任务对象一致。

### 代码示例

```javascript
new Promise((resolve, reject) => {
    resolve(1)
})
.then(res => {
    console.log(res);//输出 1
    return 2;
})
.catch(err => {
    return 3  //没有错误，不执行
})
.then(res => {
    console.log(res); // 输出2
  
})
```

```javascript
const promise1 = new Promise((resolve, reject) => {
  
    setTimeout(() => {
        resolve(1)
    }, 1000)
})
const promise2 =  promise1.then(res=>{
    console.log(res) //输出1

    return res+1

})
const promise3 = promise2.then(res=>{
    console.log(res) //输出2
})
console.log(promise1,promise2,promise3);//Promise { <pending> } Promise { <pending> } Promise { <pending> }  三挂起状态

setTimeout(()=>{
    console.log(promise1,promise2,promise3); // fulfilled 1 , fulfilled 2, fulfilled undefined
},2000)

```

### promise的静态方法

promise.all([任务1，任务2....])  返回一个新   全部任务成功则成功，任务，数据为每个子任务的数据组成的数组，有一个任务失败则失败，数据为当前失败任务的数据

promise.any([任务1，任务2....])   返回一个新任务    任一任务成功则成功，全部失败则失败，失败的数据为一个对象，对象里边有errors字段，用数组记录失败数据

promise.allSettled([任务1，任务2....])  返回一个新任务   任务全部有结果则成功，数据为带有每个任务状态和数据的数组，有一个无结果则为挂起状态

promise.race([任务1，任务2....])   返回一个新任务  根据第一个完成情况，决定新任务的状态和数据

### async/await

es7中，为了方便promise的使用，官方发布的语法糖，async函数返回一个promise任务，await 等待任务执行，若等待promise任务，则返回promise任务的返回值，若非promise，则转为promise后，返回值
