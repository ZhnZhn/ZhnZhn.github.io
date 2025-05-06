"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useMenuToggle = _interopRequireDefault(require("../hooks/useMenuToggle"));
var _BtSvgX = require("../zhn/BtSvgX");
var _MenuMore = _interopRequireDefault(require("./MenuMore"));
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_EL = (0, _styleFn.crElementCn)(),
  S_CAPTION_DIV = {
    position: 'relative',
    padding: '8px 35px 5px 16px',
    height: 34,
    borderRadius: '5px 5px 0 0',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 500
  };
const DialogCaption = props => {
  const [isMenuMore, toggleMenuMore] = (0, _useMenuToggle.default)(props.refBtMenuMore);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_EL,
    style: S_CAPTION_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuMore.default, {
      refEl: props.refBtMenuMore,
      isMore: isMenuMore,
      menuModel: props.menuModel,
      toggle: toggleMenuMore
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: _styleFn.CL_NOT_SELECTED,
      children: props.caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClose, {
      onClick: props.onClose
    })]
  });
};
var _default = exports.default = DialogCaption;
//# sourceMappingURL=DialogCaption.js.map