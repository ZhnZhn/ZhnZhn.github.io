"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_BT_WATCH_BAR = "bt__watch__bar";
const S_EDIT_BAR = {
  marginBottom: 10
},
      S_BT_LIST = {
  marginLeft: 20
};

const EditBar = _ref => {
  let {
    isShow,
    onClickGroup,
    onClickList
  } = _ref;
  return isShow ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_EDIT_BAR,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
      caption: "GROUP",
      className: CL_BT_WATCH_BAR,
      onClick: onClickGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
      caption: "LIST",
      className: CL_BT_WATCH_BAR,
      style: S_BT_LIST,
      onClick: onClickList
    })]
  }) : null;
};

var _default = EditBar;
exports.default = _default;
//# sourceMappingURL=EditBar.js.map