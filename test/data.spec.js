import { searchFunc, orderList, typeFunctionConcat, checkType, height, concatFilters} from '../src/data.js';

const comidinhasTop = {
  "comidinhas": [
    {
      "id": 1,
      "name": "Batata frita"
    },
    {
      "id": 2,
      "name": "Tapioca"
    },
    {
      "id": 3,
      "name": "Pizza"
    }]}

    const comidas = comidinhasTop.comidinhas;

describe('searchFunc', () => {
  it('is a function', () => {
    expect(typeof searchFunc).toBe('function');
  });

  it('returns searched name', () => {
  expect(searchFunc(comidas, "Tapi", "name")).toEqual([{"id": 2, "name": "Tapioca"}]);
  });
}); 

describe('orderList', () => {
  it('is a function', () => {
    expect(typeof orderList).toBe('function');
  });
  it('returns elements ordered by name', () => {
    expect(orderList(0, comidas)).toEqual([
      {
        "id": 1,
        "name": "Batata frita"
      },
      {
        "id": 3,
        "name": "Pizza"
      },
      {
        "id": 2,
        "name": "Tapioca"
      }]);
  });
  it('returns elements ordered by id', () => {
    expect(orderList(3, comidas)).toEqual([
      {
        "id": 3,
        "name": "Pizza"
      },
      {
        "id": 2,
        "name": "Tapioca"
      },
      {
        "id": 1,
        "name": "Batata frita"
      }
    ]);
  });
});

const typeFilter = [{"type": ["fritura","massa"]}, {"type": ["massa"]}];
const weaknessFilter = [{"weakness": ["fritura", "glúten"]}, {"weakness": ["glúten"]}];
const foodArray = [{"type": ["fritura","massa"]}, {"type": ["massa"]}, {"weakness": ["fritura", "glúten"]}, {"weakness": ["glúten"]},
{"weakness": ["lactose"]}]

describe('typeFunctionConcat', () => {
  it('is a function', () => {
    expect(typeof typeFunctionConcat).toBe('function');
  });
  it('returns the sum of weakness and type filter', () => {
    expect(typeFunctionConcat(weaknessFilter, typeFilter, foodArray)).toEqual([{"type": ["fritura","massa"]}, {"type": ["massa"]}, {"weakness": ["fritura", "glúten"]}, {"weakness": ["glúten"]}]);
  })
});

describe('checkType', () => {
  it('is a function', () => {
    expect(typeof checkType).toBe('function');
  });
});

describe('height', () => {
  it('is a function', () => {
    expect(typeof height).toBe('function');
  });
});

describe('concatFilters', () => {
  it('is a function', () => {
    expect(typeof concatFilters).toBe('function');
  });
  it('returns the array filtered by two diferent filters', () => {
    expect(concatFilters(["a","a","a"], ["b","b"], ["a","b","a","d","b","c","e","a","i"])).toEqual(["a","b","a","b","a","a"])
  })
});
