"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _Color = require("../styles/Color");

var _Comp = _interopRequireDefault(require("../Comp"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  OpenClose2
} = _Comp.default;
const LIST_OPEN_COLOR = _Color.GREEN_COLOR;
const MODEL_PROP = {
  CAPTION: 'caption',
  GROUPS: 'groups',
  LISTS: 'lists',
  ITEMS: 'items'
};
const S_GROUP_DIV = {
  lineHeight: 2
},
      S_LIST_DIV = {
  marginLeft: 8,
  paddingLeft: 12,
  lineHeight: 2,
  borderLeftStyle: 'solid',
  borderLeftWidth: 2,
  borderLeftColor: 'inherit'
};

const _renderLevel3 = (items, captionProp, props) => {
  const {
    itemClassName,
    ItemComp,
    onClickItem
  } = props;
  return (items || []).map((item, index) => {
    const caption = item[captionProp];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemComp, {
      className: itemClassName,
      caption: caption,
      item: item,
      onClickItem: onClickItem
    }, index);
  });
};

const _renderLevel2 = (lists, captionProp, itemsProp, props) => {
  return (lists || []).map((list, index) => {
    const caption = list[captionProp],
          items = list[itemsProp];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(OpenClose2, {
      style: S_LIST_DIV,
      openColor: LIST_OPEN_COLOR,
      caption: caption,
      children: _renderLevel3(items, captionProp, props)
    }, index);
  });
};

const _renderLevel1 = props => {
  const {
    model
  } = props,
        {
    meta
  } = model || {},
        {
    caption,
    level1,
    level2,
    level3
  } = meta || {},
        _captionProp = caption || MODEL_PROP.CAPTION,
        _groupsProp = level1 || MODEL_PROP.GROUPS,
        _listsProp = level2 || MODEL_PROP.LISTS,
        _itemsProp = level3 || MODEL_PROP.ITEMS,
        groups = model[_groupsProp] || [];

  return groups.map((group, index) => {
    const caption = group[_captionProp],
          lists = group[_listsProp];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(OpenClose2, {
      style: S_GROUP_DIV,
      caption: caption,
      children: _renderLevel2(lists, _captionProp, _itemsProp, props)
    }, index);
  });
};

const _areEqual = (prevProps, nextProps) => prevProps.model === nextProps.model;

const MenuItems2 = /*#__PURE__*/(0, _react.memo)(props => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  children: _renderLevel1(props)
}), _areEqual);
var _default = MenuItems2;
exports.default = _default;
//# sourceMappingURL=MenuItems2.js.map