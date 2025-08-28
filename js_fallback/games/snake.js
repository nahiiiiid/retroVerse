export const description = 'Arrow keys to move. Eat food to grow.';
export function createGameNode(){
  const wrap = document.createElement('div');
  const canvas = document.createElement('canvas'); canvas.width=360; canvas.height=360;
  const ctx = canvas.getContext('2d');
  const scoreEl = document.createElement('div'); scoreEl.className='info'; scoreEl.textContent='Score: 0';
  wrap.appendChild(canvas); wrap.appendChild(scoreEl);

  let dir = {x:1,y:0}, snake=[{x:8,y:8}], food=randomPos(), running=true, score=0;
  document.addEventListener('keydown', kd);
  function kd(e){
    if(e.key==='ArrowUp' && dir.y===0) dir={x:0,y:-1};
    if(e.key==='ArrowDown' && dir.y===0) dir={x:0,y:1};
    if(e.key==='ArrowLeft' && dir.x===0) dir={x:-1,y:0};
    if(e.key==='ArrowRight' && dir.x===0) dir={x:1,y:0};
    if(e.key===' ') { running=!running; }
  }
  function randomPos(){ return {x:Math.floor(Math.random()*18), y:Math.floor(Math.random()*18)};}
  function step(){
    if(!running) return;
    const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
    if(head.x<0||head.x>=18||head.y<0||head.y>=18||snake.some(s=>s.x===head.x&&s.y===head.y)){
      scoreEl.textContent='Game Over — Score: '+score; running=false; return;
    }
    snake.unshift(head);
    if(head.x===food.x && head.y===food.y){ score++; food=randomPos(); scoreEl.textContent='Score: '+score; }
    else snake.pop();
    draw();
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#081426'; ctx.fillRect(0,0,canvas.width,canvas.height);
    const cell = canvas.width/18;
    // food
    ctx.fillStyle='#ffb86b'; ctx.fillRect(food.x*cell, food.y*cell, cell-2, cell-2);
    // snake
    ctx.fillStyle='#7c4dff';
    snake.forEach((s,i)=>{
      ctx.fillRect(s.x*cell, s.y*cell, cell-2, cell-2);
      if(i===0){ ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.fillRect(s.x*cell, s.y*cell, cell-2, cell-2); ctx.fillStyle='#7c4dff'; }
    });
  }
  draw();
  const iv = setInterval(step, 120);
  const resetBtn = document.createElement('button'); resetBtn.className='btn small'; resetBtn.textContent='Restart';
  resetBtn.addEventListener('click', ()=>{ snake=[{x:8,y:8}]; dir={x:1,y:0}; food=randomPos(); score=0; running=true; scoreEl.textContent='Score: 0';});
  wrap.appendChild(resetBtn);
  return wrap;
}
