"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Color = require("../../constants/Color");
var _compStore = require("../../flux/stores/compStore");
var _has = require("../has");
var _styleFn = require("../styleFn");
var _useShowHideComponent = _interopRequireDefault(require("../hooks/useShowHideComponent"));
var _BrowserCaption = _interopRequireDefault(require("../zhn/BrowserCaption"));
var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _XPlatformLink = _interopRequireDefault(require("./XPlatformLink"));
var _DataProviders = _interopRequireDefault(require("./DataProviders"));
var _StepTitles = _interopRequireDefault(require("../zhn/StepTitles"));
var _SpanToken = require("../zhn/SpanToken");
var _LogosBar = _interopRequireDefault(require("./LogosBar"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_ABOUT = (0, _styleFn.crBsContainerCn)("about-container"),
  CL_SHOW_CONT = "show-cont",
  CL_SCROLL_Y = (0, _styleFn.crScrollYCn)(),
  CL_BLACK = "black",
  S_SCROLL_DIV = {
    height: '94%'
  },
  S_DIV_WRAPPER = {
    paddingLeft: 12,
    paddingRight: 5,
    lineHeight: 1.4,
    color: 'gray',
    fontWeight: 'bold'
  },
  S_LH_18 = {
    lineHeight: 1.8
  },
  S_LH_14 = {
    lineHeight: 1.4
  },
  S_MB_8EM = {
    marginBottom: '0.8em'
  },
  S_MB_6EM = {
    marginBottom: '0.6em'
  },
  S_MB_4 = {
    marginBottom: 4
  },
  S_MT_4 = {
    marginTop: 4
  },
  S_BT_X_PLATFORM = {
    marginLeft: 12
  },
  S_GREEN = (0, _styleFn.crColorStyle)(_Color.COLOR_GREEN),
  S_RED = (0, _styleFn.crColorStyle)('#f44336'),
  STEP_TITLES = ["Please, choose a data source Browser from Topics [t]", "Next, choose a dataset menu item in the the opended up Browser", "Select params and enter query date in the opened up draggable Dialog", "Click a button Load"],
  IS_CLOSE_PROVIDERS = !(0, _has.isWideWidth)();
const About = () => {
  const [isShow, show, hide, hKeyDown] = (0, _useShowHideComponent.default)(!0);
  (0, _compStore.useMsAbout)(msAbout => {
    if (msAbout) {
      (msAbout.is ? show : hide)();
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ShowHide.default, {
    isShow: isShow,
    className: CL_ABOUT,
    animationClass: CL_SHOW_CONT,
    onKeyDown: hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserCaption.default, {
      caption: "About",
      onClose: hide,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_XPlatformLink.default, {
        style: S_BT_X_PLATFORM,
        account: "webapperc",
        title: "X / Twitter page @webapperc with chart examples"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollPane.default, {
      className: CL_SCROLL_Y,
      style: S_SCROLL_DIV,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_DIV_WRAPPER,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          style: S_MB_4,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S_GREEN,
            children: "ERC (Economic RESTful Client)\xA0"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "is a web app that gives the ability to explore, visualize and compose economic and financial data mostly to charts from open and private data providers."
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DataProviders.default, {
          isClose: IS_CLOSE_PROVIDERS
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitles.default, {
          className: CL_BLACK,
          stepColor: _Color.COLOR_GREEN,
          titles: STEP_TITLES
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: {
            ...S_MT_4,
            ...S_MB_6EM
          },
          children: "The results will be displayed in a chart within a resizable container. It is also possible to export the chart in PNG, JPG, SVG formats, or to print it as a PDF."
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          style: S_MB_6EM,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S_RED,
            children: "Notice:\xA0"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            children: ["For each set of params from a dialog can be only one chart item within a chart container. Additional information about certain loaded dataset can be found in the ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
              children: "Info tab of the chart item"
            }), "."]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose.default, {
          caption: "More...",
          style: S_LH_14,
          ocStyle: S_LH_18,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MB_8EM,
            children: ["After clicking a ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
              children: "button Open"
            }), " in a dialog, a chart container will appear. Upon closing a chart container all charts will remains accesible."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MB_8EM,
            children: ["Certain open and private data providers require the user's ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
              children: "API key"
            }), ". API keys for data providers can be configured in the ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
              children: "ApiKeys tab of dialog Settings [s]"
            }), "."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MB_8EM,
            children: ["For downloading data without CORS restriction from some data providers requires a ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
              children: "local HTTP proxy server"
            }), ". It can be configured in the ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
              children: "Options tab of dialog Settings [s]"
            }), "."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            style: S_MB_8EM,
            children: "The web application ERC currently has nine distinct UI themes. All user settings are stored in the browser's memory and are retained only for the duration of the current web session."
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LogosBar.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
            children: "*Logos Fair Use."
          })
        })]
      })
    })]
  });
};
var _default = exports.default = About;
//# sourceMappingURL=About.js.map