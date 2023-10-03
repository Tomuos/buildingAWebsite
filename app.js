const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Add canvas to container
const container = document.getElementById('threejs-container');
container.appendChild(renderer.domElement);

// Add particles to the scene to simulate stars
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 5000;
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < posArray.length; i++) {
    posArray[i] = (Math.random() - 0.5) * 50;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.005,
    transparent: true,
    color: 0xFFFFFF
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

camera.position.z = 5;

// Animation function
const animate = function () {
    requestAnimationFrame(animate);

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;

    renderer.render(scene, camera);
};

// Fade in effect (set class to 'visible')
setTimeout(() => {
    const section = document.getElementById('threejs-section');
    section.classList.remove('hidden');
    section.classList.add('visible');
}, 2000);  // 2 seconds delay

animate();
