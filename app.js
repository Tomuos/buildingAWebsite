document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll event
    const links = document.querySelectorAll("#navbar ul li a");
    for (const link of links) {
      link.addEventListener("click", clickHandler);
    }
  
    function clickHandler(e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const offsetTop = document.querySelector(href)?.offsetTop || 0;
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  
    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });
  
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
  
    // Three.js Initialization
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030020);
  
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    const container = document.getElementById('threejs-container');
    if (container) {
      container.appendChild(renderer.domElement);
    }

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

// Fade-in Three.js section and reveal message
setTimeout(() => {
    const section = document.getElementById('threejs-section');
    if (section) {
      section.classList.remove('hidden');
      section.classList.add('visible');
    }
  }, 2000);

  // Text reveal logic
  setTimeout(() => {
    const message = document.getElementById('message');
    if (message) {
      message.style.visibility = 'visible';
      let i = 0;
      let text = message.textContent || '';
      message.textContent = '';

      const interval = setInterval(() => {
        if (i < text.length) {
          message.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          revealWavingHand();  // Custom function to handle waving hand logic
        }
      }, 100);
    }
  }, 4000);

  function revealWavingHand() {
    setTimeout(() => {
      const wavingHand = document.getElementById('waving-hand');
      if (wavingHand) {
        wavingHand.classList.remove('hidden');
        wavingHand.classList.add('visible');
      }
    }, 500);
  }
});