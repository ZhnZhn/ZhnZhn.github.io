"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useMenuToggle = _interopRequireDefault(require("../hooks/useMenuToggle"));
var _BtSvgX = require("../zhn/BtSvgX");
var _MenuMore = _interopRequireDefault(require("./MenuMore"));
var _styleFn = require("../styleFn");
var _Dialog = require("./Dialog.Style");
var _jsxRuntime = require("react/jsx-runtime");
const CL_EL = (0, _styleFn.crElementCn)();
const DialogCaption = _ref => {
  let {
    refBtMenuMore,
    menuModel,
    caption,
    onClose
  } = _ref;
  const [isMenuMore, toggleMenuMore] = (0, _useMenuToggle.default)(refBtMenuMore);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_EL,
    style: _Dialog.S_CAPTION_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuMore.default, {
      ref: refBtMenuMore,
      isMore: isMenuMore,
      menuModel: menuModel,
      toggle: toggleMenuMore
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: _styleFn.CL_NOT_SELECTED,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClose, {
      style: _Dialog.S_SVG_CLOSE,
      onClick: onClose
    })]
  });
};
var _default = exports.default = DialogCaption;
//# sourceMappingURL=DialogCaption.js.map