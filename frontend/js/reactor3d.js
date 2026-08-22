// ==========================================================================
// J.A.R.V.I.S. 3.0 - 3D Interactive Three.js Arc Reactor Engine
// ==========================================================================
window.addEventListener('load', () => {
  const container = document.getElementById('scene-container');
  if (!container) return;

  const width = container.clientWidth || 320;
  const height = container.clientHeight || 320;
  
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 8;
  
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  const reactorGroup = new THREE.Group();
  scene.add(reactorGroup);
  
  // Materials
  const cyanColor = 0x00f0ff;
  const cyanMaterial = new THREE.MeshBasicMaterial({ color: cyanColor, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
  const cyanWireframe = new THREE.MeshBasicMaterial({ color: cyanColor, wireframe: true, transparent: true, opacity: 0.3 });
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x112222, metalness: 0.9, roughness: 0.1, side: THREE.DoubleSide });
  
  // 1. Core Sphere Wireframe
  const coreGeo = new THREE.IcosahedronGeometry(0.8, 2);
  const coreMesh = new THREE.Mesh(coreGeo, cyanWireframe);
  reactorGroup.add(coreMesh);
  
  // Core Inner Glow
  const innerCoreGeo = new THREE.SphereGeometry(0.5, 32, 32);
  const innerCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
  const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
  reactorGroup.add(innerCoreMesh);
  
  // Layered Rings
  const rings = [];
  const createRing = (innerRadius, outerRadius, segments, material, rotSpeedX, rotSpeedY, rotSpeedZ) => {
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, segments);
    const mesh = new THREE.Mesh(geo, material);
    reactorGroup.add(mesh);
    rings.push({ mesh, rotX: rotSpeedX, rotY: rotSpeedY, rotZ: rotSpeedZ });
  };
  
  const createTorus = (radius, tube, radialSegs, tubularSegs, material, rotSpeedX, rotSpeedY, rotSpeedZ) => {
      const geo = new THREE.TorusGeometry(radius, tube, radialSegs, tubularSegs);
      const mesh = new THREE.Mesh(geo, material);
      reactorGroup.add(mesh);
      rings.push({ mesh, rotX: rotSpeedX, rotY: rotSpeedY, rotZ: rotSpeedZ });
  };

  createRing(1.1, 1.2, 64, cyanMaterial, 0, 0, 0.015);
  createRing(1.3, 1.5, 32, cyanWireframe, 0.005, 0, -0.01);
  createTorus(1.6, 0.05, 16, 100, darkMaterial, 0.01, 0, 0.02);
  createRing(1.7, 1.75, 128, cyanMaterial, 0, 0, 0.025);
  createRing(1.9, 2.1, 24, cyanWireframe, -0.01, 0.005, 0.005);
  createTorus(2.2, 0.02, 16, 100, cyanMaterial, 0, -0.01, -0.015);
  createRing(2.3, 2.4, 64, cyanMaterial, 0, 0, -0.008);
  createRing(2.5, 2.8, 8, cyanWireframe, 0.002, 0.002, 0.002);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(cyanColor, 2, 10);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);
  
  const mouseLight = new THREE.PointLight(cyanColor, 1.5, 15);
  scene.add(mouseLight);
  
  // Mouse tracking Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.002;
    mouseY = (event.clientY - windowHalfY) * 0.002;
    
    mouseLight.position.x = ((event.clientX / window.innerWidth) * 2 - 1) * 8;
    mouseLight.position.y = (-(event.clientY / window.innerHeight) * 2 + 1) * 8;
    mouseLight.position.z = 4;
  });
  
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.05;
    
    // Holographic Parallax Tilt
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;
    reactorGroup.rotation.y += 0.05 * (targetX - reactorGroup.rotation.y);
    reactorGroup.rotation.x += 0.05 * (targetY - reactorGroup.rotation.x);
    
    // Subtle 'flicker' animation to the core opacity
    innerCoreMat.opacity = 0.6 + Math.sin(time * 15) * 0.15 + Math.random() * 0.15;
    pointLight.intensity = 1.5 + Math.random() * 0.5;

    coreMesh.rotation.y += 0.012;
    coreMesh.rotation.x += 0.008;
    
    rings.forEach(ring => {
      ring.mesh.rotation.x += ring.rotX;
      ring.mesh.rotation.y += ring.rotY;
      ring.mesh.rotation.z += ring.rotZ;
    });
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    const w = container.clientWidth || 320;
    const h = container.clientHeight || 320;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
});
