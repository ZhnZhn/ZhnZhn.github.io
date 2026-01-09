"use strict";

exports.__esModule = true;
exports.default = void 0;
var _formatNumberFn = require("./formatNumberFn");
let LOCALE;
const _getLocale = () => LOCALE || (LOCALE = Array.isArray(navigator.languages) ? navigator.languages[0] : navigator.language || 'en', LOCALE);
const _crCurrencyFormatter = function (_temp) {
  let {
    currency = 'USD',
    ...restProps
  } = _temp === void 0 ? {} : _temp;
  return {
    _f: new Intl.NumberFormat(_getLocale(), {
      style: 'currency',
      currency,
      ...restProps
    }),
    format: function (number) {
      return number == null ? this._f.format(0) : this._f.format(number);
    }
  };
};
const crCurrencyFormatter = options => {
  return Intl && Intl.NumberFormat ? _crCurrencyFormatter(options) : {
    format: _formatNumberFn.formatNumber
  };
};
var _default = exports.default = crCurrencyFormatter;
//# sourceMappingURL=crCurrencyFormatter.js.map