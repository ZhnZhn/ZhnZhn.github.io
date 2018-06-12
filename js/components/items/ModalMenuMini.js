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

var _renderItems = function _renderItems(configs, onClickItem) {
  return configs.map(function (c) {
    var btTitle = c.btTitle;

    return _react2.default.createElement(_SubMenuItem2.default, {
      caption: btTitle,
      onClick: onClickItem.bind(null, btTitle)
    });
  });
};

var ModalMenuMini = function ModalMenuMini(_ref) {
  var isShow = _ref.isShow,
      onClose = _ref.onClose,
      configs = _ref.configs,
      onClickItem = _ref.onClickItem;
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
      configs && _renderItems(configs, onClickItem)
    )
  );
};

exports.default = ModalMenuMini;
//# sourceMappingURL=ModalMenuMini.js.map