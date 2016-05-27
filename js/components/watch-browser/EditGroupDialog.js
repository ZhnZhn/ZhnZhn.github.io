'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WatchActions = require('../../flux/actions/WatchActions');

var _WatchActions2 = _interopRequireDefault(_WatchActions);

var _ValidationMessages = require('../../constants/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _TabPane = require('../zhn/TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _Tab = require('../zhn/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _GroupAddPane = require('./GroupAddPane');

var _GroupAddPane2 = _interopRequireDefault(_GroupAddPane);

var _GroupEditPane = require('./GroupEditPane');

var _GroupEditPane2 = _interopRequireDefault(_GroupEditPane);

var _GroupDeletePane = require('./GroupDeletePane');

var _GroupDeletePane2 = _interopRequireDefault(_GroupDeletePane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditGroupDialog = _react2.default.createClass({
  displayName: 'EditGroupDialog',
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
    var _props = this.props;
    var isShow = _props.isShow;
    var store = _props.store;
    var onClose = _props.onClose;

    return _react2.default.createElement(
      _ModalDialog2.default,
      {
        caption: 'Watch Groups Edit',
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
          _react2.default.createElement(_GroupAddPane2.default, {
            store: store,
            actionCompleted: _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
            actionFailed: _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
            forActionType: _WatchActions.WatchActionTypes.ADD_GROUP,
            msgOnIsEmptyName: _ValidationMessages2.default.IS_EMPTY_NAME,
            onCreate: _WatchActions2.default.addGroup,
            onClose: onClose
          })
        ),
        _react2.default.createElement(
          _Tab2.default,
          { title: 'Rename' },
          _react2.default.createElement(_GroupEditPane2.default, {
            store: store,
            actionCompleted: _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
            actionFailed: _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
            forActionType: _WatchActions.WatchActionTypes.RENAME_GROUP,
            msgOnNotSelect: _ValidationMessages2.default.NOT_SELECTED,
            msgOnIsEmptyName: _ValidationMessages2.default.IS_EMPTY_NAME,
            onRename: _WatchActions2.default.renameGroup,
            onClose: onClose
          })
        ),
        _react2.default.createElement(
          _Tab2.default,
          { title: 'Delete' },
          _react2.default.createElement(_GroupDeletePane2.default, {
            store: store,
            actionCompleted: _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
            forActionType: _WatchActions.WatchActionTypes.DELETE_GROUP,
            msgOnNotSelect: _ValidationMessages2.default.NOT_SELECTED,
            onDelete: _WatchActions2.default.deleteGroup,
            onClose: onClose
          })
        )
      )
    );
  }
});

exports.default = EditGroupDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\EditGroupDialog.js.map