import { Multiplier } from './multiplier';
import { EntityMultiplier } from './multiplier';
const clockInterval = 200;

let sceneNum = 1;

let then, now;
let potatoNum, funds;
let totalFunds;

const farmhand = new EntityMultiplier(10, 19);
const salesman = new EntityMultiplier(10, 19);

const potato = new Multiplier(10);

const storage = window.localStorage;

document.getElementById("producePotato").addEventListener ('click', () => {
  potatoNum += potato.getMultiplier();  
});

document.getElementById("sellPotato").addEventListener ('click', () => {
  if (potatoNum > 0) {
    potatoNum--;
    funds++;
    totalFunds++;
  }
});

document.getElementById("farmhandHire").addEventListener ('click', () => {
  funds = farmhand.hire(funds);
});

document.getElementById("salesmanHire").addEventListener ('click', () => {
  funds = salesman.hire(funds);
});

document.getElementById("potatoUpgrade").addEventListener ('click', () => {
  funds = potato.upgrade(funds);
});

document.getElementById("farmhandUpgrade").addEventListener ('click', () => {
  funds = farmhand.upgrade(funds);
});

document.getElementById("salesmanUpgrade").addEventListener ('click', () => {
  funds = salesman.upgrade(funds);
});

document.getElementById("save").addEventListener ('click', () => {
  saveGame();
});
document.getElementById("load").addEventListener ('click', () => {
  loadGame();
});

startGame();

function startGame() {
  potatoNum = 0;
  funds = 100;
  totalFunds = 0;

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
  console.log("game saved");
}

function loadGame() {
  potatoNum = parseInt(storage.getItem('potatoNum'));
  funds = parseInt(storage.getItem('funds'));
  totalFunds = parseInt(storage.getItem('totalFunds'));
  farmhand.load(storage.getItem('farmhand'));
  salesman.load(storage.getItem('salesman'));
  potato.load(storage.getItem('potato'));
  console.log("game loaded");
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
  if (totalFunds < 1000) {
    sceneNum = 1;
  } else if (totalFunds < 10000) {
    sceneNum = 2;
  } else if (totalFunds < 100000) {
    sceneNum = 3;
  } else if (totalFunds < 1000000) {
    sceneNum = 4;
  } else {
    sceneNum = 5;
  }
}

function automaticPotatoIncrease() {
  potatoNum += potato.getMultiplier() * farmhand.getMultiplier();
}

function automaticMoneyIncrease() {
  let increase  = salesman.getMultiplier();
  funds += increase;
  totalFunds += increase;
}

// Will live as a global function
export function cheat() {
  console.log("you are now a cheat");
}

function draw() {
  document.getElementById("potatoCounter").innerHTML = `Potatoes: ${potatoNum}`;
  document.getElementById("moneyCounter").innerHTML = `Money: ${funds}`;
  document.getElementById("farmhandNumber").innerHTML = `# Farmhands: ${farmhand.getUnits()}`;
  document.getElementById("salesmanNumber").innerHTML = `# Salesmen: ${salesman.getUnits()}`;

  document.getElementById("potatoUpgradeLevel").innerHTML = `Potato level: ${potato.getMultiplier()}`;
  document.getElementById("farmhandUpgradeLevel").innerHTML = `Farmhand level: ${farmhand.getUnitMultiplier()}`;
  document.getElementById("salesmanUpgradeLevel").innerHTML = `Salesman level: ${salesman.getUnitMultiplier()}`;

  document.getElementById("potatoUpgrade").innerHTML = `Upgrade Potato: ${potato.getUpgradeCost()}`;
  document.getElementById("farmhandUpgrade").innerHTML = `Train Farmhand: ${farmhand.getUpgradeCost()}`;
  document.getElementById("salesmanUpgrade").innerHTML = `Train Salesman: ${salesman.getUpgradeCost()}`;

  document.getElementById("farmhandHire").innerHTML = `Hire Farmhand: ${farmhand.getCost()}`
  document.getElementById("salesmanHire").innerHTML = `Hire Salesman: ${salesman.getCost()}`

  document.getElementById("game-image").src = `images/potato-producer-${sceneNum}.svg`
}
