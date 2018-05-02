
/* List that holds all of the cards for deck. */
let card_names = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],
    open_cards = [],
    shown_cards = [],
    move_count = 0,
    matched_pairs = 0,
    totalClicks = 0,
    game_started = false;
    
let timer = 0;
let timePTR;
num_stars = 3;

const deck = document.getElementById('mainDeck');
const reset_button = document.querySelector('.restart');
const play_again = document.querySelector('.play-again');
const moves = document.querySelector('.moves');
const endMoves = document.getElementById('finalMoves');
const starOne = document.getElementById('star-one');
const starTwo = document.getElementById('star-two');
const starThree = document.getElementById('star-three');
const starLine = document.getElementById('stars');
const scoreDisplay = document.getElementById('show-score');
const modal = document.getElementById('win-modal');
const starNums = document.getElementById('num-stars');
const endTime = document.getElementById('endTime');

reset_button.addEventListener('click', resetGame);
play_again.addEventListener('click', playAgain);

//display the matched pairs from the start
scoreDisplay.innerHTML = matched_pairs;

playGame();


// Displays Deck on page; clearing it first.
function createDeck() {
    // Remove existing deck - found on StackOverflow --> (https://stackoverflow.com/questions/683366/remove-all-the-children-dom-elements-in-div)
    while(deck.hasChildNodes() ){
        deck.removeChild(deck.lastChild);
    }

    // Loops through the card_names array and recreates the card elements on the page.
    for (let i = 0; i < card_names.length; i++) {

        const newCard = document.createElement('li');
        newCard.className = "card";
        const newCardData = document.createElement('i');
        newCardData.className = card_names[i];

        const addNewCardData = newCard.appendChild(newCardData);
        const addNewCard = deck.appendChild(newCard);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976 -- (Given by default by Udacity.)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// Applies classes that flip the card over and display it's icon.
function flipOver() {
  event.target.classList.add('open');
  event.target.classList.add('show');
}


 // * set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', function(event) {
 // *  - display the card's symbol (put this functionality in another function that you call from this one)
  if (event.target.className === "card"){
    totalClicks += 1;
    increaseMoveCount();
  }
// stops user from just double-clicking a single card to obtain match event.
  if (event.target.classList.contains('open')) { 
      return; 
  }
  
  if(totalClicks <= 2) {
  flipOver();

 // *  - display the card's symbol (put this functionality in another function that you call from this one)
 // *  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    if(open_cards.length != 2 && event.target.className === "card open show" && shown_cards.length != 2) {
        open_cards.push(event.target.childNodes[0].className);
        shown_cards.push(event.target);
    
    if (open_cards.length > 1) {
        if(open_cards[0] === open_cards[1] ) {
                increaseScore();
                setTimeout(function(){
                shown_cards[0].classList.add('match');
                shown_cards[1].classList.add('match');
                open_cards = [];
                shown_cards = [];
                totalClicks = 0;
            }, 110);
// *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
        } else if (open_cards[0] != open_cards[1]) {
            setTimeout(function(){
            shown_cards[0].classList.remove('open');
            shown_cards[0].classList.remove('show');
            shown_cards[1].classList.remove('open');
            shown_cards[1].classList.remove('show');
            open_cards = [];
            shown_cards = [];
            totalClicks = 0;
            }, 600);
        }
    }   

   if(matched_pairs === 8) {
          // clearInterval(myVar);
          clearTimeout(timePTR);
          showModal();
        }
    }
  }
 });

// increases move count: 1 clicks = 1 move.
function increaseMoveCount() {
    move_count += 1;
    moves.innerHTML = move_count;

    if (move_count === 18) {
      starOne.style.display = "none";
      num_stars -= 1;
    } else if (move_count === 25) {
        starTwo.style.display = "none";
        num_stars -= 1;
    } else if (move_count === 36) {
        starThree.style.display = "none";
        num_stars -= 1; 
    }
}

 
function increaseScore(){
    matched_pairs += 1;
}

// Winning Modal
function showModal() {
  modal.style.display = "block";
  starNums.innerHTML = num_stars;
  endMoves.innerHTML = move_count;
  endTime.innerHTML = timer;
};


function playGame() {
  startTimer();
  shuffle(card_names);
  createDeck();
  num_stars = 3;
  moves.innerHTML = move_count;
  modal.style.display = "none";
}


function resetGame(){
  timer = 0;
  num_stars = 3;
  clearTimeout(timePTR);
  document.getElementById('timer').innerHTML = 0;
 
  playGame();

  move_count = 0;
  moves.innerHTML = 0;
  matched_pairs = 0;
  scoreDisplay.innerHTML = 0;
  starOne.style.display = "block";
  starTwo.style.display = "block";
  starThree.style.display = "block";
         
}

function playAgain(){
    resetGame();
    modal.style.display = "none";
}

function startTimer(){
    timer += 1;
    document.getElementById("timer").innerHTML = timer;
    timePTR = setTimeout(startTimer, 1000);
}
