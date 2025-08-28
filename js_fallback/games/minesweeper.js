export const description = 'Click to reveal tiles. Right click to flag (hold Ctrl+Click for mobile).';
export function createGameNode(){
  const wrap = document.createElement('div');
  const size = 8, mines = 10;
  const board = Array.from({length:size},()=>Array(size).fill(0));
  // place mines
  let placed=0;
  while(placed<mines){
    const r=Math.floor(Math.random()*size), c=Math.floor(Math.random()*size);
    if(board[r][c]===-1) continue;
    board[r][c]=-1; placed++;
  }
  // compute numbers
  for(let r=0;r<size;r++) for(let c=0;c<size;c++){
    if(board[r][c]===-1) continue;
    let cnt=0;
    for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){
      const nr=r+dr,nc=c+dc;
      if(nr>=0&&nr<size&&nc>=0&&nc<size&&board[nr][nc]===-1) cnt++;
    }
    board[r][c]=cnt;
  }
  const grid=document.createElement('div'); grid.style.display='grid'; grid.style.gridTemplateColumns=`repeat(${size},38px)`; grid.style.gap='4px';
  const cells=[];
  let revealed=0, over=false;
  for(let r=0;r<size;r++) for(let c=0;c<size;c++){
    const btn=document.createElement('button'); btn.style.width='38px'; btn.style.height='38px';
    btn.addEventListener('click', ()=>{
      if(over||btn.dataset.flag==='1') return;
      reveal(r,c);
    });
    btn.addEventListener('contextmenu', (e)=>{ e.preventDefault(); if(over) return; btn.dataset.flag = btn.dataset.flag==='1' ? '0':'1'; btn.textContent = btn.dataset.flag==='1' ? '⚑':''; });
    grid.appendChild(btn); cells.push(btn);
  }
  function reveal(r,c){
    const idx = r*size + c;
    const btn = cells[idx];
    if(btn.dataset.revealed==='1' || btn.dataset.flag==='1') return;
    btn.dataset.revealed='1'; btn.disabled=true; revealed++;
    if(board[r][c]===-1){ btn.textContent='💣'; over=true; finish(false); return; }
    if(board[r][c]>0) btn.textContent=board[r][c];
    else {
      // flood fill
      for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){
        const nr=r+dr,nc=c+dc;
        if(nr>=0&&nr<size&&nc>=0&&nc<size) reveal(nr,nc);
      }
    }
    if(revealed === size*size - mines) finish(true);
  }
  function finish(win){
    over=true;
    if(win) status.textContent='You cleared the field!';
    else status.textContent='Boom! You hit a mine.';
    // reveal all
    for(let i=0;i<cells.length;i++){
      const r=Math.floor(i/size), c=i%size;
      if(board[r][c]===-1) cells[i].textContent='💣';
      cells[i].disabled=true;
    }
  }
  const status=document.createElement('div'); status.className='info'; status.textContent='Good luck';
  const reset=document.createElement('button'); reset.className='btn small'; reset.textContent='Restart';
  reset.addEventListener('click', ()=> location.reload());
  wrap.appendChild(grid); wrap.appendChild(status); wrap.appendChild(reset);
  return wrap;
}
