"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _has = require("../has");
var _styleFn = require("../styleFn");
var _useShowHideComponent = _interopRequireDefault(require("../hooks/useShowHideComponent"));
var _compStore = require("../../flux/stores/compStore");
var _Comp = _interopRequireDefault(require("../Comp"));
var _TwitterLink = _interopRequireDefault(require("./TwitterLink"));
var _DataProviders = _interopRequireDefault(require("./DataProviders"));
var _StepTitle = _interopRequireDefault(require("../zhn/StepTitle"));
var _SpanToken = require("../zhn/SpanToken");
var _ProviderLinks = _interopRequireDefault(require("../links/ProviderLinks"));
var _LogosBar = _interopRequireDefault(require("./LogosBar"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_ABOUT = (0, _styleFn.crBsContainerCn)("about-container"),
  CL_SHOW_CONT = "show-cont",
  CL_SCROLL_Y = (0, _styleFn.crScrollYCn)(),
  CL_BLACK = "black",
  S_STEP = (0, _styleFn.crStepStyle)("#80c040"),
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
  S_BT_TWITTER = {
    marginLeft: 12
  },
  S_GREEN = {
    color: '#80c040'
  },
  S_BLUE_DARK = {
    color: '#2f7ed8'
  },
  S_RED = {
    color: '#f44336'
  },
  STEP_T1 = "Please, choose a data source Browser from Topics [t]",
  STEP_T2 = "Next, choose a dataset menu item in the the opended up Browser",
  STEP_T3 = "Select params and enter query date in the opened up draggable Dialog",
  STEP_T4 = "Click a button Load",
  IS_CLOSE_PROVIDERS = !(0, _has.isWideWidth)();
const About = () => {
  const [isShow, show, hide, hKeyDown] = (0, _useShowHideComponent.default)(true);
  (0, _compStore.useMsAbout)(msAbout => {
    if (msAbout) {
      if (msAbout.is) {
        show();
      } else {
        hide();
      }
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.ShowHide, {
    isShow: isShow,
    className: CL_ABOUT,
    animationClass: CL_SHOW_CONT,
    onKeyDown: hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.BrowserCaption, {
      caption: "About",
      onClose: hide,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TwitterLink.default, {
        style: S_BT_TWITTER,
        account: "webapperc",
        title: "Twitter / X page @webapperc with chart examples"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
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
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: CL_BLACK,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitle.default, {
            step: "1",
            stepStyle: S_STEP,
            title: STEP_T1
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitle.default, {
            step: "2",
            stepStyle: S_STEP,
            title: STEP_T2
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitle.default, {
            step: "3",
            stepStyle: S_STEP,
            title: STEP_T3
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitle.default, {
            step: "4",
            stepStyle: S_STEP,
            title: STEP_T4
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: S_MT_4,
          children: "The result will be shown in a chart in a resizebale container."
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: S_MB_8EM,
          children: "Also it's possible to export the chart to PNG, JPG, SVG or print to PDF."
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          style: S_MB_6EM,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S_RED,
            children: "Attention:\xA0"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            children: ["For one item from ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "Dialog"
            }), " can be only one ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "Chart item"
            }), " in a container. More information about a dataset can be found on a ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "tab Info of Chart item."
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.OpenClose, {
          caption: "More...",
          style: S_LH_14,
          ocStyle: S_LH_18,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MB_8EM,
            children: ["After clicking a ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "button Show"
            }), " in a Dialog will be an opened up ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "Chart container"
            }), " with charts or empty. After closing a ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "Chart container"
            }), " all charts remains. In one time max three ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "Dialogs"
            }), " can be opened."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MB_8EM,
            children: ["Some open and private data providers require user's ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "API Key"
            }), "."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MB_8EM,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: "For example, for loading data from\xA0"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks.default.Ndl, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              children: ["\xA0without API Key exists some restriction on frequency and amount of queries (", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                style: S_BLUE_DARK,
                children: "50 per day/1 at a time"
              }), ") and can be deprecated, according to Nasdaq Data Link. With ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
                children: "API Key"
              }), " it is possible to make (", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                style: S_BLUE_DARK,
                children: "50 000 per day/1 at a time"
              }), "). It's free of charge to receive."]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MB_8EM,
            children: ["Data providers API Keys can be set on the ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "tab ApiKeys, dialog Settings [s]"
            }), "."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MB_8EM,
            children: ["Also for loading data from data providers with HTTP protocol required ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "HTTPS proxy server"
            }), ", by default settled in the ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "tab Options, dialog Settings [s]"
            }), "."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MB_8EM,
            children: ["There is three UI theme in the web app ERC: ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "Dark, Light, and Sand"
            }), " can be set on ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
              children: "tab Options, dialog Settings [s]"
            }), ". All user's settings keep in browser's memory only for a current web session."]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LogosBar.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
            children: "*Logos Fair Use."
          })
        })]
      })
    })]
  });
};
var _default = exports.default = About;
//# sourceMappingURL=About.js.map