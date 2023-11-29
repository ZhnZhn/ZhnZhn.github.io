"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useRefFocus = _interopRequireDefault(require("../hooks/useRefFocus"));
var _WatchActions = require("../../flux/actions/WatchActions");
var _watchListStore = require("../../flux/watch-list/watchListStore");
var _MsgWatch = require("../../constants/MsgWatch");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));
var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));
var _ListCreatePane = _interopRequireDefault(require("./ListCreatePane"));
var _ListEditPane = _interopRequireDefault(require("./ListEditPane"));
var _ListDeletePane = _interopRequireDefault(require("./ListDeletePane"));
var _jsxRuntime = require("react/jsx-runtime");
const EditListDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    onClose
  } = _ref;
  const [refFocusLast, setRefFocusLast] = (0, _useRefFocus.default)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    refFocusLast: refFocusLast,
    caption: "Watch Lists Edit",
    isShow: isShow,
    isWithButton: false,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      id: "eld",
      width: 380,
      useMsEdit: _watchListStore.useMsEdit,
      getWatchGroups: _watchListStore.getWatchGroups,
      msgOnNotSelect: _MsgWatch.notSelected,
      msgOnIsEmptyName: _MsgWatch.emptyName,
      onClose: onClose,
      setRefFocusLast: setRefFocusLast,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Create",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListCreatePane.default, {
          forActionType: _WatchActions.WAT_CREATE_LIST,
          onCreate: _watchListStore.crList
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Rename",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListEditPane.default, {
          getWatchListsByGroup: _watchListStore.getWatchListsByGroup,
          forActionType: _WatchActions.WAT_RENAME_LIST,
          onRename: _watchListStore.renList
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Delete",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListDeletePane.default, {
          getWatchListsByGroup: _watchListStore.getWatchListsByGroup,
          forActionType: _WatchActions.WAT_DELETE_LIST,
          onDelete: _watchListStore.delList
        })
      })]
    })
  });
});
var _default = exports.default = EditListDialog;
//# sourceMappingURL=EditListDialog.js.map