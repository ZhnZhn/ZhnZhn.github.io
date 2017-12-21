'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrMsg = function ErrMsg(_ref) {
  var errMsg = _ref.errMsg;

  if (!errMsg) return null;
  return _react2.default.createElement(
    'div',
    { style: _Style2.default.MSG_ERR },
    errMsg
  );
};

exports.default = ErrMsg;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-slider\ErrMsg.js.map