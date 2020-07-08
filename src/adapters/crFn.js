
const crFn = {
  crError: (errCaption='', message='') => ({
    errCaption,
    message
  }),

  crId: () => (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  ).toUpperCase(),

  crItemLink: (caption, itemUrl) => `<p><a href="${itemUrl}" style="padding-top: 4px;">${caption}</a></p>`
}

export default crFn
