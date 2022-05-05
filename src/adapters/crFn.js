import { crId as _crId } from '../math/mathFn';
import {
  getPointDate,
  getPointValue
} from './getterPointFn';

const { assign, create } = Object
, _isArr = Array.isArray
, _crPTag = style =>
     style ? `<p style="${style}">` : '<p>';

const DF_ERR_MESSAGE = 'No data available for request.'

export const crHm = obj => assign(create(null), obj)

export const crError = (
  errCaption='',
  message=DF_ERR_MESSAGE
) => ({
  errCaption,
  message
})


// Quandl toScatter, Stat-Json
export const crId = () => _crId().toUpperCase()

export const crItemLink = (
  caption,
  itemUrl,
  style
) => `${_crPTag(style)}<a href="${itemUrl}">${caption}</a></p>`

const ITEM_CONF_PROP_NAMES = [
 'url',
 'loadId',
 'title',
 'subtitle',
 'itemCaption',
 'seriaType',
 'items'
]

export const crItemConf = (option) => {
  const _itemConf = {};
  let _value;
  ITEM_CONF_PROP_NAMES.forEach(k => {
    _value = option[k]
    if (_value != null) {
      _itemConf[k] = _isArr(_value)
         ? _value.map(obj => ({...obj}))
         : _value
    }
   })
   return _itemConf;
}

export const crValueConf = data => {
  const _p = data[data.length-1];
  return {
    x: getPointDate(_p),
    y: getPointValue(_p)
  };
}
