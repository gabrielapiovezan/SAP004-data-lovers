export const startCalculador = (cp, pokemon) => {
    if (!cp) {
        throw new TypeError('Digite um número');
    } else {
        const cpResult = pokemon.multipliers.map((m) => {
            return m * cp
        })
        return cpResult
    }


}


export const orderList = (orderBy, nameArray) => {
    let newArray = [];
    let objectParemeter
    if (orderBy < 0)
        return orderBy
    else {
        orderBy < 2 ? objectParemeter = "name" : objectParemeter = "id"
        newArray = order(nameArray, objectParemeter)
        if (orderBy % 2 != 0)
            newArray.reverse()
        return newArray
    }
}


export const order = (nameArray, objectParemeter) => {
    return nameArray.sort(function(a, b) {
        return ((a[objectParemeter] > b[objectParemeter]) ? 1 : ((b[objectParemeter] > a[objectParemeter]) ? -1 : 0))
    })
}


export const concatFilters = (pokemonsType, heightArray, pokemons) => {
    let resultFilters = []
    if (pokemonsType.length && heightArray.length) {
        resultFilters = pokemonsType.filter((pokemonsType) => {
            for (let i of heightArray) {
                if (pokemonsType === i)
                    return true
            }
        })
    } else
        resultFilters = pokemonsType.concat(heightArray)
    if (!resultFilters.length)
        resultFilters = pokemons
    return resultFilters
}


export const resultPokemons = (pokemons, resultMax, resultMin) => pokemons.filter((p) => {
    if (resultMin < parseFloat(p.height) && parseFloat(p.height) < resultMax) // array 4 pois os 5 primeiros estão muito acima da média
        return true
})

export const searchFunc = (p, nameInput, parameter) => {
    nameInput = nameInput.toUpperCase()
    return p.filter((p) => {
        return p[parameter].toUpperCase().includes(nameInput)
    })
}

export const percentage = (pokemonKeysArray, key, pokemonArray) => {
    let percentageArray = []
    for (let item of pokemonKeysArray) {
        let includesArray = []
        pokemonArray.filter(function(pokemon) {
            if (pokemon[key].includes(item)) {
                return includesArray.push(item)
            }
        });
        percentageArray.push((includesArray.length / pokemonArray.length) * 100)
    }
    return percentageArray
}