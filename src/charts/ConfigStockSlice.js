import {
  COLOR_EX_DIVIDEND,
  COLOR_SPLIT_RATIO
} from '../constants/Color';

import {
  fTooltip
} from './Chart';
import {
  crMiniHLConfig
} from './IndicatorConfigFn';
import {
  tooltipExDividend,
  tooltipSplitRatio
} from './Tooltip';

import {
  _fSetStockSerias,
  crStockConfig,
  fAddMiniVolume,
  fAddMiniATH
} from './stockBuilderFn';

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
, _crSplitRatioSeria = (data) => _crScatterSeria(
  COLOR_SPLIT_RATIO,
  tooltipSplitRatio,
  data
);

const ConfigStockSlice = {
  //seriaType, lineWidth, dC, dH, dL, dO
  _setStockSerias(...args){
    _fSetStockSerias(...args)(this.config)
    return this;
  },

  stockConfig(id, option){
    this.config = crStockConfig(id, option)
    return this;
  },

  //Used only by Alpha Vantage Daily Adjusted, Quandl EOD
  addDividend(data, min, max) {
    const seria = _crDividendSeria(data);
    return this._addScatterBottom(seria, 'Dividend', min, max);
  },
  //Used only by Quandl EOD
  addSplitRatio(data, min, max) {
    const seria = _crSplitRatioSeria(data);
    return this._addScatterBottom(seria, 'Split Ratio', min, max);
  },

  addMiniVolume(option){
    fAddMiniVolume(option)(this.config)
    return this;
  },
  addMiniATH(option){
    fAddMiniATH(option)(this.config)
    return this;
  },
  addMiniHL(option){
    const { data } = option;
    return this._addMini(data, option, crMiniHLConfig);
  }
};

export default ConfigStockSlice
