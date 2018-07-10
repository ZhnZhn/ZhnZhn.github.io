'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _CellColor = require('../zhn-moleculs/CellColor');

var _CellColor2 = _interopRequireDefault(_CellColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C_TRANSPARENT = "transparent";
var N_SHORT = 5;

var COLORS1 = ['#8abb5d', '#f7a35c', '#795548', '#f15c80', '#f45b5b', '#d2b772', '#dda0dd', '#fffafa'];
var COLORS2 = ['#f1d600', '#008b8b', '#2f7ed8', '#673ab7', '#000000', '#607d8b', '#7092be', '#c3c3c3'];

var S = {
  ROOT: {
    paddingBottom: 4
  },
  ROW2: {
    paddingLeft: 56,
    paddingTop: 4
  },
  TO_CELL: {
    marginLeft: 12,
    marginRight: 12
  },
  CELL: {
    marginRight: 4,
    position: 'relative',
    display: 'inline-block',
    height: 32,
    width: 32,
    borderRadius: 2,
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var _initColor = function _initColor(props) {
  return props.initColor || C_TRANSPARENT;
};

var SeriaColor = function (_Component) {
  (0, _inherits3.default)(SeriaColor, _Component);

  function SeriaColor(props) {
    (0, _classCallCheck3.default)(this, SeriaColor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SeriaColor.__proto__ || Object.getPrototypeOf(SeriaColor)).call(this));

    _this._hInit = function () {
      _this.setState({
        color: _initColor(_this.props)
      });
    };

    _this._hClick = function (color) {
      if (color) {
        _this.setState({ color: color });
      }
    };

    _this._renderColors = function (colors, isLong) {
      var _max = isLong ? colors.length : N_SHORT;
      return colors.map(function (c, i) {
        return i < _max ? _react2.default.createElement(_CellColor2.default, {
          key: c,
          color: c,
          style: S.CELL,
          onClick: _this._hClick
        }) : null;
      }).filter(Boolean);
    };

    _this.state = {
      color: _initColor(props)
    };
    return _this;
  }

  (0, _createClass3.default)(SeriaColor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (typeof onReg === 'function') {
        onReg(this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var isLong = this.props.isLong,
          color = this.state.color;

      return _react2.default.createElement(
        'div',
        { style: S.ROOT },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_CellColor2.default, {
            color: color,
            style: (0, _extends3.default)({}, S.CELL, S.TO_CELL),
            onClick: this._hInit
          }),
          this._renderColors(COLORS1, isLong)
        ),
        _react2.default.createElement(
          'div',
          { style: S.ROW2 },
          this._renderColors(COLORS2, isLong)
        )
      );
    }
  }, {
    key: 'getColor',
    value: function getColor() {
      var color = this.state.color;

      return color !== C_TRANSPARENT ? color : undefined;
    }
  }]);
  return SeriaColor;
}(_react.Component);

exports.default = SeriaColor;
//# sourceMappingURL=SeriaColor.js.map