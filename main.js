const tilesContainer = document.querySelector(".tiles");
const colors = ["aqua", "purple", "crimson", "blue", "chocolate", "gold", "greenyellow", "teal"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Game state

let revealedCount = 0;
let activeTile = null;
let EndOfMove = false;

function buildTile(color) {
	const element = document.createElement("div");

	element.classList.add("tile");
	element.setAttribute("data-color", color);
	element.setAttribute("data-revealed", "false");

	element.addEventListener("click", () => {
		const revealed = element.getAttribute("data-revealed");

		if (
			EndOfMove
			|| revealed === "true"
			|| element == activeTile
		) {
			return;
		}

		// Reveal this color
		element.style.backgroundColor = color;

		if (!activeTile) {
			activeTile = element;

			return;
		}

		const colorToMatch = activeTile.getAttribute("data-color");

		if (colorToMatch === color) {
			element.setAttribute("data-revealed", "true");
			activeTile.setAttribute("data-revealed", "true");
			element.style.backgroundColor="white";
			activeTile.style.backgroundColor="white";

			activeTile = null;
			EndOfMove = false;
			revealedCount += 2;

			if (revealedCount === tileCount) {
				alert("You win! Refresh to start again.");
			}

			return;
		}

		EndOfMove = true;

		setTimeout(() => {
			activeTile.style.backgroundColor = null;
			element.style.backgroundColor = null;

			EndOfMove = false;
			activeTile = null;
		}, 1000);
	});

	return element;
}

// Build up tiles
for (let i = 0; i < tileCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const tile = buildTile(color);

	colorsPicklist.splice(randomIndex, 1);
	tilesContainer.appendChild(tile);
}
