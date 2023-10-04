////////////// Intersection Observer //////////////

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

////////////// Three.js //////////////

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const container = document.getElementById('threejs-container');
container.appendChild(renderer.domElement);


////////////// Particles in Three.js //////////////

const particleGeometry = new THREE.BufferGeometry();
const particleCount = 5000;

const posArray = new Float32Array(particleCount * 3);
const colorArray = new Float32Array(particleCount * 3);
const sizeArray = new Float32Array(particleCount);

for (let i = 0, j = 0; i < posArray.length; i += 3, j += 3) {
    posArray[i] = (Math.random() - 0.5) * 50;
    posArray[i + 1] = (Math.random() - 0.5) * 50;
    posArray[i + 2] = (Math.random() - 0.5) * 50;

    colorArray[j] = Math.random();
    colorArray[j + 1] = Math.random();
    colorArray[j + 2] = Math.random();
}

for (let i = 0; i < sizeArray.length; i++) {
    sizeArray[i] = Math.random() * 0.005 + 0.05;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));


////////////// Shaders for Particles //////////////

const vertexShader = `
  attribute vec3 color;
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

const particleMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true
});



////////////// Adding Particles to Scene and Camera Configuration //////////////

const particles = new THREE.Points(particleGeometry, particleMaterial);

scene.add(particles);

camera.position.z = 5;

////////////// Animation Function //////////////

const animate = function () {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
};

animate();

///////////// Fade-in Three.js Section and Reveal Message /////////////

// Fade in Three.js section after a 2-second delay
setTimeout(() => {
    const section = document.getElementById('threejs-section');
    section.classList.remove('hidden');
    section.classList.add('visible');
}, 2000);  // 2 seconds delay

// Slowly reveal the message 4 seconds after page load
setTimeout(() => {
    const message = document.getElementById('message');
    message.style.visibility = 'visible';
    let i = 0;
    let text = message.textContent;
    message.textContent = '';

    const interval = setInterval(() => {
        if (i < text.length) {
            message.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100); // reveal a new character every 100 milliseconds

}, 4000);  // 4 seconds delay


// Existing animation function ...
setTimeout(() => {
    const wavingHand = document.getElementById('waving-hand');
    wavingHand.classList.remove('hidden');
    wavingHand.classList.add('visible');
}, 4000);  // make the hand visible 4 seconds after page load


const interval = setInterval(() => {
    if (i < text.length) {
        message.textContent += text.charAt(i);
        i++;
    } else {
        clearInterval(interval);

        // Show waving hand only after the entire message is revealed
        setTimeout(() => {
            const wavingHand = document.getElementById('waving-hand');
            wavingHand.classList.remove('hidden');
            wavingHand.classList.add('visible');
        }, 500);  // display the hand 500 milliseconds after the message is fully displayed
    }
}, 100); // reveal a new character every 100 milliseconds
