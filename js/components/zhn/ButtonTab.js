"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const TH_ID = 'ELEMENT';
const CL_BT_TAB = 'not-selected button-tab',
      CL_BT_TAB__SHOW = CL_BT_TAB + " button-tab--show",
      CL_ARROW_DOWN = 'arrow-down';

const ButtonTab = ({
  is = true,
  isShow,
  isMenu,
  className,
  style,
  caption,
  onClick
}) => {
  const TS = (0, _useTheme.default)(TH_ID);

  if (!is) {
    return null;
  }

  const _cn = (0, _crCn.default)(isShow ? CL_BT_TAB__SHOW : CL_BT_TAB, className);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    className: _cn,
    style: { ...style,
      ...TS.BG
    },
    onClick: onClick,
    children: [caption, isMenu && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_ARROW_DOWN
    })]
  });
};

var _default = ButtonTab;
exports.default = _default;
//# sourceMappingURL=ButtonTab.js.map