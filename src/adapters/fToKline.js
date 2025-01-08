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
) => ({ option, json }) => ({
  ...crAddConfig(option, json),
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
  crVolume=FN_IDENTITY,
  getData=FN_IDENTITY
}) => (json, option) => {
  try {
    const _data = getData(json).reduce((data, item) => {
      const date = crDate(item[d]);
      if (isTypeNumber(date)) {
        data.push({
           date,
           open: crValue(item[o]),
           high: crValue(item[h]),
           low: crValue(item[l]),
           close: crValue(item[c]),
           volume: crVolume(item[v])
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
  isAth: options.isAth || false,
  isVolume: !options.isNotVolume,
  getArr: options.getArr || _fCrDataOHLCV(options),
  toDate: FN_IDENTITY,
  crCaption: options.crCaption,
  crAddConfig: _fCrAddConfig(options.crAddConfig)
})
