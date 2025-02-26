const gameContainer = document.getElementById("game-container");

// Create a card
function createCard() {
	const card = document.createElement("div");
	card.classList.add("card");

	const cardInner = document.createElement("div");
	cardInner.classList.add("card-inner");

	const cardFront = document.createElement("div");
	cardFront.classList.add("card-front");

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

document.addEventListener("DOMContentLoaded", function () {
	createCard();
});