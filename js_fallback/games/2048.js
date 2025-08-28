export const description = 'Merge tiles to reach 2048. Use arrow keys.';
export function createGameNode() {
  const wrap = document.createElement('div');
  const grid = document.createElement('div'); grid.style.display = 'grid'; grid.style.gridTemplateColumns = 'repeat(4,70px)'; grid.style.gap = '8px';
  grid.style.justifyContent = 'center';
  let board = Array.from({ length: 16 }, () => 0);
  addTile(); addTile(); render();
  function addTile() { const empty = board.map((v, i) => v === 0 ? i : -1).filter(i => i >= 0); if (!empty.length) return; board[empty[Math.floor(Math.random() * empty.length)]] = Math.random() < 0.9 ? 2 : 4; }
  function render() {
    grid.innerHTML = ''; board.forEach(v => {
      const el = document.createElement('div'); el.style.height = '70px'; el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center';
      el.style.borderRadius = '8px'; el.style.fontSize = '20px'; el.textContent = v || ''; el.style.background = v ? '#7c4dff33' : '#ffffff06';
      grid.appendChild(el);
    });
  }
  document.addEventListener('keydown', e => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const old = board.join(',');
    if (e.key === 'ArrowLeft') board = moveLeft(board);
    if (e.key === 'ArrowRight') board = reverse(moveLeft(reverse(board)));
    if (e.key === 'ArrowUp') board = rotateLeft(moveLeft(rotateRight(board)));
    if (e.key === 'ArrowDown') board = rotateLeft(moveLeft(rotateRight(rotateRight(rotateRight(board)))));
    if (board.join(',') !== old) { addTile(); render(); }
  });
  function moveLeft(b) {
    const out = [];
    for (let r = 0; r < 4; r++) {
      let row = b.slice(r * 4, r * 4 + 4).filter(Boolean);
      for (let i = 0; i < row.length - 1; i++) if (row[i] === row[i + 1]) { row[i] *= 2; row[i + 1] = 0; }
      row = row.filter(Boolean);
      while (row.length < 4) row.push(0);
      out.push(...row);
    }
    return out;
  }
  function reverse(b) { return b.map((_, i) => b[15 - i]); }
  function rotateLeft(b) {
    const out = []; for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) out.push(b[r * 4 + (3 - c)]);
    return out;
  }
  function rotateRight(b) { return rotateLeft(rotateLeft(rotateLeft(b))); }
  wrap.appendChild(grid);
  const info = document.createElement('div'); info.className = 'info'; info.textContent = 'Use arrow keys to move tiles';
  const reset = document.createElement('button'); reset.className = 'btn small'; reset.textContent = 'Restart'; reset.addEventListener('click', () => location.reload());
  wrap.appendChild(info); wrap.appendChild(reset);
  return wrap;
}
