const stmenu = document.getElementById('start-menu');
const democt = document.getElementById('demo-content');
const gamegd = document.getElementById('game-grid');
const cardgd = document.getElementById('card-grid');
const score = document.getElementById('score');
const timer = document.getElementById('timer');
const resetbtn = document.getElementById('reset-btn');
const closepopup = document.getElementById('closePopupBtn');
const popupcard = document.getElementById('popup-card');
let started = false;

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

//enable reset
let evalInterval = null;
let timerInterval = null;
function resetGame(){
    started = false;
    gamequeue.length = 0;
    clearInterval(evalInterval);
    clearInterval(timerInterval);
    scorect = 0; score.innerHTML = '';
    stmenu.classList.remove('hidden');
    democt.classList.remove('hidden');
    gamegd.classList.add('hidden');
}
resetbtn.addEventListener('click',resetGame);

//game logic
const gamequeue = [];
let clickct = 0;
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
    let cardlist = [];
    for(var i=0;i<totalCards;i++){
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-val',Math.floor(i/2));
        card.innerHTML = `<h3>${Math.floor(i/2)}</h3>`;
        if(i!=0 && Math.floor(i/2)!=Math.floor((i-1)/2)){
            colorptr++;
        }
        card.dataset.secretColor = colorlist[colorptr];

        card.addEventListener('click',(e)=>{
            //addClick(e.target, card.getAttribute('data-val'));
            if(card.classList.contains('clicked')) alert('Cant click twice!');
            else{
                clickct++;
                card.classList.add('clicked');
                gamequeue.push(e.target);
            } 
        });
        cardlist.push(card);
    }

    cardlist = shuffleArray(cardlist);
    cardlist.forEach((card)=>{cardgd.appendChild(card);});
    started = true;

    timerInterval = setInterval(updateTimer, 1000);
    console.log("Timer started.");

    evalInterval = setInterval(()=>{
        if(gamequeue.length>1)evalClick();
    }, 650);
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

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

let a = -1, b = -1, scorect = 0;
let cardA, cardB;
function evalClick(){
    console.log('click eval');
    cardA = gamequeue.shift();
    cardB = gamequeue.shift();
    a = cardA.getAttribute('data-val');
    b = cardB.getAttribute('data-val');

    cardA.classList.remove('card');
    cardA.classList.add('face');
    cardA.style.backgroundColor = cardA.dataset.secretColor;

    cardB.classList.remove('card');
    cardB.classList.add('face');
    cardB.style.backgroundColor = cardB.dataset.secretColor;
    
    if(a==b){
        scorect += 10;
        score.innerHTML = scorect;
        //YTD popup card condition update, highscore(time based) in popup
        if(scorect==50){
            document.getElementById('result-score').textContent = scorect;
            document.getElementById('result-time').textContent = timer.textContent;
            popupcard.style.display = 'flex';
        }
    }else{
        setTimeout(()=>{
            cardA.classList.remove('face'); cardB.classList.remove('face');
            cardA.classList.add('card'); cardB.classList.add('card'); 
            cardA.style.backgroundColor = '#d1d5db'; cardB.style.backgroundColor = '#d1d5db'; 
            cardA.classList.remove('clicked'); cardB.classList.remove('clicked');
        }, 600);
    }
    a = -1; b = -1;
}

//timer functionality - update timer every second
let totalSeconds = 0;
function updateTimer() {
    totalSeconds++;
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

//close popupcard
closepopup.addEventListener('click',()=>{
    popupcard.style.display = 'none';
    //implement score saving and high scores with json YTD
    resetGame();
})

