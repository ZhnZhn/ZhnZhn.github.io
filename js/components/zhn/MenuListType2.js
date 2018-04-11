'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Color = require('../styles/Color');

var _Color2 = _interopRequireDefault(_Color);

var _OpenClose = require('./OpenClose2');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C_FILL_OPEN = _Color2.default.GREEN;
var C_LEFT_BORDER = _Color2.default.YELLOW;

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
    marginLeft: '8px',
    paddingLeft: '12px',
    //borderLeft : '1px solid yellow',
    borderLeft: '1px solid ' + C_LEFT_BORDER,
    lineHeight: 2
  },
  LIST_DIV_NOT_SELECTED: {
    borderBottom: '1px solid rgba(128, 192, 64, 0.6)',
    marginRight: '2px'
  },
  ITEM_DIV: {
    position: 'relative',
    paddingRight: '10px',
    lineHeight: 1.4,
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  ITEM_SPAN: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '100%',
    //maxWidth: '250px',
    //direction: "ltr",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

var MenuListType2 = function (_Component) {
  (0, _inherits3.default)(MenuListType2, _Component);

  function MenuListType2() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuListType2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuListType2.__proto__ || Object.getPrototypeOf(MenuListType2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._renderLevel3 = function () {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var captionProp = arguments[1];
      var _this$props = _this.props,
          itemClassName = _this$props.itemClassName,
          ItemComp = _this$props.ItemComp,
          onClickItem = _this$props.onClickItem;

      return items.map(function (item, index) {
        var caption = item[captionProp];
        return _react2.default.createElement(ItemComp, {
          key: index,
          className: itemClassName,
          caption: caption,
          item: item,
          onClickItem: onClickItem
        });
      });
    }, _this._renderLevel2 = function () {
      var lists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var captionProp = arguments[1];
      var itemsProp = arguments[2];

      return lists.map(function (list, index) {
        var caption = list[captionProp],
            items = list[itemsProp];
        return _react2.default.createElement(
          _OpenClose2.default,
          {
            key: index,
            fillOpen: C_FILL_OPEN,
            style: STYLE.LIST_DIV,
            styleNotSelected: STYLE.LIST_DIV_NOT_SELECTED,
            isClose: true,
            caption: caption
          },
          _this._renderLevel3(items, captionProp)
        );
      });
    }, _this._renderLevel1 = function () {
      var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _model$meta = model.meta,
          meta = _model$meta === undefined ? {} : _model$meta,
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
        return _react2.default.createElement(
          _OpenClose2.default,
          {
            key: index,
            style: STYLE.GROUP_DIV,
            isClose: true,
            caption: caption
          },
          _this._renderLevel2(lists, _captionProp, _itemsProp)
        );
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuListType2, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state === nextState && this.props.model === nextProps.model) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var model = this.props.model;

      return _react2.default.createElement(
        'div',
        null,
        this._renderLevel1(model)
      );
    }
  }]);
  return MenuListType2;
}(_react.Component);

exports.default = MenuListType2;
//# sourceMappingURL=MenuListType2.js.map