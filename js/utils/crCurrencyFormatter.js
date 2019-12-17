"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _formatNumber = _interopRequireDefault(require("./formatNumber"));

var LOCALE;

var _getLocale = function _getLocale() {
  return LOCALE || (LOCALE = Array.isArray(navigator.languages) ? navigator.languages[0] : navigator.language || 'en', LOCALE);
};

var _crCurrencyFormatter = function _crCurrencyFormatter(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$currency = _ref.currency,
      currency = _ref$currency === void 0 ? 'USD' : _ref$currency,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["currency"]);

  return {
    _f: new Intl.NumberFormat(_getLocale(), (0, _extends2["default"])({
      style: 'currency',
      currency: currency
    }, restProps)),
    format: function format(number) {
      return number == null ? this._f.format(0) : this._f.format(number);
    }
  };
};

var crCurrencyFormatter = function crCurrencyFormatter(options) {
  return Intl && Intl.NumberFormat ? _crCurrencyFormatter(options) : {
    format: _formatNumber["default"]
  };
};

var _default = crCurrencyFormatter;
exports["default"] = _default;
//# sourceMappingURL=crCurrencyFormatter.js.map