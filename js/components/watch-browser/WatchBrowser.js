"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _Type = require("../../constants/Type");

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _WatchActions = _interopRequireDefault(require("../../flux/actions/WatchActions"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _EditBar = _interopRequireDefault(require("./EditBar"));

var _WatchItem = _interopRequireDefault(require("./WatchItem"));

var _withWatchDnD = _interopRequireDefault(require("./decorators/withWatchDnD"));

var _jsxRuntime = require("react/jsx-runtime");

var _class;

var CL_SCROLL = 'scroll-container-y scroll-watch',
    CL_WATCH_ITEM = 'row__type2-topic not-selected',
    C_GROUP_OPEN = '#1b75bb',
    C_LIST_OPEN = '#80c040',
    S_BROWSER = {
  paddingRight: 0
},
    S_BT_CIRCLE = {
  position: 'relative',
  top: 4,
  marginLeft: 20
},
    S_GROUP_DIV = {
  lineHeight: 2
},
    S_LIST_DIV = {
  marginLeft: 8,
  paddingLeft: 2,
  borderLeftStyle: 'solid',
  borderLeftWidth: 2,
  borderLeftColor: 'inherit',
  lineHeight: 2
},
    S_MR_10 = {
  marginRight: 10
};
var DRAG = {
  GROUP: 'GROUP',
  C_GROUP_ENTER: C_GROUP_OPEN,
  LIST: 'LIST',
  C_LIST_ENTER: C_LIST_OPEN,
  ITEM: 'ITEM'
};

var WatchBrowser = (0, _withWatchDnD.default)(_class = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2.default)(WatchBrowser, _Component);

  function WatchBrowser(props) {
    var _this;

    _this = _Component.call(this, props) || this;

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
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.OpenClose2, {
          style: S_GROUP_DIV //openColor={C_GROUP_OPEN}
          ,
          caption: caption,
          isDraggable: isModeEdit,
          option: {
            caption: caption
          },
          onDragStart: _this._hDragStartGroup,
          onDragEnter: _this._hDragEnterGroup,
          onDragOver: _this._hDragOverGroup,
          onDragLeave: _this._hDragLeaveGroup,
          onDrop: _this._hDropGroup,
          children: lists && _this._renderLists(lists, caption)
        }, index);
      });
    };

    _this._renderLists = function (lists, groupCaption) {
      var isModeEdit = _this.state.isModeEdit;
      return lists.map(function (list, index) {
        var caption = list.caption,
            items = list.items;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.OpenClose2, {
          style: S_LIST_DIV,
          notSelectedStyle: S_MR_10,
          openColor: C_LIST_OPEN,
          caption: caption,
          isDraggable: isModeEdit,
          option: {
            groupCaption: groupCaption,
            caption: caption
          },
          onDragStart: _this._hDragStartList,
          onDragEnter: _this._hDragEnterList,
          onDragOver: _this._hDragOverList,
          onDragLeave: _this._hDragLeaveList,
          onDrop: _this._hDropList,
          children: items && _this._renderItems(items, groupCaption, caption)
        }, index);
      });
    };

    _this._renderItems = function (items, groupCaption, listCaption) {
      var isModeEdit = _this.state.isModeEdit;
      return items.map(function (item, index) {
        var id = item.id,
            caption = item.caption;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WatchItem.default, {
          className: CL_WATCH_ITEM,
          isModeEdit: isModeEdit,
          item: item,
          option: {
            groupCaption: groupCaption,
            listCaption: listCaption,
            caption: caption
          },
          onClick: _this._handlerClickItem,
          onClose: _this._handlerRemoveItem,
          onDragStart: _this._hDragStartItem,
          onDragOver: _this._hDragOverItem,
          onDragEnter: _this._hDragEnterItem,
          onDragLeave: _this._hDragLeaveItem,
          onDrop: _this._hDropItem
        }, id);
      });
    };

    _this._bindDnDGroup(DRAG, _WatchActions.default);

    _this._bindDnDList(DRAG, _WatchActions.default);

    _this._bindDnDItem(DRAG, _WatchActions.default);

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
    _WatchActions.default.saveWatch();
  };

  _proto._handlerEditGroup = function _handlerEditGroup() {
    _ComponentActions.default.showModalDialog(_Type.ModalDialog.EDIT_WATCH_GROUP);
  };

  _proto._handlerEditList = function _handlerEditList() {
    _ComponentActions.default.showModalDialog(_Type.ModalDialog.EDIT_WATCH_LIST);
  };

  _proto._handlerClickItem = function _handlerClickItem(item) {
    _ComponentActions.default.showModalDialog(_Type.ModalDialog.LOAD_ITEM, item);
  };

  _proto._handlerRemoveItem = function _handlerRemoveItem(option, event) {
    event.stopPropagation();

    _WatchActions.default.removeItem(option);
  };

  _proto.render = function render() {
    var caption = this.props.caption,
        _this$state = this.state,
        isShow = _this$state.isShow,
        isModeEdit = _this$state.isModeEdit,
        watchList = _this$state.watchList,
        _captionEV = isModeEdit ? 'V' : 'E';

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.Browser, {
      isShow: isShow,
      style: S_BROWSER,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.BrowserCaption, {
        caption: caption,
        onClose: this._handlerHide,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ButtonCircle, {
          caption: "S",
          title: "Save to LocalStorage",
          style: S_BT_CIRCLE,
          onClick: this._handlerSaveWatch
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ButtonCircle, {
          caption: _captionEV,
          title: "Toggle Edit Mode: E/V",
          style: S_BT_CIRCLE,
          onClick: this._handlerToggleEditMode
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditBar.default, {
        isShow: isModeEdit,
        onClickGroup: this._handlerEditGroup,
        onClickList: this._handlerEditList
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
        className: CL_SCROLL,
        children: watchList && this._renderWatchList(watchList)
      })]
    });
  };

  return WatchBrowser;
}(_react.Component)) || _class;

var _default = WatchBrowser;
exports.default = _default;
//# sourceMappingURL=WatchBrowser.js.map