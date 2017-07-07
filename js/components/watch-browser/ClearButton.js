'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  BT_ROOT: {
    color: 'rgb(35, 47, 59)'
  }
};

var ClearButton = function ClearButton(_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(_FlatButton2.default, {
    rootStyle: S.BT_ROOT,
    caption: 'Clear',
    title: 'Clear Input',
    onClick: onClick
  });
};

exports.default = ClearButton;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\ClearButton.js.map