/* Cyberpunk drum kit interaction script
   - Preloads audio
   - Adds ripple animation on pointer events
   - Handles keyboard and pointer with graceful checks
   - Adds particle background animation
*/

const audioFiles = {
  w: './sounds/tom-1.mp3',
  a: './sounds/tom-2.mp3',
  s: './sounds/tom-3.mp3',
  d: './sounds/tom-4.mp3',
  j: './sounds/snare.mp3',
  k: './sounds/crash.mp3',
  l: './sounds/kick-bass.mp3'
};

// Preload audio objects
const audioCache = {};
Object.keys(audioFiles).forEach(key => {
  const audio = new Audio(audioFiles[key]);
  audio.preload = 'auto';
  audioCache[key] = audio;
});

function playKey(key){
  const k = String(key).toLowerCase();
  if(!audioCache[k]) return;
  // reset time to allow quick retrigger
  try{
    audioCache[k].currentTime = 0;
  }catch(e){ /* ignored */ }
  // clone if currently playing to allow overlapping hits
  const src = audioCache[k].src;
  const inst = new Audio(src);
  inst.play().catch(()=>{});
}

function getButtonForKey(key){
  if(!key) return null;
  const k = String(key).toLowerCase();
  return document.querySelector('.' + k);
}

function createRipple(button, clientX, clientY){
  const rect = button.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const span = document.createElement('span');
  span.className = 'ripple';
  span.style.left = x + 'px';
  span.style.top = y + 'px';
  button.appendChild(span);
  span.addEventListener('animationend', ()=> span.remove());
}

function animatePress(button){
  if(!button) return;
  button.classList.add('pressed');
  setTimeout(()=> button.classList.remove('pressed'), 200);
}

// Pointer (mouse/touch/stylus) handling
document.querySelectorAll('.drum').forEach(btn => {
  // show small key label if not present
  if(!btn.querySelector('.key-note')){
    const note = document.createElement('div');
    note.className = 'key-note';
    // find a class that's a valid key
    const possible = ['w','a','s','d','j','k','l'];
    const match = possible.find(p=> btn.classList.contains(p));
    note.textContent = match ? match.toUpperCase() : '';
    btn.appendChild(note);
  }

  btn.addEventListener('pointerdown', (ev)=>{
    // prevent ghost clicks on touch
    ev.preventDefault();
    const possible = ['w','a','s','d','j','k','l'];
    const key = possible.find(p=> btn.classList.contains(p));
    if(key) playKey(key);
    createRipple(btn, ev.clientX, ev.clientY);
    animatePress(btn);
  });
});

// Keyboard handling
document.addEventListener('keydown', (ev)=>{
  if(ev.repeat) return; // ignore held repeats
  const key = ev.key.toLowerCase();
  if(!audioFiles[key]) return;
  const btn = getButtonForKey(key);
  // use center of button for ripple if available
  if(btn){
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    createRipple(btn, centerX, centerY);
    animatePress(btn);
  }
  playKey(key);
});

// Small safety: click fallback for older browsers
document.addEventListener('click', (ev)=>{
  const el = ev.target.closest && ev.target.closest('.drum');
  if(!el) return;
  const possible = ['w','a','s','d','j','k','l'];
  const key = possible.find(p=> el.classList.contains(p));
  if(key){
    // compute click position
    const rect = el.getBoundingClientRect();
    const x = ev.clientX || rect.left + rect.width/2;
    const y = ev.clientY || rect.top + rect.height/2;
    createRipple(el, x, y);
    animatePress(el);
    playKey(key);
  }
});

// Particle background animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = Math.random() > 0.5 ? '#ff0080' : '#00ffff';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
