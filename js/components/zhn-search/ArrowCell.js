"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

const CL_BT = 'zhn-select__bt-arrow',
      S_ARROW_CELL = {
  top: 0
},
      S_ARROW = {
  display: 'inline-block',
  height: 0,
  width: 0,
  borderColor: '#999 transparent transparent',
  borderStyle: 'solid',
  borderWidth: '10px 8px 4px'
};

const ArrowCell = ({
  arrowStyle,
  tabIndex = "-1",
  onClick
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  className: CL_BT,
  style: S_ARROW_CELL,
  tabIndex: tabIndex,
  onClick: onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: { ...S_ARROW,
      ...arrowStyle
    }
  })
});

var _default = ArrowCell;
exports.default = _default;
//# sourceMappingURL=ArrowCell.js.map