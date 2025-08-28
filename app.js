const games = [
  { id: 'tictactoe', title: 'Tic Tac Toe', desc: 'Classic 3x3 X/O', script: 'js_fallback/games/tictactoe.js' },
  { id: 'snake', title: 'Snake', desc: 'Eat and grow', script: 'js_fallback/games/snake.js' },
  { id: 'pong', title: 'Pong', desc: '1v1 paddle', script: 'js_fallback/games/pong.js' },
  { id: 'memory', title: 'Memory', desc: 'Find pairs', script: 'js_fallback/games/memory.js' },
  { id: 'minesweeper', title: 'Minesweeper', desc: 'Find safe tiles', script: 'js_fallback/games/minesweeper.js' },
  { id: 'breakout', title: 'Breakout', desc: 'Bounce to break blocks', script: 'js_fallback/games/breakout.js' },
  { id: '2048', title: '2048', desc: 'Slide & merge', script: 'js_fallback/games/2048.js' },
  { id: 'connect4', title: 'Connect Four', desc: 'Line up four', script: 'js_fallback/games/connect4.js' },
  { id: 'rps', title: 'Rock Paper Scissors', desc: 'Fast hand game', script: 'js_fallback/games/rps.js' },
  { id: 'simon', title: 'Simon Says', desc: 'Repeat the sequence', script: 'js_fallback/games/simon.js' }
];

const grid = document.getElementById('gamesGrid');
const modal = document.getElementById('modal');
const gameContainer = document.getElementById('gameContainer');
const closeBtn = document.getElementById('closeBtn');

games.forEach(g => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<h3>${g.title}</h3><p>${g.desc}</p><div style="margin-top:10px"><span class="badge">C++ friendly</span></div>`;
  card.addEventListener('click', ()=> openGame(g));
  grid.appendChild(card);
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=> { if(e.target === modal) closeModal(); });

async function openGame(g){
  modal.classList.remove('hidden');
  gameContainer.innerHTML = '<div class="topbar"><div class="badge">Loading game...</div></div>';
  // try to import fallback JS module
  try{
    const module = await import(`./${g.script}`);
    // create container for game
    gameContainer.innerHTML = '';
    const title = document.createElement('h2'); title.textContent = g.title;
    const info = document.createElement('div'); info.className='info'; info.textContent = module.description || '';
    gameContainer.appendChild(title);
    gameContainer.appendChild(info);
    const node = module.createGameNode();
    gameContainer.appendChild(node);
  }catch(err){
    console.error(err);
    gameContainer.innerHTML = '<div class="info">Failed to load game. See console.</div>';
  }
}

function closeModal(){
  modal.classList.add('hidden');
  gameContainer.innerHTML = '';
}
