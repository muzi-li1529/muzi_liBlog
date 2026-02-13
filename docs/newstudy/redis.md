redis是一个键值对数据库，是noSQL的一种，在内存中完成数据操作，有着超高的读取效率，占用高内存。对于一些高并发的项目，有些就是采用redis进行数据存储。

在node中使用redis

```javascript
//创建连接
onst redis =require("redis");const client = redis.createClient({
host: "127.0.0.1",
port:6379,
password：“认证密码”
});
/通过client操作数据库
//操作方式和redis原生方式基本一致
client.set（"key”,“value",（err,reply)=>{

)
client.get("key”,(err,reply)=>{
})
```

redis缓存：

在处理某个接口请求之前，加上一个中间件验证是否有缓存，有缓存直接移交缓存结果，无缓存再去查库
