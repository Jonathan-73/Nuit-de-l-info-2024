import { App } from "./app.ts";

let lives = 3;
let wasteCount = 0;
let usedPositions = [];

const wasteIcons = [
  "fa-solid fa-bottle-water",
  "fa-solid fa-oil-can",
  "fa-solid fa-trash",
];
const beneficialIcons = [
  "fa-solid fa-fish",
  "fa-solid fa-leaf",
  "fa-solid fa-water",
];


function generateRandomPosition() {
  let position;
  const iconSize = 10; 
  do {
    const x = Math.floor(Math.random() * 90);
    const y = Math.floor(Math.random() * 90);
    position = { x, y };
  } while (
    usedPositions.some(
      (pos) =>
        Math.abs(pos.x - position.x) < iconSize &&
        Math.abs(pos.y - position.y) < iconSize
    )
  );
  usedPositions.push(position);
  return position;
}


function createGameItem() {
  const item = document.createElement("i");
  const type = Math.random() > 0.5 ? "waste" : "beneficial"; // Randomly choose waste or beneficial

  const iconClass =
    type === "waste"
      ? wasteIcons[Math.floor(Math.random() * wasteIcons.length)]
      : beneficialIcons[Math.floor(Math.random() * beneficialIcons.length)];
  item.className = `${iconClass} absolute text-4xl cursor-pointer transition-all`;

  const { x, y } = generateRandomPosition();
  item.style.left = `${x}%`;
  item.style.top = `${y}%`;

  item.dataset.type = type;
  game.appendChild(item);
}

function setupGameEventListeners() {
  const game = document.getElementById("game");
  if (!game) {
    console.error("Game element not found. Ensure `createFishingGameComponent` is called.");
    return;
  }

  game.addEventListener("click", (event) => {
    const item = event.target as HTMLElement;
    if (!item.classList.contains("fa-solid")) return;

    if (item.dataset.type === "waste") {
      wasteCount--;
      if (wasteCount === 0) {
        showEducation("win");
      }
    } else if (item.dataset.type === "beneficial") {
      lives--;
      updateLives();
    }
    item.remove();
  });
}

function updateLives() {
  const livesDisplay = document.getElementById("lives");
  livesDisplay.textContent = `Lives: ${lives}`;
  if (lives <= 0) {
    showEducation("lose");
  }
}

export function startGame() {
  for (let i = 0; i < 20; i++) {
    createGameItem();
  }
  wasteCount = document.querySelectorAll("[data-type=waste]").length;
  setupGameEventListeners();
}

function showEducation(result) {
  const educationContainer = document.getElementById("education");

  const heading = result === "win" ? "Congratulations! You Win!" : "Game Over! You Lose!";
  const nicePhrase = result === "win" 
    ? "Great job cleaning the ocean!" 
    : "Better luck next time! The ocean still needs your help.";

  educationContainer.innerHTML = `
    <div class="p-5 bg-blue-100 rounded">
      <h2 class="text-2xl font-bold mb-2">${heading}</h2>
      <p class="italic mb-4">${nicePhrase}</p>
      <p>
        Cleaning the ocean is similar to caring for ourselves: both require persistent effort and awareness.
        Just like waste in the ocean affects marine life, harmful habits can impact our physical and mental health.
      </p>
      <p class="mt-2">
        Taking small steps, like recycling or adopting healthy habits, can lead to significant change.
        Let’s keep up the good work for a cleaner ocean and a healthier self!
      </p>
      <button id="exitButton" class="mt-4 px-4 py-2 bg-green-500 text-white rounded">Exit</button>
    </div>
  `;
  
  const gameContainer = document.getElementById("game-container");
  gameContainer.style.display = "none";

  const exitButton = document.getElementById("exitButton");
  if (exitButton) {
    exitButton.addEventListener("click", () => {
      const appInstance = FishingGameApp.currentInstance; // Access the current instance
      if (appInstance) {
        appInstance.endGame();
      } else {
        console.error("No active FishingGameApp instance found.");
      }
    });
  }
}

export class FishingGameApp extends App{

  static currentInstance: FishingGameApp | null = null;

  constructor(overlay: HTMLElement
  ) {
    super(overlay);
    this.elem = createFishingGameComponent();
    overlay.appendChild(this.elem);
    startGame();
    FishingGameApp.currentInstance = this;
  }

  endGame() {
    this.done();
    FishingGameApp.currentInstance = null;
  }

}
export function createFishingGameComponent(): HTMLDivElement {
  const gameWrapper = document.createElement("div");

  gameWrapper.className =
    "bg-blue-200 flex flex-col items-center justify-center h-full w-full";

  gameWrapper.innerHTML = `
      <div id="game-container" class="text-center">
          <h1 class="text-3xl font-bold mb-4">Repêcher des Déchets</h1>
          <p class="mb-6 text-lg">Click to remove waste, avoid beneficial items!</p>
          <div
            id="game"
            class="relative w-96 h-96 bg-blue-500 rounded-lg overflow-hidden shadow-lg"
          >
            <!-- Game area -->
          </div>
          <div class="mt-4">
            <p id="lives" class="text-lg">Lives: 3</p>
          </div>
      </div>
      <div id="education"></div>
  `;

  return gameWrapper;
}

/*Possible example of an activiry component
document.addEventListener("DOMContentLoaded", () => {
  const appRoot = document.getElementById("app");
  if (appRoot) {
    const gameComponent = createFishingGameComponent();
    appRoot.appendChild(gameComponent);
    startGame();
  } else {
    console.error("#app element not found.");
  }
});
*/