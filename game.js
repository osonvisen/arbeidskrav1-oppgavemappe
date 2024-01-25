// Jeg velger å ha en egen js-fil. Føler jeg har bedre oversikt da, også kan jeg jobbe med kodene side ved side.
// Først definerer vi alle enhetene vi skal jobbe med:
// Heltene våre
let heroesArray = [
  {
    id: 0,
    name: "Henriette Healer",
    maxHP: 400,
    currentHP: 400,
    damage: 100,
    alive: true,
  },
  {
    id: 1,
    name: "Ariana archer",
    maxHP: 500,
    currentHP: 500,
    damage: 400,
    alive: true,
  },
  {
    id: 2,
    name: "Wyona Warrior",
    maxHP: 600,
    currentHP: 600,
    damage: 400,
    alive: true,
  },
];
// Dragen er et objekt
let dragonObject = {
  name: "Daar Dragon",
  maxHP: 2000,
  currentHP: 2000,
  damage: 200,
  alive: true,
};
// Definerer elementene som skal trykkes på
const Henriette = document.querySelector(".healer");
const Ariana = document.querySelector(".archer");
const Wyona = document.querySelector(".warrior");
// Heltenes  og dragens navn og helse
const healerName = document.querySelector("#healer-name-txt");
const archerName = document.querySelector("#archer-name-txt");
const warriorName = document.querySelector("#warrior-name-txt");
const dragonName = document.querySelector("#dragon-name-txt");
let healerHealth = document.querySelector(".healer-health-txt");
let archerHealth = document.querySelector(".archer-health-txt");
let warriorHealth = document.querySelector(".warrior-health-txt");
let dragonHealth = document.querySelector(".dragon-health-txt");
let heroCont = document.querySelectorAll(".img-container");
let dragonContainer = document.querySelector(".dragon-container");

// Hardkoder navnene til heltene og dragen
healerName.textContent = heroesArray[0].name;
archerName.textContent = heroesArray[1].name;
warriorName.textContent = heroesArray[2].name;
dragonName.innerText = dragonObject.name;

// Vi må ha eventlistener på heltene
heroCont.forEach(function (ourHeroes) {
  ourHeroes.addEventListener("click", handleClick);
});
// Så må vi håndtere klikkene
function handleClick(event) {
  // Er ute etter det andre class-name for heltene våre.
  // 0 = img-container og 1 = den unike vi er ute etter.
  let clickedHero = event.currentTarget.classList[1];
  livingHeroes(clickedHero);
}
// Funksjon som identifiserer vår angripende helt og sjekker at hun er i live
function livingHeroes(hero) {
  let findingHero = Object.assign(
    {},
    ...heroesArray.filter((heroSkill) =>
      heroSkill.name.toLocaleLowerCase().includes(hero)
    )
  );
  if (findingHero.alive == true) {
    heroAttacsDragon(findingHero.name, findingHero.damage);
  } else {
    alert(`${findingHero.name} er dessverre død! Velg en annen helt!`);
  }
}
function heroAttacsDragon(hero, damage) {
  dragonObject.currentHP -= damage;
  dragonHealth.textContent = `${dragonObject.currentHP} / 2000 HP`;
  console.log(dragonObject.currentHP);
  if (dragonObject.currentHP > 0) {
    alert(`${hero} har gjort ${damage} på ${dragonObject.name}`);
    dragonAttacsHero();
  } else {
    alert("Dragen er død!");
    dragonDies(hero);
  }
}
function dragonAttacsHero() {
  // Dragen angriper én av de levende heltene, der alive == true.
  let picVictim = Math.floor(
    Math.random() * heroesArray.filter((alive) => alive.alive == true).length
  );
  heroesArray[picVictim].currentHP -= dragonObject.damage;

  console.log(`Dragen angriper ${heroesArray[picVictim].name}`);
}
function aHeroDies() {}
function dragonDies(hero) {
  dragonContainer.innerHTML = "";
  alert(`${dragonObject.name} er død! ${hero} kom med det dødelige slaget!`);
  heroCont.forEach(function (ourHeroes) {
    ourHeroes.removeEventListener("click", handleClick);
  });
}
function gameOver() {
  alert(`GAME OVER! ${dragonObject.name} har vunnet!`);
}
