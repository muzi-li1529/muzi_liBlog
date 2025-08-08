<!-- 初识three.js -->

## 初识 three.js

三要素：场景、相机、渲染器 相机旋转几何体案例
<ThreeIndex />

### 代码实现

```vue
<template>
  <div id="threeIndex">
    <canvas class="csv1" width="500" height="500"></canvas>
    <canvas class="csv2" width="500" height="500"></canvas>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { nextTick, onUnmounted } from "vue";

//创建场景
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(10, 12, 13);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial()
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube2.position.x = 2;
let renderer;
nextTick(() => {
  console.log(document.getElementById("threeIndex"));
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".csv1"),
    antialias: true,
  });
  //添加物体

  scene.add(cube, cube2);
  //渲染场景和相机
  let angle = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    //相机运动
    const radius = 3;
    angle += 0.01;
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };
  animate();
});
</script>

<style scoped>

#threeIndex {
  /* width: 600px; */
  display: flex;
}

.csv1,
.csv2 {
  border: 1px solid #ccc;
  margin-right: 20px;
}
</style>
```
