"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _CellColor = _interopRequireDefault(require("./CellColor"));

var _ModalPopup = _interopRequireDefault(require("./ModalPopup"));

var S = {
  SHOW_HIDE: {
    zIndex: 1010,
    position: 'absolute',
    top: 35,
    left: -10,
    backgroundColor: 'rgba(77, 77, 77, 1)',
    borderBottom: '4px solid green',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0 0 0 5px'
  },
  ROOT_PANE: {
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

var ModalPalette =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ModalPalette, _Component);

  function ModalPalette() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._renderColors = function (model, onClickCell) {
      var rows = model.rows,
          cols = model.cols,
          colors = model.colors,
          _elRows = [];

      var r = 0,
          c = 0,
          _color,
          _idPrefix;

      for (; r < rows; r++) {
        var _elCells = [];
        _idPrefix = colors[r * cols];

        for (c = 0; c < cols; c++) {
          _color = colors[r * cols + c];

          _elCells.push(_react["default"].createElement(_CellColor["default"], {
            key: _color,
            id: _color,
            style: S.COLOR,
            color: _color,
            onClick: onClickCell.bind(null, _color)
          }));
        }

        _elRows.push(_react["default"].createElement("div", {
          key: _idPrefix + r,
          id: _idPrefix + r,
          style: S.ROW
        }, _elCells));
      }

      return _elRows;
    };

    return _this;
  }

  var _proto = ModalPalette.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        model = _this$props.model,
        onClickCell = _this$props.onClickCell,
        onClose = _this$props.onClose;
    return _react["default"].createElement(_ModalPopup["default"], {
      isShow: isShow,
      style: S.SHOW_HIDE,
      onClose: onClose
    }, _react["default"].createElement("div", {
      style: S.ROOT_PANE
    }, this._renderColors(model, onClickCell)));
  };

  return ModalPalette;
}(_react.Component);

var _default = ModalPalette;
exports["default"] = _default;
//# sourceMappingURL=ModalPalette.js.map