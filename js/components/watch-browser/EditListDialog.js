"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _WatchActions = require("../../flux/actions/WatchActions");
var _MsgWatch = require("../../constants/MsgWatch");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));
var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));
var _ListCreatePane = _interopRequireDefault(require("./ListCreatePane"));
var _ListEditPane = _interopRequireDefault(require("./ListEditPane"));
var _ListDeletePane = _interopRequireDefault(require("./ListDeletePane"));
var _jsxRuntime = require("react/jsx-runtime");
const createList = _WatchActions.WatchActions[_WatchActions.WAT_CREATE_LIST],
  renameList = _WatchActions.WatchActions[_WatchActions.WAT_RENAME_LIST],
  deleteList = _WatchActions.WatchActions[_WatchActions.WAT_DELETE_LIST];
const EditListDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    store,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    caption: "Watch Lists Edit",
    isShow: isShow,
    isWithButton: false,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      id: "eld",
      width: 380,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Create",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListCreatePane.default, {
          store: store,
          actionCompleted: _WatchActions.WAT_EDIT_WATCH_COMPLETED,
          actionFailed: _WatchActions.WAT_EDIT_WATCH_FAILED,
          forActionType: _WatchActions.WAT_CREATE_LIST,
          msgOnNotSelect: _MsgWatch.notSelected,
          msgOnIsEmptyName: _MsgWatch.emptyName,
          onCreate: createList,
          onClose: onClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Rename",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListEditPane.default, {
          store: store,
          actionCompleted: _WatchActions.WAT_EDIT_WATCH_COMPLETED,
          actionFailed: _WatchActions.WAT_EDIT_WATCH_FAILED,
          forActionType: _WatchActions.WAT_RENAME_LIST,
          msgOnNotSelect: _MsgWatch.notSelected,
          msgOnIsEmptyName: _MsgWatch.emptyName,
          onRename: renameList,
          onClose: onClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Delete",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListDeletePane.default, {
          store: store,
          actionCompleted: _WatchActions.WAT_EDIT_WATCH_COMPLETED,
          actionFailed: _WatchActions.WAT_EDIT_WATCH_FAILED,
          forActionType: _WatchActions.WAT_DELETE_LIST,
          msgOnNotSelect: _MsgWatch.notSelected,
          onDelete: deleteList,
          onClose: onClose
        })
      })]
    })
  });
});
var _default = EditListDialog;
exports.default = _default;
//# sourceMappingURL=EditListDialog.js.map