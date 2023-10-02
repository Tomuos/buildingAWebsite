// main.js
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.hidden');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
        entry.target.classList.add('hidden');
      }
    });
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});

// setupCounter(document.querySelector('#counter')) 
// Uncomment this line only if setupCounter is defined
