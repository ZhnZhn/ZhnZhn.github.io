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

var Clear = function Clear(_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(_FlatButton2.default, {
    rootStyle: S.BT_ROOT,
    caption: 'Clear',
    title: 'Clear Input',
    onClick: onClick
  });
};

var Close = function Close(_ref2) {
  var onClick = _ref2.onClick;
  return _react2.default.createElement(_FlatButton2.default, {
    rootStyle: S.BT_ROOT,
    caption: 'Close',
    title: 'Close Dialog',
    onClick: onClick
  });
};

var Primary = function Primary(_ref3) {
  var caption = _ref3.caption,
      title = _ref3.title,
      onClick = _ref3.onClick;
  return _react2.default.createElement(_FlatButton2.default, {
    caption: caption,
    title: title,
    isPrimary: true,
    onClick: onClick
  });
};

exports.default = { Primary: Primary, Clear: Clear, Close: Close, Flat: _FlatButton2.default };
//# sourceMappingURL=Button.js.map