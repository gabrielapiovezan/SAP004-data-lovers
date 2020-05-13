/**Função que calcula o CP resltante
 * tem como entrada o CP do pokemon anterior e o pokemon
 */
export const startCalculador = (cp, pokemon) => {
    if (pokemon.multipliers) {
        const cpResult = pokemon.multipliers.map((m) => {
            return m * cp
        })

        return cpResult
    }
}


/*função que ordena em ordem alfabética e num
Tem como parâmetro o 
Indice:
0 - A - Z
1 = Z - A
2 = <
3 = >
Array: a ser organizado
retorna o tipo de array solicitado ordenado
*/
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
    /*Função que ordena elementos em ordem crescente 
    Tem como parâmetro:
    -Array a ser organizado
    -Parametro do objeto(name,num,id...)
    retorna um array ordenado*/
export const order = (nameArray, objectParemeter) => {
    return nameArray.sort(function(a, b) {
        return ((a[objectParemeter] > b[objectParemeter]) ? 1 : ((b[objectParemeter] > a[objectParemeter]) ? -1 : 0))
    })
}

/*Concatena os filtros:
tem como parâmetros:
os três arrays, dois resultados de filtros a serem concatenados e um array princial
retorna um array com os os elementos dos dois filtros iguais
caso nenhum item tenha sidoselecionado nos filtros, retorna o array principal*/
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

/*Função que verifica quais checkboxs estão selecionados
recebe como parâmetro entrada de checkbox  
retorna um array com o valor dos elementos selecionados
*/
export const checkType = (a) => {
    const newArray = []
    for (let i of a) {
        if (i.checked)
            newArray.push(i.value)
    }
    return newArray
}

/*Função que divide em intervalos as alturas dos pokemons 
tirando os ultimos elementos que apresentavam um desvio padrão muito alto
recebe como parâmetro:
 o valor da altura desejado, recebido através de um checkbox
l- pequeno
m - médio
b - grande 
o array a ser calculado
retorna um array com os intervalos selecionados*/
export const height = (heightPokemon, pokemons) => {
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
    const resultPokemons = pokemons.filter((p) => {
        if (resultMin < parseFloat(p.height) && parseFloat(p.height) < resultMax) // array 4 pois os 5 primeiros estão muito acima da média
            return true
    })
    return resultPokemons
}

/*Função que concatena os tipos e fraquizas selecionados em um unico array
recebe como parametro um array com as fraquezas selecionadas, um array com os tipo
e um array principal
retorna a soma dos arrays de tipos e fraquezas selecionados*/
export const typeFunctionConcat = (checkboxWeakness, checkboxType, p) => { /*Verifica os tipos*/
    for (let i of checkboxType) {
        if (p.type[0] === i || p.type[1] === i)
            return true
    }
    for (let i of checkboxWeakness) {
        for (let j of p.weaknesses) {
            if (j === i)
                return true
        }
    }
}

/*pesquisa uma palavra, recebe como parâmetro um array e uma string
ele pesquisa a string no parâmetro*/
export const searchFunc = (p, nameInput, parameter) => {
    return p.filter((p) => {
        return nameInput === p[parameter].slice(0, -(p[parameter].length - nameInput.length)).toUpperCase() || nameInput === p[parameter].toUpperCase()
    })

}