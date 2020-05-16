import { searchFunc, orderList, resultPokemons, concatFilters, startCalculador, order } from '../src/data.js';

const comidinhasTop = {
  "comidinhas": [{"id": 1, "name": "Batata frita"}, {"id": 2,"name": "Tapioca"}, {"id": 3,"name": "Pizza"}]};
const comidas = comidinhasTop.comidinhas;

describe('order', () => {
  it('is a function', () => {
    expect(typeof order).toBe('function');
  });
  it('returns ', () => {
    expect(order(comidas, "name")).toEqual([{"id": 1,"name": "Batata frita"}, {"id": 3,"name": "Pizza"},{"id": 2,"name": "Tapioca"}]);
  });
  it('returns ', () => {
    expect(order(comidas, "id")).toEqual([{"id": 1, "name": "Batata frita"}, {"id": 2,"name": "Tapioca"}, {"id": 3,"name": "Pizza"}]);
  });
  it('returns ', () => {
    expect(order([{"num":2},{"num":2},{"num":1}], "num")).toEqual([{"num":1},{"num":2},{"num":2}]);
  });
});

describe('searchFunc', () => {
  it('is a function', () => {
    expect(typeof searchFunc).toBe('function');
  });

  it('returns searched name', () => {
  expect(searchFunc(comidas, "batata", "name")).toEqual([{"id": 1, "name": "Batata frita"}]);
  });
  it('returns searched name', () => {
    expect(searchFunc(comidas, "bat", "name")).toEqual([{"id": 1, "name": "Batata frita"}]);
    });
}); 

describe('orderList', () => {
  it('is a function', () => {
    expect(typeof orderList).toBe('function');
  });
  it('returns elements ordered by name', () => {
    expect(orderList(0, comidas)).toEqual([
      {"id": 1,"name": "Batata frita"}, {"id": 3,"name": "Pizza"},{"id": 2,"name": "Tapioca"}]);
  });
  it('returns elements ordered by id', () => {
    expect(orderList(3, comidas)).toEqual([
      {"id": 3,"name": "Pizza"},{"id": 2,"name": "Tapioca"},{"id": 1,"name": "Batata frita"}]);
  });
  it('returns the selected value', () => {
    expect(orderList(-1, comidas)).toEqual(-1);
  });
});

const altura = [{"height": "1.19 m"}, {"height": "0.30 m"}, {"height": "2.02 m"}, {"height": "8.03 m"}];

describe('resultPokemons', () => {
  it('is a function', () => {
    expect(typeof resultPokemons).toBe('function');
  });
  it('returns data filtered by height (small)', () => {
    expect(resultPokemons(altura, 1, 0)).toEqual([{"height": "0.30 m"}]);
  });
  it('returns data filtered by height (medium)', () => {
    expect(resultPokemons(altura, 2, 1)).toEqual([{"height": "1.19 m"}]);
  });
  it('returns data filtered by height (large)', () => {
    expect(resultPokemons(altura, 9, 2)).toEqual([{"height": "2.02 m"}, {"height": "8.03 m"}]);
  });
});

describe('concatFilters', () => {
  it('is a function', () => {
    expect(typeof concatFilters).toBe('function');
  });
  it('returns the array filtered by two diferent filters', () => {
    expect(concatFilters(["a","b","b","c"], ["b","c"], ["a","b","a","d","b","c","e","a","i"])).toEqual(["b","b","c"])
  });
  it('returns the array filtered by two diferent filters', () => {
    expect(concatFilters(["a","b","b","c"], [], ["a","b","a","d","b","c","e","a","i"])).toEqual(["a","b", "b","c"])
  });
  it('returns the array filtered by two diferent filters', () => {
    expect(concatFilters([], [], ["a","b","a","d","b","c","e","a","i"])).toEqual(["a","b","a","d","b","c","e","a","i"])
  });
});

const evolução = [{"name": "Nanosaur", "multipliers": [3]}];
const evolução2 = [{"name": "Nanosaur", "multipliers": [3, 4]}];
describe('startCalculator', () => {
  it('is a function', () => {
    expect(typeof startCalculador).toBe('function');
  });
  it('returns CP input * multipliers', () => {
    expect(startCalculador(4, evolução[0])).toEqual([12]);
  });
  it('returns CP input * multipliers[a,b]', () => {
    expect(startCalculador(5, evolução2[0])).toEqual([15, 20]);
  });
  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => startCalculador()).toThrow(TypeError);
    expect(() => startCalculador(null, [])).toThrow(TypeError);
  });
});
