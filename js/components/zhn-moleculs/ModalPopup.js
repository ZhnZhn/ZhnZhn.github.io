'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _ModalPane = require('./ModalPane');

var _ModalPane2 = _interopRequireDefault(_ModalPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalPopup = function ModalPopup(_ref) {
  var isShow = _ref.isShow,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      onClose = _ref.onClose;
  return _react2.default.createElement(
    _ModalPane2.default,
    {
      isShow: isShow,
      onClose: onClose
    },
    _react2.default.createElement(
      _ShowHide2.default,
      {
        className: className,
        style: style,
        isShow: isShow
      },
      children
    )
  );
};

exports.default = ModalPopup;
//# sourceMappingURL=ModalPopup.js.map