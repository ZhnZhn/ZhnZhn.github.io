"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useRefFocus = _interopRequireDefault(require("../hooks/useRefFocus"));
var _WatchActions = require("../../flux/actions/WatchActions");
var _MsgWatch = require("../../constants/MsgWatch");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));
var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));
var _GroupAddPane = _interopRequireDefault(require("./GroupAddPane"));
var _GroupEditPane = _interopRequireDefault(require("./GroupEditPane"));
var _GroupDeletePane = _interopRequireDefault(require("./GroupDeletePane"));
var _jsxRuntime = require("react/jsx-runtime");
const addGroup = _WatchActions.WatchActions[_WatchActions.WAT_ADD_GROUP],
  renameGroup = _WatchActions.WatchActions[_WatchActions.WAT_RENAME_GROUP],
  deleteGroup = _WatchActions.WatchActions[_WatchActions.WAT_DELETE_GROUP];
const EditGroupDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    store,
    onClose
  } = _ref;
  const [refFocusLast, setRefFocusLast] = (0, _useRefFocus.default)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    refFocusLast: refFocusLast,
    caption: "Watch Groups Edit",
    isShow: isShow,
    isWithButton: false,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      id: "egd",
      width: 380,
      store: store,
      actionCompleted: _WatchActions.WAT_EDIT_WATCH_COMPLETED,
      actionFailed: _WatchActions.WAT_EDIT_WATCH_FAILED,
      msgOnNotSelect: _MsgWatch.notSelected,
      msgOnIsEmptyName: _MsgWatch.emptyName,
      onClose: onClose,
      setRefFocusLast: setRefFocusLast,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Create",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupAddPane.default, {
          forActionType: _WatchActions.WAT_ADD_GROUP,
          onCreate: addGroup
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Rename",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupEditPane.default, {
          forActionType: _WatchActions.WAT_RENAME_GROUP,
          onRename: renameGroup
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Delete",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupDeletePane.default, {
          forActionType: _WatchActions.WAT_DELETE_GROUP,
          onDelete: deleteGroup
        })
      })]
    })
  });
});
var _default = EditGroupDialog;
exports.default = _default;
//# sourceMappingURL=EditGroupDialog.js.map