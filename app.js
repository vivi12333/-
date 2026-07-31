const screen = document.querySelector('#screen');
const device = document.querySelector('#device');
const tapZone = document.querySelector('#tap-zone');

// The 13 states are direct Figma exports, in their original 414 × 896 pixel size.
let step = 1;
const autoNext = new Set([5, 6]);

function show(next, motion = '') {
  step = Math.min(next, 13);
  screen.src = `assets/step-${step}.png`;
  screen.alt = `宠物新手引导，第 ${step} 步`;
  device.className = `device ${motion}`;
  if (autoNext.has(step)) window.setTimeout(() => step < 13 && show(step + 1, step === 5 ? 'enter' : 'pet'), 1100);
}

function advance() {
  if (step === 13) return;
  // Step 5 and 6 are prescribed transition / pet-appearance states; they advance automatically.
  if (autoNext.has(step)) return;
  show(step + 1, step === 5 ? 'enter' : step === 7 || step === 9 ? 'pet' : '');
}

tapZone.addEventListener('click', advance);
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') { event.preventDefault(); advance(); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); show(Math.max(1, step - 1)); }
});
