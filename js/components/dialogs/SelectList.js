"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var SelectList = function SelectList(_ref) {
  var isShow = _ref.isShow,
      isShowLabels = _ref.isShowLabels,
      selectProps = _ref.selectProps,
      refSelect = _ref.refSelect,
      isShowById = _ref.isShowById,
      hSelect = _ref.hSelect;
  return selectProps.map(function (_ref2, index) {
    var id = _ref2.id,
        restItem = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, ["id"]);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ShowHide, {
      isShow: isShowById(id),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].SelectWithLoad, (0, _extends2["default"])({}, restItem, {
        ref: function ref(comp) {
          return refSelect(id, comp);
        },
        isShow: isShow,
        isShowLabels: isShowLabels,
        onSelect: function onSelect(item) {
          return hSelect(id, index, item);
        }
      }))
    }, id);
  });
};

var _default = SelectList;
exports["default"] = _default;
//# sourceMappingURL=SelectList.js.map