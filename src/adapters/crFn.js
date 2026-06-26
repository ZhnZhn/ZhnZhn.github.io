import { isArr } from '../utils/isTypeFn';
import { bindTo } from '../utils/bindTo';
import { crRouter } from '../utils/crRouter';

import { toHref } from '../components/uiApi';

import { crId as _crId } from '../math/mathFn';
import {
  getPointDate,
  getPointValue
} from '../math/seriaHelperFn';

const _crPTag = className => className
  ? `<p class="${className}">`
  : '<p>';

// Ndl toScatter, Stat-Json
export const crId = () => _crId().toUpperCase()

const _crItemLink = (
  caption,
  itemUrl,
  className
) => {
  const _href = toHref(itemUrl);
  return _href
    ? `${_crPTag(className)}<a target="_blank" rel="noopener" href="${_href}">${caption}</a></p>`
    : '';
}

export const fCrItemLinkByUrl = (
  caption,
  url
) => bindTo(_crItemLink, caption, url)

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
