import {
  fAddMiniVolume,
  fAddMiniATH,
  fAddMiniHL,
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
    fAddMiniHL(option)(this.config)
    return this;
  }
};

export default ConfigStockSlice
