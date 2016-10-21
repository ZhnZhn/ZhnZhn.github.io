'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OpenClose = require('./OpenClose2');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    marginRight: '10px'
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

var MenuListType2 = _react2.default.createClass({
  displayName: 'MenuListType2',
  getInitialState: function getInitialState() {
    return {};
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState && this.props.model === nextProps.model) {
      return false;
    }
    return true;
  },
  _renderLevel3: function _renderLevel3() {
    var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var captionProp = arguments[1];
    var _props = this.props;
    var ItemComp = _props.ItemComp;
    var onClickItem = _props.onClickItem;

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
  },
  _renderLevel2: function _renderLevel2() {
    var lists = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    var _this = this;

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
  },
  _renderLevel1: function _renderLevel1() {
    var _this2 = this;

    var model = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var _model$meta = model.meta;
    var meta = _model$meta === undefined ? {} : _model$meta;
    var caption = meta.caption;
    var level1 = meta.level1;
    var level2 = meta.level2;
    var level3 = meta.level3;
    var _captionProp = caption || MODEL_PROP.CAPTION;
    var _groupsProp = level1 || MODEL_PROP.GROUPS;
    var _listsProp = level2 || MODEL_PROP.LISTS;
    var _itemsProp = level3 || MODEL_PROP.ITEMS;
    var groups = model[_groupsProp] || [];

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
        _this2._renderLevel2(lists, _captionProp, _itemsProp)
      );
    });
  },
  render: function render() {
    var model = this.props.model;


    console.log(this.props);

    return _react2.default.createElement(
      'div',
      null,
      this._renderLevel1(model)
    );
  }
});

exports.default = MenuListType2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\MenuListType2.js.map