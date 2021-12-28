"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useBool2 = _interopRequireDefault(require("../hooks/useBool"));

var _useToggle3 = _interopRequireDefault(require("../hooks/useToggle"));

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _fFilterNotActive = _interopRequireDefault(require("./fFilterNotActive"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _BrowserContext = _interopRequireDefault(require("./BrowserContext"));

var _BrowserMenuMore = _interopRequireDefault(require("./BrowserMenuMore"));

var _MenuSlider = _interopRequireDefault(require("./MenuSlider"));

var _jsxRuntime = require("react/jsx-runtime");

var CL_SCROLL = 'scroll-container-y';
var S_BROWSER = {
  paddingRight: 0
},
    S_BR_CAPTION = {
  paddingLeft: 6
},
    S_SVG_MORE = {
  position: 'relative',
  top: -4
},
    S_CAPTION = {
  position: 'relative',
  top: -6,
  paddingLeft: 4
},
    S_SCROLL_PANE = {
  height: '92%'
};
var BrowserSlider = /*#__PURE__*/(0, _react.memo)(function (props) {
  var isInitShow = props.isInitShow,
      caption = props.caption,
      store = props.store,
      browserType = props.browserType,
      showAction = props.showAction;

  var _useBool = (0, _useBool2.default)(isInitShow),
      isShow = _useBool[0],
      show = _useBool[1],
      hide = _useBool[2],
      _useToggle = (0, _useToggle3.default)(),
      isMenuMore = _useToggle[0],
      toggleMenuMore = _useToggle[1],
      _useToggle2 = (0, _useToggle3.default)(),
      isFilterNotActive = _useToggle2[0],
      toggleFilterNotActive = _useToggle2[1],
      _browserContext = (0, _react.useMemo)(function () {
    return (0, _fFilterNotActive.default)(isFilterNotActive, props.dfProps.lT);
  }, [isFilterNotActive]); //props.dfProps.lT

  /*eslint-enable react-hooks/exhaustive-deps */


  (0, _useListen.default)(store, function (actionType, data) {
    if (actionType === showAction && data === browserType) {
      show();
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserContext.default.Provider, {
    value: _browserContext,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.Browser, {
      isShow: isShow,
      style: S_BROWSER,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserMenuMore.default, {
        is: isMenuMore,
        toggleMenu: toggleMenuMore,
        toggleFilter: toggleFilterNotActive
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.BrowserCaption, {
        style: S_BR_CAPTION,
        caption: caption,
        captionStyle: S_CAPTION,
        svgMoreStyle: S_SVG_MORE,
        onMore: toggleMenuMore,
        onClose: hide
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
        className: CL_SCROLL,
        style: S_SCROLL_PANE,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuSlider.default, Object.assign({}, props))
      })]
    })
  });
});
var _default = BrowserSlider;
exports.default = _default;
//# sourceMappingURL=BrowserSlider.js.map