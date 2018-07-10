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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from 'prop-types'

var CellColor = function (_Component) {
  (0, _inherits3.default)(CellColor, _Component);

  function CellColor() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CellColor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CellColor.__proto__ || Object.getPrototypeOf(CellColor)).call.apply(_ref, [this].concat(args))), _this), _this._refCellNode = function (node) {
      return _this.cellNode = node;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CellColor, [{
    key: 'componentDidMount',

    /*
    static propTypes = {
      style: PropTypes.object,
      color: PropTypes.string,
      onClick: PropTypes.func,
      onReg: PropTypes.func
    }
    */

    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (typeof onReg === 'function') {
        onReg(this.cellNode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          color = _props.color,
          onClick = _props.onClick,
          children = _props.children,
          _styleColor = color ? { backgroundColor: color } : undefined,
          _onClick = onClick ? onClick.bind(null, color) : undefined;

      return _react2.default.createElement(
        'span',
        {
          style: (0, _extends3.default)({}, style, _styleColor),
          ref: this._refCellNode,
          onClick: _onClick
        },
        children
      );
    }
  }]);
  return CellColor;
}(_react.Component);

exports.default = CellColor;
//# sourceMappingURL=CellColor.js.map