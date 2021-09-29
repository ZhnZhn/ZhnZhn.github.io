import COLOR from '../constants/Color';

import Chart from './Chart';
import ChartConfig from './ChartConfig';
import Tooltip from './Tooltip';

const { crType, fTooltip } = Chart;
const {
  setSerieData,
  crMiniVolumeConfig,
  crMiniATHConfig,
  crMiniHLConfig
} = ChartConfig;

const _crSeriaOption = (color, lineWidth) => ({
  type: 'line', visible: false,
  color, lineWidth,
  marker: {
    radius: 3,
    symbol: "circle"
  }
});

const _crScatterSeria = (color, pointFormatter, data) => ({
  type: 'scatter',
  color, data,
  tooltip: fTooltip(pointFormatter),
})
, _crDividendSeria = (data) => _crScatterSeria(
  COLOR.EX_DIVIDEND,
  Tooltip.exDividend,
  data
)
, _crSplitRatioSeria = (data) => _crScatterSeria(
  COLOR.SPLIT_RATIO,
  Tooltip.splitRatio,
  data
);

const ConfigStockSlice = {
  _setStockSerias(seriaType, lineWidth, dC, dH, dL, dO){
    const config = this.config
    , type = crType(seriaType, 'area');
    setSerieData(config, dC, 0, 'Close', {
      type, lineWidth
    })
    setSerieData(config, dH, 1, 'High',
      _crSeriaOption(COLOR.S_HIGH, lineWidth)
    )
    setSerieData(config, dL, 2, 'Low',
      _crSeriaOption(COLOR.S_LOW, lineWidth)
    )
    setSerieData(config, dO, 3, 'Open',
      _crSeriaOption(COLOR.S_OPEN, lineWidth)
    )
    return this;
  },

  stockConfig(id, option){
    const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      seriaType, seriaWidth,
      dC, dH, dL, dO,
      minClose, maxClose,
      dVc, dV,
      dATH
    } = option;
    return this.areaConfig({ spacingTop: 25 })
      .addTooltip(Tooltip.vTdmyIf)
      .addMinMax(dC, {
          minY: minClose, maxY: maxClose,
          isNotZoomToMinMax, isDrawDeltaExtrems
       })
      .addMiniVolume({ id, dColumn: dVc, dVolume: dV })
      .addMiniATH({ id, data: dATH })
      ._setStockSerias(seriaType, seriaWidth, dC, dH, dL, dO);
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
