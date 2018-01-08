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
  NEW: {
    display: 'inline-block',
    float: 'right',
    color: 'black'
  }
};

var MenuItem = function MenuItem(props) {
  var CL = props.CL,
      item = props.item,
      onClickDynamic = props.onClickDynamic,
      onClickQuandl = props.onClickQuandl;

  var cn = item.cn,
      id = item.id,
      title = item.title,
      isQuandl = item.isQuandl,
      isNew = item.isNew,
      _className = cn ? CL.ROW + ' ' + cn : CL.ITEM_DF,
      _onClick = isQuandl ? onClickQuandl : onClickDynamic.bind(null, id),
      _el = isNew ? _react2.default.createElement(
    'span',
    { style: S.NEW },
    'New'
  ) : null;

  return _react2.default.createElement(
    _MenuAriaItem2.default,
    {
      className: _className,
      onClick: _onClick
    },
    title,
    _el
  );
};

exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map