import DOMPurify from 'dompurify';
import Builder from '../../charts/ConfigBuilder';
import {
  addColorsTo,
  crPointName
} from '../TreeMapFn';

import {
  roundBy,
  crInfo,
  crZhConfig
} from './fnAdapter';

const _sanitize = DOMPurify.sanitize;

const _isNumber = n => typeof n === 'number'
  && n-n === 0;

const _compareByValue = (a, b) => b.value - a.value;

const _crTreeMapData = json => {
  const data = [];
  let _total = 0;
  json.dataset.forEach(item => {
    const value = item.TradeValue
    , cmdCode = item.cmdCode
    , period = item.period;
    if (_isNumber(value) && value > 0) {
      _total += value
      data.push({
        value,
        label: (cmdCode || '').length === 2
          ? cmdCode
          : _sanitize(cmdCode),
        _d: _sanitize(item.cmdDescE),
        title: _isNumber(period)
          ? ''+period
          : _sanitize(period)
      })
    }
  })
  const _onePercent = _total/100;
  data.forEach(item => {
    item.percent = roundBy(item.value/_onePercent)
    item.name = crPointName(
      item.label + ' ' + item._d,
      item.value,
      item.percent
    )
    item._d = void 0
  })
  data.sort(_compareByValue)
  addColorsTo(data, _total)
  return data;
}

const _crTitle = ({
  title,
  period
}) => [title, 'in', period]
 .filter(Boolean)
 .join(' ');

const toTreeMap = (
  json,
  option
) => {
  const config = Builder()
    .treeMapConfig(_crTreeMapData(json))
    .addCaption(
       _crTitle(option),
       option.subtitle
    )
    .add({
       info: crInfo(json, option),
       zhConfig: crZhConfig(option)
    })
    .toConfig();
  return config;
};

export default toTreeMap
