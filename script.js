/*********************
* RESPONSIVE WARNING *
*********************/

const responsiveWarning = document.getElementById("responsive-warning");
// "true" if the site is optimized for responsive design, "false" if not.
const responsiveDesign = false;

// Show mobile warning if the user is on mobile and responsive-design is false.
if (!responsiveDesign && window.innerWidth <= 768) {
	responsiveWarning.classList.add("show");
}


/***********************
* MODE TOGGLE BEHAVIOR *
***********************/

// Get elements that change with the mode.
const toggleModeBtn = document.getElementById("toggle-mode-btn");
const portfolioLink = document.getElementById("portfolio-link");
const body = document.body;

// Function to apply mode.
function applyMode(mode) {
	body.classList.remove("light-mode", "dark-mode");
	body.classList.add(mode);

	if (mode === "dark-mode") {
		// Set dark mode styles.
		toggleModeBtn.style.color = "rgb(245, 245, 245)";
		toggleModeBtn.innerHTML = '<i class="ri-sun-line"></i>';

		portfolioLink.style.color = "rgb(245, 245, 245)";

		responsiveWarning.style.backgroundColor = "rgb(2, 4, 8)";
	} else {
		// Set light mode styles.
		toggleModeBtn.style.color = "rgb(2, 4, 8)";
		toggleModeBtn.innerHTML = '<i class="ri-moon-line"></i>';

		portfolioLink.style.color = "rgb(2, 4, 8)";

		responsiveWarning.style.backgroundColor = "rgb(245, 245, 245)";
	}
}

// Check and apply saved mode on page load
let savedMode = localStorage.getItem("mode");

if (savedMode === null) {
	savedMode = "light-mode"; // Default mode.
}
applyMode(savedMode);

// Toggle mode and save preference.
toggleModeBtn.addEventListener("click", function () {
	let newMode;

	if (body.classList.contains("light-mode")) {
		newMode = "dark-mode";
	} else {
		newMode = "light-mode";
	}

	applyMode(newMode);

	// Save choice.
	localStorage.setItem("mode", newMode);
});

/*********************
* SIMPLE MEMORY GAME *
*********************/

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
	if (lockBoard === true || card.classList.contains("flipped") || card.classList.contains("matched")) {
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
	// Shuffle the array randomly with Fisher-Yates Shuffle algorithm.
	for (let i = symbols.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[symbols[i], symbols[j]] = [symbols[j], symbols[i]];
	}

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

		// Mark the cards as matched.
		firstCard.classList.add("matched");
		secondCard.classList.add("matched");

		// Plays a sound when a pair is found.
		const matchSound = new Audio("./assets/sounds/ding.mp3");
		matchSound.play();

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
		// Unflip all cards and remove matched class.
		card.classList.remove("flipped", "matched");
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