import { example } from './data.js';
import data from './data/pokemon/pokemon.js';

console.log(example, data.pokemon[0]);

const bulbasaur = document.getElementById("bulbasaur");
bulbasaur.innerHTML = `<img src=${data.pokemon[0].img}>`;
