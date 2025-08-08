<template>
  <div id="threeIndex">
    <canvas class="csv1" width="500" height="500"></canvas>
    <canvas class="csv2" width="500" height="500"></canvas>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { nextTick,onUnmounted } from "vue";

//创建场景
const scene = new THREE.Scene();
//设置背景色
// scene.background = new THREE.Color(0xc89222);
const loader = new THREE.TextureLoader();
loader.load("../../../assets/wartmark.png", (texture) => {
  scene.background = texture;
  //  renderer.render(scene, camera);
});

//创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;
// camera.position.y = 5;
// camera.position.x = 5;
camera.position.set(10, 12, 13);

//创建渲染器
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(900, 700);
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial()
)
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 2;
let renderer
nextTick(() => {
  console.log(document.getElementById("threeIndex"));
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".csv1"),
    antialias: true,
  });
  //添加物体

  scene.add(cube, cube2);
  //渲染场景和相机
  // renderer.render(scene, camera);
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

  }
  animate()
})
</script>

<style scoped>
/* Your styles here */
/* * {
  margin: 0;
  padding: 0;
} */
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