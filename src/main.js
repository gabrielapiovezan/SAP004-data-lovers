/*Bloco de configurações*/
import { searchFunc, orderList, typeFunctionConcat, checkType, height, concatFilters } from './data.js';
import data from './data/pokemon/pokemon.js';
//import { RuleTester } from 'eslint';
const root = document.getElementById("root") // import div
const pokemons = data.pokemon // pokemons = array
const filtersMenu = document.getElementById("filters")
filtersMenu.style.display = "none"

/*Bloco de impressão dos pokemons*/
const print = pokemons => { //função para imprimir os pokemons
    const createModal = () => {
        const wait = document.getElementById("wait")

        const waiting = document.getElementsByClassName("waiting")[0]
        waiting.style.display = "block"
        const modalContainer = document.createElement("div")
        modalContainer.innerHTML += '<span class="close">&times;</span>'
        const image = document.createElement("img")
        const modalInformation = document.createElement("div")
        const modalPower = document.createElement("div")
        image.src = pokemons.img // coloca o endereço da imagem

        modalContainer.classList.add("modal-class", "card-aparence")
            // image.classList.add("picture") // coloca uma classe na imagem
        modalInformation.innerHTML +=
            `<h5><span class=${pokemons.type[0]}>#${pokemons.num}</span></h5>
            <h3>${namePokemons.toUpperCase()}</h4><hr>
            <h5><span class=${pokemons.type[0]}>Peso: </span>:${pokemons.weight}</h5>
            <h5><span class=${pokemons.type[0]}>Altura: </span>${pokemons.height}</h5>`

        pokemons.type.forEach(a => {
            let powerTypeModal = document.createElement("div")
            powerTypeModal.classList = (a)
            powerTypeModal.classList.add("power")
            powerTypeModal.innerHTML += `${a} </h5>` //${pokemons.type[1] = pokemons.type[1] || ""}</h5>` // coloca o tipo
            modalPower.appendChild(powerTypeModal)
        });

        modalInformation.appendChild(modalPower)
        modalContainer.appendChild(modalInformation) // coloca informações no card
        modalContainer.appendChild(image) //coloca a imagem na nova div
        wait.appendChild(modalContainer)


        document.querySelectorAll(".close").forEach((a) => {
            a.addEventListener('click', () => {
                modalContainer.style.display = "none"
                waiting.style.display = "none"
                    // document.getElementsByClassName("waiting")[0].style.display = "none"
            })
        })

        window.addEventListener("dblclick", (e) => {
            e.preventDefault();
            if (e.target !== modalContainer)
                modalContainer.style.display = "none"
            waiting.style.display = "none"
                //document.getElementsByClassName("waiting")[0].style.display = "none"
        })

    }

    document.getElementById("main").style.display = "block"
    const card = document.createElement("div") // cria uma nova div
    const img = document.createElement("img") //criar elemento img
    const cardInformation = document.createElement("div") //cria div das informações
    const power = document.createElement("div")
    img.src = pokemons.img // coloca o endereço da imagem

    card.classList.add("card")
    img.classList.add("picture") // coloca uma classe na imagem
    let namePokemons = pokemons.name.replace("(Female)", "")
    namePokemons = namePokemons.replace("(Male)", "")
    cardInformation.innerHTML += `<br><h5 class=${pokemons.type[0]}>#${pokemons.num}</h5><br><h3>${namePokemons.toUpperCase()}</h4>` // coloca o nameInput
    pokemons.type.forEach(a => {
        const powerType = document.createElement("div")
        powerType.classList = (a)
        powerType.classList.add("power")
        powerType.innerHTML += `<h5>${a}</h5>` //${pokemons.type[1] = pokemons.type[1] || ""}</h5>` // coloca o tipo
        power.appendChild(powerType)
    });

    cardInformation.appendChild(power)
    card.appendChild(cardInformation) // coloca informações no card
    card.appendChild(img) //coloca a imagem na nova div
    root.appendChild(card) // coloca nova div dentro da div existente
    card.addEventListener("click", createModal)

}

/*Limpa a raiz*/
const clearDisplay = () => root.innerHTML = ""

/*Cria botão para mostrar mais e mostrar menos*/
const creatButtonView = () => {
    const card = document.createElement("div") // cria uma nova div
    const viewAll = document.createElement("div")

    card.classList.add("view-all-class")
    card.classList.add("card") // coloca uma clas na div

    card.appendChild(viewAll)
    root.appendChild(card) // coloca nova div dentro da div existente

    return viewAll
}

/*Tela inicial*/
const main = () => {
    clearDisplay()
    const elementMain = pokemons.filter((pokemons) => Number(pokemons.num) < 8)
    elementMain.map(print)
    const viewAll = creatButtonView()
    viewAll.innerHTML = "<h3>Ver Tudo</h3>"
    viewAll.addEventListener('click', viewAllElement)
}

/*Função que mostra todos elementos */
const viewAllElement = () => {
    clearDisplay()
    pokemons.map(print)
    const viewAll = creatButtonView()
    viewAll.innerHTML = "<h3>Ver Menos</h3>"
    viewAll.addEventListener('click', main)
}

/*Função que pesquisa os nomes*/
const searchName = (p) => {
    clearDisplay()
    let nameInput = document.getElementById("search").value
    nameInput = nameInput.toUpperCase()
    const elementSearched = searchFunc(p, nameInput, "name")
    return elementSearched
}

/*Função de abrir e fechar menu avançado*/
const filters = () => {
    const filterMenuDysplay = filtersMenu.style.display
    filtersMenu.style.display = filterMenuDysplay === "block" ? "none" : "block"
}


/*Funcao que verifica os tipos e fraquezas*/
const typeFunction = (p) => {
    /*Puxa os checkboxs */
    const checkbox = document.getElementById("checkbox-types")
    const checkboxWeakness = checkType(checkbox.weakness)
    const checkboxType = checkType(checkbox.option)
    return typeFunctionConcat(checkboxWeakness, checkboxType, p)
}

/*Função que reseta o menu avançado*/
const resetSearch = () => {
    document.querySelectorAll("input[type=checkbox]").forEach(check => check.checked = false)
    advancedSearch()
    main()
}

//função que pega os doms
const getHeight = () => {
    const checkboxHeight = document.getElementById("checkbox-height") // checkbox de altura
    const heigthChecked = checkType(checkboxHeight.heights)
    let resultArrays = []
    for (let i of heigthChecked) {
        resultArrays = resultArrays.concat(height(i, pokemons))
    }
    return resultArrays
}

/*Função que filtra os checkboxs*/
const advancedSearch = () => {
    clearDisplay()
    const pokemonsType = pokemons.filter(typeFunction) //.map(print)
    const heightArray = getHeight() //.map(print)
    const orderBy = document.getElementById("browsers").value
    orderList(orderBy, searchName(concatFilters(pokemonsType, heightArray, pokemons))).map(print)

}
const functionMenu = () => {
    document.querySelectorAll(".screen").forEach((screen) => screen.style.display = "none")

    document.getElementById("home-menu").addEventListener("click", function() {
        document.getElementById("home").style.display = "block"
    })
    document.getElementById("comparation-menu").addEventListener("click", function() {
        document.getElementById("comparation").style.display = "block"
    })
    document.getElementById("ranking-menu").addEventListener("click", function() {
        document.getElementById("ranking").style.display = "block"
    })
    document.getElementById("main-menu").addEventListener("click", function() {
        document.getElementById("main").style.display = "block"
    })
}


document.querySelectorAll(".menu-buttons").forEach(buttons => buttons.addEventListener("click", functionMenu))
document.querySelectorAll('form').forEach(form => form.addEventListener('input', advancedSearch))
document.getElementById("menu-filter").addEventListener('click', filters)
document.getElementById("reset-search").addEventListener('click', resetSearch)
functionMenu()
main()

/*Ranking*/
// Declaração de variáveis
const typeChartHtml = document.getElementById('type-chart').getContext('2d');
//typeChartHtml.innerHTML = ;
const pokemonTypes = ['Flying', 'Ice', 'Grass', 'Fire', 'Water', 'Bug', 'Normal', 'Poison',
    'Electric', 'Ground', 'Rock', 'Fighting', 'Psychic', 'Ghost', 'Dragon', 'Fairy'
];
const pokemonTypesColor = ['teal', 'rgb(142, 197, 233)', 'rgb(106, 230, 172)',
    'orange', 'rgb(29, 230, 209)', 'rgb(139, 238, 119)', 'rgb(250, 110, 100)', 'rgb(210, 163, 214)',
    'rgb(241, 241, 98)', 'rgb(219, 122, 58)', 'rgb(56, 56, 56)', 'coral', 'crimson', 'darkmagenta',
    'rgb(226, 68, 160)', 'rgb(199, 126, 218)'
];
//Lógica para o cálculo de porcentagem de cada tipo 
let typeLength = [];
for (let types of pokemonTypes) {
    let typesArray = [];
    pokemons.filter(function(pokemon) {
        if (pokemon.type.includes(types)) {
            typesArray.push(types)
        }
        return typesArray;
        //typesArray = ['fire', 'fire', 'fire']
    });
    typeLength.push(typesArray.length);
    //typeLength = [5, 0, 0, 3, 4, ...]
}

let percent = [];
const typesPercent = typeLength.map(function(lengthArray) {
    percent = ((lengthArray / pokemons.length) * 100);
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