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

var _withThemeRef = require('../hoc/withThemeRef');

var _withThemeRef2 = _interopRequireDefault(_withThemeRef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'SCROLL_PANE';
var CL = 'with-scroll';

var ScrollPane = function (_Component) {
  (0, _inherits3.default)(ScrollPane, _Component);

  function ScrollPane() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ScrollPane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ScrollPane.__proto__ || Object.getPrototypeOf(ScrollPane)).call.apply(_ref, [this].concat(args))), _this), _this._refRootNode = function (node) {
      return _this.rootNode = node;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ScrollPane, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          style = _props.style,
          className = _props.className,
          children = _props.children,
          TS = theme.getStyle(TH_ID),
          _cl = CL + ' ' + TS.CL_SCROLL + ' ' + (className || '');

      return _react2.default.createElement(
        'div',
        {
          ref: this._refRootNode,
          className: _cl,
          style: style
        },
        children
      );
    }
  }, {
    key: 'scrollTop',
    value: function scrollTop() {
      this.rootNode.scrollTop = 0;
    }
  }]);
  return ScrollPane;
}(_react.Component);

exports.default = (0, _withThemeRef2.default)(ScrollPane);
//# sourceMappingURL=ScrollPane.js.map