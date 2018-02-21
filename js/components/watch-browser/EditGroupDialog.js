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

var _MsgWatch = require('../../constants/MsgWatch');

var _MsgWatch2 = _interopRequireDefault(_MsgWatch);

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

//import PropTypes from "prop-types";

var addGroup = _WatchActions2.default.addGroup,
    renameGroup = _WatchActions2.default.renameGroup,
    deleteGroup = _WatchActions2.default.deleteGroup;
var EDIT_WATCH_COMPLETED = _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
    EDIT_WATCH_FAILED = _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
    ADD_GROUP = _WatchActions.WatchActionTypes.ADD_GROUP,
    RENAME_GROUP = _WatchActions.WatchActionTypes.RENAME_GROUP,
    DELETE_GROUP = _WatchActions.WatchActionTypes.DELETE_GROUP;
var notSelected = _MsgWatch2.default.notSelected,
    emptyName = _MsgWatch2.default.emptyName;

var EditGroupDialog = function (_Component) {
  (0, _inherits3.default)(EditGroupDialog, _Component);

  function EditGroupDialog() {
    (0, _classCallCheck3.default)(this, EditGroupDialog);
    return (0, _possibleConstructorReturn3.default)(this, (EditGroupDialog.__proto__ || Object.getPrototypeOf(EditGroupDialog)).apply(this, arguments));
  }

  (0, _createClass3.default)(EditGroupDialog, [{
    key: 'shouldComponentUpdate',

    /*
    static propTypes = {
      isShow: PropTypes.bool,
      store: PropTypes.object,
      onClose: PropTypes.func
    }
    */

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
              actionCompleted: EDIT_WATCH_COMPLETED,
              actionFailed: EDIT_WATCH_FAILED,
              forActionType: ADD_GROUP,
              msgOnIsEmptyName: emptyName,
              onCreate: addGroup,
              onClose: onClose
            })
          ),
          _react2.default.createElement(
            _Tab2.default,
            { title: 'Rename' },
            _react2.default.createElement(_GroupEditPane2.default, {
              store: store,
              actionCompleted: EDIT_WATCH_COMPLETED,
              actionFailed: EDIT_WATCH_FAILED,
              forActionType: RENAME_GROUP,
              msgOnNotSelect: notSelected,
              msgOnIsEmptyName: emptyName,
              onRename: renameGroup,
              onClose: onClose
            })
          ),
          _react2.default.createElement(
            _Tab2.default,
            { title: 'Delete' },
            _react2.default.createElement(_GroupDeletePane2.default, {
              store: store,
              actionCompleted: EDIT_WATCH_COMPLETED,
              forActionType: DELETE_GROUP,
              msgOnNotSelect: notSelected,
              onDelete: deleteGroup,
              onClose: onClose
            })
          )
        )
      );
    }
  }]);
  return EditGroupDialog;
}(_react.Component);

exports.default = EditGroupDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\EditGroupDialog.js.map