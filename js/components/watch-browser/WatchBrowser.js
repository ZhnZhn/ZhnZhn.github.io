"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useBool = _interopRequireDefault(require("../hooks/useBool"));
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _Handlers = require("./Handlers");
var _Comp = _interopRequireDefault(require("../Comp"));
var _EditBar = _interopRequireDefault(require("./EditBar"));
var _WatchGroups = _interopRequireDefault(require("./WatchGroups"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL_WATCH = (0, _styleFn.crScrollYCn)('scroll-watch'),
  S_BROWSER = {
    paddingRight: 0
  },
  S_BT_CIRCLE = {
    position: 'relative',
    top: -6,
    marginLeft: 20
  };
const WatchBrowser = _ref => {
  let {
    isInitShow,
    caption,
    store,
    browserType,
    showAction,
    updateAction
  } = _ref;
  const [isModeEdit, _toggleEditMode] = (0, _useToggle.default)(),
    [isShow, _hShow, _hHide] = (0, _useBool.default)(isInitShow),
    [watchList, setWatchList] = (0, _uiApi.useState)(() => store.getWatchList());
  (0, _useListen.default)((actionType, data) => {
    if (actionType === showAction && data === browserType) {
      _hShow();
    } else if (actionType === updateAction) {
      setWatchList({
        ...data
      });
    }
  });
  const _captionEV = isModeEdit ? 'V' : 'E',
    {
      groups
    } = watchList || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.Browser, {
    isShow: isShow,
    style: S_BROWSER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.BrowserCaption, {
      caption: caption,
      onClose: _hHide,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ButtonCircle, {
        caption: "S",
        title: "Save to LocalStorage",
        style: S_BT_CIRCLE,
        onClick: _Handlers.saveWatchList
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ButtonCircle, {
        caption: _captionEV,
        title: "Toggle Edit Mode: E/V",
        style: S_BT_CIRCLE,
        onClick: _toggleEditMode
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditBar.default, {
      isShow: isModeEdit,
      onClickGroup: _Handlers.showDialogEditGroups,
      onClickList: _Handlers.showDialogEditLists
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
      className: CL_SCROLL_WATCH,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WatchGroups.default, {
        isModeEdit: isModeEdit,
        groups: groups
      })
    })]
  });
};
var _default = WatchBrowser;
exports.default = _default;
//# sourceMappingURL=WatchBrowser.js.map