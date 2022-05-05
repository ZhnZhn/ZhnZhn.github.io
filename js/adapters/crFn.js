"use strict";

exports.__esModule = true;
exports.crItemLink = exports.crId = exports.crHm = exports.crError = void 0;

var _mathFn = require("../math/mathFn");

const {
  assign,
  create
} = Object;

const _crPTag = style => style ? "<p style=\"" + style + "\">" : '<p>';

const DF_ERR_MESSAGE = 'No data available for request.';

const crHm = obj => assign(create(null), obj);

exports.crHm = crHm;

const crError = function (errCaption, message) {
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
}; // Quandl toScatter, Stat-Json


exports.crError = crError;

const crId = () => (0, _mathFn.crId)().toUpperCase();

exports.crId = crId;

const crItemLink = (caption, itemUrl, style) => _crPTag(style) + "<a href=\"" + itemUrl + "\">" + caption + "</a></p>";

exports.crItemLink = crItemLink;
//# sourceMappingURL=crFn.js.map