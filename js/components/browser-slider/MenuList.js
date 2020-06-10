"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var MenuList = /*#__PURE__*/_react["default"].memo(function (_ref) {
  var refFirstItem = _ref.refFirstItem,
      _ref$model = _ref.model,
      model = _ref$model === void 0 ? [] : _ref$model,
      fOnClickItem = _ref.fOnClickItem;
  return /*#__PURE__*/_react["default"].createElement("div", null, model.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      innerRef: index === 0 ? refFirstItem : void 0,
      key: item.id,
      item: item,
      onClick: fOnClickItem(item)
    });
  }));
});
/*
MenuList.propTypes = {
  refFirstItem: PropTypes.shape({
    current: PropTypes.object
  }),
  model: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string
  }))
  fOnClickItem: PropTypes.func
}
*/


var _default = MenuList;
exports["default"] = _default;
//# sourceMappingURL=MenuList.js.map