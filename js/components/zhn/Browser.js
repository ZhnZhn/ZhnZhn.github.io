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

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'BROWSER';
//import PropTypes from "prop-types";

var CL = {
  BROWSER: 'browser-container',
  SHOW: 'show-popup'
};
var S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

var Browser = function (_Component) {
  (0, _inherits3.default)(Browser, _Component);

  function Browser() {
    (0, _classCallCheck3.default)(this, Browser);
    return (0, _possibleConstructorReturn3.default)(this, (Browser.__proto__ || Object.getPrototypeOf(Browser)).apply(this, arguments));
  }

  (0, _createClass3.default)(Browser, [{
    key: 'render',

    /*
    static propTypes = {
      theme: PropTypes.object
      isShow: PropTypes.bool,
      style: PropTypes.object
    }
    */
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          isShow = _props.isShow,
          style = _props.style,
          children = _props.children,
          TS = theme.getStyle(TH_ID),
          _styleOpen = isShow ? S.BLOCK : S.NONE,
          _clOpen = isShow ? CL.SHOW : '',
          _clRoot = CL.BROWSER + ' ' + _clOpen;

      return _react2.default.createElement(
        'div',
        {
          className: _clRoot,
          style: (0, _extends3.default)({}, style, _styleOpen, TS.ROOT)
        },
        children
      );
    }
  }]);
  return Browser;
}(_react.Component);

exports.default = (0, _withTheme2.default)(Browser);
//# sourceMappingURL=Browser.js.map