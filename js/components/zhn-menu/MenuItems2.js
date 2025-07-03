"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _Color = require("../styles/Color");
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _jsxRuntime = require("react/jsx-runtime");
const MODEL_PROP_CAPTION = 'caption',
  MODEL_PROP_GROUPS = 'groups',
  MODEL_PROP_LISTS = 'lists',
  MODEL_PROP_ITEMS = 'items';
const _renderLevel3 = (items, captionProp, _ref) => {
  let {
    itemClassName,
    ItemComp,
    onClickItem
  } = _ref;
  return (0, _uiApi.safeMap)(items, (item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemComp, {
    className: itemClassName,
    caption: item[captionProp],
    item: item,
    onClickItem: onClickItem
  }, index));
};
const _renderLevel2 = (lists, captionProp, itemsProp, props) => (0, _uiApi.safeMap)(lists, (list, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
  ...(0, _a11yFn.crMenuItemRole)(),
  style: _styleFn.S_OPEN_CLOSE_LEVEL_2,
  openColor: _Color.GREEN_COLOR,
  caption: list[captionProp],
  children: _renderLevel3(list[itemsProp], captionProp, props)
}, index));
const _renderLevel1 = props => {
  const {
      model
    } = props,
    {
      meta
    } = model,
    {
      caption,
      level1,
      level2,
      level3
    } = meta || {},
    _captionProp = caption || MODEL_PROP_CAPTION,
    _groupsProp = level1 || MODEL_PROP_GROUPS,
    _listsProp = level2 || MODEL_PROP_LISTS,
    _itemsProp = level3 || MODEL_PROP_ITEMS,
    groups = model[_groupsProp];
  return (0, _uiApi.safeMap)(groups, (group, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    ...(0, _a11yFn.crMenuItemRole)(),
    caption: group[_captionProp],
    children: _renderLevel2(group[_listsProp], _captionProp, _itemsProp, props)
  }, index));
};
const _arePropertyModelEqual = (prevProps, nextProps) => prevProps.model === nextProps.model;
const MenuItems2 = (0, _uiApi.memo)(props => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  children: _renderLevel1(props)
}), _arePropertyModelEqual);
var _default = exports.default = MenuItems2;
//# sourceMappingURL=MenuItems2.js.map