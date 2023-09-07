"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _CellColor = _interopRequireDefault(require("./CellColor"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_INPUT_COLOR = "va-b",
  S_PANE = {
    margin: 10
  },
  S_ROW = {
    width: 120
  },
  S_COLOR = {
    margin: 4
  };
const CellColorPane = (0, _uiApi.memo)(_ref => {
  let {
    model,
    onClickCell
  } = _ref;
  const {
      rows,
      cols,
      colors
    } = model,
    _elRows = [];
  let r, c, _color, _idPrefix;
  for (r = 0; r < rows; r++) {
    let _elCells = [];
    _idPrefix = colors[r * cols];
    for (c = 0; c < cols; c++) {
      _color = colors[r * cols + c];
      _elCells.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor.default, {
        className: CL_INPUT_COLOR,
        style: S_COLOR,
        color: _color,
        onClick: (0, _uiApi.bindTo)(onClickCell, _color)
      }, _color));
    }
    _elRows.push( /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_ROW,
      children: _elCells
    }, _idPrefix + r));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_PANE,
    children: _elRows
  });
});
var _default = CellColorPane;
exports.default = _default;
//# sourceMappingURL=CellColorPane.js.map