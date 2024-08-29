"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useBrowserShow = _interopRequireDefault(require("../hooks/useBrowserShow"));
var _Handlers = require("./Handlers");
var _A = _interopRequireDefault(require("../zhn/A"));
var _EditBar = _interopRequireDefault(require("./EditBar"));
var _WatchGroups = _interopRequireDefault(require("./WatchGroups"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL_WATCH = (0, _styleFn.crScrollYCn)('scroll-watch'),
  S_BT_CIRCLE = {
    position: 'relative',
    top: -6,
    marginLeft: 20
  };
const WatchBrowser = props => {
  const {
      caption,
      useWatchList
    } = props,
    [isModeEdit, _toggleEditMode] = (0, _useToggle.default)(),
    [isShow, _hHide, hKeyDown] = (0, _useBrowserShow.default)(props),
    watchList = useWatchList(),
    {
      groups
    } = watchList || {},
    _captionEV = isModeEdit ? 'V' : 'E';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_A.default.Browser, {
    isShow: isShow,
    onKeyDown: hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_A.default.BrowserCaption, {
      caption: caption,
      onClose: _hHide,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.ButtonCircle, {
        caption: "S",
        title: "Save to LocalStorage",
        style: S_BT_CIRCLE,
        onClick: _Handlers.saveWatchList
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.ButtonCircle, {
        caption: _captionEV,
        title: "Toggle Edit Mode: E/V",
        style: S_BT_CIRCLE,
        onClick: _toggleEditMode
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditBar.default, {
      isShow: isModeEdit,
      onClickGroup: _Handlers.showDialogEditGroups,
      onClickList: _Handlers.showDialogEditLists
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.ScrollPane, {
      className: CL_SCROLL_WATCH,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WatchGroups.default, {
        isModeEdit: isModeEdit,
        groups: groups
      })
    })]
  });
};
var _default = exports.default = WatchBrowser;
//# sourceMappingURL=WatchBrowser.js.map