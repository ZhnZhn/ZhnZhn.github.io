"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _Button = _interopRequireDefault(require("./Button"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_TAB = (0, _styleFn.crNotSelectedCn)("bt bt-tab"),
  CL_ARROW_DOWN = "arrow-down";
const ButtonTab = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
  v: props.is ?? true,
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Button.default, {
    className: (0, _styleFn.crCn)(CL_BT_TAB, props.className),
    style: props.style,
    onClick: props.onClick,
    children: [props.caption, /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
      v: props.isMenu,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL_ARROW_DOWN
      })
    })]
  })
});

/*
ButtonTab.propTypes = {
 is: PropTypes.bool,
 isMenu: PropTypes.bool,
 className: PropTypes.string,
 style: PropTypes.object,
 caption: PropTypes.string,
 onClick: PropTypes.func
}
*/
var _default = exports.default = ButtonTab;
//# sourceMappingURL=ButtonTab.js.map