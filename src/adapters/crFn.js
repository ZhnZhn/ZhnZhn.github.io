import { isArr } from '../utils/isTypeFn';
import { crRouter } from '../utils/crRouter';
import { joinByBlank } from '../utils/arrFn';

import { toHref } from '../components/uiApi';

import { crId as _crId } from '../math/mathFn';
import {
  getPointDate,
  getPointValue
} from '../math/seriaHelperFn';

// Ndl toScatter, Stat-Json
export const crId = () => _crId().toUpperCase()
export const crStrLink = (
  url,
  caption,
  cn
) => {
  const _url = toHref(url);
  return _url
    ? `<a ${joinByBlank(cn ? `class="${cn}"` : '','target="_blank"')} rel="noopener" href="${_url}">${caption}</a>`
    : '';
};

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
