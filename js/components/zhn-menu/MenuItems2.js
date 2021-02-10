"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var _Comp = _interopRequireDefault(require("../Comp"));

var OpenClose2 = _Comp["default"].OpenClose2;
var LIST_OPEN_COLOR = _Color["default"].GREEN;
var MODEL_PROP = {
  CAPTION: 'caption',
  GROUPS: 'groups',
  LISTS: 'lists',
  ITEMS: 'items'
};
var S = {
  GROUP_DIV: {
    lineHeight: 2
  },
  LIST_DIV: {
    marginLeft: 8,
    paddingLeft: 12,
    lineHeight: 2,
    borderLeftStyle: 'solid',
    borderLeftWidth: 2,
    borderLeftColor: 'inherit'
  }
};

var _renderLevel3 = function _renderLevel3(items, captionProp, props) {
  if (items === void 0) {
    items = [];
  }

  var itemClassName = props.itemClassName,
      ItemComp = props.ItemComp,
      onClickItem = props.onClickItem;
  return items.map(function (item, index) {
    var caption = item[captionProp];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemComp, {
      className: itemClassName,
      caption: caption,
      item: item,
      onClickItem: onClickItem
    }, index);
  });
};

var _renderLevel2 = function _renderLevel2(lists, captionProp, itemsProp, props) {
  if (lists === void 0) {
    lists = [];
  }

  return lists.map(function (list, index) {
    var caption = list[captionProp],
        items = list[itemsProp];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(OpenClose2, {
      style: S.LIST_DIV,
      openColor: LIST_OPEN_COLOR,
      caption: caption,
      children: _renderLevel3(items, captionProp, props)
    }, index);
  });
};

var _renderLevel1 = function _renderLevel1(props) {
  var _props$model = props.model,
      model = _props$model === void 0 ? {} : _props$model,
      _model$meta = model.meta,
      meta = _model$meta === void 0 ? {} : _model$meta,
      caption = meta.caption,
      level1 = meta.level1,
      level2 = meta.level2,
      level3 = meta.level3,
      _captionProp = caption || MODEL_PROP.CAPTION,
      _groupsProp = level1 || MODEL_PROP.GROUPS,
      _listsProp = level2 || MODEL_PROP.LISTS,
      _itemsProp = level3 || MODEL_PROP.ITEMS,
      groups = model[_groupsProp] || [];

  return groups.map(function (group, index) {
    var caption = group[_captionProp],
        lists = group[_listsProp];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(OpenClose2, {
      style: S.GROUP_DIV,
      caption: caption,
      children: _renderLevel2(lists, _captionProp, _itemsProp, props)
    }, index);
  });
};

var _areEqual = function _areEqual(prevProps, nextProps) {
  return prevProps.model === nextProps.model;
};

var MenuItems2 = (0, _memoEqual["default"])(function (props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: _renderLevel1(props)
  });
}, _areEqual);
var _default = MenuItems2;
exports["default"] = _default;
//# sourceMappingURL=MenuItems2.js.map