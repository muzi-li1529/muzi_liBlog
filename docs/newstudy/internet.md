网络请求状态码

301:资源永久重定向，在响应头中加入location字段，浏览器自动请求这个地址

302:资源临时重定向

304:文档内容未被修改

400:语义错误，服务器无法理解

403:服务器拒绝执行，多为权限不足

404:资源不存在

响应头

content-type定义响应资源类型 如：text/html 网页、image/webp   图片，决定了浏览器对请求到资源的处理方式

静态资源服务：包括HTML文档，css代码，js代码，图片，字体文件，视频音频等

ajax：浏览器赋予js的一套api，通过这套api，js能够获得网络通信的能力，包括XHR API和Fetch API。

XHR API现已基本弃用，现行主流为Fetch API

XHR API使用基础模板

```javascript
let xhr = new XMLHttpRequest();//创建发送请求对象
xhr.onreadystatechange = function () {
    //请求状态改变时的触发函数 xhr.readyState为4时，接收到服务器响应
    if (xhr.readyState == 4 && xhr.status == 200) {
        let res = JSON.parse(xhr.responseText);
        console.log(res);
    }
}
xhr.setRequestHeader("Content-Type", "application/json");//设置请求头
xhr.open("POST", "http://192.168.127.12:8080/api/v1/purchase/get_manufacture_business_list", true);//设置请求方式和请求地址
xhr.send(JSON.stringify({}));//携带请求体，发送请求
```

Fetch Api调用模版

```javascript
//fetch请求模版 返回结果为promise对象，收到服务器响应头后，promise完成
fetch('https://www.example.com/api/purchase/order/list',{
     method:'get',//设置请求类型
     header:{
	//配置请求头
     },
     body:JSON.stringify(obj),//post请求携带的参数
})  
.then(response => {
    //这里拿响应头
    console.log(response.headers.keys()); //获取所有响应头的Key
    console.log(response.headers.get('Content-Type')); //获取指定响应头的值
    return response.json(); //解析响应体为json ,也可以调用text 将数据作为纯文本对待response.text()   返回一个promise对象
  
})
.then(data => {
    //这里拿响应体
    console.log(data)
}) 
.catch(error => console.error(error)); //处理错误
```

1
