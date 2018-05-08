'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toolbar = function Toolbar(_ref) {
  var isShow = _ref.isShow,
      buttons = _ref.buttons;
  return _react2.default.createElement(
    _ShowHide2.default,
    { isShow: isShow },
    _react2.default.createElement(_ToolbarButtonCircle2.default, {
      buttons: buttons
    })
  );
};

exports.default = Toolbar;
//# sourceMappingURL=Toolbar.js.map