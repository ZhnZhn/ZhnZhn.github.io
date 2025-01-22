import {
  toTd,
  roundByOHLC
} from "../AdapterFn";
import {
  crRankProps,  
  crNameProps,
  crNumberProps,
  crTableConfig,
  crTableRows
} from "../toTableFn";

const _pnTurnoverUsd = "turnover"
, HEADERS = [
  crRankProps("Rank", "id")
, crNameProps("Base")
, crNameProps("Quote")
, {
  ...crNameProps("Volume"),
  ...crNumberProps(0)
},{
  ...crNameProps("Price"),
  ...crNumberProps()
},{
  ...crNameProps("Price USD", "price_usd", true),
  ...crNumberProps()
},{
  ...crNameProps("V*P USD", _pnTurnoverUsd, true),
  ...crNumberProps(0)
}
, crNameProps("Time", true)
, crNameProps("Date", true)
];

const _crTimeDate = (
  time
) => toTd(time*1000).split(" ")
// base = null or quote = null or volume = 0
, _isNotEmptyPair = ({
  base,
  quote,
  volume
}) => base && quote && volume !== 0
, _crRows = (json) => {
  const { pairs } = json
  , _rows = []
  , _len = pairs.length;
  let tMin = NaN
  , tMax = NaN
  , item
  , i = 0
  , id = 1;
  for (i; i<_len; i++){
    item = pairs[i]
    if (_isNotEmptyPair(item)) {
      const _time  = item.time
      , [time="", date=""] = _crTimeDate(_time)
      , _priceUsd = item.price_usd;
      _rows.push({
        ...item,
        "price_usd": roundByOHLC(_priceUsd),
        [_pnTurnoverUsd]: item.volume * _priceUsd,
        time,
        date,
        id
      })
      tMin = tMin < _time ? tMin : _time
      tMax = tMax > _time ? tMax : _time
      id++
    }
  }
  return {
    rows: crTableRows(HEADERS, _rows),
    tMin, tMax
  };
},
_crTimePeriod = (tMin, tMax) => {
  const tdMin = toTd(tMin*1000)
  , tdMax = toTd(tMax*1000)
  , minArr = tdMin.split(" ")
  , maxArr = tdMax.split(" ")
  , dmy = minArr[1] === maxArr[1]
      ? minArr[1]
      : void 0;
  return dmy
    ? `${minArr[0]} - ${maxArr[0]} ${dmy}`
    : `${tdMin} ${tdMax}`;
},
_crTitle = (json, { items }, tMin, tMax) => {
  const _title = (json["0"] || {}).name || items[0].c
  , _period = _crTimePeriod(tMin, tMax);
  return `${_title} ${_period}`;
};

const ClAdapter = {
  toConfig(json, option){
    const {
      _itemKey,
      dataSource
    } = option
    , {
      rows,
      tMin,
      tMax
    } = _crRows(json)
    , title = _crTitle(json, option, tMin, tMax)
    , config = crTableConfig({
       id: _itemKey,
       title,
       headers: HEADERS,
       rows,
       dataSource
    });
    return { config };
  }
};

export default ClAdapter
