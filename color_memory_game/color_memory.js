const stmenu = document.getElementById('start-menu');
const democt = document.getElementById('demo-content');
const gamegd = document.getElementById('game-grid');

//to get the option from user
let rows = 0, cols = 0;
const options = document.querySelectorAll('.diff-option');

//add event listener for each option to call with 'gridsize' param
options.forEach((op)=>{
    var gridsize = parseInt(op.getAttribute('data-size'));
    op.addEventListener('click', () => setDifficultyAndStart(gridsize));
})

function setDifficultyAndStart(gridsize){
    if(gridsize==5){
        rows = 2; cols = 5;
    }else{
        rows = gridsize; cols = gridsize;
    }
    stmenu.classList.add('hidden');
    democt.classList.add('hidden');
    gamegd.classList.remove('hidden');

    startGame(rows, cols);//yet to be written
}

//set demo content
document.getElementById('how-to-play-btn').addEventListener('click', () => {
    democt.classList.remove('hidden');
    democt.innerHTML = "<p>Match all pairs of colors before the time runs out! Click a card to flip it.</p>";
});