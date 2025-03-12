const gameContainer = document.getElementById("game-container");

const symbols = ["🐱", "🐱", "🐶", "🐶", "🐸", "🐸", "🐼", "🐼"];
const totalPairs = symbols.length / 2;

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
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
	// Prevent clicks when the board is locked.
	if (lockBoard === true) {
		return;
	}

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

		checkForMatch()
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

// Check if the two selected cards match.
function checkForMatch() {
	const firstSymbol = firstCard.querySelector(".card-front span").textContent;
	const secondSymbol = secondCard.querySelector(".card-front span").textContent;

	if (firstSymbol === secondSymbol) {
		// Increment the match counter.
		matches++;
		// Reset the board for the next pair.
		resetBoard()

		if (matches === totalPairs) {
			setTimeout(function () {
				alert("Congratulations, you found all pairs in " + attempts + " attempts!!!");
				// Restart the game after all pairs are found.
				restartGame();
			}, 1000);
		}
	} else {
		// Lock the board to prevent further clicks.
		lockBoard = true;

		setTimeout(function () {
			// Unflip the first card.
			firstCard.classList.remove("flipped");
			// Unflip the second card.
			secondCard.classList.remove("flipped");
			// Reset the board for the next attempt.
			resetBoard()
		}, 1500);
	}
}

// Reset the selected cards and unlock the board.
function resetBoard() {
	firstCard = null;
	secondCard = null;
	lockBoard = false;
}

// Restart the game by shuffling the cards and resetting variables.
function restartGame() {
	// Lock the board during reset.
	lockBoard = true;

	const allCards = document.querySelectorAll(".card");
	allCards.forEach(function (card) {
		// Unflip all cards.
		card.classList.remove("flipped");
	});

	setTimeout(function () {
		// Clear the game board.
		gameContainer.innerHTML = "";
		// Reset match counter.
		matches = 0;
		// Reset attempt counter.
		attempts = 0;
		// Reset the board state.
		resetBoard();

		// Shuffle and display the new set of cards.
		shuffleAndDisplayCards()
	}, 1000);
}