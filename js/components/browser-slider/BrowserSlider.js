"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useBool = _interopRequireDefault(require("../hooks/useBool"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _fFilterNotActive = _interopRequireDefault(require("./fFilterNotActive"));
var _Browser = _interopRequireDefault(require("../zhn/Browser"));
var _BrowserCaption = _interopRequireDefault(require("../zhn/BrowserCaption"));
var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));
var _BrowserContext = _interopRequireDefault(require("./BrowserContext"));
var _BrowserMenuMore = _interopRequireDefault(require("./BrowserMenuMore"));
var _MenuSlider = _interopRequireDefault(require("./MenuSlider"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL = 'scroll-container-y',
  S_BROWSER = {
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
    top: -3,
    paddingLeft: 4
  },
  S_SCROLL_PANE = {
    height: '92%'
  };
const BrowserSlider = (0, _uiApi.memo)(props => {
  const {
      isInitShow,
      caption,
      browserType,
      showAction
    } = props,
    [isShow, show, hide] = (0, _useBool.default)(isInitShow),
    [isMenuMore, toggleMenuMore] = (0, _useToggle.default)(),
    [isFilterNotActive, toggleFilterNotActive] = (0, _useToggle.default)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _browserContext = (0, _uiApi.useMemo)(() => (0, _fFilterNotActive.default)(isFilterNotActive, props.dfProps.lT), [isFilterNotActive]);
  //props.dfProps.lT
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _useListen.default)((actionType, data) => {
    if (actionType === showAction && data === browserType) {
      show();
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserContext.default.Provider, {
    value: _browserContext,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Browser.default, {
      isShow: isShow,
      style: S_BROWSER,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserMenuMore.default, {
        is: isMenuMore,
        toggleMenu: toggleMenuMore,
        toggleFilter: toggleFilterNotActive
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserCaption.default, {
        style: S_BR_CAPTION,
        caption: caption,
        captionStyle: S_CAPTION,
        svgMoreStyle: S_SVG_MORE,
        onMore: toggleMenuMore,
        onClose: hide
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollPane.default, {
        className: CL_SCROLL,
        style: S_SCROLL_PANE,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuSlider.default, {
          ...props
        })
      })]
    })
  });
});
var _default = BrowserSlider;
exports.default = _default;
//# sourceMappingURL=BrowserSlider.js.map