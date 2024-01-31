let healerHealth = document.querySelector("#healer-health-txt");
let archerHealth = document.querySelector("#archer-health-txt");
let warriorHealth = document.querySelector("#warrior-health-txt");
let dragonHealth = document.querySelector(".dragon-health-txt");
const healerName = document.querySelector("#healer-name-txt");
const archerName = document.querySelector("#archer-name-txt");
const warriorName = document.querySelector("#warrior-name-txt");
const dragonName = document.querySelector("#dragon-name-txt");
let heroCont = document.querySelectorAll(".img-container");
const henriette = document.querySelector(".healer");
const ariana = document.querySelector(".archer");
const wyona = document.querySelector(".warrior");
const dragon = document.querySelector(".dragon-container");
let heroesArray = [
  {
    id: 0,
    name: "Henriette Healer",
    maxHP: 400,
    currentHP: 400,
    damage: 100,
    alive: true,
    health: healerHealth,
    nameBar: healerName,
  },
  {
    id: 1,
    name: "Ariana archer",
    maxHP: 500,
    currentHP: 500,
    damage: 400,
    alive: true,
    health: archerHealth,
    nameBar: archerName,
  },
  {
    id: 2,
    name: "Wyona Warrior",
    maxHP: 600,
    currentHP: 600,
    damage: 400,
    alive: true,
    health: warriorHealth,
    nameBar: warriorName,
  },
];
let dragonObject = {
  name: "Daar Dragon",
  maxHP: 2000,
  currentHP: 2000,
  damage: 200,
  alive: true,
  health: dragonHealth,
  nameBar: dragonName,
};
// Legger navnene opp i baren
heroesArray.forEach((hero) => {
  hero.nameBar.innerHTML = hero.name;
});
dragonObject.nameBar.innerHTML = dragonObject.name;
heroCont.forEach((ourHeroes) => {
  ourHeroes.addEventListener("click", handleClick);
});
function handleClick(event) {
  // Her har jeg brukt currentTarget.classlist som vi ikke har lært.
  let clickedHero = event.currentTarget.classList[1];
  // Vi har ingen funksjon når det trykkes på dragen,
  // men vi fanger opp klikket og gjør ingenting med det.
  if (clickedHero == "dragon-container") {
  } else {
    // Her har jeg brukt findIndex, som vi ikke har lært om.
    let heroID = heroesArray.findIndex(
      (obj) =>
        obj.name ==
        heroesArray.filter((hero) =>
          hero.name.toLowerCase().includes(clickedHero)
        )[0].name
    );
    heroAttacsDragon(heroID);
  }
}
function heroAttacsDragon(heroID) {
  dragonObject.currentHP -= heroesArray[heroID].damage;
  // Oppdatering av health kunne jeg strengt tatt gjort i en egen funksjon
  dragonObject.health.innerHTML = `${dragonObject.currentHP} / ${dragonObject.maxHP}`;
  // Skriver en beskjed på skjermen om hva som har funnet sted
  alert(
    `${heroesArray[heroID].name} angrep ${dragonObject.name} og påførte den ${heroesArray[heroID].damage} skade!`
  );
  // Sjekker at dragen fortsatt er i live, før vi kaller på neste kodesnutt:
  if (dragonObject.currentHP > 0) {
    dragonAttacsHero();
  } else {
    dragonDies(heroID);
  }
}
function dragonAttacsHero() {
  // Lager en ny array med alle helter som er i live.
  const livingHeroesArray = heroesArray.filter((hero) => hero.alive == true);
  // Finner så en tilfeldig helt å angripe, vha Math.random og lengden av dette arrayet
  let chooseAHero = Math.floor(Math.random() * livingHeroesArray.length);
  // Finner indexen i heroesArray v.h.a. id-en i det nye arrayet
  let heroUnikeID = heroesArray.findIndex(
    (hero) => hero.id == livingHeroesArray[chooseAHero].id
  );
  // Utfører angrepet, og oppdaterer skaden på den angrepne helten.
  heroesArray[heroUnikeID].currentHP -= dragonObject.damage;
  // Dette kunne jeg selvsagt også gjort i en egen funksjon
  heroesArray[
    heroUnikeID
  ].health.innerHTML = `${heroesArray[heroUnikeID].currentHP} / ${heroesArray[heroUnikeID].maxHP}`;
  // Skriver ut dragens handlinger i oppdateringen
  alert(
    `${dragonObject.name} angriper ${heroesArray[heroUnikeID].name} og påfører ${dragonObject.damage} skade!`
  );
  // Sjekker om helten fortsatt er i live
  if (heroesArray[heroUnikeID].currentHP > 0) {
  } else {
    aHeroDies(heroUnikeID);
  }
}
function aHeroDies(deadHero) {
  // Skriver ut den triste beskjeden om at en helt har falt
  alert(`${heroesArray[deadHero].name} har falt mot ${dragonObject.name}`);
  // Endrer alive til false og fjerner bildet
  heroesArray[deadHero].alive = false;
  heroCont[deadHero].remove();
  // Vi sjekker om noen helter fortsatt er i live
  let livingHeroes = heroesArray.filter((hero) => hero.alive == true);
  if (livingHeroes.length == 0) {
    // Hvis ingen helter lever er spillet slutt!
    gameOver();
  }
}
function dragonDies(dragonKiller) {
  // Hardkoder da inn det fjerde bildet i index 3;
  heroCont[3].remove();
  // Slår av eventListener for heltene
  heroCont.forEach(function (ourHeroes) {
    ourHeroes.removeEventListener("click", handleClick);
  });
  // Skriver ut seiersmeldingen
  alert(
    `Gratulerer! Du vant! ${dragonObject.name} har falt mot ${heroesArray[dragonKiller].name} som hadde det avgjørende slaget!`
  );
}
function gameOver() {
  alert(`Alle heltene er døde! ${dragonObject.name} vant og DU TAPTE!!!`);
}
