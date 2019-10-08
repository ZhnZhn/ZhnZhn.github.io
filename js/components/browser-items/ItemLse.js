'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _crCurrencyFormatter = require('../../utils/crCurrencyFormatter');

var _crCurrencyFormatter2 = _interopRequireDefault(_crCurrencyFormatter);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NA = 'n/a',
    ML = ' ml';

var STYLE = {
  CAP: {
    paddingRight: 8
  },
  COUNTRY: {
    display: 'display-inline',
    color: 'gray',
    width: 35,
    float: 'right'
  },
  DATE: {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    width: 85,
    float: 'right'
  }
};

var _formatter = (0, _crCurrencyFormatter2.default)({
  currency: 'GBP',
  minimumFractionDigits: 3
});

var ItemLse = function ItemLse(props) {
  var item = props.item,
      _ref = item || {},
      cap = _ref.cap,
      c = _ref.c,
      date = _ref.date,
      _cap = cap === 0 ? NA : _formatter.format(cap) + ML;

  return _react2.default.createElement(
    _Item2.default,
    props,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { style: STYLE.CAP },
        _cap
      ),
      _react2.default.createElement(
        'span',
        { style: STYLE.DATE },
        date
      ),
      _react2.default.createElement(
        'span',
        { style: STYLE.COUNTRY },
        c
      )
    )
  );
};

exports.default = ItemLse;
//# sourceMappingURL=ItemLse.js.map