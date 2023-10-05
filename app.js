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

//////////////three.js////////////

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x030020); // Here's where you set the background color

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
    sizeArray[i] = Math.random() * 0.005 + 0.05 + 0.1;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));


////////////// Shaders for Particles //////////////

const vertexShader = `
  attribute vec3 color;
  attribute float size;
  varying vec3 vColor;
  uniform float time;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(time + position.x));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    float r = 0.0;
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = dot(cxy, cxy);
    float alpha = 1.0 - r * r;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;


// Add time uniform in ShaderMaterial
const particleMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    uniforms: {
        time: { value: 0.0 }
    }
});



////////////// Adding Particles to Scene and Camera Configuration //////////////

const particles = new THREE.Points(particleGeometry, particleMaterial);

scene.add(particles);

camera.position.z = 5;

// Load lensflare texture
const textureLoader = new THREE.TextureLoader();
const lensFlareTexture = textureLoader.load('./images/lensflare.png'); // Replace the path accordingly

// Create geometry and material for special stars
const specialStarGeometry = new THREE.BufferGeometry();
const specialStarCount = 200; // Number of special stars

const specialPosArray = new Float32Array(specialStarCount * 3);
for (let i = 0; i < specialPosArray.length; i += 3) {
    specialPosArray[i] = (Math.random() - 0.5) * 50;
    specialPosArray[i + 1] = (Math.random() - 0.5) * 50;
    specialPosArray[i + 2] = (Math.random() - 0.5) * 50;
}

specialStarGeometry.setAttribute('position', new THREE.BufferAttribute(specialPosArray, 3));

const specialStarMaterial = new THREE.PointsMaterial({
    map: lensFlareTexture,
    size: 0.5,  // You can adjust the size
    transparent: true
});

// Create and add special stars to the scene
const specialStars = new THREE.Points(specialStarGeometry, specialStarMaterial);
scene.add(specialStars);

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


