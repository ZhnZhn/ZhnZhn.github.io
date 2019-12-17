"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Type = require("../../constants/Type");

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _WatchActions = _interopRequireDefault(require("../../flux/actions/WatchActions"));

var _Browser = _interopRequireDefault(require("../zhn/Browser"));

var _BrowserCaption = _interopRequireDefault(require("../zhn/BrowserCaption"));

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle"));

var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));

var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose2"));

var _EditBar = _interopRequireDefault(require("./EditBar"));

var _WatchItem = _interopRequireDefault(require("./WatchItem"));

var _Decorators = _interopRequireDefault(require("./decorators/Decorators"));

var _dec, _dec2, _dec3, _dec4, _class, _temp;

var CL = {
  SCROLL: 'scroll-container-y scroll-watch',
  WATCH_ITEM: 'row__type2-topic not-selected'
};
var C_FILL_OPEN = '#80c040';
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
var WatchBrowser = (_dec = _Decorators["default"].withDnDStyle, _dec2 = _Decorators["default"].withDnDGroup(DRAG, _WatchActions["default"]), _dec3 = _Decorators["default"].withDnDList(DRAG, _WatchActions["default"]), _dec4 = _Decorators["default"].withDnDItem(DRAG, _WatchActions["default"]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(WatchBrowser, _Component);

  function WatchBrowser(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          showAction = _this$props.showAction,
          updateAction = _this$props.updateAction;

      if (actionType === showAction && data === browserType) {
        _this._handlerShow();
      } else if (actionType === updateAction) {
        _this.setState({
          watchList: data
        });
      }
    };

    _this._handlerHide = function () {
      _this.setState({
        isShow: false
      });
    };

    _this._handlerShow = function () {
      _this.setState({
        isShow: true
      });
    };

    _this._handlerToggleEditMode = function () {
      _this.setState({
        isModeEdit: !_this.state.isModeEdit
      });
    };

    _this._renderWatchList = function (watchList) {
      var isModeEdit = _this.state.isModeEdit;
      return watchList.groups.map(function (group, index) {
        var caption = group.caption,
            lists = group.lists;
        return _react["default"].createElement(_OpenClose["default"], {
          key: index,
          style: S.GROUP_DIV,
          caption: caption,
          isClose: true,
          isDraggable: isModeEdit,
          option: {
            caption: caption
          },
          onDragStart: _this._handlerDragStartGroup,
          onDragEnter: _this._handlerDragEnterGroup,
          onDragOver: _this._handlerDragOverGroup,
          onDragLeave: _this._handlerDragLeaveGroup,
          onDrop: _this._handlerDropGroup
        }, lists && _this._renderLists(lists, caption));
      });
    };

    _this._renderLists = function (lists, groupCaption) {
      var isModeEdit = _this.state.isModeEdit;
      return lists.map(function (list, index) {
        var caption = list.caption,
            items = list.items;
        return _react["default"].createElement(_OpenClose["default"], {
          key: index,
          fillOpen: C_FILL_OPEN,
          style: S.LIST_DIV,
          styleNotSelected: S.ITEM_NOT_SELECTED,
          caption: caption,
          isClose: true,
          isDraggable: isModeEdit,
          option: {
            groupCaption: groupCaption,
            caption: caption
          },
          onDragStart: _this._handlerDragStartList,
          onDragEnter: _this._handlerDragEnterList,
          onDragOver: _this._handlerDragOverList,
          onDragLeave: _this._handlerDragLeaveList,
          onDrop: _this._handlerDropList
        }, items && _this._renderItems(items, groupCaption, caption));
      });
    };

    _this._renderItems = function (items, groupCaption, listCaption) {
      var isModeEdit = _this.state.isModeEdit;
      return items.map(function (item, index) {
        var id = item.id,
            caption = item.caption;
        return _react["default"].createElement(_WatchItem["default"], {
          key: id,
          className: CL.WATCH_ITEM,
          isModeEdit: isModeEdit,
          item: item,
          option: {
            groupCaption: groupCaption,
            listCaption: listCaption,
            caption: caption
          },
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

    _this._handlerDragStartGroup = _this._handlerDragStartGroup.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDropGroup = _this._handlerDropGroup.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDragEnterGroup = _this._handlerDragEnterGroup.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDragLeaveGroup = _this._handlerDragLeaveGroup.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDragStartList = _this._handlerDragStartList.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDropList = _this._handlerDropList.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDragEnterList = _this._handlerDragEnterList.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDragLeaveList = _this._handlerDragLeaveList.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDragStartItem = _this._handlerDragStartItem.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDropItem = _this._handlerDropItem.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDragEnterItem = _this._handlerDragEnterItem.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handlerDragLeaveItem = _this._handlerDragLeaveItem.bind((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      isShow: !!props.isInitShow,
      isModeEdit: false,
      watchList: props.store.getWatchList()
    };
    return _this;
  }

  var _proto = WatchBrowser.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto._handlerSaveWatch = function _handlerSaveWatch() {
    _WatchActions["default"].saveWatch();
  };

  _proto._handlerEditGroup = function _handlerEditGroup() {
    _ComponentActions["default"].showModalDialog(_Type.ModalDialog.EDIT_WATCH_GROUP);
  };

  _proto._handlerEditList = function _handlerEditList() {
    _ComponentActions["default"].showModalDialog(_Type.ModalDialog.EDIT_WATCH_LIST);
  };

  _proto._handlerClickItem = function _handlerClickItem(item) {
    _ComponentActions["default"].showModalDialog(_Type.ModalDialog.LOAD_ITEM, item);
  };

  _proto._handlerRemoveItem = function _handlerRemoveItem(option, event) {
    event.stopPropagation();

    _WatchActions["default"].removeItem(option);
  };

  _proto.render = function render() {
    var caption = this.props.caption,
        _this$state = this.state,
        isShow = _this$state.isShow,
        isModeEdit = _this$state.isModeEdit,
        watchList = _this$state.watchList,
        _captionEV = isModeEdit ? 'V' : 'E';

    return _react["default"].createElement(_Browser["default"], {
      isShow: isShow,
      style: S.BROWSER
    }, _react["default"].createElement(_BrowserCaption["default"], {
      caption: caption,
      onClose: this._handlerHide
    }, _react["default"].createElement(_ButtonCircle["default"], {
      caption: "S",
      title: "Save to LocalStorage",
      style: S.BT_CIRCLE,
      onClick: this._handlerSaveWatch
    }), _react["default"].createElement(_ButtonCircle["default"], {
      caption: _captionEV,
      title: "Toggle Edit Mode: E/V",
      style: S.BT_CIRCLE,
      onClick: this._handlerToggleEditMode
    })), _react["default"].createElement(_EditBar["default"], {
      isShow: isModeEdit,
      onClickGroup: this._handlerEditGroup,
      onClickList: this._handlerEditList
    }), _react["default"].createElement(_ScrollPane["default"], {
      className: CL.SCROLL
    }, watchList && this._renderWatchList(watchList)));
  };

  return WatchBrowser;
}(_react.Component), _temp)) || _class) || _class) || _class) || _class);
var _default = WatchBrowser;
exports["default"] = _default;
//# sourceMappingURL=WatchBrowser.js.map