"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useBrowserShow = _interopRequireDefault(require("../hooks/useBrowserShow"));
var _useToggle = require("../hooks/useToggle");
var _useProperty = require("../hooks/useProperty");
var _useLoadMenu = _interopRequireDefault(require("./useLoadMenu"));
var _Browser = _interopRequireDefault(require("../zhn/Browser"));
var _BrowserCaption = _interopRequireDefault(require("../zhn/BrowserCaption"));
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));
var _Spinner = require("../zhn/Spinner");
var _ToolbarButtonCircle = require("../zhn/ToolbarButtonCircle");
var _WrapperInputSearch = _interopRequireDefault(require("../zhn-select/WrapperInputSearch"));
var _MenuItems = _interopRequireDefault(require("./MenuItems2"));
var _jsxRuntime = require("react/jsx-runtime");
//import { useMemo } from '../uiApi';

const SEARCH_PLACEHOLDER = "Search By Symbol Or Name",
  CL_BROWSER = "scroll-browser-by",
  CL_BROWSER_WITH_SEARCH = `${CL_BROWSER}--search`,
  S_BROWSER = {
    paddingBottom: 4,
    minWidth: 300
  },
  S_TOOLBAR = {
    paddingTop: 0
  },
  S_WRAPPER_SEARCH = {
    width: '100%',
    paddingBottom: 8,
    paddingRight: 24
  };
const BrowserMenu2 = props => {
  const {
      browserType,
      useMsBrowserLoad,
      caption,
      onLoadMenu,
      descrUrl,
      onClickInfo,
      onShowLoadDialog,
      ItemOptionComp,
      ItemComp,
      children
    } = props,
    [isShow, hideBrowser, hKeyDown] = (0, _useBrowserShow.default)(props),
    [isShowSearch, toggleSearch] = (0, _useToggle.useToggle)(),
    _toolbarButtons = (0, _useProperty.useRefInit)(() => [(0, _ToolbarButtonCircle.crToolbarButton)('S', 'Click to toggle input search', toggleSearch), (0, _ToolbarButtonCircle.crToolbarButton)('A', 'About Datasources', () => {
      onClickInfo({
        descrUrl
      });
    })]),
    [isLoading, menu] = (0, _useLoadMenu.default)(isShow, onLoadMenu, useMsBrowserLoad, browserType),
    _scrollClass = isShowSearch ? CL_BROWSER_WITH_SEARCH : CL_BROWSER;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Browser.default, {
    isShow: isShow,
    style: S_BROWSER,
    onKeyDown: hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserCaption.default, {
      caption: caption,
      onClose: hideBrowser
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle.ToolbarButtonCircle, {
      style: S_TOOLBAR,
      children: _toolbarButtons
    }), menu && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowSearch,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperInputSearch.default, {
        style: S_WRAPPER_SEARCH,
        placeholder: SEARCH_PLACEHOLDER,
        data: menu,
        ItemOptionComp: ItemOptionComp,
        onSelect: onShowLoadDialog
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ScrollPane.default, {
      className: _scrollClass,
      children: [isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.SpinnerLoading, {}), menu && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItems.default, {
        model: menu,
        ItemComp: ItemComp,
        itemClassName: _styleFn.CL_ROW_TYPE2_TOPIC,
        onClickItem: onShowLoadDialog
      }), children]
    })]
  });
};
var _default = exports.default = BrowserMenu2;
//# sourceMappingURL=BrowserMenu2.js.map