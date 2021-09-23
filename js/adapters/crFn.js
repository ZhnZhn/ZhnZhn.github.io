"use strict";

exports.__esModule = true;
exports.default = void 0;
const {
  assign,
  create
} = Object;

const _crPTag = style => style ? "<p style=\"" + style + "\">" : '<p>';

const DF_ERR_MESSAGE = 'No data available for request.';
const crFn = {
  crHm: obj => assign(create(null), obj),
  crError: (errCaption = '', message = DF_ERR_MESSAGE) => ({
    errCaption,
    message
  }),
  crId: () => (Date.now().toString(36) + Math.random().toString(36).substring(2, 9)).toUpperCase(),
  crItemLink: (caption, itemUrl, style) => _crPTag(style) + "<a href=\"" + itemUrl + "\">" + caption + "</a></p>"
};
var _default = crFn;
exports.default = _default;
//# sourceMappingURL=crFn.js.map