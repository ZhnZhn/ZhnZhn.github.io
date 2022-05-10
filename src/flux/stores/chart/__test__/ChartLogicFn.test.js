import {
  isChartExist,
  removeConfig,
  toTop,
  removeAll,
  updateMovingValues
} from '../ChartLogicFn';

const CHART_TYPE = "AA_BB";
const _crChartsConfig = (chartType=CHART_TYPE) => ({
  [chartType]: {
    chartType,
    configs: [{
      valueMoving: {},
      zhConfig: { key: 'k1', id: 'k1'}
    },{
      valueMoving: {},
      zhConfig: { key: 'k2', id: 'k2'}
    },{
      valueMoving: {},
      zhConfig: { key: 'k3', id: 'k3'}
    }]
  }
})

const _getVm = (chartsConfig, chartType, index) => chartsConfig[chartType]
  .configs[index].valueMoving;

describe('isChartExist', ()=>{
  test('should return true if config for chartType and key exists', ()=>{
    const _chartsConfig = _crChartsConfig(CHART_TYPE);
    expect(isChartExist(_chartsConfig, CHART_TYPE, "k1")).toBe(true)
    expect(isChartExist(_chartsConfig, CHART_TYPE, "k2")).toBe(true)
  })
  test('should return false if config for chartType and key does not exist', ()=>{
    const _chartsConfig = _crChartsConfig(CHART_TYPE);
    expect(isChartExist(_chartsConfig, CHART_TYPE, "k5")).toBe(false)
    expect(isChartExist(_chartsConfig, CHART_TYPE, "k6")).toBe(false)
  })
  test('should return false if configs for chartType does not exist', ()=>{
    const _chartsConfig = _crChartsConfig(CHART_TYPE);
    const _NOT_EXIST_CHART_TYPE = 'NOT_EXIST_'+CHART_TYPE;
    expect(isChartExist(_chartsConfig, _NOT_EXIST_CHART_TYPE, "k1")).toBe(false)
    expect(isChartExist(_chartsConfig, _NOT_EXIST_CHART_TYPE, "k2")).toBe(false)
    expect(isChartExist(_chartsConfig, _NOT_EXIST_CHART_TYPE, "k5")).toBe(false)
  })
})

describe('removeConfig', ()=>{
  test('should remove config from configs by id', ()=>{
    const _chartsConfig = _crChartsConfig(CHART_TYPE)
    const _idOrKey = 'k1'

    expect(isChartExist(_chartsConfig, CHART_TYPE, _idOrKey)).toBe(true)
    const { chartSlice, isRemoved } = removeConfig(_chartsConfig, CHART_TYPE, _idOrKey)

    expect(isRemoved).toBe(true)
    expect(isChartExist(_chartsConfig, CHART_TYPE, _idOrKey)).toBe(false)
    expect(chartSlice).toBe(_chartsConfig[CHART_TYPE])

  })
  test('should return object with isRemoved false for not existed id', ()=>{
    const _chartsConfig = _crChartsConfig(CHART_TYPE)
    const _idOrKey = 'k5'

    expect(isChartExist(_chartsConfig, CHART_TYPE, _idOrKey)).toBe(false)
    const { chartSlice, isRemoved } = removeConfig(_chartsConfig, CHART_TYPE, _idOrKey)

    expect(isRemoved).toBe(false)
    expect(isChartExist(_chartsConfig, CHART_TYPE, _idOrKey)).toBe(false)
    expect(chartSlice).toBe(_chartsConfig[CHART_TYPE])
  })
})

describe('toTop', ()=>{
  test('should set and return chart slice with config on 0 index by chartType and id', () => {
    const _chartsConfig = _crChartsConfig(CHART_TYPE)
    const _idOrKey = 'k3'

    expect(_chartsConfig[CHART_TYPE].configs[0].zhConfig.id).not.toBe(_idOrKey)

    const chartSlice = toTop(_chartsConfig, CHART_TYPE, _idOrKey)
    expect(_chartsConfig[CHART_TYPE].configs[0].zhConfig.id).toBe(_idOrKey)
    expect(chartSlice.configs[0].zhConfig.id).toBe(_idOrKey)
  })
})

describe('removeAll', ()=>{
  test('should set and return chartSlice with empty configs array',()=>{
    const _chartsConfig = _crChartsConfig(CHART_TYPE)

    expect(_chartsConfig[CHART_TYPE].configs.length).not.toBe(0)

    const chartSlice = removeAll(_chartsConfig, CHART_TYPE)
    expect(_chartsConfig[CHART_TYPE].configs.length).toBe(0)
    expect(chartSlice.configs.length).toBe(0)
  })
})

describe('updateMovingValues', ()=>{
  test('should update valueMoving for all configs', ()=>{
    const VM0 = { value: "1.01"}
    const VM1 = { value: "2.02"}
    const VM2 = { value: "3.03"}
    const _chartsConfig = _crChartsConfig(CHART_TYPE)

    updateMovingValues(_chartsConfig, CHART_TYPE, [ VM0, VM1, VM2 ])
    expect(_getVm(_chartsConfig, CHART_TYPE, 0)).toBe(VM0)
    expect(_getVm(_chartsConfig, CHART_TYPE, 1)).toBe(VM1)
    expect(_getVm(_chartsConfig, CHART_TYPE, 2)).toBe(VM2)
  })

  test('should not update valueMoving for configs if array lenghts not match', ()=>{
    const VM0 = { value: "1.01"}
    const VM1 = { value: "2.02"}
    const _chartsConfig = _crChartsConfig(CHART_TYPE)
    const _prevVm0 = _getVm(_chartsConfig, CHART_TYPE, 0)
    const _prevVm1 = _getVm(_chartsConfig, CHART_TYPE, 1)

    updateMovingValues(_chartsConfig, CHART_TYPE, [ VM0, VM1])
    expect(_getVm(_chartsConfig, CHART_TYPE, 0)).not.toBe(VM0)
    expect(_getVm(_chartsConfig, CHART_TYPE, 0)).toBe(_prevVm0)
    expect(_getVm(_chartsConfig, CHART_TYPE, 1)).not.toBe(VM1)
    expect(_getVm(_chartsConfig, CHART_TYPE, 1)).toBe(_prevVm1)
  })
})
