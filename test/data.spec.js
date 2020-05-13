import { searchFunc, orderList, typeFunctionConcat, checkType, height, concatFilters} from '../src/data.js';

const comidinhasTop = {
  "comidinhas": [
    {
      "id": 1,
      "name": "Batata frita",
      "Type": "Fritura",
      "Status": "Não saudável"
    },
    {
      "id": 2,
      "name": "Tapioca",
      "Type": "Massa",
      "Status": "Saudável"
    },
    {
      "id": 3,
      "name": "Pizza",
      "Type": "Massa",
      "Status": "Não saudável"
    }]}

    const comidas = comidinhasTop.comidinhas;

describe('searchFunc', () => {
  it('is a function', () => {
    expect(typeof searchFunc).toBe('function');
  });

  it('returns searched name', () => {
    expect(searchFunc(comidas, "Tapioca", "name")).toEqual([{"name": "Tapioca"}]);
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
        "name": "Batata frita",
        "Type": "Fritura",
        "Status": "Não saudável"
      },
      {
        "id": 3,
        "name": "Pizza",
        "Type": "Massa",
        "Status": "Não saudável"
      },
      {
        "id": 2,
        "name": "Tapioca",
        "Type": "Massa",
        "Status": "Saudável"
      }
    ]);
  });
});

describe('typeFunctionConcat', () => {
  it('is a function', () => {
    expect(typeof typeFunctionConcat).toBe('function');
  });
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
    expect(concatFilters(comidas["Não saudável"], comidas["Massa"], comidas)).toEqual([
      {
        "id": 3,
        "name": "Pizza",
        "Type": "Massa",
        "Status": "Não saudável"
      }
    ])
  })
});


// describe('anotherExample', () => {
//   it('is a function', () => {
//     expect(typeof anotherExample).toBe('function');
//   });

//   it('returns `anotherExample`', () => {
//     expect(anotherExample()).toBe('OMG');
//   });
// }); 
