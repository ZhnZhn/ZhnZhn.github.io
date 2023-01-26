import {
  crMiniHLConfig
} from './IndicatorConfigFn';

import {
  fAddMiniVolume,
  fAddMiniATH,
  fAddDividend,
  fAddSplitRatio
} from './stockBuilderFn';

const ConfigStockSlice = {
  //Used only by Alpha Vantage Daily Adjusted, Quandl EOD
  addDividend(data, min, max) {
    fAddDividend(data, min, max)(this.config)
    return this;
  },
  //Used only by Quandl EOD
  addSplitRatio(data, min, max) {
    fAddSplitRatio(data, min, max)(this.config)
    return this;
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
