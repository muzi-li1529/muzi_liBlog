<!-- 轨道控制器原理 -->
## 轨道控制器原理
<cinema-camera/>
ps:左边自己写的，右边api的用的同一个场景和相机，所有会同步变化，不过效果不同<br/>
### 轨道控制器的原理
利用mousedown/mouseup/mousemove等事件实现轨道的拖动、缩放、旋转等效果。

### 代码实现
```vue
<template>
  <div id="threeIndex">

    <canvas class="csv3" width="500" height="500" @mousedown="handleMouseDown" @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"></canvas>
    <canvas class="csv4" width="500" height="500"></canvas>

  </div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { onMounted, nextTick } from "vue";

//创建场景
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(-10, 12, 13);
camera.lookAt(0, 0, 0);

//创建网格对象
const gridHelper = new THREE.GridHelper(10, 8, 0xfff);//参数：大小，网格线数量，中线颜色，其他线颜色
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial()
)
onMounted(() => {

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".csv3"),
    antialias: true,

  });
  renderer.setSize(500, 500);
  const renderer2 = new THREE.WebGLRenderer({
    canvas: document.querySelector(".csv4"),
    antialias: true,

  });
  //添加物体
  scene.add(gridHelper, cube);

  const controls = new OrbitControls(camera, renderer2.domElement);
  //设置惯性
  controls.enableDamping = true;
  //渲染场景和相机
  const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }
  animate()
  const animate2 = () => {
    requestAnimationFrame(animate2);
    controls.update();
    renderer2.render(scene, camera);
  }
  animate2()
})
//监听鼠标事件
let isDown = false;
let startx = 0;
let currentx = 0;

const handleMouseDown = (event) => {
  isDown = true;
  startx = event.clientX;
}
const handleMouseMove = (event) => {
  if (isDown) {
    const distanceX = event.clientX - startx;
    currentx += distanceX * 0.01;
    startx = event.clientX;
    camera.position.x = 40 * Math.cos(currentx);
    camera.position.z = 40 * Math.sin(currentx);
    camera.lookAt(0, 0, 0);
  }
}
const handleMouseUp = (event) => {
  isDown = false;
}
</script>


<style scoped>

#threeIndex {
  display: flex;
}

.csv3,
.csv4 {
  border: 1px solid #ccc;
  margin-right: 20px;
}
</style>
```
