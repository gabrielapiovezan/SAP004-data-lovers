//import { searchFunc } from './data.js';
import data from './data/pokemon/pokemon.js';
const pokemons = data.pokemon;

// Declaração de variáveis
const typeChartHtml = document.getElementById('type-chart').getContext('2d');
const pokemonTypes = ['Flying', 'Ice', 'Grass', 'Fire', 'Water', 'Bug', 'Normal', 'Poison', 
'Electric', 'Ground', 'Rock', 'Fighting', 'Psychic', 'Ghost', 'Dragon', 'Fairy'];
const pokemonTypesColor = ['teal', 'rgb(142, 197, 233)', 'rgb(106, 230, 172)',
'orange', 'rgb(29, 230, 209)', 'rgb(139, 238, 119)', 'rgb(250, 110, 100)', 'rgb(210, 163, 214)', 
'rgb(241, 241, 98)', 'rgb(219, 122, 58)', 'rgb(56, 56, 56)', 'coral', 'crimson', 'darkmagenta', 
'rgb(226, 68, 160)', 'rgb(199, 126, 218)']; 
//Lógica para o cálculo de porcentagem de cada tipo 
let typeLength = [];
for(let types of pokemonTypes){
  let typesArray = [];
  pokemons.filter(function(pokemon) {
      if (pokemon.type.includes(types)){
        typesArray.push(types)
      }
    return typesArray;
    //typesArray = ['fire', 'fire', 'fire']
});
  typeLength.push(typesArray.length);
  //typeLength = [5, 0, 0, 3, 4, ...]
}

let percent = [];
const typesPercent = typeLength.map(function(lengthArray){
  percent = ((lengthArray/pokemons.length)*100);
  return percent;
  //percent = [12.58, 3.33, 9.27, ...]
});
/*Criei um for para percorrer o array pokemonTypes. Para cada tipo dentro desse array eu faço uma função filter, que
vai percorrer o array pokemons. Se o array pokemon incluir o tipo, insere esse tipo dentro de typesArray.
Aí, fora do filter, o for vai adicionar o tamanho desse array dentro do typeLength. Depois eu percorro o array
typeLength e faço o cálculo de porcentagem para cada item e retorno um array com as porcentagens de cada tipo.*/

// Função Gráfico
const typeChart = new Chart(typeChartHtml, {
    //o tipo de gráfico
    type: 'bar',
    //dados do gráfico
    data: {
        labels: pokemonTypes,
        datasets: [{
            backgroundColor: pokemonTypesColor,
            data: typesPercent
        }]
    },
    // Configuração de título - display: true faz o título aparecer na tela
    options: {
        title: {
            text: 'Porcentagem de tipos de Pokémons',
            display: true
        },
        legend: {
            display: false
        }
    }
}); 

    