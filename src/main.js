import { searchFunc, orderList, resultPokemons, concatFilters, startCalculador, order, percentage } from './data.js';
import data from './data/pokemon/pokemon.js';
const root = document.getElementById("root") 
const pokemons = data.pokemon 
const filtersMenu = document.getElementById("filters")
const select = document.getElementById("select-pokemons")
const calculatorMain = document.getElementById("calculator-main")
document.getElementById("startCalculator").disabled = true
filtersMenu.style.display = "none"


const creatCard = (pokemons, info = [], infoEx) => {
    const card = document.createElement("div")
    const img = document.createElement("img")
    const cardInformation = document.createElement("div")
    const power = document.createElement("div")
    img.src = pokemons.img
    cardInformation.classList.add("information")
    card.classList.add("card")
    img.classList.add("picture")
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
        powerType.innerHTML += `<h5>${a}</h5>`
        power.appendChild(powerType)
    });
    card.appendChild(img) 
    cardInformation.appendChild(power)
    card.appendChild(cardInformation)
    return card
}


const createModal = (pokemons) => {
    const waiting = document.getElementsByClassName("waiting")[0]
    waiting.style.display = "block"
    const wait = document.getElementById('wait')
    const info = ["height", "weight"]
    const card = creatCard(pokemons, info)
    const wait = document.getElementById("wait")
    card.innerHTML += '<span class="close">&times;</span>'
    card.classList.remove("card")
    card.classList.add("modal-class", "card-aparence")
    wait.appendChild(card)
    document.querySelectorAll(".close").forEach((a) => {
        a.addEventListener('click', () => {
            card.style.display = "none"
            waiting.style.display = "none"
        })
    })
    window.addEventListener("dblclick", (e) => {
        e.preventDefault();
        if (e.target !== card)
            card.style.display = "none"
        waiting.style.display = "none"

    })
}


const print = (pokemons) => {
    const info = []
    const card = creatCard(pokemons, info)
    card.addEventListener("click", () => {
        createModal(pokemons, info)
    })
    root.appendChild(card)
}


const clearDisplay = () => root.innerHTML = ""


const creatButtonView = () => {
    const card = document.createElement("div")
    const viewAll = document.createElement("div")

    card.classList.add("view-all-class")
    card.classList.add("card")
    card.appendChild(viewAll)
    root.appendChild(card)

    return viewAll
}


const main = () => {
    document.getElementById("main").style.display = "block"
    clearDisplay()
    const elementMain = pokemons.filter((pokemons) => Number(pokemons.num) < 12)
    elementMain.map(print)
    const viewAll = creatButtonView()
    viewAll.innerHTML = "<h3>Ver Tudo</h3>"
    viewAll.addEventListener('click', viewAllElement)
}


const viewAllElement = () => {
    clearDisplay()
    pokemons.map(print)
    const viewAll = creatButtonView()
    viewAll.innerHTML = "<h3>Ver Menos</h3>"
    viewAll.addEventListener('click', main)
}


const searchName = (p) => {
    clearDisplay()
    let nameInput = document.getElementById("search").value
    const elementSearched = searchFunc(p, nameInput, "name")
    return elementSearched
}


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


const typeFunctionConcat = (checkboxWeakness, checkboxType, p) => {
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


const typeFunction = (p) => {
    const checkbox = document.getElementById("checkbox-types")
    const checkboxWeakness = checkType(checkbox.weakness)
    const checkboxType = checkType(checkbox.option)
    return typeFunctionConcat(checkboxWeakness, checkboxType, p)
}


const height = (heightPokemon, pokemons) => {
    let newArray = order(pokemons, "height")
    const interval = (newArray.length - 1) / 3
    let firstMedian = (parseFloat(newArray[interval].height) + parseFloat(newArray[interval - 1].height)) / 2
    let secondeMedian = (parseFloat(newArray[2 * interval].height) + parseFloat(newArray[2 * interval - 1].height)) / 2
    let resultMin
    let resultMax
    if (heightPokemon == "l") {
        resultMax = firstMedian
        resultMin = 0
    } else if (heightPokemon == "m") {
        resultMax = secondeMedian
        resultMin = firstMedian
    } else {
        resultMax = parseFloat(newArray[newArray.length - 1].height)
        resultMin = secondeMedian
    }
    return resultPokemons(pokemons, resultMax, resultMin)
}


const resetSearch = () => {
    document.querySelectorAll("input[type=checkbox]").forEach(check => check.checked = false)
    advancedSearch()
    main()
}


const getHeight = () => {
    const checkboxHeight = document.getElementById("checkbox-height")
    const heigthChecked = checkType(checkboxHeight.heights)
    let resultArrays = []
    for (let i of heigthChecked) {
        resultArrays = resultArrays.concat(height(i, pokemons))
    }
    return resultArrays
}


const advancedSearch = () => {
    clearDisplay()
    const pokemonsType = pokemons.filter(typeFunction)
    const heightArray = getHeight()
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


const creatCardCalculator = (pokemon, evolutuin, cp, cpResult) => {
    if (evolutuin.length > 2) {
        const alertEevee = document.createElement("div")
        alertEevee.classList.add("card-aparence", "alert-eevee")
        alertEevee.innerHTML = `<p>Importante! Você pode evoluir um Eevee para Jolteon, Flareon ou Vaporeon</p>`
        calculatorMain.appendChild(alertEevee)
    }
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
    calculatorMain.appendChild(card)
    if (evolutuin.length) {
        evolutuin.forEach((evolutuin) => {
            const img = document.createElement("img")
            img.classList.add("img-calc")
            img.src = 'img/icon-seta.png'
            calculatorMain.appendChild(img)
            info = []
            card = creatCard(evolutuin, info, cpResult)
            card.classList.add("card-aparence")
            card.addEventListener("click", () => {
                createModal(evolutuin)
            })
            calculatorMain.appendChild(card)
        })
    }
}



const calculator = (pokemons) => {
    calculatorMain.innerHTML = ""
    const cp = parseInt(document.getElementById("input-cp").value)
    const pokemon = pokemons.filter((a) => {
        if (select.value === a.name)
            return true
    })
    let evolutuin
    const cpResult = startCalculador(cp, pokemon[0])
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

const hourFunction = () => {
    let time = new Date().getHours();
    const filterSpawnTime = pokemons.filter(pokemon => {
        if(time === Number(pokemon.spawn_time.slice(0,-3))){
            return true;
        }
    });
    filterSpawnTime.forEach(pokemon => {
        const card = creatCard(pokemon);
        card.addEventListener("click", () => {
            createModal(pokemon)
        });
        document.getElementById('hour').appendChild(card);
    })
}


document.querySelectorAll(".menu-buttons").forEach(buttons => buttons.addEventListener("click", functionMenu))
document.querySelectorAll('form').forEach(form => form.addEventListener('input', advancedSearch))
document.getElementById("menu-filter").addEventListener('click', filters)
document.getElementById("reset-search").addEventListener('click', resetSearch)
document.getElementById("close-menu").addEventListener('click', filters)
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
hourFunction();

functionMenu()
main()
selectPokemons()


/*Ranking*/

const pokemonTypes = ['Flying', 'Ice', 'Grass', 'Fire', 'Water', 'Bug', 'Normal', 'Poison',
    'Electric', 'Ground', 'Rock', 'Fighting', 'Psychic', 'Ghost', 'Dragon', 'Fairy'
];
const pokemonTypesColor = ['teal', 'rgb(142, 197, 233)', 'rgb(106, 230, 172)',
    'orange', 'rgb(29, 230, 209)', 'rgb(139, 238, 119)', 'rgb(250, 110, 100)', 'rgb(210, 163, 214)',
    'rgb(241, 241, 98)', 'rgb(219, 122, 58)', 'rgb(56, 56, 56)', 'coral', 'crimson', 'darkmagenta',
    'rgb(226, 68, 160)', 'rgb(199, 126, 218)'
];

const typePercentage = percentage(pokemonTypes, "type", pokemons);

new Chart(document.getElementById('type-chart').getContext('2d'), {
    type: 'bar',
    data: {
        labels: pokemonTypes,
        datasets: [{
            backgroundColor: pokemonTypesColor,
            data: typePercentage
        }]
    },
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