'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalPopup = require('../zhn-moleculs/ModalPopup');

var _ModalPopup2 = _interopRequireDefault(_ModalPopup);

var _SubMenuItem = require('./SubMenuItem');

var _SubMenuItem2 = _interopRequireDefault(_SubMenuItem);

var _ModalMenu = require('./ModalMenu.Style');

var _ModalMenu2 = _interopRequireDefault(_ModalMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalMenuMini = function ModalMenuMini(_ref) {
  var isShow = _ref.isShow,
      onClose = _ref.onClose,
      onClickVolume = _ref.onClickVolume,
      onClickATH = _ref.onClickATH,
      onClickHighLow = _ref.onClickHighLow;
  return _react2.default.createElement(
    _ModalPopup2.default,
    {
      isShow: isShow,
      style: _ModalMenu2.default.ROOT,
      onClose: onClose
    },
    _react2.default.createElement(
      'div',
      { style: _ModalMenu2.default.PANE },
      _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'Volume',
        onClick: onClickVolume
      }),
      _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'ATH',
        onClick: onClickATH
      }),
      _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'Daily HighLow',
        onClick: onClickHighLow
      })
    )
  );
};

exports.default = ModalMenuMini;
//# sourceMappingURL=ModalMenuMini.js.map