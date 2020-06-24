"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

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

var MenuListType2 = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(MenuListType2, _Component);

  function MenuListType2() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {};

    _this._renderLevel3 = function (items, captionProp) {
      if (items === void 0) {
        items = [];
      }

      var _this$props = _this.props,
          itemClassName = _this$props.itemClassName,
          ItemComp = _this$props.ItemComp,
          onClickItem = _this$props.onClickItem;
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

    _this._renderLevel2 = function (lists, captionProp, itemsProp) {
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
        }, _this._renderLevel3(items, captionProp));
      });
    };

    _this._renderLevel1 = function (model) {
      if (model === void 0) {
        model = {};
      }

      var _model = model,
          _model$meta = _model.meta,
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
        }, _this._renderLevel2(lists, _captionProp, _itemsProp));
      });
    };

    return _this;
  }

  var _proto = MenuListType2.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState && this.props.model === nextProps.model) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var model = this.props.model;
    return /*#__PURE__*/_react["default"].createElement("div", null, this._renderLevel1(model));
  };

  return MenuListType2;
}(_react.Component);

var _default = MenuListType2;
exports["default"] = _default;
//# sourceMappingURL=MenuListType2.js.map