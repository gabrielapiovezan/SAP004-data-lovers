//import { searchFunc } from './data.js';
import data from './data/pokemon/pokemon.js';
const pokemonArray = data.pokemon;

// Declaração de variáveis
const typeChartHtml = document.getElementById('type-chart').getContext('2d');
const pokemonTypes = ['flying', 'ice', 'grass', 'fire', 'water', 'bug', 'normal', 'poison', 
'electric', 'ground', 'rock', 'fighting', 'psychic', 'ghost', 'dragon', 'fairy'];
const pokemonTypesColor = ['teal', 'rgb(142, 197, 233)', 'rgb(106, 230, 172)',
'orange', 'rgb(29, 230, 209)', 'rgb(139, 238, 119)', 'rgb(250, 110, 100)', 'rgb(210, 163, 214)', 
'rgb(241, 241, 98)', 'rgb(219, 122, 58)', 'rgb(56, 56, 56)', 'coral', 'crimson', 'darkmagenta', 
'rgb(226, 68, 160)', 'rgb(199, 126, 218)'];
const pokemonTypesPercentage = [10, 5, 5, 10, 5, 5, 2, 2, 2, 2, 2, 5, 10, 5, 24, 1]; 

// Função Gráfico
const typeChart = new Chart(typeChartHtml, {
    //o tipo de gráfico
    type: 'bar',
    //dados do gráfico
    data: {
        labels: pokemonTypes,
        datasets: [{
            backgroundColor: pokemonTypesColor,
            data: pokemonTypesPercentage
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

/*function groupBy(pokemon1, prop) {
    let propValue = pokemon1.reduce(function(total, item){
        let propKey = item[prop];
        total[propKey] = (total[propKey] || []).concat(item);
        console.log(total);
    }, {})
    return propValue
  }   
  
  const groupType = groupBy(pokemonArray, pokemonArray.type[0]);
  console.log(groupType); */