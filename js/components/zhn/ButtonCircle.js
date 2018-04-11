'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL_NOT = 'not-selected';
var S = {
  ROOT: {
    display: 'inline-block',
    color: '#80c040',
    border: '2px solid #80c040',
    borderRadius: '50%',
    lineHeight: '24px',
    width: '26px',
    height: '26px',
    textAlign: 'center',
    cursor: 'pointer'
  }
};

var ButtonCircle = function ButtonCircle(props) {
  var className = props.className,
      style = props.style,
      _props$caption = props.caption,
      caption = _props$caption === undefined ? '' : _props$caption,
      title = props.title,
      isWithoutDefault = props.isWithoutDefault,
      onClick = props.onClick,
      _className = className ? className + ' ' + CL_NOT : CL_NOT,
      _style = isWithoutDefault ? style : Object.assign({}, S.ROOT, style);

  return _react2.default.createElement(
    'button',
    {
      className: _className,
      style: _style,
      title: title,
      onClick: onClick
    },
    caption
  );
};

exports.default = ButtonCircle;
//# sourceMappingURL=ButtonCircle.js.map