// Jeg velger å ha en egen js-fil. Føler jeg har bedre oversikt da, også kan jeg jobbe med kodene side ved side.
// Først definerer vi alle enhetene vi skal jobbe med:
let healerHealth = document.querySelector("#healer-health-txt");
let archerHealth = document.querySelector("#archer-health-txt");
let warriorHealth = document.querySelector("#warrior-health-txt");
let dragonHealth = document.querySelector(".dragon-health-txt");
const healerName = document.querySelector("#healer-name-txt");
const archerName = document.querySelector("#archer-name-txt");
const warriorName = document.querySelector("#warrior-name-txt");
const dragonName = document.querySelector("#dragon-name-txt");
// Definerer elementene som skal brukes
let heroCont = document.querySelectorAll(".img-container");
const henriette = document.querySelector(".healer");
const ariana = document.querySelector(".archer");
const wyona = document.querySelector(".warrior");
const dragon = document.querySelector(".dragon-container");
// Så legger vi disse i arrayet sammen med
// heltene våre
let heroesArray = [
  {
    id: 0,
    name: "Henriette Healer",
    maxHP: 400,
    currentHP: 400,
    damage: 100,
    alive: true,
    health: healerHealth,
    bar: healerName,
    img: henriette,
  },
  {
    id: 1,
    name: "Ariana archer",
    maxHP: 500,
    currentHP: 500,
    damage: 400,
    alive: true,
    health: archerHealth,
    bar: archerName,
    img: ariana,
  },
  {
    id: 2,
    name: "Wyona Warrior",
    maxHP: 600,
    currentHP: 600,
    damage: 400,
    alive: true,
    health: warriorHealth,
    bar: warriorName,
    img: wyona,
  },
];
// Dragen er et objekt
let dragonObject = {
  name: "Daar Dragon",
  maxHP: 2000,
  currentHP: 2000,
  damage: 200,
  alive: true,
  health: dragonHealth,
  bar: dragonName,
  img: dragon,
};

// Legger navnene opp i baren
heroesArray.forEach((hero) => {
  hero.bar.innerHTML = hero.name;
});
dragonObject.bar.innerHTML = dragonObject.name;
// Vi må ha eventlistener på heltene
// For hvert element i img-container lages en eventListener
heroCont.forEach(function (ourHeroes) {
  ourHeroes.addEventListener("click", handleClick);
});
// Så må vi håndtere klikkene
function handleClick(event) {
  // Er ute etter det andre class-name for heltene våre.
  // 0 = img-container og 1 = den unike vi er ute etter.
  let clickedHero = event.currentTarget.classList[1];
  // Vi har ingen funksjon når det trykkes på dragen
  if (clickedHero == "dragon-container") {
  } else {
    // Finner frem indexen til helten
    // 0 for Henriette, 1 for Ariana og 2 for Wyona
    let heroID = heroesArray.findIndex(
      (obj) =>
        obj.name ==
        heroesArray.filter((hero) =>
          hero.name.toLocaleLowerCase().includes(clickedHero)
        )[0].name
    );
    heroAttacsDragon(heroID);
  }
}
function heroAttacsDragon(heroID) {
  // Oppdaterer dragens helsebar etter angrepet
  dragonObject.currentHP -= heroesArray[heroID].damage;
  dragonObject.health.innerHTML = `${dragonObject.currentHP} / ${dragonObject.maxHP}`;
  // Skriver en beskjed på skjermen om hva som har funnet sted
  alert(
    `${heroesArray[heroID].name} angrep ${dragonObject.name} og påførte den ${heroesArray[heroID].damage} skade!`
  );
  if (dragonObject.currentHP > 0) {
    dragonAttacsHero();
  } else {
    dragonDies(heroID);
  }
}
function dragonAttacsHero() {
  // Lager en array med alle helter som er i live
  const livingHeroesArray = heroesArray.filter((hero) => hero.alive == true);
  // Finner en tilfeldig helt å angripe, fra lengden av dette arrayet
  let chooseAHero = Math.floor(Math.random() * livingHeroesArray.length);
  // Finner indexen i heroesArray v.h.a. id-en i det nye arrayet
  let heroUnikeID = heroesArray.findIndex(
    (hero) => hero.id == livingHeroesArray[chooseAHero].id
  );
  // Utfører angrepet
  heroesArray[heroUnikeID].currentHP -= dragonObject.damage;
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
  heroesArray[deadHero].img.innerHTML = "";
  // Vi sjekker hvem helter som er i live
  let livingHeroes = heroesArray.filter((hero) => hero.alive == true);
  if (livingHeroes.length == 0) {
    // Hvis ingen helter lever er spillet slutt!
    gameOver();
  }
}
function dragonDies(dragonKiller) {
  // Fjerner bildet av dragen
  dragonObject.img.innerHTML = "";
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
