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

const _crValuePercentToken = (
  percent,
  value
) => `${formatNumber(value)} (${percent}%)`
, _crPercentToken = percent => percent >= 1
   ? `${percent}%`
   : `.${(''+percent).split(".")[1]}%`
, fCrName = (crToken) => (
  label,
  percent,
  value
) => domSanitize(`${label}<br/><span class="${CL_TREE_MAP_PERCENT_BLACK}">${crToken(percent, value)}</span>`)
, _crValuePercentName = fCrName(_crValuePercentToken)
, _crPercentName = fCrName(_crPercentToken)
, _isPercentName = (
  data
) => data.length > 8 && data[0].value > 1000;

const _crDataImpl = (
  data,
  option,
  totalRt,
  onePercent,
  percRt
) => {
  const { title } = option
  , _crName = _isPercentName(data)
      ? _crPercentName
      : _crValuePercentName;
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
      name: _crName(label, _percent, _value),
      dataLabels: item._level === 3 && _percent < 1
        ? { enabled: false }
        : void 0
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

const _crSubValue = v => isNumber(v) ? v : 0;
const _isZeroValueCase = (
  v,
  sum
) => sum === 0 && v !== 0;
export const crRoundedSubTotal = (
  v1,
  v2,
  total,
  totalRt
) => {
  const _v1 = _crSubValue(v1)
  , _v2 = _crSubValue(v2)
  , _rt1 = _crSubTotalRt(_v1, totalRt)
  , _rt2 = _crSubTotalRt(_v2, totalRt)
  , _sum1 = roundBy(_v1, _rt1)
  , _sum2 = roundBy(_v2, _rt2);
  return _sum1 + _sum2 > total
    || _isZeroValueCase(_v1, _sum1)
    || _isZeroValueCase(_v2, _sum2)
    ? [
      roundBy(_v1, _rt1 + 1),
      roundBy(_v2, _rt2 + 1)
    ]
    : [
    _sum1,
    _sum2
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
      ] = getDataTotalTuple(json, option)
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
