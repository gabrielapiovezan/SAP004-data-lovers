import { searchFunc, orderList, typeFunctionConcat, checkType, height, concatFilters} from '../src/data.js';


describe('searchFunc', () => {
  it('is a function', () => {
    expect(typeof searchFunc).toBe('function');
  });

  it('returns `pikachu`', () => {
    expect(searchFunc('pikac')).toBe('Pikachu');
  });
}); 

describe('orderList', () => {
  it('is a function', () => {
    expect(typeof orderList).toBe('function');
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
});


// describe('anotherExample', () => {
//   it('is a function', () => {
//     expect(typeof anotherExample).toBe('function');
//   });

//   it('returns `anotherExample`', () => {
//     expect(anotherExample()).toBe('OMG');
//   });
// }); 
