"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle"));

var CL_BT_WATCH_BAR = "bt__watch__bar";
var S = {
  ROOT: {
    marginBottom: 10
  },
  BT_LIST: {
    marginLeft: 20
  }
};

var EditBar = function EditBar(_ref) {
  var isShow = _ref.isShow,
      onClickGroup = _ref.onClickGroup,
      onClickList = _ref.onClickList;
  return isShow ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle["default"], {
      caption: "GROUP",
      className: CL_BT_WATCH_BAR,
      onClick: onClickGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle["default"], {
      caption: "LIST",
      className: CL_BT_WATCH_BAR,
      style: S.BT_LIST,
      onClick: onClickList
    })]
  }) : null;
};

var _default = EditBar;
exports["default"] = _default;
//# sourceMappingURL=EditBar.js.map