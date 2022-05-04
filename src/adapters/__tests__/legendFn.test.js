import {
  legendItem,
  stockSeriesLegend
} from '../legendFn';
import C from '../../constants/Color'

describe('legendItem', ()=>{
  const fn = legendItem
  it('should create legend item obj', ()=>{
    expect(fn(0, 'blue', 'name', true)).toEqual({
      index: 0, color: 'blue', name: 'name',
      isVisible: true
    })
  })
  it('should use default value for isVisible as false', ()=>{
    expect(fn(0, 'blue', 'name')).toEqual({
      index: 0, color: 'blue', name: 'name',
      isVisible: false
    })
  })
})

describe('stockSeriesLegend', ()=>{
  const fn = stockSeriesLegend
  it('should create stock series legends', ()=>{
    expect(fn()).toEqual([
     { index: 0, color: C.S_STOCK_CLOSE, name: 'Close', isVisible: true },
     { index: 1, color: C.S_HIGH, name: 'High', isVisible: false },
     { index: 2, color: C.S_LOW, name: 'Low', isVisible: false },
     { index: 3, color: C.S_OPEN, name: 'Open', isVisible: false },
    ])
  })
})
