import {
  legendItem,
  stockSeriesLegend
} from '../legendFn';
import {
  COLOR_S_STOCK_CLOSE,
  COLOR_S_HIGH,
  COLOR_S_LOW,
  COLOR_S_OPEN
} from '../../constants/Color'

describe('legendItem', ()=>{
  const fn = legendItem;
  test('should create legend item obj', ()=>{
    expect(fn(0, 'blue', 'name', true)).toEqual({
      index: 0, color: 'blue', name: 'name',
      isVisible: true
    })
  })
  test('should use default value for isVisible as false', ()=>{
    expect(fn(0, 'blue', 'name')).toEqual({
      index: 0, color: 'blue', name: 'name',
      isVisible: false
    })
  })
})

describe('stockSeriesLegend', ()=>{
  const fn = stockSeriesLegend;
  test('should create stock series legends', ()=>{
    expect(fn()).toEqual([
     { index: 0, color: COLOR_S_STOCK_CLOSE, name: 'Close', isVisible: true },
     { index: 1, color: COLOR_S_HIGH, name: 'High', isVisible: false },
     { index: 2, color: COLOR_S_LOW, name: 'Low', isVisible: false },
     { index: 3, color: COLOR_S_OPEN, name: 'Open', isVisible: false },
    ])
  })
})
