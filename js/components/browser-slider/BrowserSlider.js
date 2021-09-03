"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useBool = _interopRequireDefault(require("../hooks/useBool"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _fFilterNotActive = _interopRequireDefault(require("./fFilterNotActive"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _BrowserContext = _interopRequireDefault(require("./BrowserContext"));

var _BrowserMenuMore = _interopRequireDefault(require("./BrowserMenuMore"));

var _MenuSlider = _interopRequireDefault(require("./MenuSlider"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_SCROLL = 'scroll-container-y';
const S = {
  BROWSER: {
    paddingRight: 0
  },
  BR_CAPTION: {
    paddingLeft: 6
  },
  CAPTION: {
    top: 0,
    paddingLeft: 4
  },
  SCROLL_PANE: {
    height: '92%'
  }
};
const BrowserSlider = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    isInitShow,
    caption,
    store,
    browserType,
    showAction
  } = props;

  const [isShow, show, hide] = (0, _useBool.default)(isInitShow),
        [isMenuMore, toggleMenuMore] = (0, _useToggle.default)(),
        [isFilterNotActive, toggleFilterNotActive] = (0, _useToggle.default)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _browserContext = (0, _react.useMemo)(() => (0, _fFilterNotActive.default)(isFilterNotActive, props.dfProps.lT), [isFilterNotActive]); //props.dfProps.lT

  /*eslint-enable react-hooks/exhaustive-deps */


  (0, _useListen.default)(store, (actionType, data) => {
    if (actionType === showAction && data === browserType) {
      show();
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserContext.default.Provider, {
    value: _browserContext,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.Browser, {
      isShow: isShow,
      style: S.BROWSER,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserMenuMore.default, {
        is: isMenuMore,
        toggleMenu: toggleMenuMore,
        toggleFilter: toggleFilterNotActive
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.BrowserCaption, {
        style: S.BR_CAPTION,
        caption: caption,
        captionStyle: S.CAPTION,
        onMore: toggleMenuMore,
        onClose: hide
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
        className: CL_SCROLL,
        style: S.SCROLL_PANE,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuSlider.default, { ...props
        })
      })]
    })
  });
});
var _default = BrowserSlider;
exports.default = _default;
//# sourceMappingURL=BrowserSlider.js.map