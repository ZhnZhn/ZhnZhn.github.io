"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _OpenClose = _interopRequireDefault(require("./OpenClose"));

var _MenuItems = _interopRequireDefault(require("./MenuItems"));

//import PropTypes from 'prop-types'
var MenuPart = function MenuPart(_ref) {
  var caption = _ref.caption,
      isInitOpen = _ref.isInitOpen,
      items = _ref.items;

  var _isClose = isInitOpen === true ? false : true;

  return _react["default"].createElement(_OpenClose["default"], {
    caption: caption,
    isClose: _isClose
  }, _react["default"].createElement(_MenuItems["default"], {
    items: items
  }));
};
/*
MenuPart.propTypes = {
  caption: PropTypes.string,
  isOpen: PropTypes.bool,
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


var _default = MenuPart;
exports["default"] = _default;
//# sourceMappingURL=MenuPart.js.map