export const description = 'Play against a friend locally. Click to place X or O.';
export function createGameNode(){
  const wrap = document.createElement('div');
  const board = Array(9).fill(null);
  let turn = 'X', over=false;
  const grid = document.createElement('div');
  grid.style.display='grid'; grid.style.gridTemplateColumns='repeat(3,120px)'; grid.style.gap='8px';
  grid.style.justifyContent='center';
  for(let i=0;i<9;i++){
    const cell = document.createElement('button');
    cell.style.height='120px'; cell.style.fontSize='48px'; cell.style.borderRadius='8px';
    cell.style.background='linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.2))';
    cell.addEventListener('click', ()=>{
      if(over||board[i]) return;
      board[i]=turn; cell.textContent=turn;
      if(checkWin(board,turn)){ over=true; status.textContent = turn+' wins!'; }
      else if(board.every(Boolean)){ over=true; status.textContent = 'Draw'; }
      else { turn = turn==='X'?'O':'X'; status.textContent = turn + "'s turn"; }
    });
    grid.appendChild(cell);
  }
  const status = document.createElement('div'); status.className='info'; status.textContent = turn + "'s turn";
  const reset = document.createElement('button'); reset.className='btn small'; reset.textContent='Restart';
  reset.addEventListener('click', ()=>{
    board.fill(null); Array.from(grid.children).forEach(c=>c.textContent=''); over=false; turn='X'; status.textContent = turn+"'s turn";
  });
  wrap.appendChild(grid); wrap.appendChild(status); wrap.appendChild(document.createElement('br')); wrap.appendChild(reset);
  return wrap;
}

function checkWin(b,t){
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  return wins.some(arr=>arr.every(i=>b[i]===t));
}
