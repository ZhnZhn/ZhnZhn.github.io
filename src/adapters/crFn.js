
const _crPTag = (style) =>
 style ? `<p style="${style}">` : '<p>';

const DF_ERR_MESSAGE = 'No data available for request.'
const crFn = {
  crError: (errCaption='', message=DF_ERR_MESSAGE) => ({
    errCaption,
    message
  }),

  crId: () => (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  ).toUpperCase(),

  crItemLink: (caption, itemUrl, style) => `${_crPTag(style)}<a href="${itemUrl}">${caption}</a></p>`
}

export default crFn
