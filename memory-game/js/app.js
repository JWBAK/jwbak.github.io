/*
 * Create a list that holds all of your cards
 */
let card_names = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],
    open_cards = [],
    card_deck = [],
    move_count = 0,
    matched_pairs = 0,
    game_started = false;


    let card = document.querySelector('.card');

     card.addEventListener('click', function(event) {
        event.target.classList.toggle('open');
        event.target.classList.toggle('show');
    });

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



// Shuffle function from http://stackoverflow.com/a/2450976
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


//StartGame()


shuffle(card_names);
const deck = document.getElementById('mainDeck');
// Remove ChildrenNodes - StackOverflow --> https://bit.ly/2Hmw67R
while(deck.hasChildNodes() ){
    deck.removeChild(deck.lastChild);
}

    for (let i = 0; i < card_names.length; i++) {

        const newCard = document.createElement('li');
        const newCardData = document.createElement('i');
        
        const addNewCardData = newCard.appendChild(newCardData);
        const addNewCard = deck.appendChild(newCard);

    }

    

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//  increasing move counter
// span .moves .innerHtml ++

// reload game 
let reset_button = document.querySelector('.restart');
