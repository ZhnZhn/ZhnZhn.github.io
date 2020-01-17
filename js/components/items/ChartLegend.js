"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _Legend = _interopRequireDefault(require("../zhn/Legend"));

var ChartLegend = function ChartLegend(_ref) {
  var isShow = _ref.isShow,
      legend = _ref.legend,
      onClickItem = _ref.onClickItem;
  return legend ? _react["default"].createElement(_ShowHide["default"], {
    isShow: isShow
  }, _react["default"].createElement(_Legend["default"], {
    legend: legend,
    onClickItem: onClickItem
  })) : null;
};

var _default = ChartLegend;
exports["default"] = _default;
//# sourceMappingURL=ChartLegend.js.map