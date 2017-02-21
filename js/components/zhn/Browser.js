'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContainerStyles = require('../styles/ContainerStyles');

var _ContainerStyles2 = _interopRequireDefault(_ContainerStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _ContainerStyles2.default;
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
      style: Object.assign({}, styles.browserRootDiv, style, _styleOpen)
    },
    children
  );
};

exports.default = Browser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\Browser.js.map