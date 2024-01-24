"use strict";
// stats variables
let health = 100;
let maxHealth = 100;
let stamina = 50;
let maxStamina = 50;
let level = 1;
let xp = 0;
let gold = 50;
let currentWeapon = 0;
// action variables
let fighting;
let monsterHealth;
let inventory = ["stick"];

const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];

const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 },
];

const locations = [
  {
    name: "town square",
    "button text": [
      "Mystic Oak Tavern",
      "Explore the ancient forest",
      "Fight dragon",
    ],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the Alderbrook town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Return to Alderbrook streets",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": [
      "Fight slime",
      "Fight fanged beast",
      "Return to Alderbrook",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },

  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Return to Alderbrook",
      "Fight again! Another!",
      "Mystery box.",
    ],
    "button functions": [goTown, fightSlime, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Return to Alderbrook?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

// buttons
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const button6 = document.querySelector("#button6");
// adventurer stats
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const maxHealthText = document.querySelector("#maxHealthText");
const staminaText = document.querySelector("#staminaText");
const maxStaminaText = document.querySelector("#maxStaminaText");
const healthBar = document.querySelector(".health-moving-bar");
const staminaBar = document.querySelector(".stamina-moving-bar");
const goldText = document.querySelector("#goldText");
const levelText = document.querySelector("#levelText");
// monsters stats
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
// images
const squareImage = document.querySelector(".town-square");
const tavernImage = document.querySelector(".town-tavern");
const exploreImage = document.querySelector(".explore");
const fightingImage = document.querySelector(".fighting");
// menus
// const
const inventoryBoxElement = document.querySelector(".inventory-box");

// healthText.innerText = health;
// maxHealthText.innerText = maxHealth;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);

  squareImage.style.display = "block";
  tavernImage.style.display = "none";
  exploreImage.style.display = "none";
  fightingImage.style.display = "none";
}

function goStore() {
  update(locations[1]);
  squareImage.style.display = "none";
  tavernImage.style.display = "block";
  exploreImage.style.display = "none";
  fightingImage.style.display = "none";
}

function goCave() {
  update(locations[2]);
  squareImage.style.display = "none";
  tavernImage.style.display = "none";
  exploreImage.style.display = "block";
  fightingImage.style.display = "none";
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsters[fighting].health;
  squareImage.style.display = "none";
  tavernImage.style.display = "none";
  exploreImage.style.display = "none";
  fightingImage.style.display = "block";
}

function buyHealth() {
  if (gold >= 10) {
    if (health < maxHealth) {
      if (maxHealth - health < 10 && maxHealth - health !== 10) {
        health += maxHealth - health;
        healthText.innerText = health;
      } else {
        health += 10;
        healthText.innerText = health;
        gold -= 10;
        goldText.innerText = gold;
      }
    } else {
      text.innerText = "Your health is already maxed out!";
    }
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
  checkHealth();
}

function buyStamina() {
  if (gold >= 10) {
    if (stamina < maxHealth) {
      if (maxHealth - stamina < 10 && maxHealth - stamina !== 10) {
        stamina += maxHealth - stamina;
        staminaText.innerText = stamina;
      } else {
        stamina += 10;
        staminaText.innerText = stamina;
        gold -= 10;
        goldText.innerText = gold;
      }
    } else {
      text.innerText = "Your health is already maxed out!";
    }
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
  checkStamina();
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function getInventory() {
  const inventoryList = document.createElement("p");
  inventoryBoxElement.append(inventoryList);
  console.log(inventoryBoxElement);
  inventoryList.textContent = inventory;
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  stamina -= getMonsterStaminaConsumptionValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  staminaText.innerText = stamina;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
  checkHealth();
  checkStamina();
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function getMonsterStaminaConsumptionValue(level) {
  const hit = level * 2 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText =
    "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  levelUp();
  update(locations[4]);
}

function levelUp() {
  if (xp >= level * 4 + 2) {
    level += 1;
    levelText.innerText = level;

    maxHealth = Math.round(maxHealth * 1.2);
    health = maxHealth;
    healthText.innerText = health;
    maxHealthText.innerText = maxHealth;

    maxStamina = Math.round(maxStamina * 1.3);
    stamina = maxStamina;
    staminaText.innerText = stamina;
    maxStaminaText.innerText = maxStamina;
  }
}

function checkHealth() {
  const healthPercent = (health * 100) / maxHealth;
  healthBar.style.width = `${healthPercent}%`;
}

function checkStamina() {
  const staminaPercent = (health * 100) / maxHealth;
  staminaBar.style.width = `${staminaPercent}%`;
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  xpText.innerText = xp;
  health = 100;
  maxHealth = 100;
  healthText.innerText = health;
  stamina = 50;
  maxStamina = 50;
  staminaText.innerText = stamina;
  gold = 50;
  goldText.innerText = gold;
  level = 1;
  levelText.innerText = level;
  currentWeapon = 0;
  inventory = ["stick"];
  goTown();
  checkHealth();
  checkStamina();
}

function easterEgg() {
  update(locations[7]);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = `You picked ${guess}. Here are the random numbers:\n`;
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText = "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
  }
  if (health <= 0) {
    lose();
  }
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = getInventory;
