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

var _areEqual = function _areEqual(prevProps, nextProps) {
  return prevProps.isShow === nextProps.isShow;
};

var EditListDialog = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var isShow = _ref.isShow,
      store = _ref.store,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog["default"], {
    caption: "Watch Lists Edit",
    isShow: isShow,
    isWithButton: false,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane["default"], {
      width: 380,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
        title: "Create",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListCreatePane["default"], {
          store: store,
          actionCompleted: EDIT_WATCH_COMPLETED,
          actionFailed: EDIT_WATCH_FAILED,
          forActionType: CREATE_LIST,
          msgOnNotSelect: notSelected,
          msgOnIsEmptyName: emptyName,
          onCreate: createList,
          onClose: onClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
        title: "Rename",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListEditPane["default"], {
          store: store,
          actionCompleted: EDIT_WATCH_COMPLETED,
          actionFailed: EDIT_WATCH_FAILED,
          forActionType: RENAME_LIST,
          msgOnNotSelect: notSelected,
          msgOnIsEmptyName: emptyName,
          onRename: renameList,
          onClose: onClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
        title: "Delete",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListDeletePane["default"], {
          store: store,
          actionCompleted: EDIT_WATCH_COMPLETED,
          actionFailed: EDIT_WATCH_FAILED,
          forActionType: DELETE_LIST,
          msgOnNotSelect: notSelected,
          onDelete: deleteList,
          onClose: onClose
        })
      })]
    })
  });
}, _areEqual);
/*
EditListDialog.propTypes = {
  isShow : PropTypes.bool,
  store : PropTypes.object,
  onClose : PropTypes.func
}
*/

var _default = EditListDialog;
exports["default"] = _default;
//# sourceMappingURL=EditListDialog.js.map