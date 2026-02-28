vue

vue2--->vue3的变更

1.vue3不存在构造函数Vue,需使用createApp创建实例。

2.插件使用：vue2中要vue.use(插件)，vue3则是通过实例对象createApp(app).use()

3.vue2的this指向组件实例，vue3的组件指向组件代理对象，代理对象才去访问组件实例。原因：vue3的变量是ref(变量)，在实例中存储的是ref(变量)，在组件代理中存储变量.value的映射

4.组合式API，提升了代码的高内聚低耦合性

数据响应性原理：

vue2中使用object.defineproperty()实现，具体为将data中的数据遍历，使用object.defineproperty()拦截每一个变量的属性，设置setter和getter函数，vue中封装了observable完成这一流程，这样在使用数据时，就会调用拦截器，完成响应式操作。这个过程发生在beforeCreate之后和created之前。

但是vue2中的这种拦截存在问题，如往对象中添加属性，或者使用delete删除属性等操作无法检测。因为vue2是基于es5开发的，没办法检测这些操作。所以vue2添加了this.$set$方法，在添加属性时将其设置为响应式，删除则调用this.$delete

对于数组数据，为了实现响应式的调用，vue自己搞了一个数组的原型对象，将数组原型上的Pop,push等方法封装进去，这样在数组调用这些方法时，vue就能响应式的调整这些数据值的变化。但是进行arr[0]=11这些直接赋值操作时又会无法监听，这时又需要调用$set方向

在数据变化时，调用拦截器中的set方法时，vue会进行一些数据响应式的更新操作，具体进行那些操作，vue2中封装了Dep来实现，每一个对象的属性都会有一个dep进行依赖收集，记录谁在用这个属性。

但是dep实现了依赖的收集，但如何收集这些依赖的手段，即如何知道谁在用这个属性，就需要借助另外一个模块watcher，当属性改变时，dep就会通过watcher运行render函数重新渲染界面

但是watcher重新运行render函数渲染界面时，又会导致另一个问题，就是页面渲染太频繁，这时就需要另一个东西--scheduler(调度器)。当watcher时并不会立即执行，而是往调度器里加入队列，同一个watcher只会存在一个。调度器通过nextTick将这些需要执行的watcher放到微队列中。
