import { crId as _crId } from '../math/mathFn';
const { assign, create } = Object;

const _crPTag = style =>
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
