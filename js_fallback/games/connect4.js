export const description = 'Drop discs to connect four in a row.';
export function createGameNode() {
  const wrap = document.createElement('div');
  const cols = 7, rows = 6; const board = Array.from({ length: cols }, () => Array(rows).fill(0));
  const grid = document.createElement('div'); grid.style.display = 'grid'; grid.style.gridTemplateColumns = `repeat(${cols},60px)`; grid.style.gap = '6px';
  function render() {
    grid.innerHTML = ''; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const el = document.createElement('div'); el.style.width = '60px'; el.style.height = '60px'; el.style.borderRadius = '8px';
      el.style.background = board[c][r] === 0 ? 'transparent' : (board[c][r] === 1 ? '#7c4dff' : '#ffb86b');
      el.style.border = '1px solid rgba(255,255,255,0.04)';
      grid.appendChild(el);
    }
  }
  const topbar = document.createElement('div'); topbar.style.display = 'flex'; topbar.style.gap = '6px'; topbar.style.justifyContent = 'center';
  for (let c = 0; c < cols; c++) {
    const btn = document.createElement('button'); btn.className = 'small'; btn.textContent = '↓'; btn.addEventListener('click', () => drop(c));
    topbar.appendChild(btn);
  }
  let turn = 1, over = false;
  function drop(c) {
    if (over) return;
    const col = board[c];
    for (let r = rows - 1; r >= 0; r--) if (col[r] === 0) { col[r] = turn; if (checkWin(c, r, turn)) { over = true; status.textContent = (turn === 1 ? 'Blue' : 'Orange') + ' wins!'; } turn = 3 - turn; render(); return; }
  }
  function checkWin(x, y, p) {
    const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (const d of dirs) {
      let cnt = 1;
      for (let s = 1; s < 4; s++) { const nx = x + d[0] * s, ny = y + d[1] * s; if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && board[nx][ny] === p) cnt++; else break; }
      for (let s = 1; s < 4; s++) { const nx = x - d[0] * s, ny = y - d[1] * s; if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && board[nx][ny] === p) cnt++; else break; }
      if (cnt >= 4) return true;
    }
    return false;
  }
  const status = document.createElement('div'); status.className = 'info'; status.textContent = 'Blue starts';
  const reset = document.createElement('button'); reset.className = 'btn small'; reset.textContent = 'Restart'; reset.addEventListener('click', () => location.reload());
  wrap.appendChild(topbar); wrap.appendChild(grid); wrap.appendChild(status); wrap.appendChild(reset);
  render();
  return wrap;
}
