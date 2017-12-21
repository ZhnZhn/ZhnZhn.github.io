'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuAriaItem = require('./MenuAriaItem');

var _MenuAriaItem2 = _interopRequireDefault(_MenuAriaItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    position: 'relative'
  },
  ARROW: {
    position: 'absolute',
    display: 'inline-block',
    top: '0',
    right: '4px',
    fontWeight: 'bold'
  }
};

var MenuSubItem = function MenuSubItem(props) {
  var CL = props.CL,
      item = props.item,
      onClick = props.onClick,
      onReg = props.onReg,
      cn = item.cn,
      title = item.title,
      _className = cn ? CL.ROW + ' ' + cn : CL.ITEM_DF;

  return _react2.default.createElement(
    _MenuAriaItem2.default,
    {
      className: _className,
      style: S.ROOT,
      onClick: onClick,
      onReg: onReg
    },
    title,
    _react2.default.createElement(
      'span',
      {
        className: _className,
        style: S.ARROW
      },
      '>'
    )
  );
};

exports.default = MenuSubItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\MenuSubItem.js.map