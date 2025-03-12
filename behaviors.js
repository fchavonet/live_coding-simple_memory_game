const gameContainer = document.getElementById("game-container");

const symbols = ["🐱", "🐱", "🐶", "🐶", "🐸", "🐸", "🐼", "🐼"];

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
		card.classList.add("flipped");
	});
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
