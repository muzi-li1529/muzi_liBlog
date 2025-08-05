<!-- 自定义E-charts双tooltip实现 -->

## 自定义 E-charts 双 tooltip 实现

在使用 e-charts 的业务中，我们偶尔会遇到需要同时展示 2 个 tooltip 的情况，但是 e-charts 默认只提供单个 tooltip 的功能。这时候就需要我们自行研究展示两个 tooltip 的实现方法。

下面是我自己实现的双 tooltip 的功能，主要是利用了 document 的元素的获取与植入功能。

### 效果图

<echarts-tooltip/>

### 核心代码实现

```javascript
myChart.getZr().on("click", (e) => {
  //获取待操作dom
  const dom = document
    .getElementById('id')//图表id
    ?.querySelectorAll("div");
  //判断是否有tooltip常显
  if (dom && dom.length > 3) {
    // 已有常显tooltip
    document.getElementById('id').removeChild(dom[3]);
  } else if (dom && dom.length === 3) {
    // 无常显tooltip
    document
      .getElementById('id')
      .appendChild(dom[1].cloneNode(true));
  }
});
```
### 代码解读
原理：通过myChart.getZr()获取图表元素，并为其添加点击事件，使用document获取图表下的div元素，默认情况下，dom长度为3切第三个元素为tooltip,故而当长度为3则无常显tooltip，添加常显，反之则有常显tooltip，移除常显。

