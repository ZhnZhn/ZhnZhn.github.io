"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _WatchActions = _interopRequireWildcard(require("../../flux/actions/WatchActions"));

var _MsgWatch = _interopRequireDefault(require("../../constants/MsgWatch"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _TabPane = _interopRequireDefault(require("../zhn/TabPane"));

var _Tab = _interopRequireDefault(require("../zhn/Tab"));

var _ListCreatePane = _interopRequireDefault(require("./ListCreatePane"));

var _ListEditPane = _interopRequireDefault(require("./ListEditPane"));

var _ListDeletePane = _interopRequireDefault(require("./ListDeletePane"));

//import PropTypes from "prop-types";
var createList = _WatchActions["default"].createList,
    renameList = _WatchActions["default"].renameList,
    deleteList = _WatchActions["default"].deleteList;
var EDIT_WATCH_COMPLETED = _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
    EDIT_WATCH_FAILED = _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
    CREATE_LIST = _WatchActions.WatchActionTypes.CREATE_LIST,
    RENAME_LIST = _WatchActions.WatchActionTypes.RENAME_LIST,
    DELETE_LIST = _WatchActions.WatchActionTypes.DELETE_LIST;
var notSelected = _MsgWatch["default"].notSelected,
    emptyName = _MsgWatch["default"].emptyName;

var EditListDialog = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(EditListDialog, _Component);

  function EditListDialog() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = EditListDialog.prototype;

  /*
  static propTypes = {
    isShow : PropTypes.bool,
    store : PropTypes.object,
    onClose : PropTypes.func
  }
  */
  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        store = _this$props.store,
        onClose = _this$props.onClose;
    return /*#__PURE__*/_react["default"].createElement(_ModalDialog["default"], {
      caption: "Watch Lists Edit",
      isShow: isShow,
      isWithButton: false,
      onClose: onClose
    }, /*#__PURE__*/_react["default"].createElement(_TabPane["default"], {
      width: "380px"
    }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
      title: "Create"
    }, /*#__PURE__*/_react["default"].createElement(_ListCreatePane["default"], {
      store: store,
      actionCompleted: EDIT_WATCH_COMPLETED,
      actionFailed: EDIT_WATCH_FAILED,
      forActionType: CREATE_LIST,
      msgOnNotSelect: notSelected,
      msgOnIsEmptyName: emptyName,
      onCreate: createList,
      onClose: onClose
    })), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
      title: "Rename"
    }, /*#__PURE__*/_react["default"].createElement(_ListEditPane["default"], {
      store: store,
      actionCompleted: EDIT_WATCH_COMPLETED,
      actionFailed: EDIT_WATCH_FAILED,
      forActionType: RENAME_LIST,
      msgOnNotSelect: notSelected,
      msgOnIsEmptyName: emptyName,
      onRename: renameList,
      onClose: onClose
    })), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
      title: "Delete"
    }, /*#__PURE__*/_react["default"].createElement(_ListDeletePane["default"], {
      store: store,
      actionCompleted: EDIT_WATCH_COMPLETED,
      actionFailed: EDIT_WATCH_FAILED,
      forActionType: DELETE_LIST,
      msgOnNotSelect: notSelected,
      onDelete: deleteList,
      onClose: onClose
    }))));
  };

  return EditListDialog;
}(_react.Component);

var _default = EditListDialog;
exports["default"] = _default;
//# sourceMappingURL=EditListDialog.js.map