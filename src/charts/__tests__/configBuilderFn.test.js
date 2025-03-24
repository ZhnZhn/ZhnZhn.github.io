/**
 * @jest-environment jsdom
 */
 //Highcharts from Chart require jsdom
"use strict";

import {
  fAddCaption,
  fAdd,
  fAddLegend,
  fAddSeriaBy,
  setDataSourceTo
} from '../configBuilderFn';

describe('fAddCaption',()=>{
  const fn = fAddCaption;
  test('should add caption', ()=>{
    const title = 'title'
    , subtitle = 'subtitle';

    const config1 = fn(title, subtitle)({});
    expect(config1.title.text).toBe(title)
    expect(config1.subtitle.text).toBe(subtitle)

    const config2 = fn('', subtitle)({});
    expect(config2.title.text).toBe(subtitle)
  })

  // <7.2.2 || >=8.0.0 <8.1.1
  // https://snyk.io/vuln/SNYK-JS-HIGHCHARTS-571995
  // https://github.com/highcharts/highcharts/issues/13559
  test('should sanitize title and subtitle', ()=>{
    const title = "<a href='javascript:alert()'>title</a>"
    , titleSanitized = "<a>title</a>"
    , subtitle = "<a href='#\";alert();\"'>subtitle</a>"
    , subtitleSanitized = "<a href=\"#&quot;;alert();&quot;\">subtitle</a>"
    , config = fn(title, subtitle)({})

    expect(config.title.text).toBe(titleSanitized)
    expect(config.subtitle.text).toBe(subtitleSanitized)
  })
})

describe('fAdd', ()=>{
  const fn = fAdd;
  test('should add option by new propName, value', ()=>{
    const config = fn(
      'abc', {a: 'a', b: 'b'}
    )({});

    expect(config).toEqual({
      abc: {a: 'a', b: 'b'}
    })
  })
  test('should add option by propName, value', () =>{
    const config = fn(
      'abc', {a: 'a', b: 'b'}
    )({abc: {a: 1, b: 2, c: 3}});

    expect(config).toEqual({
      abc: {a: 'a', b: 'b', c: 3}
    })
  })

  test('should add options by obj with new propName-value', ()=>{
    const config = fn({
      a: {aa: 'aa'},
      b: {bb: 'bb'}
    })({});

    expect(config).toEqual({
      a: {aa: 'aa'},
      b: {bb: 'bb'}
    })
  })
  test('should add by option obj with propName-value', ()=>{
    const config = fn({
      a: {aa: 'aa'},
      b: {bb: 'bb'}
    })({
      a: {aa: 11, a: 'a'},
      b: {bb: 22, b: 'b'},
      c: {cc: 33, c: 'c'}
    });

    expect(config).toEqual({
      a: {aa: 'aa', a: 'a'},
      b: {bb: 'bb', b: 'b'},
      c: {cc: 33, c: 'c'}
    })
  })
  test('should add by option obj array, string, number, boolean values', ()=>{
     const config = fn({
       a: ['a'],
       b: 'str',
       c: true,
       d: 10
     })({});

     expect(config).toEqual({
       a: ['a'],
       b: 'str',
       c: true,
       d: 10
     })
  })
  test('should add array, string, number, boolean values', ()=>{
     const data = ['a']
     , str = 'str'
     , bool = true
     , n=10;

     const config1 = fn('a', data)({});
     expect(config1).toEqual({
       a: ['a']
     })

     const config2 = fn('b', str)(config1);
     expect(config2).toEqual({
       a: ['a'],
       b: 'str'
     })

     const config3 = fn('c', bool)(config2);
     expect(config3).toEqual({
       a: ['a'],
       b: 'str',
       c: true
     })

     const config = fn('d', n)(config3);
     expect(config).toEqual({
       a: ['a'],
       b: 'str',
       c: true,
       d: 10
     })
  })
})

describe('fAddLegend', () => {
  const fn = fAddLegend;
  test('should add not empty array of custom chart legend to config', ()=>{
    expect(fn(['item 1'])({})).toEqual({
      zhConfig: {
        legend: ['item 1']
      }
    })
    expect(fn(['item 1'])({zhConfig: { id: 'id' }})).toEqual({
      zhConfig: {
        id: 'id',
        legend: ['item 1']
      }
    })
  })

  test('should add empty array of custom chart legend to config in argument isAddEmpty', () => {
    expect(fn([], true)({})).toEqual({
      zhConfig: {
        legend: []
      }
    })
    expect(fn([], true)({zhConfig: { id: 'id' }})).toEqual({
      zhConfig: {
        id: 'id',
        legend: []
      }
    })
  })

  test('should return same config in case argument legend is not array with items', ()=>{
    expect(fn([])({})).toEqual({})
    expect(fn({})({})).toEqual({})
    expect(fn(null)({})).toEqual({})
    expect(fn()({})).toEqual({})

    expect(fn({}, true)({})).toEqual({})
    expect(fn(null, true)({})).toEqual({})
    expect(fn(void 0, true)({})).toEqual({})
  })
})

describe('fAddSeriaBy', ()=>{
  const fn = fAddSeriaBy;
  test('should add seria to config series by index', ()=>{
    const config = {
      series: [
        { r: 1, a: 'a'}
      ]
    }
    expect(fn(0, {r: 2, b: 'b'})(config)).toEqual({
      series: [
        { r: 2, a: 'a', b: 'b'}
      ]
    })
    expect(fn(1, {c: 'c'})(config)).toEqual({
      series: [
        { r: 2, a: 'a', b: 'b'},
        { c: 'c'}
      ]
    })
  })
  test('should add series by index', ()=>{
    const config = {
      series: []
    }
    expect(fn(0, {r: 2, b: 'b'})(config)).toEqual({
      series: [
        { r: 2, b: 'b'}
      ]
    })
    expect(fn(1, {c: 'c'})(config)).toEqual({
      series: [
        { r: 2, b: 'b'},
        { c: 'c'}
      ]
    })
  })
})

describe('setDataSourceTo', ()=>{
  const fn = setDataSourceTo;
  test('should set zhConfig dataSource to config', ()=>{
    const config1 = fn({}, 'DataProvider')
    expect(config1).toEqual({
      zhConfig: { dataSource: 'DataProvider'}
    })

    const config2 = fn({zhConfig: {_itemKey: 'itenKey'}}, 'DataProvider');
    expect(config2).toEqual({
      zhConfig: {
        _itemKey: 'itenKey',
        dataSource: 'DataProvider'
      }
    })

    const config3 = fn({zhConfig: { dataSource: 'ds'}}, 'DataProvider');
    expect(config3).toEqual({
      zhConfig: { dataSource: 'DataProvider' }
    })

  })
})
