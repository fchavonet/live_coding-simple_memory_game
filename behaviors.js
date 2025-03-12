const gameContainer = document.getElementById("game-container");

const symbols = ["🐱", "🐱", "🐶", "🐶", "🐸", "🐸", "🐼", "🐼"];

let firstCard = null;
let secondCard = null;
let attempts = 0;

// Shuffle symbols and create the cards.
shuffleAndDisplayCards();

// Create a card with the given symbol.
function createCard(symbol) {
	const card = document.createElement("div");
	card.classList.add("card");

	const cardInner = document.createElement("div");
	cardInner.classList.add("card-inner");

	const cardFront = document.createElement("div");
	cardFront.classList.add("card-front");
	// Display the symbol on the front of the card.
	cardFront.innerHTML = `<span>${symbol}</span>`;

	const cardBack = document.createElement("div");
	cardBack.classList.add("card-back");

	cardInner.appendChild(cardFront);
	cardInner.appendChild(cardBack);

	card.appendChild(cardInner);

	gameContainer.appendChild(card);

	card.addEventListener("click", function () {
		handleCardClick(card);
	});
}

// Handle the click event on a card.
function handleCardClick(card) {
	// Ignore if the player clicks the same card twice.
	if (firstCard === card) {
		return;
	}

	// Flip the card.
	card.classList.add("flipped");

	if (firstCard === null) {
		// Set the first selected card.
		firstCard = card;
	} else {
		// Set the second selected card.
		secondCard = card;
		// Increment the attempt counter.
		attempts++;

		console.log(attempts);
	}
}

// Shuffle the symbols and create the cards on the game board.
function shuffleAndDisplayCards() {
	// Shuffle the array randomly.
	symbols.sort(function () {
		return 0.5 - Math.random();
	});

	// Create a card for each symbol.
	symbols.forEach(function (symbol) {
		createCard(symbol);
	});
}
