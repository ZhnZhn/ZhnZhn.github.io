'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _formatNumber = require('./formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOCALE = void 0;

var _getLocale = function _getLocale() {
  return LOCALE || (LOCALE = Array.isArray(navigator.languages) ? navigator.languages[0] : navigator.language || 'en', LOCALE);
};

var _crCurrencyFormatter = function _crCurrencyFormatter() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref$currency = _ref.currency,
      currency = _ref$currency === undefined ? 'USD' : _ref$currency,
      restProps = (0, _objectWithoutProperties3.default)(_ref, ['currency']);
  return {
    _f: new Intl.NumberFormat(_getLocale(), (0, _extends3.default)({
      style: 'currency',
      currency: currency
    }, restProps)),
    format: function format(number) {
      return number == null ? this._f.format(0) : this._f.format(number);
    }
  };
};

var crCurrencyFormatter = function crCurrencyFormatter(options) {
  return Intl && Intl.NumberFormat ? _crCurrencyFormatter(options) : { format: _formatNumber2.default };
};

exports.default = crCurrencyFormatter;
//# sourceMappingURL=crCurrencyFormatter.js.map