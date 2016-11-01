'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _accounting = require('accounting');

var _accounting2 = _interopRequireDefault(_accounting);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NA = 'n/a',
    ML = ' ml';

var STYLE = {
  CAP: {
    paddingRight: '8px'
  },
  COUNTRY: {
    display: 'display-inline',
    color: 'gray',
    width: '35px',
    float: 'right'
  },
  DATE: {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    width: '85px',
    float: 'right'
  }
};

var ItemLse = function ItemLse(props) {
  var item = props.item;
  var cap = item.cap;
  var c = item.c;
  var date = item.date;
  var _cap = cap === 0 ? NA : _accounting2.default.formatMoney(cap, "£") + ML;
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-items\ItemLse.js.map