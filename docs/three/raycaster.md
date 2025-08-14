<!-- 射线 -->
## 射线
<Raycaster></Raycaster>
射线穿过，小球变色

## 代码实现
```vue
<template>
  <div id="geometry">
    <!-- Your content here -->
  </div>
</template>

<script setup>
import * as THREE from "three";
import { onMounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.5, 1000);
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);
  //创建几何体
  const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xfffff33,
    })
  )
  sphere1.position.x = -4
  const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xfffff33,
    })
  )
  //  sphere2.position.set(0,4,0)
  const sphere3 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xfffff33,
    })
  )
  sphere3.position.x = 4
  scene.add(sphere1, sphere2, sphere3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, });
  renderer.setSize(1000, 600);

  const raycaster = new THREE.Raycaster();



  new OrbitControls(camera, renderer.domElement);
  document.getElementById("geometry").appendChild(renderer.domElement)
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
  const mouse = new THREE.Vector2();
  window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3]);
    console.log(intersects);
    sphere1.material.color.set(0xfffff33);
    sphere2.material.color.set(0xfffff33);
    sphere3.material.color.set(0xfffff33);
    for (const intersectItem of intersects) {
      intersectItem.object.material.color.set(0xff0000);
    }
  })
});



</script>

<style scoped>
/* Your styles here */
</style>
```