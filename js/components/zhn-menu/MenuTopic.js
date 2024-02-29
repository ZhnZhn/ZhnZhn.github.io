"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _MenuItems = _interopRequireDefault(require("./MenuItems"));
var _MenuItem = _interopRequireDefault(require("./MenuItem"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types'

const S_OC_STYLE = {
    paddingRight: 12,
    whiteSpace: 'nowrap'
  },
  S_MENU_ITEM = {
    paddingLeft: 4
  };
const MenuTopic = _ref => {
  let {
    refFirstItem,
    style,
    openColor,
    itemStyle,
    caption,
    isInitOpen,
    items,
    ...restMenuItemProps
  } = _ref;
  return (0, _uiApi.isArr)(items) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    refItem: refFirstItem,
    role: "menuitem",
    isClose: !(isInitOpen === true),
    style: style,
    ocStyle: S_OC_STYLE,
    openColor: openColor,
    caption: caption,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItems.default, {
      items: items,
      itemStyle: itemStyle
    })
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
    ...restMenuItemProps,
    style: {
      ...S_MENU_ITEM,
      ...itemStyle
    },
    refItem: refFirstItem
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
  ),

  isOpen: PropTypes.bool,
  title: PropTypes.string,
  counter: PropTypes.number,
  isNew: PropTypes.bool,
  onClick: PropTypes.func,
  onBadgeClick: PropTypes.func,
  onBadgeClose: PropTypes.func
}
*/
var _default = exports.default = MenuTopic;
//# sourceMappingURL=MenuTopic.js.map