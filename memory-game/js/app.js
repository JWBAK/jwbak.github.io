
/* List that holds all of the cards for deck. */
let card_names = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],
    open_cards = [],
    shown_cards = [],
    move_count = 0,
    matched_pairs = 0,
    total_clicks = 0,
    game_started = false;
    
let timer = 0;
let timePTR;
num_stars = 3;

const deck = document.getElementById('mainDeck'),
reset_button = document.querySelector('.restart'),
play_again = document.querySelector('.play-again'),
moves = document.querySelector('.moves'),
end_moves = document.getElementById('finalMoves'),
star_one = document.getElementById('star-one'),
star_two = document.getElementById('star-two'),
star_three = document.getElementById('star-three'),
star_line = document.getElementById('stars'),
core_display = document.getElementById('show-score'),
modal = document.getElementById('win-modal'),
numberOfStars = document.getElementById('num-stars'),
endTime = document.getElementById('endTime');

reset_button.addEventListener('click', resetGame);
play_again.addEventListener('click', playAgain);

// Initial start of game on pageLoad.
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
// Function to increase counter for matched pairs. Game is over when this number reaches 8 total.
function increaseScore(){
    matched_pairs += 1;
}


 // * Event listener for a card.
deck.addEventListener('click', function(event) {
// stops user from just double-clicking a single card to obtain match event.
  if (event.target.classList.contains('open')) { 
      return; 
  }
  if(total_clicks < 2) {
    if (event.target.className === "card"){
        total_clicks += 1;
        flipOver();
        if (total_clicks === 2){
            increaseMoveCount();
        }
    }

    if(open_cards.length != 2 && event.target.className === "card open show" && shown_cards.length != 2) {
        open_cards.push(event.target.childNodes[0].className);
        shown_cards.push(event.target);
    }
    
    // Checks to see if cards match, only once more than 1 card has been turned over.
    if (open_cards.length > 1) {
        if(open_cards[0] === open_cards[1] ) {
                increaseScore();
                setTimeout(function(){
                shown_cards[0].classList.add('grow');
                shown_cards[1].classList.add('grow');     
                shown_cards[0].classList.add('match');
                shown_cards[1].classList.add('match');
                open_cards = [];
                shown_cards = [];
                total_clicks = 0;
            }, 110);

        } else if (open_cards[0] != open_cards[1]) {
            shown_cards[0].classList.add('wobble');
            shown_cards[1].classList.add('wobble'); 
            setTimeout(function(){   
            shown_cards[0].classList.remove('open');
            shown_cards[0].classList.remove('show');
            shown_cards[1].classList.remove('open');
            shown_cards[1].classList.remove('show');
            shown_cards[0].classList.remove('wobble');
            shown_cards[1].classList.remove('wobble'); 
            open_cards = [];
            shown_cards = [];
            total_clicks = 0;
            }, 600);
        }
    }   
// Game Over Modal upon matching all cards. Stops timer.
   if(matched_pairs === 8) {
          clearTimeout(timePTR);
          showModal();
        }
    }
 });

// function to increases move count: 1 click = 1 move.
function increaseMoveCount() {
    move_count += 1;
    moves.innerHTML = move_count;

    if (move_count === 15) {
      star_one.style.display = "none";
      num_stars -= 1;
    } else if (move_count === 30) {
        star_two.style.display = "none";
        num_stars -= 1;
    }
}

// Winning Modal
function showModal() {
  modal.style.display = "block";
  numberOfStars.innerHTML = num_stars;
  end_moves.innerHTML = move_count;
  endTime.innerHTML = timer;
};

// Function to play game.
function playGame() {
  startTimer();
  shuffle(card_names);
  createDeck();
  num_stars = 3;
  moves.innerHTML = move_count;
  modal.style.display = "none";
}

// Function to reset entire game without the need for a page refresh.
function resetGame(){
  timer = 0;
  num_stars = 3;
  clearTimeout(timePTR);
  document.getElementById('timer').innerHTML = 0;
  playGame();
  move_count = 0;
  moves.innerHTML = 0;
  matched_pairs = 0;
  star_one.style.display = "block";
  star_two.style.display = "block";
  star_three.style.display = "block";   
}

// Allows user to reset the game and play again. (Message displayed on the winning modal.)
function playAgain(){
    resetGame();
    modal.style.display = "none";
}

// Function to start game timer.
function startTimer(){
    timer += 1;
    document.getElementById("timer").innerHTML = timer;
    timePTR = setTimeout(startTimer, 1000);
}
