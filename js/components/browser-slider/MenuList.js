"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var MenuList = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var refFirstItem = _ref.refFirstItem,
      _ref$model = _ref.model,
      model = _ref$model === void 0 ? [] : _ref$model,
      fOnClickItem = _ref.fOnClickItem;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: model.map(function (item, index) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem["default"], {
        innerRef: index === 0 ? refFirstItem : void 0,
        item: item,
        onClick: fOnClickItem(item)
      }, item.id);
    })
  });
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