let pokemonList = [];
let pokemonList2 = [];
let dexNumber;
let dexNumber2;
let spriteURL;
let spriteURL2;
let pkmTypes = [];
let shinyMode = false;
const typeColours = {
  normal: `rgb(158, 158, 109)`,
  fighting: "rgb(184, 42, 36)",
  flying: "rgb(158, 133, 238)",
  poison: `rgb(196, 97, 226)`,
  ground: "rgb(220, 184, 93)",
  rock: "rgb(175, 149, 49)",
  bug: "rgb(158, 175, 30)",
  ghost: "rgb(101, 78, 141)",
  steel: "rgb(175, 175, 202)",
  fire: "rgb(238, 116, 43)",
  water: "rgb(93, 133, 238)",
  grass: "rgb(32, 178, 44)",
  electric: " rgb(247, 201, 43)",
  psychic: "rgb(247, 77, 125)",
  ice: "rgb(141, 211, 211)",
  dragon: "rgb(100, 50, 247)",
  fairy: "rgb(238,173,180)",
};

let updatedStats = {
  hp: 45,
  attack: 49,
  defense: 49,
  "special-attack": 65,
  "special-defense": 65,
  speed: 45,
  height: 7,
  weight: 69,
};
let updatedStats2 = {
  hp: 45,
  attack: 49,
  defense: 49,
  "special-attack": 65,
  "special-defense": 65,
  speed: 45,
  height: 7,
  weight: 69,
};
/////////////////////
const select = document.getElementById("pokemon-list");
const select2 = document.getElementById("pokemon-list-2");
const spriteImg = document.getElementById("sprite-image");
const spriteImg2 = document.getElementById("sprite-image-2");
const pkmName = document.getElementById("name");
const pkmName2 = document.getElementById("name-2");
const typeContainer = document.getElementById("type-container");
const typeContainer2 = document.getElementById("type-container-2");
const dexEntry = document.getElementById("dex-entry");
const dexEntry2 = document.getElementById("dex-entry-2");
const hp = document.getElementById("HP");
const hp2 = document.getElementById("HP-2");
const atk = document.getElementById("ATK");
const atk2 = document.getElementById("ATK-2");
const def = document.getElementById("DEF");
const def2 = document.getElementById("DEF-2");
const spATK = document.getElementById("SP-ATK");
const spATK2 = document.getElementById("SP-ATK-2");
const spDEF = document.getElementById("SP-DEF");
const spDEF2 = document.getElementById("SP-DEF-2");
const spe = document.getElementById("SPE");
const spe2 = document.getElementById("SPE-2");
const height = document.getElementById("HEI");
const height2 = document.getElementById("HEI-2");
const weight = document.getElementById("WEI");
const weight2 = document.getElementById("WEI-2");
const mainContainer = document.getElementById("main-container");
const mainContainer2 = document.getElementById("main-container-2");
const nextBTN = document.getElementById("next");
const nextBTN2 = document.getElementById("next-2");
const previousBTN = document.getElementById("previous");
const previousBTN2 = document.getElementById("previous-2");
const shinyBTN = document.getElementById("shiny-button");
const shinyBTN2 = document.getElementById("shiny-button-2");
const compareBtn = document.getElementById("compare");
const startBattleBtn = document.getElementById("startBattle");
/////////////////////

//create new option element
const createOptionEl = (name, number) => {
  const optionEl = document.createElement("option");
  optionEl.value = `${name}`;
  optionEl.textContent = `${number}. ${name}`;
  optionEl.setAttribute("number", number);
  select.appendChild(optionEl);
};
const createOptionEl2 = (name, number) => {
  const optionEl = document.createElement("option");
  optionEl.value = `${name}`;
  optionEl.textContent = `${number}. ${name}`;
  optionEl.setAttribute("number", number);
  select2.appendChild(optionEl);
};
//loop through pokemon list array to create option elements for each pokemon
const updateSelect = () => {
  pokemonList.forEach((element, index) => {
    const pkmNameLower = element.name;
    const pkmNameCap =
      pkmNameLower.charAt(0).toUpperCase() + pkmNameLower.slice(1);
    dexNumber = index + 1;
    createOptionEl(pkmNameCap, dexNumber);
  });
};
const updateSelect2 = () => {
  pokemonList2.forEach((element, index) => {
    const pkmNameLower = element.name;
    const pkmNameCap =
      pkmNameLower.charAt(0).toUpperCase() + pkmNameLower.slice(1);
    dexNumber2 = index + 1;
    createOptionEl2(pkmNameCap, dexNumber2);
  });
};
const getPokemonList = async () => {
  /*Calling any API endpoint without a resource ID or name will return a paginated list of available resources for that API. By default, a list "page" will contain up to 20 resources. If you would like to change this just add a 'limit' query parameter to the GET request, e.g. ?limit=60. You can use 'offset' to move to the next page, e.g. ?limit=60&offset=60. */
  const apiURL = `https://pokeapi.co/api/v2/pokemon?`;
  pokemonList = await fetch(apiURL + `?offset=0&limit=151`)
    .then((res) => res.json())
    .then((res) => res.results);

  //await fetch(`url`).json() returns a promise. You must use a promise method to handle promises i.e. then((res)=>res.json())
  updateSelect();
  return pokemonList;
};
const getPokemonList2 = async () => {
  const apiURL = `https://pokeapi.co/api/v2/pokemon?`;
  pokemonList2 = await fetch(apiURL + `?offset=0&limit=151`)
    .then((res) => res.json())
    .then((res) => res.results);

  updateSelect2();
  return pokemonList2;
};
getPokemonList();
getPokemonList2();
//dynamically set the src attribute for the sprite image
const updateSpriteImg = async (number) => {
  spriteImg.src =
    shinyMode === false
      ? `
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${number}.png
  `
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/shiny/${number}.png`;
  await new Promise((resolve) => {
    spriteImg.onload = resolve;
  });
  activateButtons();
  //the executor function takes a single argument resolve, which is a function that is called when the Promise is resolved. The resolve function is assigned as the onload event handler for the spriteImg element. This means that the resolve function will be called once the image has finished loading.

  //The await keyword is used to wait for the Promise to resolve before executing the next line of code. When the Promise is resolved (i.e., when the resolve function is called), the Promise resolves with the argument passed to the resolve function, which in this case is the event object associated with the onload event. This allows you to handle the completion of the image loading before moving on to the next step, which in this case is calling the activateButtons() function.
};
const updateSpriteImg2 = async (number) => {
  spriteImg2.src =
    shinyMode === false
      ? `
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${number}.png
  `
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/shiny/${number}.png`;
  await new Promise((resolve) => {
    spriteImg2.onload = resolve;
  });
  activateButtons();
};

//update pokemon name
const updatePkmName = async (value) => {
  dexNumber = select.selectedOptions[0].getAttribute("number");
  //.selectedOptions property is a read-only collection that contains all the 'option' elements in a select element. select.selectedOptions[0] is used to retrieve the currently selected 'options' element. '[0]' is used to access the first element in the selectedOptions collection which is the only element when 'select' element has a single collection
  let name = `#${dexNumber} ${value}`;
  pkmName.textContent = name;
  if (name.length > 10) {
    pkmName.style.fontSize = `30px`;
  } else {
    pkmName.style.fontSize = `40px`;
  }
};
const updatePkmName2 = async (value) => {
  dexNumber2 = select2.selectedOptions[0].getAttribute("number");
  let name = `#${dexNumber2} ${value}`;
  pkmName2.textContent = name;
  if (name.length > 10) {
    pkmName2.style.fontSize = `30px`;
  } else {
    pkmName2.style.fontSize = `40px`;
  }
};
//update background color to a lighter version of it's type color
const updateBGColor = () => {
  let bgColor = typeColours[pkmTypes[0]];
  let fadedBgColor = bgColor.slice(0, -1) + `, 0.6)`;
  mainContainer.style.backgroundColor = fadedBgColor;
};
const updateBGColor2 = () => {
  let bgColor = typeColours[pkmTypes[0]];
  let fadedBgColor = bgColor.slice(0, -1) + `, 0.6)`;
  mainContainer2.style.backgroundColor = fadedBgColor;
};
//update pokemon type
const getPkmType = async (number) => {
  pkmTypes = [];
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`).then(
    (res) => res.json()
  );
  const types = data.types;
  types.forEach((object) => {
    pkmTypes.push(object.type.name);
  });

  updateTypeUI();
  updateBGColor();
};
const getPkmType2 = async (number) => {
  pkmTypes = [];
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`).then(
    (res) => res.json()
  );
  const types = data.types;
  types.forEach((object) => {
    pkmTypes.push(object.type.name);
  });

  updateTypeUI2();
  updateBGColor2();
};
//create pokemon type bubbles
const updateTypeUI = () => {
  typeContainer.innerHTML = ``;
  pkmTypes.forEach((value) => {
    const typeEl = document.createElement("span");
    typeEl.classList.add(`type`);

    typeEl.style.backgroundColor = `${typeColours[value]}`;
    typeEl.textContent = value;

    typeContainer.appendChild(typeEl);
  });
};
const updateTypeUI2 = () => {
  typeContainer2.innerHTML = ``;
  pkmTypes.forEach((value) => {
    const typeEl = document.createElement("span");
    typeEl.classList.add(`type`);

    typeEl.style.backgroundColor = `${typeColours[value]}`;
    typeEl.textContent = value;

    typeContainer2.appendChild(typeEl);
  });
};

//get pokemon dex entry
const getDexEntry = async (number) => {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${number}/`
  ).then((res) => res.json());
  const entry = data["flavor_text_entries"][10]["flavor_text"];
  dexEntry.textContent = entry;
};
const getDexEntry2 = async (number) => {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${number}/`
  ).then((res) => res.json());
  const entry = data["flavor_text_entries"][10]["flavor_text"];
  dexEntry2.textContent = entry;
};
//update stats UI
const updateStatsUI = () => {
  hp.textContent = `HP: ${updatedStats.hp}`;
  atk.textContent = `ATK: ${updatedStats.attack}`;
  def.textContent = `DEF: ${updatedStats.defense}`;
  spATK.textContent = `SP-ATK: ${updatedStats["special-attack"]}`;
  spDEF.textContent = `SP-DEF: ${updatedStats["special-defense"]}`;
  spe.textContent = `SPE: ${updatedStats["speed"]}`;
  height.textContent = `Height: ${updatedStats.height / 10}m`;
  weight.textContent = `Weight: ${updatedStats.weight / 10}kg`;
};
const updateStatsUI2 = () => {
  hp2.textContent = `HP: ${updatedStats2.hp}`;
  atk2.textContent = `ATK: ${updatedStats2.attack}`;
  def2.textContent = `DEF: ${updatedStats2.defense}`;
  spATK2.textContent = `SP-ATK: ${updatedStats2["special-attack"]}`;
  spDEF2.textContent = `SP-DEF: ${updatedStats2["special-defense"]}`;
  spe2.textContent = `SPE: ${updatedStats2["speed"]}`;
  height2.textContent = `Height: ${updatedStats2.height / 10}m`;
  weight2.textContent = `Weight: ${updatedStats2.weight / 10}kg`;
};

//get base stats
const getStats = async (number) => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`).then(
    (res) => res.json()
  );
  const statsArray = data.stats;
  statsArray.forEach((stat) => {
    updatedStats[stat.stat.name] = stat["base_stat"];
  });
  updatedStats.height = data.height;
  updatedStats.weight = data.weight;
  updateStatsUI();
};
const getStats2 = async (number) => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`).then(
    (res) => res.json()
  );
  const statsArray = data.stats;
  statsArray.forEach((stat) => {
    updatedStats2[stat.stat.name] = stat["base_stat"];
  });
  updatedStats2.height = data.height;
  updatedStats2.weight = data.weight;
  updateStatsUI2();
};

// select onChange functionality to trigger UI updates
const onSelectChange = () => {
  disableButtons();
  updatePkmName(select.value);
  getPkmType(dexNumber);
  getDexEntry(dexNumber);
  getStats(dexNumber);
  updateSpriteImg(dexNumber);
};
const onSelectChange2 = () => {
  disableButtons();
  updatePkmName2(select2.value);
  getPkmType2(dexNumber2);
  getDexEntry2(dexNumber2);
  getStats2(dexNumber2);
  updateSpriteImg2(dexNumber2);
};
select.addEventListener("change", onSelectChange);
select2.addEventListener("change", onSelectChange2);

// button functionality
const prevOption = () => {
  //get current selected index
  const currentIndex = select.selectedIndex;
  const prevIndex = currentIndex - 1;
  if (prevIndex === -1) {
    select.selectedIndex = 150;

    onSelectChange();
  } else {
    select.selectedIndex = prevIndex;
    onSelectChange();
  }
};
const prevOption2 = () => {
  //get current selected index
  const currentIndex = select2.selectedIndex;
  const prevIndex = currentIndex - 1;
  if (prevIndex === -1) {
    select2.selectedIndex = 150;

    onSelectChange2();
  } else {
    select2.selectedIndex = prevIndex;
    onSelectChange2();
  }
};

const nextOption = () => {
  //get current selected index
  const currentIndex = select.selectedIndex;
  const nextIndex = currentIndex + 1;
  if (nextIndex === 151) {
    select.selectedIndex = 0;

    onSelectChange();
  } else {
    select.selectedIndex = nextIndex;
    onSelectChange();
  }
};
const nextOption2 = () => {
  //get current selected index
  const currentIndex = select2.selectedIndex;
  const nextIndex = currentIndex + 1;
  if (nextIndex === 151) {
    select2.selectedIndex = 0;

    onSelectChange2();
  } else {
    select2.selectedIndex = nextIndex;
    onSelectChange2();
  }
};
previousBTN.addEventListener("click", prevOption);
nextBTN.addEventListener("click", nextOption);
previousBTN2.addEventListener("click", prevOption2);
nextBTN2.addEventListener("click", nextOption2);

const disableButtons = () => {
  nextBTN.disabled = true;
  nextBTN2.disabled = true;
  previousBTN.disabled = true;
  previousBTN2.disabled = true;
  compareBtn.disabled = true;
  startBattleBtn.disabled = true;
};
const activateButtons = () => {
  nextBTN.disabled = false;
  nextBTN2.disabled = false;
  previousBTN.disabled = false;
  previousBTN2.disabled = false;
  compareBtn.disabled = false;
  startBattleBtn.disabled = false;
};

const shinyFn = () => {
  shinyMode = shinyMode === true ? false : true;
  shinyBTN.style.backgroundColor =
    shinyMode === true ? "rgb(246, 255, 0)" : "white";
  dexNumber = select.selectedOptions[0].getAttribute("number");
  updateSpriteImg(dexNumber);
};
const shinyFn2 = () => {
  shinyMode = shinyMode === true ? false : true;
  shinyBTN2.style.backgroundColor =
    shinyMode === true ? "rgb(246, 255, 0)" : "white";
  dexNumber2 = select2.selectedOptions[0].getAttribute("number");
  updateSpriteImg2(dexNumber2);
};

shinyBTN.addEventListener("click", shinyFn);
shinyBTN2.addEventListener("click", shinyFn2);
// Funktion för att jämföra två valda Pokémon
const comparePokemon = () => {
  let pk1Name = pkmName.textContent;
  let pk2Name = pkmName2.textContent;
  let pk1Wins = 0;
  let pk2Wins = 0;
  if (updatedStats.hp > updatedStats2.hp) {
    pk1Wins++;
    hp.style.backgroundColor = "green";
    hp2.style.backgroundColor = "red";
  } else if (updatedStats.hp < updatedStats2.hp) {
    pk2Wins++;
    hp.style.backgroundColor = "red";
    hp2.style.backgroundColor = "green";
  } else if (updatedStats.hp === updatedStats2.hp) {
    hp.style.backgroundColor = "orange";
    hp2.style.backgroundColor = "orange";
  }
  if (updatedStats.attack > updatedStats2.attack) {
    pk1Wins++;
    atk.style.backgroundColor = "green";
    atk2.style.backgroundColor = "red";
  } else if (updatedStats.attack < updatedStats2.attack) {
    pk2Wins++;
    atk.style.backgroundColor = "red";
    atk2.style.backgroundColor = "green";
  } else if (updatedStats.attack === updatedStats2.attack) {
    atk.style.backgroundColor = "orange";
    atk2.style.backgroundColor = "orange";
  }
  if (updatedStats.defense > updatedStats2.defense) {
    pk1Wins++;
    def.style.backgroundColor = "green";
    def2.style.backgroundColor = "red";
  } else if (updatedStats.defense < updatedStats2.defense) {
    pk2Wins++;
    def.style.backgroundColor = "red";
    def2.style.backgroundColor = "green";
  } else if (updatedStats.defense === updatedStats2.defense) {
    def.style.backgroundColor = "orange";
    def2.style.backgroundColor = "orange";
  }
  if (updatedStats["special-attack"] > updatedStats2["special-attack"]) {
    pk1Wins++;
    spATK.style.backgroundColor = "green";
    spATK2.style.backgroundColor = "red";
  } else if (updatedStats["special-attack"] < updatedStats2["special-attack"]) {
    pk2Wins++;
    spATK.style.backgroundColor = "red";
    spATK2.style.backgroundColor = "green";
  } else if (
    updatedStats["special-attack"] === updatedStats2["special-attack"]
  ) {
    spATK.style.backgroundColor = "orange";
    spATK2.style.backgroundColor = "orange";
  }
  if (updatedStats["special-defense"] > updatedStats2["special-defense"]) {
    pk1Wins++;
    spDEF.style.backgroundColor = "green";
    spDEF2.style.backgroundColor = "red";
  } else if (
    updatedStats["special-defense"] < updatedStats2["special-defense"]
  ) {
    pk2Wins++;
    spDEF.style.backgroundColor = "red";
    spDEF2.style.backgroundColor = "green";
  } else if (
    updatedStats["special-defense"] === updatedStats2["special-defense"]
  ) {
    spDEF.style.backgroundColor = "orange";
    spDEF2.style.backgroundColor = "orange";
  }
  if (updatedStats.speed > updatedStats2.speed) {
    pk1Wins++;
    spe.style.backgroundColor = "green";
    spe2.style.backgroundColor = "red";
  } else if (updatedStats.speed < updatedStats2.speed) {
    pk2Wins++;
    spe.style.backgroundColor = "red";
    spe2.style.backgroundColor = "green";
  } else if (updatedStats.speed === updatedStats2.speed) {
    spe.style.backgroundColor = "orange";
    spe2.style.backgroundColor = "orange";
  }
  if (updatedStats.height > updatedStats2.height) {
    pk1Wins++;
    height.style.backgroundColor = "green";
    height2.style.backgroundColor = "red";
  } else if (updatedStats.height < updatedStats2.height) {
    pk2Wins++;
    height.style.backgroundColor = "red";
    height2.style.backgroundColor = "green";
  } else if (updatedStats.height === updatedStats2.height) {
    height.style.backgroundColor = "orange";
    height2.style.backgroundColor = "orange";
  }
  if (updatedStats.weight > updatedStats2.weight) {
    pk1Wins++;
    weight.style.backgroundColor = "green";
    weight2.style.backgroundColor = "red";
  } else if (updatedStats.weight < updatedStats2.weight) {
    pk2Wins++;
    weight.style.backgroundColor = "red";
    weight2.style.backgroundColor = "green";
  } else if (updatedStats.weight === updatedStats2.weight) {
    weight.style.backgroundColor = "orange";
    weight2.style.backgroundColor = "orange";
  }
  if (pk1Wins > pk2Wins) {
    alert(`${pk1Name} wins!`);
  } else if (pk1Wins < pk2Wins) {
    alert(`${pk2Name} är starkare än ${pk1Name}!`);
  } else if (pk1Wins === pk2Wins) {
    alert(`It's a draw!`);
  }
};

compareBtn.addEventListener("click", comparePokemon);
