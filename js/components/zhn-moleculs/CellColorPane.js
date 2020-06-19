"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CellColor = _interopRequireDefault(require("./CellColor"));

var S = {
  PANE: {
    margin: 10
  },
  ROW: {
    width: 120
  },
  COLOR: {
    display: 'inline-block',
    height: 32,
    width: 32,
    margin: 4,
    borderRadius: 2,
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var CellColorPane = /*#__PURE__*/_react["default"].memo(function (_ref) {
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

      _elCells.push( /*#__PURE__*/_react["default"].createElement(_CellColor["default"], {
        key: _color,
        id: _color,
        style: S.COLOR,
        color: _color,
        onClick: onClickCell.bind(null, _color)
      }));
    }

    _elRows.push( /*#__PURE__*/_react["default"].createElement("div", {
      key: _idPrefix + r,
      id: _idPrefix + r,
      style: S.ROW
    }, _elCells));
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: S.PANE
  }, _elRows);
});

var _default = CellColorPane;
exports["default"] = _default;
//# sourceMappingURL=CellColorPane.js.map