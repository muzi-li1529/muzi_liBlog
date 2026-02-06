vue

vue2--->vue3的变更

1.vue3不存在构造函数Vue,需使用createApp创建实例。

2.插件使用：vue2中要vue.use(插件)，vue3则是通过实例对象createApp(app).use()

3.vue2的this指向组件实例，vue3的组件指向组件代理对象，代理对象才去访问组件实例。原因：vue3的变量是ref(变量)，在实例中存储的是ref(变量)，在组件代理中存储变量.value的映射

4.组合式API，提升了代码的高内聚低耦合性
