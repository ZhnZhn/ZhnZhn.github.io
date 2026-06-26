import { isArr } from '../utils/isTypeFn';
import { bindTo } from '../utils/bindTo';
import { crRouter } from '../utils/crRouter';

import { crId as _crId } from '../math/mathFn';
import {
  getPointDate,
  getPointValue
} from '../math/seriaHelperFn';

// Ndl toScatter, Stat-Json
export const crId = () => _crId().toUpperCase()

const ITEM_CONF_PROP_NAMES = [
 'url',
 'loadId',
 'title',
 'subtitle',
 'itemCaption',
 'seriaType',
 'items'
];

export const crItemConf = (
  option
) => ITEM_CONF_PROP_NAMES.reduce((itemConf, pn) => {
  const _value = option[pn];
  if (_value != null) {
    itemConf[pn] = isArr(_value)
      ? _value.map(obj => ({...obj}))
      : _value
  }
  return itemConf;
}, crRouter());

export const crValueConf = data => {
  const _p = data[data.length-1];
  return {
    x: getPointDate(_p),
    y: getPointValue(_p)
  };
}
