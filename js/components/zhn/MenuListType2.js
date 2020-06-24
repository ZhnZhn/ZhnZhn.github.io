"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var _OpenClose = _interopRequireDefault(require("./OpenClose2"));

var LIST_OPEN_COLOR = _Color["default"].GREEN;
var GROUP_OPEN_COLOR = _Color["default"].TITLE;
var MODEL_PROP = {
  CAPTION: 'caption',
  GROUPS: 'groups',
  LISTS: 'lists',
  ITEMS: 'items'
};
var STYLE = {
  GROUP_DIV: {
    lineHeight: 2
  },
  LIST_DIV: {
    marginLeft: 8,
    paddingLeft: 12,
    lineHeight: 2,
    borderLeft: "2px solid " + GROUP_OPEN_COLOR
  },
  ITEM_DIV: {
    position: 'relative',
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    lineHeight: 1.4
  },
  ITEM_SPAN: {
    display: 'inline-block',
    width: '100%',
    //maxWidth: '250px',
    //direction: "ltr",
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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
    return /*#__PURE__*/_react["default"].createElement(ItemComp, {
      key: index,
      className: itemClassName,
      caption: caption,
      item: item,
      onClickItem: onClickItem
    });
  });
};

var _renderLevel2 = function _renderLevel2(lists, captionProp, itemsProp, props) {
  if (lists === void 0) {
    lists = [];
  }

  return lists.map(function (list, index) {
    var caption = list[captionProp],
        items = list[itemsProp];
    return /*#__PURE__*/_react["default"].createElement(_OpenClose["default"], {
      key: index,
      style: STYLE.LIST_DIV,
      openColor: LIST_OPEN_COLOR,
      caption: caption
    }, _renderLevel3(items, captionProp, props));
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
    return /*#__PURE__*/_react["default"].createElement(_OpenClose["default"], {
      key: index,
      style: STYLE.GROUP_DIV,
      openColor: GROUP_OPEN_COLOR,
      caption: caption
    }, _renderLevel2(lists, _captionProp, _itemsProp, props));
  });
};

var _areEqual = function _areEqual(prevProps, nextProps) {
  return prevProps.model === nextProps.model;
};

var MenuListType2 = /*#__PURE__*/_react["default"].memo(function (props) {
  return /*#__PURE__*/_react["default"].createElement("div", null, _renderLevel1(props));
}, _areEqual);

var _default = MenuListType2;
exports["default"] = _default;
//# sourceMappingURL=MenuListType2.js.map