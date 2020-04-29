# Data Lovers

## Índice

* [1. Introdução](#1-introducao)
* [2. Protótipo e histórias de usuários](#2-prototipo-e-historias-de-usuarios)
* [3. Considerações técnicas](#3-consideracoes-tecnicas)
* [4. Checklist](#4-checklist)
* [5. Autoria](#5-autoria)

***

## 1. Introdução

Este projeto consiste na criação de uma aplicação web para fãs de Pokémon. O objetivo é criar uma interface amigável para que o usuário possa acessar, filtrar e ordenar dados sobre os Pokémons. Os dados estão dispostos em formato de catálogo e podem ser filtrados de acordo com as preferências do usuário. O design é responsivo e está sendo construído pensando na acessibilidade. 

## 2. Protótipo e histórias de usuários

O protótipo inicial do projeto:
![](/protótipopokemon.jpg)

Estruturamos o projeto em três histórias de usuário.
**História de usuário 1:** Como usuário, quero ser capaz de visualizar um catálogo de Pokemons para que eu possa ver suas características básicas.

**História de usuário 2:** Como usuário, quero filtrar Pokemons para que possa encontrá-los mais fácil.

**História de usuário 3:** Como usuário, quero visualizar, comparar e ver estatísticas de Pokemons para escolher o meu preferido.

## 3. Considerações técnicas

O arquivo está estruturado da seguinte forma:

```text
.
├── EXTRA.md
├── README.md
├── package.json
├── src
|  ├── data (de acordo com o data que forem trabalhar)
|  |  ├── lol
|  |  |  ├── lol.js
|  |  |  ├── lol.json
|  |  |  └── README.md
|  |  ├── pokemon
|  |  |  ├── pokemon.js
|  |  |  ├── pokemon.json
|  |  |  └── README.md
|  |  └── rickandmorty
|  |     ├── rickandmorty.js
|  |     └── rickandmorty.json
|  |     └── README.md
|  ├── data.js
|  ├── index.html
|  ├── main.js
|  └── style.css
└── test
   └── data.spec.js

directory: 6 file: 17
```

## 4. Checklist

* [ ] Usar VanillaJS.
* [ ] Não utilizar `this`.
* [ ] Passa pelo linter (`npm run pretest`)
* [ ] Passa pelos testes (`npm test`)
* [ ] Testes unitários cobrem um mínimo de 70% de statements, functions,
  lines e branches.
* [ ] Inclui uma _definição de produto_ clara e informativa no `README.md`.
* [ ] Inclui histórias de usuário no `README.md`.
* [ ] Inclui rascunho da solução (protótipo de baixa fidelidade) no
  `README.md`.
* [ ] Inclui uma lista de problemas detectados nos testes de usabilidade no `README.md`.
* [ ] UI: Mostra lista/tabela/etc com dados e/ou indicadores.
* [ ] UI: Permite ordenar dados por um ou mais campos (asc e desc).
* [ ] UI: Permite filtrar dados com base em uma condição.
* [ ] UI: É _responsivo_.

## 5. Autoria

Este projeto foi feito por Gabriela Piovezam e Thais Durynek com base no projeto da Laboratoria.
