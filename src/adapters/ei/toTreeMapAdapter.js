import pipe from '../../utils/pipe';
import formatNumber from '../../utils/formatNumber';
import domSanitize from '../../utils/domSanitize';

import {
  crTreeMapConfig,
  fAddCaption,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';

import {
  roundBy,
  joinBy
} from '../AdapterFn';

import {
  CL_TREE_MAP_PERCENT_BLACK
} from '../CL';

const COLOR_FOSSIL_FUEL = "#658fb9"
, COLOR_NOT_FOSSIL_FUEL = "#6ea3d7";

const _isFossilFuel = (
  label
) => label === "Coal"
 || label === "Natural gas"
 || label === "Oil";

const _crColor = (
   label
) => _isFossilFuel(label)
  ? COLOR_FOSSIL_FUEL
  : COLOR_NOT_FOSSIL_FUEL;

const _sumByValue = (
  total,
  item
) => total + item.value;

const _crTotal = (
  data
) => data.reduce(_sumByValue, 0);

const _crItemValue = (
  total
) => total
  ? formatNumber(roundBy(total, total > 100 ? 0 : 2))
  : '';


const _crData = (
  title,
  data,
  total
) => {
  const _onePercent = total/100
  , _rt = _onePercent > 1 ? 0 : 2;
  return data.map(item => {
    const {
      value,
      label
    } = item
    , _value = roundBy(value, _rt)
    , _percent = roundBy(value/_onePercent, 0);
    return {
      color: _crColor(label),
      value: _value,
      title: domSanitize(title),
      label: domSanitize(`${label} (${_percent}%)`),
      name: domSanitize(`${label}<br/><span class="${CL_TREE_MAP_PERCENT_BLACK}">${formatNumber(_value)} (${_percent}%)</span>`)
    };
  });
}

const _crTotalToken = (
  title,
  value,
  onePercent
) => `${title} ${_crItemValue(value)} (${roundBy(value/onePercent, 0)}%)`

const _crCaption = (
  json,
  option,
  total
) => {
  const _arrTotal = json.data.reduce((arrTotal, {label, value}) => {
    arrTotal[_isFossilFuel(label) ? 0 : 1] += value
    return arrTotal;
  }, [0, 0])
  , _onePercent = total/100
  , _titleF = _crTotalToken("Fossil Fuels", _arrTotal[0], _onePercent)
  , _titleNf =  _crTotalToken('Not Fossil Fuels', _arrTotal[1], _onePercent);
  return [
    joinBy(": ", option.title, option.dfTmTitle),
    _arrTotal[0] > _arrTotal[1]
       ? `${_titleF}, ${_titleNf}`
       : `${_titleNf}, ${_titleF}`
  ];
}

const toTreeMapAdapter = () => {
  const adapter = {
    toConfig: (json, option) => {
      const {
        data
      } = json
      , {
        _itemKey,
        title
      } = option
      , total = _crTotal(data)
      , [
        captionTitle,
        captionSubtitle
      ] = _crCaption(json, option, total);

      return { config: pipe(
        crTreeMapConfig(_crData(title, data, total)),
        fAddCaption(
          captionTitle,
          captionSubtitle
        ),
        fAdd({
          zhConfig: {
            id: _itemKey,
            key: _itemKey,
            itemCaption: title,
            itemTime: option.time,
            itemValue: _crItemValue(total),
            dataSource: option.dataSource
          }
        }),
        toConfig
      )};
    }
  };
  return adapter;
}

export default toTreeMapAdapter
