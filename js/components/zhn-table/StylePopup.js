'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgCheckBox = require('../zhn/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

var _ModalPopup = require('../zhn-moleculs/ModalPopup');

var _ModalPopup2 = _interopRequireDefault(_ModalPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  STRIP: {
    paddingLeft: '8px',
    fontWeight: 'bold'
  }
};

var StylePopup = function StylePopup(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      onClose = _ref.onClose,
      isGridLine = _ref.isGridLine,
      onCheck = _ref.onCheck,
      onUnCheck = _ref.onUnCheck;

  return _react2.default.createElement(
    _ModalPopup2.default,
    {
      style: style,
      isShow: isShow,
      onClose: onClose
    },
    _react2.default.createElement(_SvgCheckBox2.default, {
      value: isGridLine,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }),
    _react2.default.createElement(
      'span',
      { style: S.STRIP },
      'withStripLines'
    )
  );
};

exports.default = StylePopup;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-table\StylePopup.js.map