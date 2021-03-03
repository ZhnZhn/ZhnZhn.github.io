"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _WatchActions = _interopRequireWildcard(require("../../flux/actions/WatchActions"));

var _MsgWatch = _interopRequireDefault(require("../../constants/MsgWatch"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _TabPane = _interopRequireDefault(require("../zhn/TabPane"));

var _Tab = _interopRequireDefault(require("../zhn/Tab"));

var _GroupAddPane = _interopRequireDefault(require("./GroupAddPane"));

var _GroupEditPane = _interopRequireDefault(require("./GroupEditPane"));

var _GroupDeletePane = _interopRequireDefault(require("./GroupDeletePane"));

//import PropTypes from "prop-types";
var addGroup = _WatchActions["default"].addGroup,
    renameGroup = _WatchActions["default"].renameGroup,
    deleteGroup = _WatchActions["default"].deleteGroup;
var EDIT_WATCH_COMPLETED = _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
    EDIT_WATCH_FAILED = _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
    ADD_GROUP = _WatchActions.WatchActionTypes.ADD_GROUP,
    RENAME_GROUP = _WatchActions.WatchActionTypes.RENAME_GROUP,
    DELETE_GROUP = _WatchActions.WatchActionTypes.DELETE_GROUP;
var notSelected = _MsgWatch["default"].notSelected,
    emptyName = _MsgWatch["default"].emptyName;

var _areEqual = function _areEqual(prevProps, nextProps) {
  return prevProps.isShow === nextProps.isShow;
};

var EditGroupDialog = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var isShow = _ref.isShow,
      store = _ref.store,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog["default"], {
    caption: "Watch Groups Edit",
    isShow: isShow,
    isWithButton: false,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane["default"], {
      width: 380,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
        title: "Create",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupAddPane["default"], {
          store: store,
          actionCompleted: EDIT_WATCH_COMPLETED,
          actionFailed: EDIT_WATCH_FAILED,
          forActionType: ADD_GROUP,
          msgOnIsEmptyName: emptyName,
          onCreate: addGroup,
          onClose: onClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
        title: "Rename",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupEditPane["default"], {
          store: store,
          actionCompleted: EDIT_WATCH_COMPLETED,
          actionFailed: EDIT_WATCH_FAILED,
          forActionType: RENAME_GROUP,
          msgOnNotSelect: notSelected,
          msgOnIsEmptyName: emptyName,
          onRename: renameGroup,
          onClose: onClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
        title: "Delete",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupDeletePane["default"], {
          store: store,
          actionCompleted: EDIT_WATCH_COMPLETED,
          forActionType: DELETE_GROUP,
          msgOnNotSelect: notSelected,
          onDelete: deleteGroup,
          onClose: onClose
        })
      })]
    })
  });
}, _areEqual);
/*
EditGroupDialog.propTypes = {
  isShow: PropTypes.bool,
  store: PropTypes.object,
  onClose: PropTypes.func
}
*/

var _default = EditGroupDialog;
exports["default"] = _default;
//# sourceMappingURL=EditGroupDialog.js.map