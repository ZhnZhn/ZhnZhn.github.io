import pipe from '../utils/pipe';

import {
  COLOR_S_OPEN,
  COLOR_S_HIGH,
  COLOR_S_LOW,
  COLOR_EX_DIVIDEND
} from '../constants/Color';

import { findMinY } from '../math/seriaFn';

import {
  crType,
  fTooltip
} from './Chart';
import {
  setSeriaDataTo,
  crSeriaConfig
} from './ChartConfigFn';
import {
  tooltipValueTdmyIf,
  tooltipExDividend
} from './Tooltip';

import {
  crMiniNumberOfTradesConfig,
  crMiniVolumeConfig,
  crMiniATHConfig,
  crMiniHLConfig
} from './crMiniConfigFn';

import {
  crAreaConfig,
  fAddTooltip,
  fAddMinMax,
  _addMini,
  _fAddScatterBottom
} from './configBuilderFn';

const _crScatterSeria = (
  color,
  pointFormatter,
  data
) => ({
  type: 'scatter',
  color, data,
  tooltip: fTooltip(pointFormatter),
})
, _crDividendSeria = (data) => _crScatterSeria(
  COLOR_EX_DIVIDEND,
  tooltipExDividend,
  data
)

const _factoryAddMini = (
  propName,
  crMiniConfig
) => (option) => (config) => _addMini(
  option[propName],
  option,
  crMiniConfig,
  config
);

export const fAddMiniVolume = _factoryAddMini(
  'data',
  crMiniVolumeConfig
)

export const fAddMiniVolumes = (
  arrOption
) => config => {
  arrOption.forEach(
    option => fAddMiniVolume(option)(config)
  )
  return config;
}

const _fAddMiniNumberOfTrades = _factoryAddMini(
  'data',
  crMiniNumberOfTradesConfig
)

export const fAddMiniATH = _factoryAddMini(
  'data',
  crMiniATHConfig
)

export const fAddMiniHL = _factoryAddMini(
  'data',
  crMiniHLConfig
)

const _factoryAddScatterBottom = (
  crSeria,
  seriaName
) => (data, min, max) => (config) => _fAddScatterBottom(
  crSeria(data),
  seriaName,
  min,
  max
)(config)

export const fAddDividend = _factoryAddScatterBottom(
  _crDividendSeria,
  'Dividend'
)

const _crSeriaOption = (
  color,
  lineWidth
) => ({
  type: 'line',
  visible: false,
  color,
  lineWidth,
  marker: {
    radius: 3,
    symbol: "circle"
  }
});

export const _fSetStockSerias = (
  seriaType,
  lineWidth,
  dC,
  dH,
  dL,
  dO
) => config => {
  const type = crType(seriaType);
  setSeriaDataTo(config, dC, 0, 'Close', {
    type, lineWidth
  })
  setSeriaDataTo(config, dH, 1, 'High',
    _crSeriaOption(COLOR_S_HIGH, lineWidth)
  )
  setSeriaDataTo(config, dL, 2, 'Low',
    _crSeriaOption(COLOR_S_LOW, lineWidth)
  )
  setSeriaDataTo(config, dO, 3, 'Open',
    _crSeriaOption(COLOR_S_OPEN, lineWidth)
  )
  return config;
};

export const crStockConfig = (
  id,
  option
) => {
  const {
    isNotZoomToMinMax,
    isDrawDeltaExtrems,
    seriaType,
    seriaWidth,
    dC, dH, dL, dO,
    minClose,
    maxClose,
    dVc, dV,
    dATH,
    dN, dNc
  } = option;
  return pipe(
     crAreaConfig(),
     fAddTooltip(tooltipValueTdmyIf),
     fAddMinMax(dC, {
        minY: minClose,
        maxY: maxClose,
        isNotZoomToMinMax,
        isDrawDeltaExtrems
     }),
     _fAddMiniNumberOfTrades({ id: "N of Trades", data: dN, dColumn: dNc }),
     fAddMiniVolume({ id, data: dV, dColumn: dVc }),
     fAddMiniATH({ id, data: dATH }),
     _fSetStockSerias(seriaType, seriaWidth, dC, dH, dL, dO)
  );
}

export const crStockSeriaConfig = (
  id,
  data
) => crSeriaConfig({
   data,
   minY: findMinY(data),
   zhValueText: id
})
