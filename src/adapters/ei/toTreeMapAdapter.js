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

const _crColor = (
  label
) => label === "Coal"
 || label === "Natural gas"
 || label === "Oil"
 ? COLOR_FOSSIL_FUEL
 : COLOR_NOT_FOSSIL_FUEL;

const _crTotal = (
  data
) => data.reduce(_sumByValue, 0)

const _crData = (
  title,
  data,
  total
) => {
  const _onePercent = total/100;
  return data.map(item => {
    const {
      value,
      label
    } = item
    , _value = roundBy(value, 0)
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


const toTreeMapAdapter = () => {
  const adapter = {
    toConfig: (json, option) => {
      const {
        _itemKey,
        title,
        dfTmTitle
      } = option
      , total = _crTotal(json.data);

      return { config: pipe(
        crTreeMapConfig(_crData(title, json.data, total)),
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
            itemValue: total ? formatNumber(roundBy(total, 0)) : '',
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
