'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var CL_SHOW_POPUP = 'show-popup';
var S = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  }
};

var ShowHide = function ShowHide(_ref) {
  var isShow = _ref.isShow,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children;

  var _styleShow = isShow ? S.SHOW : S.HIDE,
      _classShow = isShow ? CL_SHOW_POPUP : '',
      _className = className ? className + ' ' + _classShow : _classShow !== '' ? _classShow : undefined;
  return _react2.default.createElement(
    'div',
    {
      className: _className,
      style: Object.assign({}, style, _styleShow)
    },
    children
  );
};

/*
ShowHide.propTypes = {
  isShow: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType[
    (PropTypes.arrayOf(PropTypes.node), PropTypes.node)
  ]
}
*/

exports.default = ShowHide;
//# sourceMappingURL=ShowHide.js.map