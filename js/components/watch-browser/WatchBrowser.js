'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithDnDStyle = require('./with/WithDnDStyle');

var _WithDnDStyle2 = _interopRequireDefault(_WithDnDStyle);

var _createHandlerDnDGroup = require('./with/createHandlerDnDGroup');

var _createHandlerDnDGroup2 = _interopRequireDefault(_createHandlerDnDGroup);

var _createHandlerDnDList = require('./with/createHandlerDnDList');

var _createHandlerDnDList2 = _interopRequireDefault(_createHandlerDnDList);

var _createHandlerDnDItem = require('./with/createHandlerDnDItem');

var _createHandlerDnDItem2 = _interopRequireDefault(_createHandlerDnDItem);

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

var _WatchItem = require('./WatchItem');

var _WatchItem2 = _interopRequireDefault(_WatchItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DRAG = {
  GROUP: 'GROUP',
  LIST: 'LIST',
  ITEM: 'ITEM'
};

var styles = {
  browser: {
    paddingRight: '0px'
  },
  btCircle: {
    marginLeft: '20px',
    lineHeight: 'initial',
    position: 'relative',
    top: '-2px'
  },
  scrollDiv: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  groupDiv: {
    lineHeight: 2
  },
  listDiv: {
    marginLeft: '8px',
    paddingLeft: '12px',
    borderLeft: '1px solid yellow',
    lineHeight: 2
  },
  itemNotSelected: {
    borderBottom: '1px solid rgba(128, 192, 64, 0.6)',
    marginRight: '10px'
  }
};

var WatchBrowser = _react2.default.createClass(_extends({
  displayName: 'WatchBrowser'
}, _WithDnDStyle2.default, (0, _createHandlerDnDGroup2.default)(DRAG, _WatchActions2.default), (0, _createHandlerDnDList2.default)(DRAG, _WatchActions2.default), (0, _createHandlerDnDItem2.default)(DRAG, _WatchActions2.default), {
  getInitialState: function getInitialState() {
    var store = this.props.store;

    return {
      isShow: false,
      isModeEdit: false,
      watchList: store.getWatchList()
    };
  },


  componentWillMount: function componentWillMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(actionType, data) {
    var _props = this.props,
        browserType = _props.browserType,
        showAction = _props.showAction,
        updateAction = _props.updateAction;

    if (actionType === showAction && data === browserType) {
      this._handlerShow();
    } else if (actionType === updateAction) {
      this.setState({ watchList: data });
    }
  },

  _handlerHide: function _handlerHide() {
    this.setState({ isShow: false });
  },
  _handlerShow: function _handlerShow() {
    this.setState({ isShow: true });
  },
  _handlerSaveWatch: function _handlerSaveWatch() {
    _WatchActions2.default.saveWatch();
  },
  _handlerToggleEditMode: function _handlerToggleEditMode() {
    this.setState({ isModeEdit: !this.state.isModeEdit });
  },
  _handlerEditGroup: function _handlerEditGroup() {
    _ComponentActions2.default.showModalDialog(_Type.ModalDialog.EDIT_WATCH_GROUP);
  },
  _handlerEditList: function _handlerEditList() {
    _ComponentActions2.default.showModalDialog(_Type.ModalDialog.EDIT_WATCH_LIST);
  },
  _renderWatchList: function _renderWatchList(watchList) {
    var _this = this;

    var isModeEdit = this.state.isModeEdit;

    return watchList.groups.map(function (group, index) {
      var caption = group.caption,
          lists = group.lists;

      return _react2.default.createElement(
        _OpenClose2.default,
        {
          key: index,
          style: styles.groupDiv,
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
  },
  _renderLists: function _renderLists(lists, groupCaption) {
    var _this2 = this;

    var isModeEdit = this.state.isModeEdit;

    return lists.map(function (list, index) {
      var caption = list.caption,
          items = list.items;

      return _react2.default.createElement(
        _OpenClose2.default,
        {
          key: index,
          fillOpen: '#80c040',
          style: styles.listDiv,
          styleNotSelected: styles.itemNotSelected,
          caption: caption,
          isClose: true,
          isDraggable: isModeEdit,
          option: { groupCaption: groupCaption, caption: caption },
          onDragStart: _this2._handlerDragStartList,
          onDragEnter: _this2._handlerDragEnterList,
          onDragOver: _this2._handlerDragOverList,
          onDragLeave: _this2._handlerDragLeaveList,
          onDrop: _this2._handlerDropList
        },
        items && _this2._renderItems(items, groupCaption, caption)
      );
    });
  },
  _handlerClickItem: function _handlerClickItem(item) {
    _ComponentActions2.default.showModalDialog(_Type.ModalDialog.LOAD_ITEM, item);
  },
  _handlerRemoveItem: function _handlerRemoveItem(option, event) {
    event.stopPropagation();
    _WatchActions2.default.removeItem(option);
  },
  _renderItems: function _renderItems(items, groupCaption, listCaption) {
    var _this3 = this;

    var isModeEdit = this.state.isModeEdit;

    return items.map(function (item, index) {
      var id = item.id,
          caption = item.caption,
          _className = index % 2 ? 'row__topic__even not-selected' : 'row__topic__odd not-selected';

      return _react2.default.createElement(_WatchItem2.default, {
        key: id,
        className: _className,
        isModeEdit: isModeEdit,
        item: item,
        option: { groupCaption: groupCaption, listCaption: listCaption, caption: caption },
        onClick: _this3._handlerClickItem,
        onClose: _this3._handlerRemoveItem,
        onDragStart: _this3._handlerDragStartItem,
        onDragOver: _this3._handlerDragOverItem,
        onDragEnter: _this3._handlerDragEnterItem,
        onDragLeave: _this3._handlerDragLeaveItem,
        onDrop: _this3._handlerDropItem
      });
    });
  },
  _renderEditBar: function _renderEditBar(isModeEdit) {
    if (isModeEdit) {
      return _react2.default.createElement(
        'div',
        { style: { marginBottom: '10px' } },
        _react2.default.createElement(_ButtonCircle2.default, {
          caption: 'GROUP',
          className: 'bt__watch__bar',
          isWithoutDefault: true,
          onClick: this._handlerEditGroup
        }),
        _react2.default.createElement(_ButtonCircle2.default, {
          caption: 'LIST',
          className: 'bt__watch__bar',
          isWithoutDefault: true,
          style: { marginLeft: '20px' },
          onClick: this._handlerEditList
        })
      );
    } else {
      return null;
    }
  },
  render: function render() {
    var caption = this.props.caption,
        _state = this.state,
        isShow = _state.isShow,
        isModeEdit = _state.isModeEdit,
        watchList = _state.watchList,
        _captionEV = isModeEdit ? 'V' : 'E';

    return _react2.default.createElement(
      _Browser2.default,
      { isShow: isShow, style: styles.browser },
      _react2.default.createElement(
        _BrowserCaption2.default,
        {
          caption: caption,
          onClose: this._handlerHide
        },
        _react2.default.createElement(_ButtonCircle2.default, {
          caption: 'S',
          style: styles.btCircle,
          onClick: this._handlerSaveWatch
        }),
        _react2.default.createElement(_ButtonCircle2.default, {
          caption: _captionEV,
          style: styles.btCircle,
          onClick: this._handlerToggleEditMode
        })
      ),
      this._renderEditBar(isModeEdit),
      _react2.default.createElement(
        _ScrollPane2.default,
        { style: styles.scrollDiv },
        watchList && this._renderWatchList(watchList)
      )
    );
  }
}));

exports.default = WatchBrowser;
//# sourceMappingURL=WatchBrowser.js.map