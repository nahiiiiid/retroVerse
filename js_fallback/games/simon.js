export const description = 'Repeat the color sequence. Click start to begin.';
export function createGameNode(){
  const wrap=document.createElement('div');
  const colors=['red','green','blue','yellow'];
  const seq=[];
  let idx=0, playing=false;
  const board=document.createElement('div'); board.style.display='grid'; board.style.gridTemplateColumns='repeat(2,120px)'; board.style.gap='10px';
  const buttons = colors.map(c=>{
    const b=document.createElement('button'); b.style.height='120px'; b.style.background=c; b.style.borderRadius='12px'; b.addEventListener('click', ()=> {
      if(!playing) return;
      if(c!==seq[idx]) { status.textContent='Wrong!'; playing=false; return; }
      idx++;
      if(idx===seq.length){ status.textContent='Good! Next round'; setTimeout(next,700); }
    });
    board.appendChild(b); return b;
  });
  const status=document.createElement('div'); status.className='info'; status.textContent='Press Start';
  const start=document.createElement('button'); start.className='btn small'; start.textContent='Start'; start.addEventListener('click', ()=> { seq.length=0; next(); });
  function next(){
    seq.push(colors[Math.floor(Math.random()*colors.length)]); playSequence();
  }
  function playSequence(){
    playing=false; idx=0; let i=0; status.textContent='Watch';
    const it = setInterval(()=>{ if(i>=seq.length){ clearInterval(it); status.textContent='Your turn'; playing=true; return; } flash(seq[i]); i++; },700);
  }
  function flash(c){
    const b = buttons[colors.indexOf(c)];
    const old=b.style.filter; b.style.transform='scale(1.06)'; setTimeout(()=>{ b.style.transform=''; },300);
  }
  wrap.appendChild(board); wrap.appendChild(status); wrap.appendChild(start);
  return wrap;
}
