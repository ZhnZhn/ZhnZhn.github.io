import {
  FN_IDENTITY,
  FN_NOOP,
  isTypeNumber,
  crError,
  crZhConfig
} from './AdapterFn';
import crAdapterOHLCV from './crAdapterOHLCV';

const _fCrAddConfig = (
  crAddConfig=FN_NOOP
) => ({ option }) => ({
  ...crAddConfig(option),
  zhConfig: crZhConfig(option)
})

const _compareByDate = (a, b) => a.date - b.date

const _fCrDataOHLCV = ({
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
  const _data = [];
  try {
    json.forEach(arrItem => {
      const date = crDate(arrItem[d]);
      if (isTypeNumber(date)) {
        _data.push({
           date,
           open: crValue(arrItem[o]),
           high: crValue(arrItem[h]),
           low: crValue(arrItem[l]),
           close: crValue(arrItem[c]),
           volume: crVolume(arrItem[v])
         })
      }
    })
  } catch(err) {
    throw crError()
  }
  return _data.sort(_compareByDate);
};

const fToKline = (options) => crAdapterOHLCV({
  getArr: options.getArr || _fCrDataOHLCV(options),
  toDate: FN_IDENTITY,
  crAddConfig: _fCrAddConfig(options.crAddConfig)
});

export default fToKline
