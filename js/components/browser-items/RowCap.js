'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _accounting = require('accounting');

var _accounting2 = _interopRequireDefault(_accounting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NA = 'n/a';

var STYLE = {
  CAP: {
    paddingRight: '8px'
  },
  SALE_PRICE: {
    display: 'display-inline',
    color: 'rgb(47, 126, 216)',
    paddingRight: '8px',
    width: '90px',
    float: 'right'
  },
  IPO: {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    //paddingRight: '8px',
    width: '70px',
    float: 'right'
  }
};

var RowCap = function RowCap(_ref) {
  var cap = _ref.cap,
      salePrice = _ref.salePrice,
      ipo = _ref.ipo;

  var _cap = cap === 0 ? NA : _accounting2.default.formatMoney(cap),
      _salePrice = cap !== NA && cap !== 0 ? _accounting2.default.formatMoney(salePrice) : NA;
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