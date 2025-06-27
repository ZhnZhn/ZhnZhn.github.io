"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _InputSwitch = _interopRequireDefault(require("../zhn/InputSwitch"));
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW = {
    padding: '6px 0',
    width: '105%',
    lineHeight: 'initial'
  },
  _crHrStyle = () => ({
    borderColor: (0, _Style.getColorBlack)(),
    marginTop: 2,
    marginBottom: 2
  }),
  S_OPEN_CLOSE = {
    lineHeight: 1.5
  };
const _crRowCheckBoxElement = (h, color, onToggle) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
  style: S_ROW,
  caption: h.name,
  initialValue: !h.isHide,
  onToggle: onToggle
}, h.name);
const MenuPart = _ref => {
  let {
    item,
    color,
    onToggle
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    className: _styleFn.CL_OPEN_CLOSE_BLACK,
    childStyle: S_OPEN_CLOSE,
    caption: item.caption,
    children: (0, _uiApi.safeMap)(item.items, h => _crRowCheckBoxElement(h, color, () => onToggle(h.id)))
  });
};
const MenuItems = _ref2 => {
  let {
    headers,
    onToggle
  } = _ref2;
  /*eslint-disable no-unused-vars*/
  const [rank, ...restHeader] = headers
    /*eslint-enable no-unused-vars*/,
    _colorBlack = (0, _Style.getColorBlack)();
  return (0, _uiApi.safeMap)(restHeader, (h, index) => (0, _uiApi.isArr)(h.items) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MenuPart, {
    item: h,
    color: _colorBlack,
    onToggle: onToggle
  }, h.caption) : _crRowCheckBoxElement(h, _colorBlack, () => onToggle(h.id || index + 1)));
};
const ModalMenu = _ref3 => {
  let {
    isShow,
    isGridLine,
    style,
    headers,
    onToggleGrid,
    onToggle,
    onClose
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup.default, {
    style: style,
    isShow: isShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
      style: S_ROW,
      caption: "withStripLines",
      initialValue: isGridLine,
      onToggle: onToggleGrid
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
      style: _crHrStyle()
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(MenuItems, {
      headers: headers,
      onToggle: onToggle
    })]
  });
};
var _default = exports.default = ModalMenu;
//# sourceMappingURL=ModalMenu.js.map