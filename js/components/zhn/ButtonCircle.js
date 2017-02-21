'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOT_SELECTED = 'not-selected';
var S = {
  ROOT: {
    display: 'inline-block',
    color: '#80c040',
    border: '2px solid #80c040',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    textAlign: 'center',
    cursor: 'pointer'
  }
};

var ButtonCircle = function ButtonCircle(props) {
  var _props$caption = props.caption,
      caption = _props$caption === undefined ? '' : _props$caption,
      className = props.className,
      style = props.style,
      isWithoutDefault = props.isWithoutDefault,
      onClick = props.onClick,
      _className = className ? className + ' ' + NOT_SELECTED : NOT_SELECTED,
      _style = isWithoutDefault ? style : Object.assign({}, S.ROOT, style);

  return _react2.default.createElement(
    'span',
    {
      className: _className,
      style: _style,
      onClick: onClick
    },
    caption
  );
};

exports.default = ButtonCircle;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ButtonCircle.js.map