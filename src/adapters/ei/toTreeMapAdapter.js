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
  roundBy
} from '../AdapterFn';

import {
  CL_TREE_MAP_PERCENT_BLACK
} from '../CL';

const COLOR_FOSSIL_FUEL = "#658fb9"
, COLOR_NOT_FOSSIL_FUEL = "#6ea3d7";

const _sumByValue = (
  total,
  item
) => total + item.value;

const _crTotal = (
  data
) => data.reduce(_sumByValue, 0);

const _crColor = (
  label
) => label === "Coal"
 || label === "Natural gas"
 || label === "Oil"
 ? COLOR_FOSSIL_FUEL
 : COLOR_NOT_FOSSIL_FUEL;

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

const _crItemValue = (
  total
) => total
  ? formatNumber(roundBy(total, total > 10 ? 0 : 2))
  : '';

const toTreeMapAdapter = () => {
  const adapter = {
    toConfig: (json, option) => {
      const {
        data
      } = json
      , {
        _itemKey,
        title,
        dfTmTitle
      } = option
      , total = _crTotal(data);

      return { config: pipe(
        crTreeMapConfig(_crData(title, data, total)),
        fAddCaption(
          title,
          dfTmTitle
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
