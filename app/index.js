import {Multiplier, EntityMultiplier} from './multiplier'; 
const clockInterval = 200;
let sceneNum;
let then;
let now;
let potatoNum;
let funds;
// totalFunds is the total amount of money you've earned (revenue)
let totalFunds;
const potatoProducePrice = 1;
const potatoSellPrice = 2; 
let farmhand = new EntityMultiplier(50, 500); 
let salesman = new EntityMultiplier(50, 100);
// potato.getMultiplier() returns the amount of potatoes produced per plant (either manually or per farmhand)
let potato = new Multiplier(1000);

const storage = window.localStorage;

document.getElementById('producePotato').addEventListener('click', () => {
  if (funds >= potato.getMultiplier() * potatoProducePrice) {
    potatoNum += potato.getMultiplier();
    funds -= potatoProducePrice * potato.getMultiplier();
  }
});

document.getElementById('sellPotato').addEventListener('click', () => {
  if (potatoNum > 0) {
    potatoNum--;
    funds += potatoSellPrice;
    totalFunds += potatoSellPrice;
  }
});

document.getElementById('farmhandHire').addEventListener('click', () => {
  funds = farmhand.hire(funds);
});

document.getElementById('salesmanHire').addEventListener('click', () => {
  funds = salesman.hire(funds);
});

document.getElementById('potatoUpgrade').addEventListener('click', () => {
  funds = potato.upgrade(funds);
});

document.getElementById('farmhandUpgrade').addEventListener('click', () => {
  funds = farmhand.upgrade(funds);
});

document.getElementById('salesmanUpgrade').addEventListener('click', () => {
  funds = salesman.upgrade(funds);
});

document.getElementById('save').addEventListener('click', () => {
  saveGame();
});

startGame();

export function startGame() {
  if (storage.length === 0) {
    newGame();
  } else {
    loadGame();
  }
}

function newGame() {
  potatoNum = 0;
  funds = 100;
  totalFunds = 100;
  sceneNum = 1;

  farmhand = new EntityMultiplier(50, 500);
  salesman = new EntityMultiplier(50, 100);

  potato = new Multiplier(100);

  then = performance.now();
  gameLoop();
}

function saveGame() {
  storage.setItem('potatoNum', potatoNum);
  storage.setItem('funds', funds);
  storage.setItem('totalFunds', totalFunds);
  storage.setItem('farmhand', farmhand.save());
  storage.setItem('salesman', salesman.save());
  storage.setItem('potato', potato.save());
  storage.setItem('sceneNum', sceneNum);
}

function loadGame() {
  potatoNum = parseInt(storage.getItem('potatoNum'));
  funds = parseInt(storage.getItem('funds'));
  totalFunds = parseInt(storage.getItem('totalFunds'));
  farmhand.load(storage.getItem('farmhand'));
  salesman.load(storage.getItem('salesman'));
  potato.load(storage.getItem('potato'));

  sceneNum = storage.getItem('sceneNum');

  then = performance.now();
  gameLoop();
}

function gameLoop() {
  now = performance.now();
  if (now - then > clockInterval) {
    draw();
    then = now;
    automaticPotatoIncrease();
    automaticMoneyIncrease();
    setScene();
  }
  window.requestAnimationFrame(gameLoop);
}

function setScene() {
  if (totalFunds <= 1000) {
    sceneNum = 1;
  } else if (totalFunds <= 10000) {
    sceneNum = 2;
  } else if (totalFunds <= 100000) {
    sceneNum = 3;
  } else if (totalFunds <= 1000000) {
    sceneNum = 4;
  } else {
    sceneNum = 5;
  }
}

function automaticPotatoIncrease() {
  const potatoIncrease = potato.getMultiplier() * farmhand.getMultiplier();
  if (funds >= potatoIncrease * potatoProducePrice) {
    potatoNum += potatoIncrease;
    funds -= potatoIncrease * potatoProducePrice;
  }
}

function automaticMoneyIncrease() {
  if (potatoNum > 0) {
    potatoNum -= salesman.getMultiplier();
    const increase = potatoSellPrice * salesman.getMultiplier();
    funds += increase;
    totalFunds += increase;
  }
}

// Will live as a global function
export function advanceScene() {
  if (sceneNum < 5) {
    totalFunds = Math.pow(10, 2 + sceneNum) + 1;
  }
}

export function restart() {
  newGame();
}

function draw() {
  document.getElementById('potatoCounter').innerHTML = `Potatoes: ${potatoNum}`;
  document.getElementById('moneyCounter').innerHTML = `Money: ${funds}`;
  document.getElementById('totalRevenueCounter').innerHTML = `Lifetime revenue: ${totalFunds}`;
  document.getElementById('farmhandNumber').innerHTML = `# Farmhands: ${farmhand.getUnits()}`;
  document.getElementById('salesmanNumber').innerHTML = `# Salesmen: ${salesman.getUnits()}`;

  document.getElementById('potatoUpgradeLevel').innerHTML = `Potato level: ${potato.getMultiplier()}`;
  document.getElementById('farmhandUpgradeLevel').innerHTML = `Farmhand level: ${farmhand.getUnitMultiplier()}`;
  document.getElementById('salesmanUpgradeLevel').innerHTML = `Salesman level: ${salesman.getUnitMultiplier()}`;

  document.getElementById('potatoUpgrade').innerHTML = `Upgrade Potato: ${potato.getUpgradeCost()}`;
  document.getElementById('farmhandUpgrade').innerHTML = `Train Farmhand: ${farmhand.getUpgradeCost()}`;
  document.getElementById('salesmanUpgrade').innerHTML = `Train Salesman: ${salesman.getUpgradeCost()}`;

  document.getElementById('farmhandHire').innerHTML = `Hire Farmhand: ${farmhand.getCost()}`;
  document.getElementById('salesmanHire').innerHTML = `Hire Salesman: ${salesman.getCost()}`;

  document.getElementById('game-image').src = `images/potato-producer-${sceneNum}.svg`;
}
