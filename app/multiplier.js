class Multiplier {

  constructor(startUpgradeCost) {
    this.upgradeCost = startUpgradeCost;
    this.unitMultiplier = 1;
    this.upgradeIncrementFactor = 2;
  }

  getMultiplier() {
    return this.unitMultiplier;
  }

  getUpgradeCost() {
    return this.upgradeCost;
  }

  upgrade(funds) {
    if (funds >= this.upgradeCost) {
      funds -= this.upgradeCost;
      this.upgradeCost *= this.upgradeIncrementFactor;
      this.unitMultiplier++;
    }
    return funds;
  }

  save() {
    return JSON.stringify({
      upgradeCost: this.upgradeCost, 
      unitMultiplier: this.unitMultiplier, 
      upgradeIncrementFactor: this.upgradeIncrementFactor
    });
  }

  load(saveData) {
    saveData = JSON.parse(saveData);
    this.upgradeCost = saveData.upgradeCost;
    this.unitMultiplier = saveData.unitMultiplier;
    this.upgradeIncrementFactor = saveData.upgradeIncrementFactor;
  }
}

class EntityMultiplier extends Multiplier {

  constructor(startCost, startUpgradeCost) {
    super(startUpgradeCost);
    this.cost = startCost;
    this.costIncrementFactor = 1.2;
    this.units = 0;
  }
  
  hire(funds) {
    if (funds >= this.cost) {
      funds -= this.cost;
      this.cost = Math.round(this.cost * this.costIncrementFactor);
      this.units++;
    } 
    return funds;
  }

  getCost() {
    return this.cost;
  }

  getUnits() {
    return this.units;
  }

  getMultiplier() {
    return Math.round(this.unitMultiplier * this.units);
  }

  getUnitMultiplier() {
    return this.unitMultiplier;
  }

  save() {
    return JSON.stringify({
      upgradeCost: this.upgradeCost, 
      unitMultiplier: this.unitMultiplier, 
      upgradeIncrementFactor: this.upgradeIncrementFactor,
      cost: this.cost,
      costIncrementFactor: this.costIncrementFactor,
      units: this.units
    });
  }

  load(saveData) {
    saveData = JSON.parse(saveData);
    this.upgradeCost = saveData.upgradeCost;
    this.unitMultiplier = saveData.unitMultiplier;
    this.upgradeIncrementFactor = saveData.upgradeIncrementFactor;
    this.cost = saveData.cost;
    this.costIncrementFactor = saveData.costIncrementFactor;
    this.units = saveData.units
  }
}

export {Multiplier, EntityMultiplier}
