import { crId as _crId } from '../math/mathFn';
import { bindTo } from './AdapterFn';
import {
  getPointDate,
  getPointValue
} from './getterPointFn';

const { assign, create } = Object
, _isArr = Array.isArray
, _crPTag = className => className
    ? `<p class="${className}">`
    : '<p>';

export const crHm = obj => assign(create(null), obj)

// Ndl toScatter, Stat-Json
export const crId = () => _crId().toUpperCase()

const _crItemLink = (
  caption,
  itemUrl,
  className
) => `${_crPTag(className)}<a href="${itemUrl}">${caption}</a></p>`

export const fCrItemLinkByCaption = (
  caption
) => bindTo(_crItemLink, caption)
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
    itemConf[pn] = _isArr(_value)
      ? _value.map(obj => ({...obj}))
      : _value
  }
  return itemConf;
}, crHm());

export const crValueConf = data => {
  const _p = data[data.length-1];
  return {
    x: getPointDate(_p),
    y: getPointValue(_p)
  };
}
