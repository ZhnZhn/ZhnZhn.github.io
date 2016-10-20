'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  CAP: {
    paddingRight: '8px'
  },
  SALE_PRICE: {
    display: 'display-inline',
    color: 'rgb(47, 126, 216)',
    paddingRight: '8px',
    width: '100px',
    float: 'right'
  },
  IPO: {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    paddingRight: '8px',
    width: '80px',
    float: 'right'
  }
};

var RowCap = function RowCap(_ref) {
  var cap = _ref.cap;
  var salePrice = _ref.salePrice;
  var ipo = _ref.ipo;

  var _cap = cap === 0 ? 'n/a' : cap;
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
      'on ' + salePrice
    )
  );
};

exports.default = RowCap;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-items\RowCap.js.map