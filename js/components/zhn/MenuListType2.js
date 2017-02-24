'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OpenClose = require('./OpenClose2');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    borderLeft: '1px solid yellow',
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
  _inherits(MenuListType2, _Component);

  function MenuListType2() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MenuListType2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuListType2.__proto__ || Object.getPrototypeOf(MenuListType2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._renderLevel3 = function () {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var captionProp = arguments[1];
      var _this$props = _this.props,
          ItemComp = _this$props.ItemComp,
          onClickItem = _this$props.onClickItem;

      return items.map(function (item, index) {
        var caption = item[captionProp],
            _className = index % 2 ? 'row__topic__even not-selected' : 'row__topic__odd not-selected';
        return _react2.default.createElement(ItemComp, {
          key: index,
          className: _className,
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
            fillOpen: '#80c040',
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MenuListType2, [{
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\MenuListType2.js.map