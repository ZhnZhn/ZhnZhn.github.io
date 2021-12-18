"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const CL_SHOW_POPUP = 'show-popup',
      S_SHOW = {
  display: 'block'
},
      S_HIDE = {
  display: 'none'
};

const ShowHide = ({
  isShow,
  className,
  style,
  withoutAnimation,
  animationClass = CL_SHOW_POPUP,
  children
}) => {
  const _cn = (0, _crCn.default)(className, [isShow && !withoutAnimation, animationClass]),
        _styleShow = isShow ? S_SHOW : S_HIDE;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    "aria-expanded": isShow,
    className: _cn,
    style: { ...style,
      ..._styleShow
    },
    children: children
  });
};
/*
ShowHide.propTypes = {
  isShow: PropTypes.bool,  
  className: PropTypes.string,
  style: PropTypes.object,
  withoutAnimation: PropTypes.bool,
  animationClass: PropTypes.string,
  children: PropTypes.oneOfType[
    (PropTypes.arrayOf(PropTypes.node), PropTypes.node)
  ]
}
*/


var _default = ShowHide;
exports.default = _default;
//# sourceMappingURL=ShowHide.js.map