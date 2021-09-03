"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _BrowserContext = _interopRequireDefault(require("./BrowserContext"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _jsxRuntime = require("react/jsx-runtime");

const DF_MODEL = [];

const useModel = model => {
  const isMenuItem = (0, _react.useContext)(_BrowserContext.default);
  return (0, _react.useMemo)(() => isMenuItem ? model.filter(isMenuItem) : model, [isMenuItem, model]);
};

const MenuList = /*#__PURE__*/(0, _react.memo)(({
  refFirstItem,
  model = DF_MODEL,
  fOnClickItem
}) => {
  const _model = useModel(model);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: _model.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
      innerRef: index === 0 ? refFirstItem : void 0,
      item: item,
      onClick: fOnClickItem(item)
    }, item.id))
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
exports.default = _default;
//# sourceMappingURL=MenuList.js.map