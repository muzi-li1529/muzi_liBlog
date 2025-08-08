<template>
  <div class="geometry">
    <!-- Your content here -->
  </div>
</template>

<script setup>
import * as THREE from "three";
import { nextTick } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(30, 30, 50);
camera.lookAt(0, 0, 0);
//创建几何体 结构
const geometry = new THREE.SphereGeometry(8, 32, 32);
const ambilentLight = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(ambilentLight, directionalLight);
//创建材质 颜色
const material = new THREE.MeshStandardMaterial({ 
  color: 0xfffff,
  roughness: 0.5,
  metalness: 0.5,
  
});
//结构和材质组合
const mesh = new THREE.Mesh(geometry, material);

// const plane = new THREE.PlaneGeometry(5,5);
const plane = new THREE.BufferGeometry();
//float32Array 类型化数组
const vertices = new Float32Array([-1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, 1.0, 1.0,

  1.0, 1.0, 1.0,
-1.0, 1.0, 1.0,
-1.0, -1.0, 1.0]);
const color = new Float32Array([
  0.0, 0.0, 1.0,
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
]);
plane.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
plane.setAttribute('color', new THREE.BufferAttribute(color, 3));

const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5f5, wireframe: true,vertexColors:true });
const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.position.set(15, 0, 0);
const renderer = new THREE.WebGLRenderer({ antialias: true, });
renderer.setSize(500, 500);
new OrbitControls(camera, renderer.domElement);
scene.add(mesh, planeMesh);
nextTick(() => {

  // console.log(document.querySelector('.geometry'));

  document.querySelector('.geometry').appendChild(renderer.domElement);
  animate();
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

</script>

<style scoped>
/* Your styles here */
</style>