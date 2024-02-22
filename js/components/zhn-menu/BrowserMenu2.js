"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useBrowserShow = _interopRequireDefault(require("../hooks/useBrowserShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useLoadMenu = _interopRequireDefault(require("./useLoadMenu"));
var _Comp = _interopRequireDefault(require("../Comp"));
var _Spinner = require("../zhn/Spinner");
var _ToolbarButtonCircle = _interopRequireDefault(require("../zhn/ToolbarButtonCircle"));
var _WrapperInputSearch = _interopRequireDefault(require("../zhn-select/WrapperInputSearch"));
var _MenuItems = _interopRequireDefault(require("./MenuItems2"));
var _jsxRuntime = require("react/jsx-runtime");
const {
  Browser,
  BrowserCaption,
  ShowHide,
  ScrollPane
} = _Comp.default;
const SEARCH_PLACEHOLDER = "Search By Symbol Or Name",
  CL_BROWSER = "scroll-browser-by",
  CL_BROWSER_WITH_SEARCH = `${CL_BROWSER}--search`,
  S_BROWSER = {
    paddingBottom: 4,
    minWidth: 300
  },
  S_WRAPPER_SEARCH = {
    width: '100%',
    paddingBottom: 8,
    paddingRight: 24
  };
const _crToolbarButton = (caption, title, onClick) => ({
  caption,
  title,
  onClick
});
const _useToolbarButtons = (toggleSearch, onClickInfo, descrUrl
/*eslint-disable react-hooks/exhaustive-deps */) => (0, _uiApi.useMemo)(() => [_crToolbarButton('S', 'Click to toggle input search', toggleSearch), _crToolbarButton('A', 'About Datasources', () => {
  onClickInfo({
    descrUrl
  });
})], []);
// toggleSearch, onClickInfo, descrUrl
/*eslint-enable react-hooks/exhaustive-deps */

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
    [isShowSearch, toggleSearch] = (0, _useToggle.default)(),
    _toolbarButtons = _useToolbarButtons(toggleSearch, onClickInfo, descrUrl),
    [isLoading, menu] = (0, _useLoadMenu.default)(isShow, onLoadMenu, useMsBrowserLoad, browserType),
    _scrollClass = isShowSearch ? CL_BROWSER_WITH_SEARCH : CL_BROWSER;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Browser, {
    isShow: isShow,
    style: S_BROWSER,
    onKeyDown: hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BrowserCaption, {
      caption: caption,
      onClose: hideBrowser
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle.default, {
      buttons: _toolbarButtons
    }), menu && /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
      isShow: isShowSearch,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperInputSearch.default, {
        style: S_WRAPPER_SEARCH,
        placeholder: SEARCH_PLACEHOLDER,
        data: menu,
        ItemOptionComp: ItemOptionComp,
        onSelect: onShowLoadDialog
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ScrollPane, {
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