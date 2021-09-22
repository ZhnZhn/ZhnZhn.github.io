"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const CL_TAB = 'tab';
const S_BT = {
  color: '#2f7ed8',
  borderBottom: '3px solid #2f7ed8'
},
      S_TITLE = {
  color: '#2f7ed8'
};

const Tab = ({
  id,
  title,
  isSelected,
  onClick
}) => {
  const [_btStyle, _titleStyle] = isSelected ? [S_BT, S_TITLE] : [];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL_TAB,
    style: _btStyle,
    id: "tab-" + id,
    role: "tab",
    "aria-selected": isSelected,
    "aria-controls": "tabpanel-" + id,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _titleStyle,
      children: title
    })
  });
};
/*
Tab.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
}
*/


var _default = Tab;
exports.default = _default;
//# sourceMappingURL=Tab.js.map