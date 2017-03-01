'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WatchActions = require('../../flux/actions/WatchActions');

var _WatchActions2 = _interopRequireDefault(_WatchActions);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _TabPane = require('../zhn/TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _Tab = require('../zhn/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _ListCreatePane = require('./ListCreatePane');

var _ListCreatePane2 = _interopRequireDefault(_ListCreatePane);

var _ListEditPane = require('./ListEditPane');

var _ListEditPane2 = _interopRequireDefault(_ListEditPane);

var _ListDeletePane = require('./ListDeletePane');

var _ListDeletePane2 = _interopRequireDefault(_ListDeletePane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditListDialog = _react2.default.createClass({
  displayName: 'EditListDialog',
  propTypes: {
    isShow: _react2.default.PropTypes.bool,
    store: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },
  render: function render() {
    var _props = this.props,
        isShow = _props.isShow,
        store = _props.store,
        onClose = _props.onClose;

    return _react2.default.createElement(
      _ModalDialog2.default,
      {
        caption: 'Watch Lists Edit',
        isShow: isShow,
        isWithButton: false,
        onClose: onClose
      },
      _react2.default.createElement(
        _TabPane2.default,
        { key: '1', width: '380px' },
        _react2.default.createElement(
          _Tab2.default,
          { title: 'Create' },
          _react2.default.createElement(_ListCreatePane2.default, {
            store: store,
            actionCompleted: _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
            actionFailed: _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
            forActionType: _WatchActions.WatchActionTypes.CREATE_LIST,
            msgOnNotSelect: _Msg2.default.NOT_SELECTED,
            msgOnIsEmptyName: _Msg2.default.IS_EMPTY_NAME,
            onCreate: _WatchActions2.default.createList,
            onClose: onClose })
        ),
        _react2.default.createElement(
          _Tab2.default,
          { title: 'Rename' },
          _react2.default.createElement(_ListEditPane2.default, {
            store: store,
            actionCompleted: _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
            actionFailed: _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
            forActionType: _WatchActions.WatchActionTypes.RENAME_LIST,
            msgOnNotSelect: _Msg2.default.NOT_SELECTED,
            msgOnIsEmptyName: _Msg2.default.IS_EMPTY_NAME,
            onRename: _WatchActions2.default.renameList,
            onClose: onClose
          })
        ),
        _react2.default.createElement(
          _Tab2.default,
          { title: 'Delete' },
          _react2.default.createElement(_ListDeletePane2.default, {
            store: store,
            actionCompleted: _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
            actionFailed: _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
            forActionType: _WatchActions.WatchActionTypes.DELETE_LIST,
            msgOnNotSelect: _Msg2.default.NOT_SELECTED,
            onDelete: _WatchActions2.default.deleteList,
            onClose: onClose
          })
        )
      )
    );
  }
});

exports.default = EditListDialog;
//# sourceMappingURL=EditListDialog.js.map