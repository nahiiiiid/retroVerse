export const description = 'Use mouse to move paddle. Break all blocks.';
export function createGameNode() {
  const wrap = document.createElement('div');
  const canvas = document.createElement('canvas'); canvas.width = 560; canvas.height = 320;
  const ctx = canvas.getContext('2d'); wrap.appendChild(canvas);
  let paddleX = 220, ball = { x: 280, y: 240, vx: 3, vy: -3 }, bricks = [];
  const cols = 7, rows = 4;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) bricks.push({ x: c * 80 + 10, y: r * 24 + 10, w: 72, h: 18, alive: true });
  canvas.addEventListener('mousemove', e => { const rect = canvas.getBoundingClientRect(); paddleX = e.clientX - rect.left - 40; });
  function step() {
    ball.x += ball.vx; ball.y += ball.vy;
    if (ball.x < 0 || ball.x > 560) ball.vx *= -1;
    if (ball.y < 0) ball.vy *= -1;
    if (ball.y > 320) { status.textContent = 'Missed!'; clearInterval(iv); return; }
    // paddle
    if (ball.x > paddleX && ball.x < paddleX + 80 && ball.y > 280) ball.vy *= -1;
    // bricks
    bricks.forEach(b => {
      if (b.alive && ball.x > b.x && ball.x < b.x + b.w && ball.y > b.y && ball.y < b.y + b.h) { b.alive = false; ball.vy *= -1; }
    });
    draw();
  }
  function draw() {
    ctx.clearRect(0, 0, 560, 320); ctx.fillStyle = '#081426'; ctx.fillRect(0, 0, 560, 320);
    ctx.fillStyle = '#7c4dff'; ctx.fillRect(paddleX, 300, 80, 12);
    ctx.beginPath(); ctx.arc(ball.x, ball.y, 8, 0, Math.PI * 2); ctx.fill();
    bricks.forEach(b => { if (b.alive) { ctx.fillStyle = '#5e9cff'; ctx.fillRect(b.x, b.y, b.w, b.h); } });
  }
  const status = document.createElement('div'); status.className = 'info'; status.textContent = 'Play';
  const iv = setInterval(step, 16);
  const reset = document.createElement('button'); reset.className = 'btn small'; reset.textContent = 'Restart';
  reset.addEventListener('click', () => location.reload());
  wrap.appendChild(status); wrap.appendChild(reset);
  return wrap;
}
