'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Pane = require('./Pane.Style');

var _Pane2 = _interopRequireDefault(_Pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RowButtons = function RowButtons(_ref) {
  var Primary = _ref.Primary,
      withoutClear = _ref.withoutClear,
      onClear = _ref.onClear,
      onClose = _ref.onClose;
  return _react2.default.createElement(
    'div',
    { style: _Pane2.default.COMMAND_DIV },
    Primary,
    !withoutClear && _react2.default.createElement(_Button2.default.Clear, {
      onClick: onClear
    }),
    _react2.default.createElement(_Button2.default.Close, {
      onClick: onClose
    })
  );
};

exports.default = RowButtons;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\RowButtons.js.map