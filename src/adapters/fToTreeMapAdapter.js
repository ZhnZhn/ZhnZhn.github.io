import pipe from '../utils/pipe';
import formatNumber from '../utils/formatNumber';
import domSanitize from '../utils/domSanitize';

import {
  crTreeMapConfig,
  fAddCaption,
  fAdd,
  toConfig
} from '../charts/configBuilderFn';

import {
  isNumber,
  roundBy,
  joinBy
} from './AdapterFn';

import {
  CL_TREE_MAP_PERCENT_BLACK
} from './CL';

const COLOR_FOSSIL_FUEL = "#658fb9"
, COLOR_NOT_FOSSIL_FUEL = "#6ea3d7";

const _isFossilFuel = (
  label
) => label === "Coal"
 || label === "Natural gas"
 || label === "Oil"
 // Ember
 || label === "Gas"
 || label === "Other Fossil"

export const crItemColor = (
   label
) => _isFossilFuel(label)
  ? COLOR_FOSSIL_FUEL
  : COLOR_NOT_FOSSIL_FUEL;

const _fSumBy = (propName) => (
  total,
  item
) => total + item[propName]
, _sumByPerc = _fSumBy('_perc')
, _fCrTotal = (sumBy) => (
  data
) => data.reduce(sumBy, 0)
, _crTotalPerc = _fCrTotal(_sumByPerc);


const _crTotalConfig = (
  total
) => {
  const onePercent = total/100
  , _totalRt = onePercent > 1 ? 0 : 2
  , _total = roundBy(total, _totalRt)
  , _onePercent = _total/100;
  return [
    _total,
    _totalRt,
    _onePercent
  ];
};

const _crItemRt = (
  value,
  rt
) => value >= 10
  ? rt
  : value >= 0.01
      ? 2
      : value >= 0.0001
          ? 4
          : 6;

const _crValue = (
  value,
  totalRt
) => roundBy(value, _crItemRt(value, totalRt));

const _crDataImpl = (
  data,
  option,
  totalRt,
  onePercent,
  percRt
) => {
  const { title } = option;
  return data.map(item => {
    const value = item.value
    , label = item.label
    , _value = _crValue(value, totalRt)
    , _percent = roundBy(value/onePercent, percRt);
    return {
      color: item.color,
      value: _value,
      _value: value,
      _perc: _percent,
      title: domSanitize(title),
      _label: domSanitize(label),
      label: domSanitize(`${label} (${_percent}%)`),
      name: domSanitize(`${label}<br/><span class="${CL_TREE_MAP_PERCENT_BLACK}">${formatNumber(_value)} (${_percent}%)</span>`)
    };
  }, []);
}

const _crData = (
  ...args
) => {
  const _data = _crDataImpl(...args, 0);
  return _crTotalPerc(_data) === 100
    ? _data
    : _crDataImpl(...args, 1);
};

const _crTotalToken = (
  title,
  value,
  perc
) => `${title} ${formatNumber(value, true)} (${perc}%)`

const _crSubTotalRt = (
  value,
  rt
) => isNumber(rt)
  ? _crItemRt(value, rt)
  : 0;

export const crRoundedSubTotal = (
  v1,
  v2,
  total,
  totalRt
) => {
  const _rtFf = _crSubTotalRt(v1, totalRt)
  , _rtNff = _crSubTotalRt(v2, totalRt)
  , _ffTotal = roundBy(v1, _rtFf)
  , _nffTotal = roundBy(v2, _rtNff);
  return _ffTotal + _nffTotal > total
    ? [
        roundBy(v1, _rtFf + 1),
        roundBy(v2, _rtNff + 1)
      ]
    : [
      _ffTotal,
      _nffTotal
    ];
};

const _crCaption = (
  data,
  option,
  total,
  totalRt,
  onePercent
) => {
  const _arrTotal = data
    .reduce((arrTotal, {_label, _value}) => {
       const _isFf = _isFossilFuel(_label);
       arrTotal[_isFf ? 0 : 1] += _value
       return arrTotal;
  }, [0, 0])
  , [
    ffTotal,
    nffTotal
  ] = crRoundedSubTotal(
    _arrTotal[0],
    _arrTotal[1],
    total,
    totalRt
  )
  , [
    ffPerc,
    nffPerc
  ] = crRoundedSubTotal(
    ffTotal/onePercent,
    nffTotal/onePercent,
    100
  )
  , _titleF = _crTotalToken("Fossil Fuels", ffTotal, ffPerc)
  , _titleNf =  _crTotalToken('Not Fossil Fuels', nffTotal, nffPerc);
  return [
    joinBy(": ", option.title, option.dfTmTitle),
    _arrTotal[0] > _arrTotal[1]
       ? `${_titleF}, ${_titleNf}`
       : `${_titleNf}, ${_titleF}`
  ];
}

export const fToTreeMapAdapter = (
  getDataTotalTuple,
  crCaption=_crCaption
) => () => {
  const adapter = {
    toConfig: (json, option) => {
      const [
        data,
        total
      ] = getDataTotalTuple(json)
      , {
        _itemKey
      } = option
      , [
        _total,
        _totalRt,
        _onePercent
      ] = _crTotalConfig(total)
      , _data = _crData(
        data,
        option,
        _totalRt,
        _onePercent
      )
      , [
        captionTitle,
        captionSubtitle
      ] = crCaption(
        _data,
        option,
        _total,
        _totalRt,
        _onePercent
      );
      return { config: pipe(
        crTreeMapConfig(_data),
        fAddCaption(
          captionTitle,
          captionSubtitle
        ),
        fAdd({
          zhConfig: {
            id: _itemKey,
            key: _itemKey,
            itemCaption: option.title,
            itemTime: option.time,
            itemValue: formatNumber(_total),
            dataSource: option.dataSource
          }
        }),
        toConfig
      )};
    }
  };
  return adapter;
}
