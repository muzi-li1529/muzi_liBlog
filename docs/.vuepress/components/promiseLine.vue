<template>

    <div class="promiseLine">

    </div>

</template>

<script setup>
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


</script>