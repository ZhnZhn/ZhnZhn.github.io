export {
  assign,
  getValue
} from '../AdapterFn';

import {
  isStr,
  isTypeNumber,
  roundBy,
  crZhConfig,
  crDfLink
} from '../AdapterFn';
import { crVolumePoint } from '../pointFn';

export const CRYPTOCOMPARE_COM = 'cryptocompare.com'

const ITEM_URL = `https://${CRYPTOCOMPARE_COM}/coins`
, CRYPTOCOMPARE_OVERVIEW = "CryptoCompare Overview"
, _crDfLinkTuple = value => value && isStr(value)
  ? [
      `${CRYPTOCOMPARE_OVERVIEW} (${value})`,
      `${ITEM_URL}/${value.toLowerCase()}/overview`
    ]
  : [
      CRYPTOCOMPARE_OVERVIEW,
      ITEM_URL
    ];

const _isHLOC = (p) => isTypeNumber(p.open)
  && isTypeNumber(p.high)
  && isTypeNumber(p.low)
  && isTypeNumber(p.close);

const _addPointTo = (arr, d, value) => {
  if (isTypeNumber(value)) {
    //arr.push({ x: d, y: value })
    arr.push([d, value ])
  }
};
const _addColumnPointTo = (
  arr,
  date,
  p,
  volume
) => {
  if (isTypeNumber(volume)){
    arr.push(
      crVolumePoint({
         date: date,
         open: p.open,
         close: p.close,
         volume: volume,
         option: {
            _high: p.high,
            _low: p.low
          }
      })
    )
  }
};

const _addHLPointTo = (
  arr,
  date,
  p
) => {
    arr.push({
      x: date,
      high: roundBy(p.high - p.close, 2),
      low: roundBy(p.low - p.close, 2),
      open: p.open,
      dayHigh: p.high,
      dayLow: p.low,
      close: p.close
    })
};

export const crData = (
  json
) => {
  const data = []
  , dVolume = []
  , dColumn = []
  , dToVolume = []
  , dHL = [];
  json.Data.forEach(p => {
    if (isTypeNumber(p.time)) {
      const _date = p.time*1000;
      _addPointTo(data, _date, p.close)
      _addPointTo(dVolume, _date, p.volumefrom)
      _addPointTo(dToVolume, _date, p.volumeto)

      if (_isHLOC(p)) {
        _addColumnPointTo(dColumn,
          _date, p, p.volumefrom
        )
        _addHLPointTo(dHL, _date, p)
      }
    }
  })
  return {
    data,
    dVolume,
    dColumn,
    dToVolume,
    dHL
  };
}

export const crConfOption = (
  option
) => ({
  zhConfig: crZhConfig(
    option,
    crDfLink(..._crDfLinkTuple(option.value))
  ),
  info: {
    name: option.itemCaption
  }
})
