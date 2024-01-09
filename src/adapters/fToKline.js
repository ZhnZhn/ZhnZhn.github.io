import {
  isTypeNumber,
  crError,
  crZhConfig
} from './AdapterFn';
import crAdapterOHLCV from './crAdapterOHLCV';

const _crAddConfig = ({ option }) => ({
  zhConfig: crZhConfig(option)
});

const _compareByDate = (a, b) => a.date - b.date

const FN_IDENTITY = v => v;
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
  getArr: _fCrDataOHLCV(options),
  toDate: date => date,
  crAddConfig: _crAddConfig
});

export default fToKline
