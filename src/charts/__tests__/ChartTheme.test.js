/**
 * @jest-environment jsdom
 */
"use strict";
import {
  getSeriaColorByIndex
} from '../ChartTheme';

describe('getSeriaColorByIndex', () => {
  const fn = getSeriaColorByIndex
  test('should return seria string color by index', () => {
    const _firstColor = '#7cb5ec'
    , _secondColor = '#8abb5d';
    expect(fn(0)).toBe(_firstColor)
    expect(fn(1)).toBe(_secondColor)
    expect(fn(9)).toBe(_firstColor)
    expect(fn(10)).toBe(_secondColor)
  })
})
