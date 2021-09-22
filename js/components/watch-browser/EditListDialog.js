"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _WatchActions = _interopRequireWildcard(require("../../flux/actions/WatchActions"));

var _MsgWatch = _interopRequireDefault(require("../../constants/MsgWatch"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));

var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));

var _ListCreatePane = _interopRequireDefault(require("./ListCreatePane"));

var _ListEditPane = _interopRequireDefault(require("./ListEditPane"));

var _ListDeletePane = _interopRequireDefault(require("./ListDeletePane"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import PropTypes from "prop-types";
const {
  createList,
  renameList,
  deleteList
} = _WatchActions.default;
const {
  EDIT_WATCH_COMPLETED,
  EDIT_WATCH_FAILED,
  CREATE_LIST,
  RENAME_LIST,
  DELETE_LIST
} = _WatchActions.WatchActionTypes;
const {
  notSelected,
  emptyName
} = _MsgWatch.default;

const _areEqual = (prevProps, nextProps) => prevProps.isShow === nextProps.isShow;

const EditListDialog = /*#__PURE__*/(0, _react.memo)(({
  isShow,
  store,
  onClose
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
  caption: "Watch Lists Edit",
  isShow: isShow,
  isWithButton: false,
  onClose: onClose,
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
    width: 380,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
      title: "Create",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListCreatePane.default, {
        store: store,
        actionCompleted: EDIT_WATCH_COMPLETED,
        actionFailed: EDIT_WATCH_FAILED,
        forActionType: CREATE_LIST,
        msgOnNotSelect: notSelected,
        msgOnIsEmptyName: emptyName,
        onCreate: createList,
        onClose: onClose
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
      title: "Rename",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListEditPane.default, {
        store: store,
        actionCompleted: EDIT_WATCH_COMPLETED,
        actionFailed: EDIT_WATCH_FAILED,
        forActionType: RENAME_LIST,
        msgOnNotSelect: notSelected,
        msgOnIsEmptyName: emptyName,
        onRename: renameList,
        onClose: onClose
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
      title: "Delete",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListDeletePane.default, {
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
}), _areEqual);
/*
EditListDialog.propTypes = {
  isShow : PropTypes.bool,
  store : PropTypes.object,
  onClose : PropTypes.func
}
*/

var _default = EditListDialog;
exports.default = _default;
//# sourceMappingURL=EditListDialog.js.map