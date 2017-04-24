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

var _ListCreatePane = require('./ListCreatePane');

var _ListCreatePane2 = _interopRequireDefault(_ListCreatePane);

var _ListEditPane = require('./ListEditPane');

var _ListEditPane2 = _interopRequireDefault(_ListEditPane);

var _ListDeletePane = require('./ListDeletePane');

var _ListDeletePane2 = _interopRequireDefault(_ListDeletePane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditListDialog = function (_Component) {
  (0, _inherits3.default)(EditListDialog, _Component);

  function EditListDialog() {
    (0, _classCallCheck3.default)(this, EditListDialog);
    return (0, _possibleConstructorReturn3.default)(this, (EditListDialog.__proto__ || Object.getPrototypeOf(EditListDialog)).apply(this, arguments));
  }

  (0, _createClass3.default)(EditListDialog, [{
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
          caption: 'Watch Lists Edit',
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
  }]);
  return EditListDialog;
}(_react.Component);

process.env.NODE_ENV !== "production" ? EditListDialog.propTypes = {
  isShow: _react.PropTypes.bool,
  store: _react.PropTypes.object,
  onClose: _react.PropTypes.func
} : void 0;
exports.default = EditListDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\EditListDialog.js.map