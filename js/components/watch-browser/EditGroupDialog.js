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

var _WatchActions = require('../../flux/actions/WatchActions');

var _WatchActions2 = _interopRequireDefault(_WatchActions);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

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

var EditGroupDialog = function (_Component) {
  (0, _inherits3.default)(EditGroupDialog, _Component);

  function EditGroupDialog() {
    (0, _classCallCheck3.default)(this, EditGroupDialog);
    return (0, _possibleConstructorReturn3.default)(this, (EditGroupDialog.__proto__ || Object.getPrototypeOf(EditGroupDialog)).apply(this, arguments));
  }

  (0, _createClass3.default)(EditGroupDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          store = _props.store,
          onClose = _props.onClose;

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
          { width: '380px' },
          _react2.default.createElement(
            _Tab2.default,
            { title: 'Create' },
            _react2.default.createElement(_GroupAddPane2.default, {
              store: store,
              actionCompleted: _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
              actionFailed: _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
              forActionType: _WatchActions.WatchActionTypes.ADD_GROUP,
              msgOnIsEmptyName: _Msg2.default.IS_EMPTY_NAME,
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
              msgOnNotSelect: _Msg2.default.NOT_SELECTED,
              msgOnIsEmptyName: _Msg2.default.IS_EMPTY_NAME,
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
              msgOnNotSelect: _Msg2.default.NOT_SELECTED,
              onDelete: _WatchActions2.default.deleteGroup,
              onClose: onClose
            })
          )
        )
      );
    }
  }]);
  return EditGroupDialog;
}(_react.Component);

process.env.NODE_ENV !== "production" ? EditGroupDialog.propTypes = {
  isShow: _react.PropTypes.bool,
  store: _react.PropTypes.object,
  onClose: _react.PropTypes.func
} : void 0;
exports.default = EditGroupDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\EditGroupDialog.js.map