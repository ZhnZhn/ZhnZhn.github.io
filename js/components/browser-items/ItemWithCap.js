"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Item = _interopRequireDefault(require("./Item"));

var _RowCap = _interopRequireDefault(require("./RowCap"));

var ItemWithCap = function ItemWithCap(props) {
  var item = props.item,
      cap = item.cap,
      salePrice = item.salePrice,
      ipo = item.ipo;
  return _react["default"].createElement(_Item["default"], props, _react["default"].createElement(_RowCap["default"], {
    cap: cap,
    salePrice: salePrice,
    ipo: ipo
  }));
};

var _default = ItemWithCap;
exports["default"] = _default;
//# sourceMappingURL=ItemWithCap.js.map