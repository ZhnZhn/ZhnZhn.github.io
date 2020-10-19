"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _CellColor = _interopRequireDefault(require("./CellColor"));

var CL_INPUT_COLOR = "va-b";
var S = {
  PANE: {
    margin: 10
  },
  ROW: {
    width: 120
  },
  COLOR: {
    margin: 4
  }
};
var CellColorPane = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var model = _ref.model,
      onClickCell = _ref.onClickCell;
  var rows = model.rows,
      cols = model.cols,
      colors = model.colors,
      _elRows = [];

  var r, c, _color, _idPrefix;

  for (r = 0; r < rows; r++) {
    var _elCells = [];
    _idPrefix = colors[r * cols];

    for (c = 0; c < cols; c++) {
      _color = colors[r * cols + c];

      _elCells.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor["default"], {
        className: CL_INPUT_COLOR,
        style: S.COLOR,
        color: _color,
        onClick: onClickCell.bind(null, _color)
      }, _color));
    }

    _elRows.push( /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S.ROW,
      children: _elCells
    }, _idPrefix + r));
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S.PANE,
    children: _elRows
  });
});
var _default = CellColorPane;
exports["default"] = _default;
//# sourceMappingURL=CellColorPane.js.map