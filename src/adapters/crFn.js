import { crId } from '../math/mathFn';
const { assign, create } = Object;

const _crPTag = style =>
 style ? `<p style="${style}">` : '<p>';

const DF_ERR_MESSAGE = 'No data available for request.'
const crFn = {
  crHm: obj => assign(create(null), obj),

  crError: (errCaption='', message=DF_ERR_MESSAGE) => ({
    errCaption,
    message
  }),

  crId: () => crId().toUpperCase(),

  crItemLink: (caption, itemUrl, style) => `${_crPTag(style)}<a href="${itemUrl}">${caption}</a></p>`
};

export default crFn
