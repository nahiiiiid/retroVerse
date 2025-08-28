export const description = 'Use W/S and ArrowUp/ArrowDown to move paddles.';
export function createGameNode(){
  const wrap = document.createElement('div');
  const canvas = document.createElement('canvas'); canvas.width=700; canvas.height=320;
  const ctx = canvas.getContext('2d');
  wrap.appendChild(canvas);
  let p1y=130,p2y=130, ball={x:350,y:160,vx:4,vy:2}, score1=0, score2=0;
  const info=document.createElement('div'); info.className='info'; info.textContent='0 — 0';
  wrap.appendChild(info);
  document.addEventListener('keydown', e=>{
    if(e.key==='w') p1y-=30;
    if(e.key==='s') p1y+=30;
    if(e.key==='ArrowUp') p2y-=30;
    if(e.key==='ArrowDown') p2y+=30;
  });
  function step(){
    ball.x+=ball.vx; ball.y+=ball.vy;
    if(ball.y<10 || ball.y>310) ball.vy*=-1;
    if(ball.x<30 && ball.x>10 && ball.y>p1y && ball.y<p1y+80) ball.vx*=-1.05;
    if(ball.x>670 && ball.x<690 && ball.y>p2y && ball.y<p2y+80) ball.vx*=-1.05;
    if(ball.x<0){ score2++; resetBall(); }
    if(ball.x>700){ score1++; resetBall(); }
    draw();
  }
  function resetBall(){ ball={x:350,y:160,vx:4*(Math.random()>0.5?1:-1),vy:2*(Math.random()>0.5?1:-1)}; info.textContent=score1+' — '+score2; }
  function draw(){
    ctx.clearRect(0,0,700,320);
    ctx.fillStyle='#081426'; ctx.fillRect(0,0,700,320);
    ctx.fillStyle='#ffffff20'; ctx.fillRect(20, p1y, 10, 80); ctx.fillRect(670,p2y,10,80);
    ctx.beginPath(); ctx.arc(ball.x, ball.y, 8,0,Math.PI*2); ctx.fillStyle='#7c4dff'; ctx.fill();
  }
  const iv=setInterval(step,16);
  const resetBtn=document.createElement('button'); resetBtn.className='btn small'; resetBtn.textContent='Reset Scores';
  resetBtn.addEventListener('click', ()=>{score1=score2=0; info.textContent='0 — 0'; resetBall();});
  wrap.appendChild(resetBtn);
  return wrap;
}
