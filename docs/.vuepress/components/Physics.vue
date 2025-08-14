<template>
  <div class="physics">
    <!-- Your content here -->
  </div>
</template>

<script setup>
import * as THREE from "three";
import { onMounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon";
onMounted(() => {
  //创建场景
  const scene = new THREE.Scene();
  //创建相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 10);
  camera.lookAt(0, 0, 0);
  //创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(800, 500);
  renderer.shadowMap.enabled = true;
  document.querySelector('.physics').appendChild(renderer.domElement);
  //创建光源
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  //创建地面
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshPhongMaterial({ color: 0x808080 })
  );
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);


  //创建球体
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
  );
  sphere.position.set(0, 3, 0);
  scene.add(sphere);

  //创建物理世界
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  //创建物理地面
  const groundShape = new CANNON.Body(
    {
      mass: 0, //静态物体
      shape: new CANNON.Plane() //平面形状
    }
  );
  groundShape.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
  world.addBody(groundShape);

  //创建物理小球
  const sphereShape = new CANNON.Body({
    mass: 1, //质量
    position: sphere.position //位置
  });
  const sphereShape = new CANNON.Sphere(1); //球形状
  sphereShape.addShape(sphereShape);

  //创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  //渲染循环
  const clock = new THREE.Clock();
  const animate = () => {
    const delta = clock.getDelta();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
});
</script>

<style scoped>
/* Your styles here */
</style>