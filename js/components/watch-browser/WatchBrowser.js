"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useToggle = require("../hooks/useToggle");
var _useBrowserShow = _interopRequireDefault(require("../hooks/useBrowserShow"));
var _Handlers = require("./Handlers");
var _Browser = _interopRequireDefault(require("../zhn/Browser"));
var _BrowserCaption = _interopRequireDefault(require("../zhn/BrowserCaption"));
var _ToolbarButtonCircle = require("../zhn/ToolbarButtonCircle");
var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));
var _EditBar = _interopRequireDefault(require("./EditBar"));
var _WatchGroups = _interopRequireDefault(require("./WatchGroups"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL_WATCH = (0, _styleFn.crScrollYCn)('scroll-watch'),
  S_TOOLBAR = {
    paddingTop: 0
  };
const useToolbarButtons = (saveWatchList, onClickInfo, descrUrl
/*eslint-disable react-hooks/exhaustive-deps */) => {
  const [isModeEdit, _toggleEditMode] = (0, _useToggle.useToggle)();
  return [isModeEdit, (0, _uiApi.useMemo)(() => [(0, _ToolbarButtonCircle.crToolbarButton)('S', 'Save to LocalStorage', saveWatchList), (0, _ToolbarButtonCircle.crToolbarButton)(isModeEdit ? 'V' : 'E', 'Toggle Edit Mode: E/V', _toggleEditMode)], [isModeEdit])];
};
// saveWatchList, _toggleEditMode
/*eslint-enable react-hooks/exhaustive-deps */

const WatchBrowser = props => {
  const {
      caption,
      useWatchList
    } = props,
    [isShow, _hHide, hKeyDown] = (0, _useBrowserShow.default)(props),
    watchList = useWatchList(),
    {
      groups
    } = watchList || {},
    [isModeEdit, _toolbarButtons] = useToolbarButtons(_Handlers.saveWatchList);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Browser.default, {
    isShow: isShow,
    onKeyDown: hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserCaption.default, {
      caption: caption,
      onClose: _hHide
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle.ToolbarButtonCircle, {
      style: S_TOOLBAR,
      children: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditBar.default, {
      isShow: isModeEdit,
      onClickGroup: _Handlers.showDialogEditGroups,
      onClickList: _Handlers.showDialogEditLists
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollPane.default, {
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