const cards=document.querySelectorAll('.memory-card');
let hasFlippedCard =false;
let lockBoard= false;
let firstcard,secondcard;
let moveCount = 0;
let timerInterval;
let cardsMatched = 0;
const totalCards = cards.length / 2;

const selectors ={
    boardContainer : document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves:document.querySelector('.moves'),
    timer:document.querySelector('.timer'),
    start: document.querySelector('.start'),
    win:document.querySelector('.win')
};

function startGame() {
    if (lockBoard) return;

    selectors.start.disabled = true;
    selectors.win.classList.remove('visible');
    moveCount = 0;
    selectors.moves.innerText = `${moveCount} moves`;
    selectors.timer.innerText = `Time: 0 sec`;

    lockBoard = true;

    cards.forEach(card => card.addEventListener('click', flipCard));

    setTimeout(() => {
        lockBoard = false;
        startTimer();
    }, 1500);
}
function flipCard(){

   if(lockBoard || !selectors.start.disabled) return;
    if (this === firstcard) return;

    this.classList.toggle('flip');
    if(!hasFlippedCard){
        //first click
        hasFlippedCard=true;
        firstcard=this;
        
    }
    else{
    
        //second click
        hasFlippedCard=false;
        secondcard=this;
        checkForMatch();
        moveCount++;
        selectors.moves.innerText = `${moveCount} move${moveCount !== 1 ? 's' : ''}`;
    }  
}

function checkForMatch(){

    let isMatch = firstcard.dataset.framework===secondcard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
    if(isMatch){
        cardsMatched++;
        if(cardsMatched==totalCards)
        {
            endGame();
        }
    }
    
    
}

function endGame(){
    clearInterval(timerInterval);
    selectors.win.classList.add('visible');
}

function disableCards()
{
    firstcard.removeEventListener('click',flipCard);
    secondcard.removeEventListener('click',flipCard);
    resetBoard();
}
function unflipCards(){
    lockBoard=true;
    setTimeout(() =>{
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');
        resetBoard();
    },1500);

}
function resetBoard()
{
    [hasFlippedCard, lockBoard]=[false, false];
    [firstcard, secondcard]=[null, null];
}
function startTimer() {
    let startTime = Date.now();

    timerInterval = setInterval(() => {

        let currentTime = Date.now();
        let elapsedTime = Math.floor((currentTime - startTime) / 1000);
        selectors.timer.innerText = `Time: ${elapsedTime} sec`;
    }, 1000);
}


(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos; 
    });
})();

/*cards.forEach(card => card.addEventListener('click',flipCard))*/

selectors.start.addEventListener('click', startGame);