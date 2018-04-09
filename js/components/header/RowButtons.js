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
  ROW: {
    cursor: 'default',
    float: 'right',
    marginTop: '8px',
    marginBottom: '10px',
    marginRight: '4px'
  }
};

var RowButtons = function RowButtons(_ref) {
  var children = _ref.children,
      btStyle = _ref.btStyle,
      onClose = _ref.onClose;
  return _react2.default.createElement(
    'div',
    { style: S.ROW },
    children,
    _react2.default.createElement(_FlatButton2.default, {
      rootStyle: btStyle,
      caption: 'Close',
      onClick: onClose
    })
  );
};

exports.default = RowButtons;
//# sourceMappingURL=RowButtons.js.map