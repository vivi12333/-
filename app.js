const screen = document.querySelector('#screen');
const screenBack = document.querySelector('#screen-back');
const livingPet = document.querySelector('#living-pet');
const device = document.querySelector('#device');
const tapZone = document.querySelector('#tap-zone');

// The 13 states are direct Figma exports, in their original 414 × 896 pixel size.
let step = 1;
const autoNext = new Set([5, 6]);
const petSteps = new Set([6, 7, 8, 9, 10, 11, 12]);
const motions = {
  2: 'carousel', 3: 'pop', 4: 'pop', 5: 'cloud', 6: 'arrive',
  7: 'touch', 8: 'joy', 9: 'tap', 10: 'eat', 11: 'speech', 12: 'speech', 13: 'sheet',
};
let autoTimer;

function show(next) {
  step = Math.min(next, 13);
  const motion = motions[step] || 'pop';
  window.clearTimeout(autoTimer);
  screenBack.src = screen.src;
  screen.src = `assets/step-${step}.png`;
  livingPet.src = screen.src;
  screen.alt = `宠物新手引导，第 ${step} 步`;
  device.className = `device ${step === 8 ? 'react' : step === 10 ? 'feed' : ''}`;
  device.dataset.pet = petSteps.has(step);
  // Restart the named Figma-state transition on every change.
  screen.className = 'screen screen-front';
  void screen.offsetWidth;
  screen.className = `screen screen-front ${motion}`;
  if (autoNext.has(step)) autoTimer = window.setTimeout(() => step < 13 && show(step + 1), 1100);
}

function advance() {
  if (step === 13) return;
  // Step 5 and 6 are prescribed transition / pet-appearance states; they advance automatically.
  if (autoNext.has(step)) return;
  show(step + 1);
}

tapZone.addEventListener('click', advance);
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') { event.preventDefault(); advance(); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); show(Math.max(1, step - 1)); }
});
