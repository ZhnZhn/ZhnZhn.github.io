"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));

var _MenuItems = _interopRequireDefault(require("./MenuItems"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const S_OC_STYLE = {
  paddingRight: 12,
  whiteSpace: 'nowrap'
};

const MenuTopic = ({
  style,
  openColor,
  caption,
  isInitOpen,
  items
}) => {
  const _isClose = isInitOpen === true ? false : true;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    role: "menuitem",
    isClose: _isClose,
    style: style,
    ocStyle: S_OC_STYLE,
    openColor: openColor,
    caption: caption,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItems.default, {
      items: items
    })
  });
};
/*
MenuPart.propTypes = {
  isInitOpen: PropTypes.bool,
  caption: PropTypes.string,
  style: PropTypes.object,
  openColor: PropTypes.string,
  items: PropTypes.arrayOf(
     PropTypes.shape({
       isOpen: PropTypes.bool,
       title: PropTypes.string,
       counter: PropTypes.number,
       isNew: PropTypes.bool,
       onClick: PropTypes.func,
       onBadgeClick: PropTypes.func,
       onBadgeClose: PropTypes.func
     })
  )
}
*/


var _default = MenuTopic;
exports.default = _default;
//# sourceMappingURL=MenuTopic.js.map