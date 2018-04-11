'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _ModalPane = require('./ModalPane');

var _ModalPane2 = _interopRequireDefault(_ModalPane);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'ELEMENT';

var ModalPopup = function ModalPopup(_ref) {
  var theme = _ref.theme,
      isShow = _ref.isShow,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      onClose = _ref.onClose;

  var TS = theme.getStyle(TH_ID);
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
        style: (0, _extends3.default)({}, style, TS.BORDER),
        isShow: isShow
      },
      children
    )
  );
};

exports.default = (0, _withTheme2.default)(ModalPopup);
//# sourceMappingURL=ModalPopup.js.map