'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CellColor = require('./CellColor');

var _CellColor2 = _interopRequireDefault(_CellColor);

var _ModalPopup = require('./ModalPopup');

var _ModalPopup2 = _interopRequireDefault(_ModalPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ModalPalette = function (_Component) {
  (0, _inherits3.default)(ModalPalette, _Component);

  function ModalPalette() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalPalette);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ModalPalette.__proto__ || Object.getPrototypeOf(ModalPalette)).call.apply(_ref, [this].concat(args))), _this), _this._renderColors = function (model, onClickCell) {
      var rows = model.rows,
          cols = model.cols,
          colors = model.colors,
          _elRows = [];


      var r = 0,
          c = 0,
          _color = void 0,
          _idPrefix = void 0;
      for (; r < rows; r++) {
        var _elCells = [];
        _idPrefix = colors[r * cols];
        for (c = 0; c < cols; c++) {
          _color = colors[r * cols + c];
          _elCells.push(_react2.default.createElement(_CellColor2.default, {
            key: _color,
            id: _color,
            style: S.COLOR,
            color: _color,
            onClick: onClickCell.bind(null, _color)
          }));
        }
        _elRows.push(_react2.default.createElement(
          'div',
          {
            key: _idPrefix + r,
            id: _idPrefix + r,
            style: S.ROW
          },
          _elCells
        ));
      }
      return _elRows;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ModalPalette, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          model = _props.model,
          onClickCell = _props.onClickCell,
          onClose = _props.onClose;

      return _react2.default.createElement(
        _ModalPopup2.default,
        {
          isShow: isShow,
          style: S.SHOW_HIDE,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: S.ROOT_PANE },
          this._renderColors(model, onClickCell)
        )
      );
    }
  }]);
  return ModalPalette;
}(_react.Component);

exports.default = ModalPalette;
//# sourceMappingURL=ModalPalette.js.map