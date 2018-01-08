'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHOW_POPUP = 'show-popup';
var S = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  }
};

var ShowHide = function ShowHide(props) {
  var isShow = props.isShow,
      className = props.className,
      style = props.style,
      children = props.children,
      _styleShow = isShow ? S.SHOW : S.HIDE,
      _classShow = isShow ? SHOW_POPUP : '',
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

ShowHide.propTypes = process.env.NODE_ENV !== "production" ? {
  isShow: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType[(_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node)]
} : {};

exports.default = ShowHide;
//# sourceMappingURL=ShowHide.js.map