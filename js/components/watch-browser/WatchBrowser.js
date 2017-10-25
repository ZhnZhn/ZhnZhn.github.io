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

var _dec, _dec2, _dec3, _dec4, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _WatchActions = require('../../flux/actions/WatchActions');

var _WatchActions2 = _interopRequireDefault(_WatchActions);

var _Browser = require('../zhn/Browser');

var _Browser2 = _interopRequireDefault(_Browser);

var _BrowserCaption = require('../zhn/BrowserCaption');

var _BrowserCaption2 = _interopRequireDefault(_BrowserCaption);

var _ButtonCircle = require('../zhn/ButtonCircle');

var _ButtonCircle2 = _interopRequireDefault(_ButtonCircle);

var _ScrollPane = require('../zhn/ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _OpenClose = require('../zhn/OpenClose2');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _EditBar = require('./EditBar');

var _EditBar2 = _interopRequireDefault(_EditBar);

var _WatchItem = require('./WatchItem');

var _WatchItem2 = _interopRequireDefault(_WatchItem);

var _Decorators = require('./decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C_FILL_OPEN = '#80c040';
var CL_WATCH_ITEM = 'row__type2-topic not-selected';

var DRAG = {
  GROUP: 'GROUP',
  LIST: 'LIST',
  ITEM: 'ITEM'
};

var S = {
  BROWSER: {
    paddingRight: '0px'
  },
  BT_CIRCLE: {
    marginLeft: '20px',
    position: 'relative',
    top: '-2px'
  },
  SCROLL_DIV: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  GROUP_DIV: {
    lineHeight: 2
  },
  LIST_DIV: {
    marginLeft: '8px',
    paddingLeft: '12px',
    borderLeft: '1px solid yellow',
    lineHeight: 2
  },
  ITEM_NOT_SELECTED: {
    borderBottom: '1px solid rgba(128, 192, 64, 0.6)',
    marginRight: '10px'
  }
};

var WatchBrowser = (_dec = _Decorators2.default.withDnDStyle, _dec2 = _Decorators2.default.withDnDGroup(DRAG, _WatchActions2.default), _dec3 = _Decorators2.default.withDnDList(DRAG, _WatchActions2.default), _dec4 = _Decorators2.default.withDnDItem(DRAG, _WatchActions2.default), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function (_Component) {
  (0, _inherits3.default)(WatchBrowser, _Component);

  function WatchBrowser(props) {
    (0, _classCallCheck3.default)(this, WatchBrowser);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WatchBrowser.__proto__ || Object.getPrototypeOf(WatchBrowser)).call(this));

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          showAction = _this$props.showAction,
          updateAction = _this$props.updateAction;

      if (actionType === showAction && data === browserType) {
        _this._handlerShow();
      } else if (actionType === updateAction) {
        _this.setState({ watchList: data });
      }
    };

    _this._handlerHide = function () {
      _this.setState({ isShow: false });
    };

    _this._handlerShow = function () {
      _this.setState({ isShow: true });
    };

    _this._handlerToggleEditMode = function () {
      _this.setState({ isModeEdit: !_this.state.isModeEdit });
    };

    _this._renderWatchList = function (watchList) {
      var isModeEdit = _this.state.isModeEdit;

      return watchList.groups.map(function (group, index) {
        var caption = group.caption,
            lists = group.lists;

        return _react2.default.createElement(
          _OpenClose2.default,
          {
            key: index,
            style: S.GROUP_DIV,
            caption: caption,
            isClose: true,
            isDraggable: isModeEdit,
            option: { caption: caption },
            onDragStart: _this._handlerDragStartGroup,
            onDragEnter: _this._handlerDragEnterGroup,
            onDragOver: _this._handlerDragOverGroup,
            onDragLeave: _this._handlerDragLeaveGroup,
            onDrop: _this._handlerDropGroup
          },
          lists && _this._renderLists(lists, caption)
        );
      });
    };

    _this._renderLists = function (lists, groupCaption) {
      var isModeEdit = _this.state.isModeEdit;

      return lists.map(function (list, index) {
        var caption = list.caption,
            items = list.items;

        return _react2.default.createElement(
          _OpenClose2.default,
          {
            key: index,
            fillOpen: C_FILL_OPEN,
            style: S.LIST_DIV,
            styleNotSelected: S.ITEM_NOT_SELECTED,
            caption: caption,
            isClose: true,
            isDraggable: isModeEdit,
            option: { groupCaption: groupCaption, caption: caption },
            onDragStart: _this._handlerDragStartList,
            onDragEnter: _this._handlerDragEnterList,
            onDragOver: _this._handlerDragOverList,
            onDragLeave: _this._handlerDragLeaveList,
            onDrop: _this._handlerDropList
          },
          items && _this._renderItems(items, groupCaption, caption)
        );
      });
    };

    _this._renderItems = function (items, groupCaption, listCaption) {
      var isModeEdit = _this.state.isModeEdit;

      return items.map(function (item, index) {
        var id = item.id,
            caption = item.caption;

        return _react2.default.createElement(_WatchItem2.default, {
          key: id,
          className: CL_WATCH_ITEM,
          isModeEdit: isModeEdit,
          item: item,
          option: { groupCaption: groupCaption, listCaption: listCaption, caption: caption },
          onClick: _this._handlerClickItem,
          onClose: _this._handlerRemoveItem,
          onDragStart: _this._handlerDragStartItem,
          onDragOver: _this._handlerDragOverItem,
          onDragEnter: _this._handlerDragEnterItem,
          onDragLeave: _this._handlerDragLeaveItem,
          onDrop: _this._handlerDropItem
        });
      });
    };

    _this._handlerDragStartGroup = _this._handlerDragStartGroup.bind(_this);
    _this._handlerDropGroup = _this._handlerDropGroup.bind(_this);
    _this._handlerDragEnterGroup = _this._handlerDragEnterGroup.bind(_this);
    _this._handlerDragLeaveGroup = _this._handlerDragLeaveGroup.bind(_this);

    _this._handlerDragStartList = _this._handlerDragStartList.bind(_this);
    _this._handlerDropList = _this._handlerDropList.bind(_this);
    _this._handlerDragEnterList = _this._handlerDragEnterList.bind(_this);
    _this._handlerDragLeaveList = _this._handlerDragLeaveList.bind(_this);

    _this._handlerDragStartItem = _this._handlerDragStartItem.bind(_this);
    _this._handlerDropItem = _this._handlerDropItem.bind(_this);
    _this._handlerDragEnterItem = _this._handlerDragEnterItem.bind(_this);
    _this._handlerDragLeaveItem = _this._handlerDragLeaveItem.bind(_this);

    _this.state = {
      isShow: !!props.isInitShow,
      isModeEdit: false,
      watchList: props.store.getWatchList()
    };
    return _this;
  }

  (0, _createClass3.default)(WatchBrowser, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: '_handlerSaveWatch',
    value: function _handlerSaveWatch() {
      _WatchActions2.default.saveWatch();
    }
  }, {
    key: '_handlerEditGroup',
    value: function _handlerEditGroup() {
      _ComponentActions2.default.showModalDialog(_Type.ModalDialog.EDIT_WATCH_GROUP);
    }
  }, {
    key: '_handlerEditList',
    value: function _handlerEditList() {
      _ComponentActions2.default.showModalDialog(_Type.ModalDialog.EDIT_WATCH_LIST);
    }
  }, {
    key: '_handlerClickItem',
    value: function _handlerClickItem(item) {
      _ComponentActions2.default.showModalDialog(_Type.ModalDialog.LOAD_ITEM, item);
    }
  }, {
    key: '_handlerRemoveItem',
    value: function _handlerRemoveItem(option, event) {
      event.stopPropagation();
      _WatchActions2.default.removeItem(option);
    }
  }, {
    key: 'render',
    value: function render() {
      var caption = this.props.caption,
          _state = this.state,
          isShow = _state.isShow,
          isModeEdit = _state.isModeEdit,
          watchList = _state.watchList,
          _captionEV = isModeEdit ? 'V' : 'E';

      return _react2.default.createElement(
        _Browser2.default,
        { isShow: isShow, style: S.BROWSER },
        _react2.default.createElement(
          _BrowserCaption2.default,
          {
            caption: caption,
            onClose: this._handlerHide
          },
          _react2.default.createElement(_ButtonCircle2.default, {
            caption: 'S',
            title: 'Save to LocalStorage',
            style: S.BT_CIRCLE,
            onClick: this._handlerSaveWatch
          }),
          _react2.default.createElement(_ButtonCircle2.default, {
            caption: _captionEV,
            title: 'Toggle Edit Mode: E/V',
            style: S.BT_CIRCLE,
            onClick: this._handlerToggleEditMode
          })
        ),
        _react2.default.createElement(_EditBar2.default, {
          isShow: isModeEdit,
          onClickGroup: this._handlerEditGroup,
          onClickList: this._handlerEditList
        }),
        _react2.default.createElement(
          _ScrollPane2.default,
          { style: S.SCROLL_DIV },
          watchList && this._renderWatchList(watchList)
        )
      );
    }
  }]);
  return WatchBrowser;
}(_react.Component)) || _class) || _class) || _class) || _class);
exports.default = WatchBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\WatchBrowser.js.map