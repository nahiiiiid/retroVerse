export const description = 'Flip cards and match pairs.';
export function createGameNode() {
  const wrap = document.createElement('div');
  const grid = document.createElement('div'); grid.style.display = 'grid'; grid.style.gridTemplateColumns = 'repeat(4,90px)'; grid.style.gap = '10px';
  let values = Array.from({ length: 8 }, (_, i) => i + 1).flatMap(x => [x, x]);
  values = values.sort(() => Math.random() - 0.5);
  let first = null, second = null, locked = false, matches = 0;
  for (let i = 0; i < 16; i++) {
    const btn = document.createElement('button'); btn.style.height = '90px'; btn.style.fontSize = '28px';
    btn.textContent = '?';
    btn.addEventListener('click', () => {
      if (locked || btn.dataset.matched === '1' || btn === first) return;
      btn.textContent = values[i];
      if (!first) { first = btn; return; }
      second = btn; locked = true;
      if (values[Array.from(grid.children).indexOf(first)] === values[i]) {
        first.dataset.matched = '1'; second.dataset.matched = '1'; matches++;
        first = null; second = null; locked = false;
        if (matches === 8) status.textContent = 'You won!';
      } else setTimeout(() => { first.textContent = '?'; second.textContent = '?'; first = null; second = null; locked = false }, 700);
    });
    grid.appendChild(btn);
  }
  const status = document.createElement('div'); status.className = 'info'; status.textContent = 'Find pairs';
  const reset = document.createElement('button'); reset.className = 'btn small'; reset.textContent = 'Restart';
  reset.addEventListener('click', () => location.reload());
  wrap.appendChild(grid); wrap.appendChild(status); wrap.appendChild(reset);
  return wrap;
}
