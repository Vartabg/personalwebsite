// Simplified main.js for testing
document.addEventListener('DOMContentLoaded', () => {
    console.log("Starting 3D ATX application...");
    
    // Basic scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    
    const container = document.getElementById('scene-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
    camera.position.set(0, 100, 300);
    camera.lookAt(0, 0, 0);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404050, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 200, 100);
    scene.add(directionalLight);
    
    // Ground
    const groundGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x145E31,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Create a simple building
    function createBuilding(x, y, z, width, height, depth, color) {
        const geometry = new THREE.BoxBufferGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const building = new THREE.Mesh(geometry, material);
        building.position.set(x, y + height/2, z);
        building.castShadow = true;
        building.receiveShadow = true;
        scene.add(building);
        return building;
    }
    
    // Create some buildings
    createBuilding(0, 0, 0, 40, 100, 40, 0x8faee0);
    createBuilding(-80, 0, -40, 30, 60, 30, 0xa3785d);
    createBuilding(70, 0, 50, 35, 80, 35, 0x8eb4cc);
    createBuilding(0, 0, -120, 60, 40, 100, 0xf0e4d3);
    
    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 50;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;
    
    // Handle resize
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
    
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    console.log("3D ATX application initialized.");
});
