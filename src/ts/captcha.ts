const characters = ['😀', '😎', '🤓', '🤠', '👻', '🤖', '🐵', '🐱'];
const gameBoard = document.getElementById('game-board');
const targetElement = document.getElementById('target-character');

let targetCharacter = '';
const characterSize = 60; // Assumed size of the character element
let positions = [];


function isOverlapping(x1, y1, x2, y2) {
  return (
    x1 < x2 + characterSize &&
    x1 + characterSize > x2 &&
    y1 < y2 + characterSize &&
    y1 + characterSize > y2
  );
}


function getValidPosition() {
  const boardRect = gameBoard.getBoundingClientRect();
  const maxX = boardRect.width - characterSize;
  const maxY = boardRect.height - characterSize;
  let x, y, isValid;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
    isValid = positions.every(({ x: existingX, y: existingY }) => !isOverlapping(x, y, existingX, existingY));
  } while (!isValid);

  positions.push({ x, y });
  if (positions.length > 10) {
    positions.shift();
  }
  return { x, y };
}

function markCaptchaAsPassed() {
  const token = Math.random().toString(36).substr(2); // Generate random token
  const tokenHash = btoa(token); // Obfuscate with base64
  sessionStorage.setItem("captchaToken", token);
  sessionStorage.setItem("captchaHash", tokenHash);
  alert("Congratulations! You've passed the CAPTCHA.");
  window.location.href = "/index.html"; // Redirect to index
}

function createCharacter(character: string) {
  const charElement = document.createElement("div");
  charElement.className = "character";
  charElement.textContent = character;

  
  const { x, y } = getValidPosition();
  charElement.style.transform = `translate(${x}px, ${y}px)`;

  
  charElement.addEventListener("click", () => {
    if (character === targetCharacter) {
      markCaptchaAsPassed(); 
    } else {
      const tryAgain = document.getElementById("try-again");
      tryAgain?.classList.remove("hidden");
      startGame();
    }
  });

  gameBoard.appendChild(charElement);

  
  const moveCharacter = () => {
    const newPos = getValidPosition();
    charElement.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
  };

  // Start moving after 1 second
  setTimeout(() => {
    moveCharacter();
    setInterval(moveCharacter, 2500); // Keep moving every 2.5 seconds
  }, 1500); // 1.5-second delay before the first move
}



function startGame() {
  gameBoard.innerHTML = '';
  positions = [];

  
  targetCharacter = characters[Math.floor(Math.random() * characters.length)];
  targetElement.textContent = targetCharacter;

  
  characters.forEach(createCharacter);
}

document.addEventListener('DOMContentLoaded', () => {
  const robotCheck = document.getElementById('robot-check');
  const gameContainer = document.getElementById('game-container');
  const captchaConfirmButton = document.getElementById('captcha-confirm');

  // Hide CAPTCHA and show the game when confirmed
  captchaConfirmButton?.addEventListener('click', () => {
    robotCheck?.classList.add('hidden');
    gameContainer?.classList.remove('hidden');
    startGame(); // Start the game after CAPTCHA is confirmed
  });
});
