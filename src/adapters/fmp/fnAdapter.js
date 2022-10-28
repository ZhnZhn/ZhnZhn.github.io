export {
  getFromDate,
  getCaption,
  getValue,
  crError
} from '../AdapterFn';

import {
  _isNaN,
  crZhConfig,
  getCaption,
  joinBy,
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import {
  crItemConf,
  crValueConf
} from '../crFn';

export const _assign = Object.assign;

const _crHistoricalItemConf = (
  data,
  option
) => {
  const {
    itemCaption,
    dataSource,
    items,
    dfT,
    dfPn
  } = option;
  return {
    ...crItemConf(option),
    ...crValueConf(data),
    _itemKey: 'FMP/' + itemCaption,
    dataSource,
    items, dfT, dfPn
  };
}

const _crHistZhConfig = (
  data,
  option
) => ({
  ...crZhConfig(option),
  itemConf: _crHistoricalItemConf(data, option)
});

const _crName = items => items
  .map(getCaption)
  .join(': ');

const _crInfo = ({
  items,
  _itemUrl
}) => ({
  name: _crName(items)
});

export const crData = (
  json,
  option
) => {
  const { dfPn, _propName } = option
  , _metrics = dfPn ? json[dfPn] : json
  , _data = [];
  _metrics.forEach(item => {
    const _v = parseFloat(item[_propName]);
    if (!_isNaN(_v)) {
      _data.push([ymdToUTC(item.date), _v])
    }
  })
  return _data.reverse().sort(compareByDate);
}

export const crCaption = ({ items }) => ({
  title: getCaption(items[0]),
  subtitle: joinBy(': ',
     getCaption(items[1]),
     getCaption(items[2])
  )
})

export const addConfOption = (option) => ({
  info: _crInfo(option)
})

export const crHistOption = ({
  option,
  data
}) => ({
  info: _crInfo(option),
  zhConfig: _crHistZhConfig(data, option),
})
