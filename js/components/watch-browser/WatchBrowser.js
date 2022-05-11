"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ModalDialogType = require("../../constants/ModalDialogType");

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _WatchActions = require("../../flux/actions/WatchActions");

var _Comp = _interopRequireDefault(require("../Comp"));

var _EditBar = _interopRequireDefault(require("./EditBar"));

var _WatchItem = _interopRequireDefault(require("./WatchItem"));

var _withWatchDnD = _interopRequireDefault(require("./decorators/withWatchDnD"));

var _jsxRuntime = require("react/jsx-runtime");

var _class;

const CL_SCROLL = 'scroll-container-y scroll-watch',
      CL_WATCH_ITEM = 'row__type2-topic not-selected',
      C_GROUP_OPEN = '#1b75bb',
      C_LIST_OPEN = '#80c040',
      S_BROWSER = {
  paddingRight: 0
},
      S_BT_CIRCLE = {
  position: 'relative',
  top: -4,
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
const DRAG = {
  GROUP: 'GROUP',
  C_GROUP_ENTER: C_GROUP_OPEN,
  LIST: 'LIST',
  C_LIST_ENTER: C_LIST_OPEN,
  ITEM: 'ITEM'
};

let WatchBrowser = (0, _withWatchDnD.default)(_class = class WatchBrowser extends _react.Component {
  constructor(props) {
    super(props);

    this._onStore = (actionType, data) => {
      const {
        browserType,
        showAction,
        updateAction
      } = this.props;

      if (actionType === showAction && data === browserType) {
        this._handlerShow();
      } else if (actionType === updateAction) {
        this.setState({
          watchList: data
        });
      }
    };

    this._handlerHide = () => {
      this.setState({
        isShow: false
      });
    };

    this._handlerShow = () => {
      this.setState({
        isShow: true
      });
    };

    this._handlerToggleEditMode = () => {
      this.setState({
        isModeEdit: !this.state.isModeEdit
      });
    };

    this._renderWatchList = watchList => {
      const {
        isModeEdit
      } = this.state;
      return watchList.groups.map((group, index) => {
        const {
          caption,
          lists
        } = group;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.OpenClose2, {
          style: S_GROUP_DIV //openColor={C_GROUP_OPEN}
          ,
          caption: caption,
          isDraggable: isModeEdit,
          option: {
            caption
          },
          onDragStart: this._hDragStartGroup,
          onDragEnter: this._hDragEnterGroup,
          onDragOver: this._hDragOverGroup,
          onDragLeave: this._hDragLeaveGroup,
          onDrop: this._hDropGroup,
          children: lists && this._renderLists(lists, caption)
        }, index);
      });
    };

    this._renderLists = (lists, groupCaption) => {
      const {
        isModeEdit
      } = this.state;
      return lists.map((list, index) => {
        const {
          caption,
          items
        } = list;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.OpenClose2, {
          style: S_LIST_DIV,
          notSelectedStyle: S_MR_10,
          openColor: C_LIST_OPEN,
          caption: caption,
          isDraggable: isModeEdit,
          option: {
            groupCaption,
            caption
          },
          onDragStart: this._hDragStartList,
          onDragEnter: this._hDragEnterList,
          onDragOver: this._hDragOverList,
          onDragLeave: this._hDragLeaveList,
          onDrop: this._hDropList,
          children: items && this._renderItems(items, groupCaption, caption)
        }, index);
      });
    };

    this._renderItems = (items, groupCaption, listCaption) => {
      const {
        isModeEdit
      } = this.state;
      return items.map((item, index) => {
        const {
          id,
          caption
        } = item;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WatchItem.default, {
          className: CL_WATCH_ITEM,
          isModeEdit: isModeEdit,
          item: item,
          option: {
            groupCaption,
            listCaption,
            caption
          },
          onClick: this._handlerClickItem,
          onClose: this._handlerRemoveItem,
          onDragStart: this._hDragStartItem,
          onDragOver: this._hDragOverItem,
          onDragEnter: this._hDragEnterItem,
          onDragLeave: this._hDragLeaveItem,
          onDrop: this._hDropItem
        }, id);
      });
    };

    this._bindDnDGroup(DRAG, _WatchActions.WatchActions);

    this._bindDnDList(DRAG, _WatchActions.WatchActions);

    this._bindDnDItem(DRAG, _WatchActions.WatchActions);

    this.state = {
      isShow: !!props.isInitShow,
      isModeEdit: false,
      watchList: props.store.getWatchList()
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _handlerSaveWatch() {
    _WatchActions.WatchActions.saveWatch();
  }

  _handlerEditGroup() {
    _ComponentActions.default.showModalDialog(_ModalDialogType.MDT_EDIT_WATCH_GROUP);
  }

  _handlerEditList() {
    _ComponentActions.default.showModalDialog(_ModalDialogType.MDT_EDIT_WATCH_LIST);
  }

  _handlerClickItem(item) {
    _ComponentActions.default.showModalDialog(_ModalDialogType.MDT_LOAD_ITEM, item);
  }

  _handlerRemoveItem(option, event) {
    event.stopPropagation();

    _WatchActions.WatchActions.removeItem(option);
  }

  render() {
    const {
      caption
    } = this.props,
          {
      isShow,
      isModeEdit,
      watchList
    } = this.state,
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
  }

}) || _class;

var _default = WatchBrowser;
exports.default = _default;
//# sourceMappingURL=WatchBrowser.js.map