export const description = 'Quick rounds vs computer';
export function createGameNode(){
  const wrap = document.createElement('div');
  const choices = ['Rock','Paper','Scissors'];
  const output = document.createElement('div'); output.className='info';
  const btns = document.createElement('div'); btns.className='controls';
  choices.forEach(c=>{
    const b=document.createElement('button'); b.className='btn small'; b.textContent=c;
    b.addEventListener('click', ()=> {
      const ai = choices[Math.floor(Math.random()*3)];
      let res='Tie';
      if((c==='Rock'&&ai==='Scissors')||(c==='Scissors'&&ai==='Paper')||(c==='Paper'&&ai==='Rock')) res='You win';
      else if(c!==ai) res='You lose';
      output.textContent = `You: ${c} — AI: ${ai} — ${res}`;
    });
    btns.appendChild(b);
  });
  wrap.appendChild(btns); wrap.appendChild(output);
  return wrap;
}
