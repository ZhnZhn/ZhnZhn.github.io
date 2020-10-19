"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));

var _MenuItems = _interopRequireDefault(require("./MenuItems"));

//import PropTypes from 'prop-types'
var MenuTopic = function MenuTopic(_ref) {
  var style = _ref.style,
      openColor = _ref.openColor,
      caption = _ref.caption,
      isInitOpen = _ref.isInitOpen,
      items = _ref.items;

  var _isClose = isInitOpen === true ? false : true;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose["default"], {
    isClose: _isClose,
    role: "menuitem",
    caption: caption,
    style: style,
    openColor: openColor,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItems["default"], {
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
exports["default"] = _default;
//# sourceMappingURL=MenuTopic.js.map