'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _crCurrencyFormatter = require('../../utils/crCurrencyFormatter');

var _crCurrencyFormatter2 = _interopRequireDefault(_crCurrencyFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NA = 'n/a';

var STYLE = {
  CAP: {
    paddingRight: 8
  },
  SALE_PRICE: {
    display: 'display-inline',
    color: 'rgb(47, 126, 216)',
    paddingRight: 8,
    width: 90,
    float: 'right'
  },
  IPO: {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    width: 70,
    float: 'right'
  }
};

var _capFormatter = (0, _crCurrencyFormatter2.default)({
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
var _formatter = (0, _crCurrencyFormatter2.default)();

var RowCap = function RowCap(_ref) {
  var cap = _ref.cap,
      salePrice = _ref.salePrice,
      ipo = _ref.ipo;

  var _cap = cap === 0 ? NA : _capFormatter.format(cap),
      _salePrice = cap !== NA && cap !== 0 ? _formatter.format(salePrice) : NA;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'span',
      { style: STYLE.CAP },
      _cap
    ),
    _react2.default.createElement(
      'span',
      { style: STYLE.IPO },
      'ipo ' + ipo
    ),
    _react2.default.createElement(
      'span',
      { style: STYLE.SALE_PRICE },
      _salePrice
    )
  );
};

exports.default = RowCap;
//# sourceMappingURL=RowCap.js.map