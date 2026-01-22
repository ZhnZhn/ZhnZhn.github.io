import {
  calcMinY,
  setPlotLinesMinMax
} from '../ChartFn';

const NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY
, POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

describe('calcMinY', () => {
  const fn = calcMinY;
  test('should calculate min y from min max arguments', ()=>{
    expect(fn(2, 8)).toBe(1);
    expect(fn(100, 640)).toBe(10);
  })
  test('should return undefined for max min diff less that 1/6', ()=>{
    expect(fn(0, 6)).toBe(void 0);
    expect(fn(1, 7)).toBe(void 0);
    expect(fn(100, 1000)).toBe(void 0);
    expect(fn(100, 10000)).toBe(void 0);
  })
  test('should return undefined in edge cases', ()=>{
    expect(fn(POSITIVE_INFINITY, 6)).toBe(void 0);
    expect(fn(0, NEGATIVE_INFINITY)).toBe(void 0);
    expect(fn(POSITIVE_INFINITY, NEGATIVE_INFINITY)).toBe(void 0);
  })
})

describe('setPlotLinesMinMax',()=>{
  const fn = setPlotLinesMinMax;
  test('should set min max values to plotLines object', ()=>{
    const plotLines = [{label:{}}, {label:{}}];
    fn({plotLines, max: 20, min: 10});
    expect(plotLines).toEqual([
      {value: 20, label: {text: '20'}},
      {value: 10, label: {text: '10'}}
    ])
  })
  test('should not set min or max for edge cases', ()=>{
    const plotLinesOnlyMax = [{label:{}}, {label:{}}];
    fn({plotLines: plotLinesOnlyMax, max: 20, min: POSITIVE_INFINITY});
    expect(plotLinesOnlyMax).toEqual([
      {value: 20, label: {text: '20'}},
      {label:{}}
    ])

    const plotLinesOnlyMin = [{label:{}}, {label:{}}];
    fn({plotLines: plotLinesOnlyMin, max: NEGATIVE_INFINITY, min: 10});
    expect(plotLinesOnlyMin).toEqual([
      {label:{}},
      {value: 10, label: {text: '10'}}
    ])

    const plotLinesNeither = [{label:{}}, {label:{}}];
    fn({plotLines: plotLinesNeither, max:NEGATIVE_INFINITY, min: POSITIVE_INFINITY});
    expect(plotLinesNeither).toEqual([
      {label:{}},
      {label:{}}
    ])
  })
})
