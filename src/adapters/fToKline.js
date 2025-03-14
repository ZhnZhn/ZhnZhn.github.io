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
, _compareByDate = (a, b) => a[0] - b[0]
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
    const _isVolume = v !== -1
    , _data = getData(json, option).reduce((data, item) => {
      const date = crDate(item[d]);
      if (isTypeNumber(date)) {
        data.push([
           date,
           crValue(item[o]),
           crValue(item[h]),
           crValue(item[l]),
           crValue(item[c]),
           _isVolume ? crVolume(item[v]) : void 0
         ])
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
  isAth: options.isAth,
  crCaption: options.crCaption,
  getArr: _fCrDataOHLCV(options),
  crAddConfig: _fCrAddConfig(options.crAddConfig)
})
