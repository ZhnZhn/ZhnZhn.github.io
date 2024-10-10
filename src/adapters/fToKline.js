import {
  FN_IDENTITY,
  FN_NOOP,
  isTypeNumber,
  crError,
  crZhConfig,
  roundByOHLC
} from './AdapterFn';
import crAdapterOHLCV from './crAdapterOHLCV';

const _fCrAddConfig = (
  crAddConfig=FN_NOOP
) => ({ option }) => ({
  ...crAddConfig(option),
  zhConfig: crZhConfig(option)
})
, _compareByDate = (a, b) => a.date - b.date
, _fCrDataOHLCV = ({
  d=0,
  o=1,
  h=3,
  l=4,
  c=2,
  v=5,
  crDate=FN_IDENTITY,
  crValue=FN_IDENTITY,
  crVolume=FN_IDENTITY
}) => (json, option) => {
  try {
    const _data = json.reduce((data, arrItem) => {
      const date = crDate(arrItem[d]);
      if (isTypeNumber(date)) {
        data.push({
           date,
           open: crValue(arrItem[o]),
           high: crValue(arrItem[h]),
           low: crValue(arrItem[l]),
           close: crValue(arrItem[c]),
           volume: crVolume(arrItem[v])
         })
      }
      return data;
    }, []).sort(_compareByDate);
    return _data;
  } catch(err) {
    throw crError();
  }
}
, _parseFloat = parseFloat;

export const crOptionsFromStr = (
  isSeconds=true
) => {
  const _m = isSeconds ? 1000 : 1;
  return {
    crDate: v => _parseFloat(v)*_m,
    crValue: v => roundByOHLC(_parseFloat(v)),
    crVolume: v => _parseFloat(v)
  };
}

export const fToKline = (options) => crAdapterOHLCV({
  isAth: false,
  isVolume: !options.isNotVolume,
  getArr: options.getArr || _fCrDataOHLCV(options),
  toDate: FN_IDENTITY,
  crAddConfig: _fCrAddConfig(options.crAddConfig)
})
