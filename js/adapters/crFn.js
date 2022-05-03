"use strict";

exports.__esModule = true;
exports.default = void 0;

var _mathFn = require("../math/mathFn");

const {
  assign,
  create
} = Object;

const _crPTag = style => style ? "<p style=\"" + style + "\">" : '<p>';

const DF_ERR_MESSAGE = 'No data available for request.';
const crFn = {
  crHm: obj => assign(create(null), obj),
  crError: function (errCaption, message) {
    if (errCaption === void 0) {
      errCaption = '';
    }

    if (message === void 0) {
      message = DF_ERR_MESSAGE;
    }

    return {
      errCaption,
      message
    };
  },
  crId: () => (0, _mathFn.crId)().toUpperCase(),
  crItemLink: (caption, itemUrl, style) => _crPTag(style) + "<a href=\"" + itemUrl + "\">" + caption + "</a></p>"
};
var _default = crFn;
exports.default = _default;
//# sourceMappingURL=crFn.js.map