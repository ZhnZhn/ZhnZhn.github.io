"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useFocus = require("../hooks/useFocus");
var _WatchActions = require("../../flux/actions/WatchActions");
var _watchListStore = require("../../flux/watch-list/watchListStore");
var _MsgWatch = require("../../constants/MsgWatch");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));
var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));
var _GroupAddPane = _interopRequireDefault(require("./GroupAddPane"));
var _GroupEditPane = _interopRequireDefault(require("./GroupEditPane"));
var _GroupDeletePane = _interopRequireDefault(require("./GroupDeletePane"));
var _jsxRuntime = require("react/jsx-runtime");
const TOKEN_WATCH_GROUPS_EDIT = "Watch Groups Edit";
const EditGroupDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    onClose
  } = _ref;
  const [refFocusLast, setRefFocusLast] = (0, _useFocus.useRefFocusElement)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    refFocusLast: refFocusLast,
    caption: TOKEN_WATCH_GROUPS_EDIT,
    isShow: isShow,
    isWithButton: false,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      ariaLabel: TOKEN_WATCH_GROUPS_EDIT,
      id: "egd",
      width: 380,
      useMsEdit: _watchListStore.useMsEdit,
      getWatchGroups: _watchListStore.getWatchGroups,
      msgOnNotSelect: _MsgWatch.notSelected,
      msgOnIsEmptyName: _MsgWatch.emptyName,
      onClose: onClose,
      setRefFocusLast: setRefFocusLast,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Create",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupAddPane.default, {
          forActionType: _WatchActions.WAT_ADD_GROUP,
          onCreate: _watchListStore.crGroup
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Rename",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupEditPane.default, {
          forActionType: _WatchActions.WAT_RENAME_GROUP,
          onRename: _watchListStore.renGroup
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Delete",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupDeletePane.default, {
          forActionType: _WatchActions.WAT_DELETE_GROUP,
          onDelete: _watchListStore.delGroup
        })
      })]
    })
  });
});
var _default = exports.default = EditGroupDialog;
//# sourceMappingURL=EditGroupDialog.js.map