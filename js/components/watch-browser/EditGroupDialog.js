"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _WatchActions = _interopRequireWildcard(require("../../flux/actions/WatchActions"));

var _MsgWatch = require("../../constants/MsgWatch");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));

var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));

var _GroupAddPane = _interopRequireDefault(require("./GroupAddPane"));

var _GroupEditPane = _interopRequireDefault(require("./GroupEditPane"));

var _GroupDeletePane = _interopRequireDefault(require("./GroupDeletePane"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import PropTypes from "prop-types";
const {
  addGroup,
  renameGroup,
  deleteGroup
} = _WatchActions.default;
const {
  EDIT_WATCH_COMPLETED,
  EDIT_WATCH_FAILED,
  ADD_GROUP,
  RENAME_GROUP,
  DELETE_GROUP
} = _WatchActions.WatchActionTypes;

const _areEqual = (prevProps, nextProps) => prevProps.isShow === nextProps.isShow;

const EditGroupDialog = /*#__PURE__*/(0, _react.memo)(_ref => {
  let {
    isShow,
    store,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    caption: "Watch Groups Edit",
    isShow: isShow,
    isWithButton: false,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      width: 380,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Create",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupAddPane.default, {
          store: store,
          actionCompleted: EDIT_WATCH_COMPLETED,
          actionFailed: EDIT_WATCH_FAILED,
          forActionType: ADD_GROUP,
          msgOnIsEmptyName: _MsgWatch.emptyName,
          onCreate: addGroup,
          onClose: onClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Rename",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupEditPane.default, {
          store: store,
          actionCompleted: EDIT_WATCH_COMPLETED,
          actionFailed: EDIT_WATCH_FAILED,
          forActionType: RENAME_GROUP,
          msgOnNotSelect: _MsgWatch.notSelected,
          msgOnIsEmptyName: _MsgWatch.emptyName,
          onRename: renameGroup,
          onClose: onClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Delete",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GroupDeletePane.default, {
          store: store,
          actionCompleted: EDIT_WATCH_COMPLETED,
          forActionType: DELETE_GROUP,
          msgOnNotSelect: _MsgWatch.notSelected,
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
exports.default = _default;
//# sourceMappingURL=EditGroupDialog.js.map