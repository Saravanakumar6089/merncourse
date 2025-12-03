const stmenu = document.getElementById('start-menu');
const democt = document.getElementById('demo-content');
const gamegd = document.getElementById('game-grid');
const cardgd = document.getElementById('card-grid');

//to get the option from user
let diff=0; //default - easy - 0; 
/* medium - 1; hard - 2; super hard - 3 */
const options = document.querySelectorAll('.diff-option');

//add event listener for each option to call with 'gridsize' param
options.forEach((op)=>{
    var gridsize = parseInt(op.getAttribute('data-size'));
    op.addEventListener('click', () => setDifficultyAndStart(gridsize));
})

function setDifficultyAndStart(gridsize){
    stmenu.classList.add('hidden');
    democt.classList.add('hidden');
    gamegd.classList.remove('hidden');

    startGame(gridsize);//YTC
}

//set demo content
document.getElementById('how-to-play-btn').addEventListener('click', () => {
    democt.classList.remove('hidden');
    democt.innerHTML = "<p>Match all pairs of colors before the time runs out! Click a card to flip it.</p>";
});

//game logic
function startGame(size){
    cardgd.innerHTML = '';
    var cols = 0;
    if(size==0){
        cols = 5; //Easy mode
    }else{
        cols = 2*(size+1); //Other modes
    }

    cardgd.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    const totalCards = size==0? 10: cols*cols;

    var colorptr=0;
    colorlist = generateDistinctColors(totalCards/2);
    for(var i=0;i<totalCards;i++){
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-val',Math.floor(i/2));
        card.innerHTML = `<h3>${Math.floor(i/2)}</h3>`;
        if(i!=0 && Math.floor(i/2)!=Math.floor((i-1)/2)){
            colorptr++;
        }
        card.dataset.secretColor = colorlist[colorptr];
        //adding  color, randomisation logic
        card.addEventListener('click',()=>{
            card.classList.remove('card');
            card.classList.add('face');
            card.style.backgroundColor = card.dataset.secretColor;
            //evalClick(id);
        });

        cardgd.appendChild(card);
    }
    //YTC
}

let colorlist = [];
function generateDistinctColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var j = 0; j < 6; j++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            colors.push(color);
        }
        return colors;
    }