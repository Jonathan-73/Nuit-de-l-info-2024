// DOM Elements
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const clickCountDisplay = document.getElementById('clicks') as HTMLSpanElement;
const autoClickerButton = document.getElementById('buyAutoClicker') as HTMLButtonElement;
const autoClickerCostDisplay = document.getElementById('autoClickerCost') as HTMLSpanElement;
const autoClickersCountDisplay = document.getElementById('autoClickersCount') as HTMLSpanElement;
const autoClickersRateDisplay = document.getElementById('autoClickersRate') as HTMLSpanElement;
const achievementsList = document.getElementById('achievementsList') as HTMLUListElement;

// Game Class
class Game {
  clicks = 10;
  autoClickerCost = 10;
  autoClickers = 0;
  autoClickerLimit = 10;
  autoClickerPower = 1;
  nbFallingCircles = 1;
  maxFallingCircles = 20;

  buttonRadius = 50;
  buttonX = 0;
  buttonY = 0;

  achievements: string[] = [];
  fallingCircles: Circle[] = [];

  incrementClicks(amount: number) {
    this.clicks += amount;
    this.checkAchievements();
    this.updateDisplay();
  }

  buyAutoClicker() {
    if (this.clicks >= this.autoClickerCost && this.autoClickers < this.autoClickerLimit) {
      this.clicks -= this.autoClickerCost;
      this.autoClickers++;
      this.autoClickerCost = Math.floor(this.autoClickerCost * 1.5);
      this.updateDisplay();
    }
  }

  generateAutoClicks() {
    this.incrementClicks(this.autoClickers * this.autoClickerPower);
  }

  moveButtonXY(x: number, y: number) {
    this.buttonX = x;
    this.buttonY = y;
  }

  updateDisplay() {
    clickCountDisplay.textContent = this.clicks.toFixed(1);
    autoClickerCostDisplay.textContent = this.autoClickerCost.toString();
    autoClickerButton.disabled = this.clicks < this.autoClickerCost;
    
    autoClickersCountDisplay.textContent = this.autoClickers.toString();
    autoClickersRateDisplay.textContent = (this.autoClickers * this.autoClickerPower).toString();
    this.displayAchievements();
  }

  private checkAchievements() {
    if (this.clicks >= 1000 && !this.achievements.includes('1000 Clicks!')) {
      this.achievements.push('1000 Clicks!');
    }
  }

  displayAchievements() {
    achievementsList.innerHTML = '';
    this.achievements.forEach(achievement => {
      const li = document.createElement('li');
      li.textContent = achievement;
      achievementsList.appendChild(li);
    });
  }

  setButtonSize(newRadius: number) {
    this.buttonRadius = newRadius;
  }

  drawButton() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw main button
    ctx.beginPath();
    ctx.arc(this.buttonX, this.buttonY, this.buttonRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.closePath();

    // Draw falling circles
    this.fallingCircles.forEach(circle => {
      circle.update();
      circle.draw();
    });
  }

  checkCircleHit(x: number, y: number) {
    for (let i = 0; i < this.fallingCircles.length; i++) {
      const circle = this.fallingCircles[i];
      if (circle.isClicked(x, y)) {
        this.fallingCircles.splice(i, 1);
        this.incrementClicks(2);
        this.nbFallingCircles--;
        return;
      }
    }
  }

  addFallingCircle() {
    const radius = Math.random() * 10 + 5;
    const x = Math.random() * (canvas.width - radius * 2);
    const speed = Math.random() * 4 + 3;
    this.fallingCircles.push(new Circle(x, -radius, radius, speed));
    this.nbFallingCircles++;
  }

  generateFallingCircles() {
    if (this.nbFallingCircles < this.maxFallingCircles) {
      this.addFallingCircle();
    }
  }
}

// Circle Class
class Circle {
  constructor(public x: number, public y: number, public radius: number, public speed: number) {}

  update() {
    this.y += this.speed;
    if (this.y - this.radius > canvas.height) {
      this.y = -this.radius;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.fill();
    ctx.closePath();
  }

  isClicked(x: number, y: number): boolean {
    return Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2) < this.radius;
  }
}

// Game Initialization
const game = new Game();

function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.6;
  game.moveButtonXY(canvas.width / 2, canvas.height / 2);
  game.drawButton();
  game.updateDisplay();
}

// Event Listeners
canvas.addEventListener('click', (event) => {
  const distance = Math.sqrt(
    (event.offsetX - game.buttonX) ** 2 + (event.offsetY - game.buttonY) ** 2
  );

  if (distance < game.buttonRadius) {
    game.buttonRadius /= 1.03;
    game.incrementClicks(0.1);
  }

  game.checkCircleHit(event.offsetX, event.offsetY);
});

autoClickerButton.addEventListener('click', () => {
  game.buyAutoClicker();
});

setInterval(() => {
  game.generateFallingCircles();
  game.drawButton();
}, 1000 / 30);

setInterval(() => {
  game.generateAutoClicks();
}, 1000); // Generate points every second

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
