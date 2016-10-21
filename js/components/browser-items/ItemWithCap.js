'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _RowCap = require('./RowCap');

var _RowCap2 = _interopRequireDefault(_RowCap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemWithCap = function ItemWithCap(props) {
  var item = props.item;
  var cap = item.cap;
  var salePrice = item.salePrice;
  var ipo = item.ipo;

  return _react2.default.createElement(
    _Item2.default,
    props,
    _react2.default.createElement(_RowCap2.default, {
      cap: cap,
      salePrice: salePrice,
      ipo: ipo
    })
  );
};

exports.default = ItemWithCap;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-items\ItemWithCap.js.map