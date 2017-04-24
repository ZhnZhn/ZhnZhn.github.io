'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContainerStyles = require('../styles/ContainerStyles');

var _ContainerStyles2 = _interopRequireDefault(_ContainerStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHOW_POPUP = 'show-popup';
var S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

var Browser = function Browser(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      children = _ref.children;

  var _styleOpen = isShow ? S.BLOCK : S.NONE,
      _classOpen = isShow ? SHOW_POPUP : null;
  return _react2.default.createElement(
    'div',
    {
      className: _classOpen,
      style: (0, _extends3.default)({}, _ContainerStyles2.default.browserRootDiv, style, _styleOpen)
    },
    children
  );
};

process.env.NODE_ENV !== "production" ? Browser.propTypes = {
  isShow: _react.PropTypes.bool,
  style: _react.PropTypes.object
} : void 0;

exports.default = Browser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\Browser.js.map