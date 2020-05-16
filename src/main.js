/*Bloco de configurações*/
import { searchFunc, orderList, resultPokemons, concatFilters, startCalculador, order } from './data.js';
import data from './data/pokemon/pokemon.js';
//import { RuleTester } from 'eslint';
const root = document.getElementById("root") // import div
const pokemons = data.pokemon // pokemons = array
const filtersMenu = document.getElementById("filters")
const select = document.getElementById("select-pokemons")
const calculatorMain = document.getElementById("calculator-main")
document.getElementById("startCalculator").disabled = true
filtersMenu.style.display = "none"

/*Bloco de impressão dos pokemons*/

const creatCard = (pokemons, info = [], infoEx) => {
    const card = document.createElement("div") // cria uma nova div
    const img = document.createElement("img") //criar elemento img
    const cardInformation = document.createElement("div") //cria div das informações
    const power = document.createElement("div")
    img.src = pokemons.img // coloca o endereço da imagem
    cardInformation.classList.add("information")
    card.classList.add("card")
    img.classList.add("picture") // coloca uma classe na imagem
    let namePokemons = pokemons.name.replace("(Female)", "")
    namePokemons = namePokemons.replace("(Male)", "")
    cardInformation.innerHTML += `<h5 class=${pokemons.type[0]}>#${pokemons.num}</h5><h5>${namePokemons.toUpperCase()}</h5>` // coloca o nameInput

    info.forEach(info => {
        cardInformation.innerHTML += `<h5><span class=${pokemons.type[0]}>${info}:</span>${pokemons[info]}</h5>`
    })


    if (typeof infoEx == 'string')
        cardInformation.innerHTML += `<h5>${infoEx}</h5>`
    else if (typeof infoEx === 'number')
        cardInformation.innerHTML += `<h5><span class=${pokemons.type[0]}>CP: </span>${infoEx}</h5>`
    else if (typeof infoEx === 'object') {
        let cp
        infoEx.length > 1 ? cp = "CP Min:" : cp = "CP:"
        for (let i in infoEx) {
            if (i === 1)
                cp = "CP Max:"
            cardInformation.innerHTML += `<h5><span class=${pokemons.type[0]}>${cp}</span>${Math.round(infoEx[i])}</h5>`
        }
    }

    pokemons.type.forEach(a => {
        const powerType = document.createElement("div")
        powerType.classList = (a)
        powerType.classList.add("power")
        powerType.innerHTML += `<h5>${a}</h5>` //${pokemons.type[1] = pokemons.type[1] || ""}</h5>` // coloca o tipo
        power.appendChild(powerType)
    });
    card.appendChild(img) //coloca a imagem na nova div
    cardInformation.appendChild(power)
    card.appendChild(cardInformation) // coloca informações no card
    return card
}

const createModal = (pokemons) => { //////////////////////////////////////////////////////////////////////////////
    const wait = document.getElementById("wait")
    const waiting = document.getElementsByClassName("waiting")[0]
    waiting.style.display = "block"
    const info = ["height", "weight"]
    const card = creatCard(pokemons, info, pokemons.weakness)
    card.innerHTML += '<span class="close">&times;</span>'
    card.classList.remove("card")
    card.classList.add("modal-class", "card-aparence")
    wait.appendChild(card)
    document.querySelectorAll(".close").forEach((a) => {
        a.addEventListener('click', () => {
            card.style.display = "none"
            waiting.style.display = "none"
                // document.getElementsByClassName("waiting")[0].style.display = "none"
        })
    })
    window.addEventListener("dblclick", (e) => {
        e.preventDefault();
        if (e.target !== card)
            card.style.display = "none"
        waiting.style.display = "none"
            //document.getElementsByClassName("waiting")[0].style.display = "none"
    })
}


const print = (pokemons) => {
    const info = []
    const card = creatCard(pokemons, info)
    card.addEventListener("click", () => {
        createModal(pokemons, info)
    })
    root.appendChild(card) // coloca nova div dentro da div existente
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
    document.getElementById("main").style.display = "block"
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
    const elementSearched = searchFunc(p, nameInput, "name")
    return elementSearched
}

/*Função de abrir e fechar menu avançado*/
const filters = () => {
    const filterMenuDysplay = filtersMenu.style.display
    filtersMenu.style.display = filterMenuDysplay === "block" ? "none" : "block"
}

const checkType = (a) => {
    const newArray = []
    for (let i of a) {
        if (i.checked)
            newArray.push(i.value)
    }
    return newArray
}

const typeFunctionConcat = (checkboxWeakness, checkboxType, p) => { /*Verifica os tipos*/
    for (let i of checkboxType) {
        for (let j of p.type) {
            if (i === j)
                return true
        }
    }
    for (let i of checkboxWeakness) {
        for (let j of p.weaknesses) {
            if (j === i)
                return true
        }
    }
}

/*Funcao que verifica os tipos e fraquezas*/
const typeFunction = (p) => {
    /*Puxa os checkboxs */
    const checkbox = document.getElementById("checkbox-types")
    const checkboxWeakness = checkType(checkbox.weakness)
    console.log(checkboxWeakness)
    const checkboxType = checkType(checkbox.option)
    return typeFunctionConcat(checkboxWeakness, checkboxType, p)
}
const height = (heightPokemon, pokemons) => {
    let newArray = order(pokemons, "height")
    let average = (parseFloat(newArray[newArray.length - 4].height) - parseFloat(newArray[0].height)) / 3
    let resultMin
    let resultMax
    if (heightPokemon == "l") {
        resultMax = average
        resultMin = 0
    } else if (heightPokemon == "m") {
        resultMax = 2 * average
        resultMin = average
    } else {
        resultMax = Math.ceil(parseFloat(newArray[newArray.length - 1].height))
        resultMin = 2 * average
    }
    return resultPokemons(pokemons, resultMax, resultMin)
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
const selectPokemons = () => {
    pokemons.forEach((a) => {
        let opt = document.createElement('option')
        opt.value = a.name
        opt.text = a.name
        select.appendChild(opt)
    })
}

//cria o card dos calculos
const creatCardCalculator = (pokemon, evolutuin, cp, cpResult) => {
        let info = []
        let infoEx = `Não possuí evolução`
        if (evolutuin.length) {
            info = ["candy_count"]
            infoEx = cp
        } else
            infoEx = `Não possuí evolução`
        let card = creatCard(pokemon, info, infoEx)
        card.classList.add("card-aparence")
        card.addEventListener("click", () => {
            createModal(pokemon)
        })
        calculatorMain.appendChild(card) // coloca nova div dentro da div existente
        if (evolutuin.length) {
            evolutuin.forEach((evolutuin) => {
                const img = document.createElement("img") //criar elemento img
                img.classList.add("img-calc")
                img.src = 'img/icon-seta.png'
                calculatorMain.appendChild(img)
                info = []
                card = creatCard(evolutuin, info, cpResult)
                card.classList.add("card-aparence")
                card.addEventListener("click", () => {
                    createModal(evolutuin)
                })
                calculatorMain.appendChild(card) // coloca nova div dentro da div existente
            })
        }
        if (evolutuin.length > 2) {
            const alertEevee = document.createElement("div") // cria uma nova div
            alertEevee.classList.add("card-aparence", "alert-eevee")
            alertEevee.innerHTML = `<p>Importante! Você pode evoluir um Eevee para Jolteon, Flareon ou Vaporeon</p>`
            calculatorMain.appendChild(alertEevee)
        }
    }
    //poxa os dados dos do calculo
const calculator = (pokemons) => {
        calculatorMain.innerHTML = ""
        const cp = parseInt(document.getElementById("input-cp").value)
        const pokemon = pokemons.filter((a) => {
            if (select.value === a.name)
                return true
        })
        let evolutuin
        const cpResult = startCalculador(cp, pokemon[0])
        console.log(cpResult)
        if (pokemon[0].next_evolution) {
            if (pokemon[0].id === 133) {
                let numEvolution = []
                pokemon[0].next_evolution.forEach((p) => {
                    numEvolution.push(p.num)
                })
                evolutuin = pokemons.filter((a) => {
                    for (let i of numEvolution) {
                        if (a.num === i)
                            return true
                    }
                })
            } else {
                const numEvolution = pokemon[0].next_evolution[0].num
                evolutuin = pokemons.filter((a) => {
                    if (a.num === numEvolution)
                        return true
                })
            }
        } else
            evolutuin = 0
        creatCardCalculator(pokemon[0], evolutuin, cp, cpResult)
    }
    //faz o calculo

document.querySelectorAll(".menu-buttons").forEach(buttons => buttons.addEventListener("click", functionMenu))
document.querySelectorAll('form').forEach(form => form.addEventListener('input', advancedSearch))
document.getElementById("menu-filter").addEventListener('click', filters)
document.getElementById("reset-search").addEventListener('click', resetSearch)
document.getElementById("input-cp").addEventListener('input', () => {
    document.getElementById("startCalculator").disabled = false
    document.getElementById("startCalculator").style.color = "black"
})
document.getElementById("startCalculator").addEventListener('click', () => calculator(pokemons))
document.getElementById("menu-open").addEventListener('click', () => {
    const menu = document.getElementById("disappear")
    menu.style.display === "none" ? menu.style.display = "block" : menu.style.display = "none"
    main()
})

functionMenu()
main()
selectPokemons()



/*Ranking*/
//Declaração de variáveis
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

// Função Gráfico
new Chart(document.getElementById('type-chart').getContext('2d'), {
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