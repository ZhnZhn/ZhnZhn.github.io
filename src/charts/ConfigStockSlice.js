import COLOR from '../constants/Color';

import ChartConfig from './ChartConfig';
import ChartFn from './ChartFn';
import Tooltip from './Tooltip';

const {
  setSerieData,
  crMiniVolumeConfig,
  crMiniATHConfig,
  crMiniHLConfig,
  crDividendSeria,
  crSplitRatioSeria
} = ChartConfig;
const {
  setYToPoints,
  calcMinY
} = ChartFn;

const _assign = Object.assign
, _isStr = str => typeof str === 'string';

const _crSeriaOption = (color, option) => _assign({
  type: 'line', visible: false, color,
  marker: {
    radius: 3,
    symbol: "circle"
  }
}, option);

const _crScatterBottomSeria = (crSeria, data, min, max) => {
  setYToPoints(data, calcMinY(min, max));
  return crSeria(data);
};

const ConfigStockSlice = {
  setStockSerias(seriaType, d, dH, dL, dO){
    const config = this.config;
    setSerieData(config, d, 0, 'Close', {
      type: seriaType || 'area'
    })
    setSerieData(config, dH, 1, 'High',
      _crSeriaOption(COLOR.S_HIGH)
    )
    setSerieData(config, dL, 2, 'Low',
      _crSeriaOption(COLOR.S_LOW)
    )
    setSerieData(config, dO, 3, 'Open',
      _crSeriaOption(COLOR.S_OPEN)
    )
    return this;
  },

  stockConfig(id, option){
    const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      seriaType:sT, seriaColor, seriaWidth,
      dC, dH, dL, dO,
      minClose, maxClose,
      dVc, dV,
      dATH
    } = option
    , seriaType = _isStr(sT) ? sT.toLowerCase() : 'area';
    return this.areaConfig({
        spacingTop: 25,
        seriaType, seriaColor, seriaWidth
      })
      .addTooltip(Tooltip.vTdmyIf)
      .addMiniVolume({ id, dColumn: dVc, dVolume: dV })
      .addMiniATH({ id, data: dATH })
      .setMinMax(minClose, maxClose, isNotZoomToMinMax)
      .setMinMaxDeltas(minClose, maxClose, dC, isDrawDeltaExtrems)
      .setStockSerias(seriaType, dC, dH, dL, dO);
  },

  //Used only by Alpha Vantage Daily Adjusted, Quandl EOD
  addDividend(data, min, max) {
    if (data.length > 0) {
      const seria = _crScatterBottomSeria(crDividendSeria, data, min, max)
      this._addScatterBottom(seria, 'Dividend')
    }
    return this;
  },
  //Used only by Quandl EOD
  addSplitRatio(data, min, max) {
    if (data.length > 0) {
      const seria = _crScatterBottomSeria(crSplitRatioSeria, data, min, max)
      this._addScatterBottom(seria, 'Split Ratio')
    }
    return this;
  },

  addMiniVolume(option){
    const { dVolume } = option;
    return this._addMini(dVolume, option, crMiniVolumeConfig);
  },
  addMiniATH(option){
    const { data } = option;
    return this._addMini(data, option, crMiniATHConfig);
  },
  addMiniHL(option){
    const { data } = option;
    return this._addMini(data, option, crMiniHLConfig);
  }
};

export default ConfigStockSlice
