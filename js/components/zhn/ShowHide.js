'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

process.env.NODE_ENV !== "production" ? ShowHide.propTypes = {
  isShow: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  children: _react.PropTypes.oneOfType[(_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node)]
} : void 0;

exports.default = ShowHide;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ShowHide.js.map