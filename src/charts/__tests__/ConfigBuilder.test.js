/**
 * @jest-environment jsdom
 */
 //Highcharts from Chart require jsdom
"use strict";
import ConfigBuilder from '../ConfigBuilder';


describe('ConfigBuilder addCaption', ()=>{
  test('should add caption', ()=>{
    const title = 'title', subtitle = 'subtitle'
    , config = ConfigBuilder()
        .addCaption(title, subtitle)
        .toConfig()
    expect(config.title.text).toBe(title)
    expect(config.subtitle.text).toBe(subtitle)
  })

  // <7.2.2 || >=8.0.0 <8.1.1
  // https://snyk.io/vuln/SNYK-JS-HIGHCHARTS-571995
  // https://github.com/highcharts/highcharts/issues/13559
  test('should sanitize title and subtitle', ()=>{
    const title = "<a href='javascript:alert()'>title</a>"
    , titleSanitized = "<a>title</a>"
    , subtitle = "<a href='#\";alert();\"'>subtitle</a>"
    , subtitleSanitized = "<a href=\"#&quot;;alert();&quot;\">subtitle</a>"
    , config = ConfigBuilder()
        .addCaption(title, subtitle)
        .toConfig();
    expect(config.title.text).toBe(titleSanitized)
    expect(config.subtitle.text).toBe(subtitleSanitized)
  })
})

describe('ConfigBuilder add', ()=>{
  test('should add option by new propName, value', ()=>{
    const config = ConfigBuilder()
      .add('abc', {a: 'a', b: 'b'})
      .toConfig();
    expect(config.abc.a).toBe('a')
    expect(config.abc.b).toBe('b')
  })
  test('should add option by propName, value', () =>{
    const config = ConfigBuilder(
         {abc: {a: 1, b: 2, c: 3}}
       )
       .add('abc', {a: 'a', b: 'b'})
       .toConfig();
      expect(config.abc.a).toBe('a')
      expect(config.abc.b).toBe('b')
      expect(config.abc.c).toBe(3)
  })

  test('should add options by obj with new propName-value', ()=>{
    const config = ConfigBuilder()
      .add({
         a: {aa: 'aa'},
         b: {bb: 'bb'}
       })
      .toConfig();
    expect(config.a.aa).toBe('aa')
    expect(config.b.bb).toBe('bb')
  })
  test('should add by option obj with propName-value', ()=>{
    const config = ConfigBuilder({
      a: {aa: 11, a: 'a'},
      b: {bb: 22, b: 'b'},
      c: {cc: 33, c: 'c'}
    })
      .add({
         a: {aa: 'aa'},
         b: {bb: 'bb'}
       })
      .toConfig();
    expect(config.a.aa).toBe('aa')
    expect(config.a.a).toBe('a')

    expect(config.b.bb).toBe('bb')
    expect(config.b.b).toBe('b')

    expect(config.c.cc).toBe(33)
    expect(config.c.c).toBe('c')
  })
  test('should add by option obj array, string, boolean, number values', ()=>{
     const data = ['a'], str = 'str', bool = true, n=10
     , config = ConfigBuilder()
        .add({
          a: data,
          b: str,
          c: bool,
          d: n
        }).toConfig();
     expect(config.a).toEqual(data)
     expect(config.b).toBe(str)
     expect(config.c).toBe(bool)
     expect(config.d).toBe(n)
  })
  test('should add array, string, number, boolean values', ()=>{
     const data = ['a'], str = 'str', bool = true, n=10
     , config = ConfigBuilder()
        .add('a', data)
        .add('b', str)
        .add('c', bool)
        .add('d', n)
        .toConfig();
     expect(config.a).toEqual(data)
     expect(config.b).toBe(str)
     expect(config.c).toBe(bool)
     expect(config.d).toBe(n)
  })
})
