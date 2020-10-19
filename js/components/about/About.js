"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _ComponentActions = require("../../flux/actions/ComponentActions");

var _ChartActions = require("../../flux/actions/ChartActions");

var _has = _interopRequireDefault(require("../has"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _TwitterLink = _interopRequireDefault(require("./TwitterLink"));

var _DataProviders = _interopRequireDefault(require("./DataProviders"));

var _StepTitle = _interopRequireDefault(require("./StepTitle"));

var _ProviderLinks = _interopRequireDefault(require("../links/ProviderLinks"));

var _LogosBar = _interopRequireDefault(require("./LogosBar"));

var _About = _interopRequireDefault(require("./About.Style"));

var useListen = _use["default"].useListen,
    useTheme = _use["default"].useTheme;
var TH_ID = 'ABOUT';
var CL = {
  ABOUT: 'about-container',
  SCROLL: 'scroll-container-y',
  SHOW: 'show-popup'
};
var STEP = {
  T1: "Please, choose a data source Browser from Topics [t]",
  T2: "Next, choose a dataset menu item in the the opended up Browser",
  T3: "Select params and enter query date in the opened up draggable Dialog",
  T4: "Click a button Load",
  T5: "Also you can export chart to PNG, JPG, SVG, print to PDF"
};
var IS_CLOSE_PROVIDERS = !_has["default"].isWideWidth;

var About = function About(_ref) {
  var store = _ref.store,
      isInitShow = _ref.isInitShow;

  var _useState = (0, _react.useState)(isInitShow),
      isShow = _useState[0],
      setIsShow = _useState[1],
      _hClose = (0, _react.useCallback)(function () {
    return setIsShow(false);
  }, []);

  useListen(store, function (actionType) {
    if (actionType === _ComponentActions.ComponentActionTypes.SHOW_ABOUT) {
      setIsShow(true);
    } else if (actionType === _ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART || actionType === _ChartActions.ChartActionTypes.SHOW_CHART) {
      setIsShow(false);
    }
  });

  var TS = useTheme(TH_ID),
      _cn = isShow ? CL.ABOUT + " " + CL.SHOW : CL.ABOUT,
      _style = isShow ? _About["default"].BLOCK : _About["default"].NONE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _cn,
    style: (0, _extends2["default"])({}, _style, TS.ROOT),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].BrowserCaption, {
      caption: "About",
      onClose: _hClose,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TwitterLink["default"], {
        rootStyle: _About["default"].BT_TWITTER,
        account: "webapperc",
        title: "Twitter page @wepapperc with chart examples"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].ScrollPane, {
      className: CL.SCROLL,
      style: _About["default"].SCROLL_DIV,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: (0, _extends2["default"])({}, _About["default"].DIV_WRAPPER, _About["default"].GREY),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          style: _About["default"].MB_4,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].GREEN,
            children: "ERC (Economic RESTful Client)\xA0"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "is a web app that gives the ability to explore, visualize and compose economic and financial data mostly to charts from open and private data providers."
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DataProviders["default"], {
          isClose: IS_CLOSE_PROVIDERS
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: _About["default"].BLACK,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitle["default"], {
            step: "1",
            title: STEP.T1
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitle["default"], {
            step: "2",
            title: STEP.T2
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitle["default"], {
            step: "3",
            title: STEP.T3
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitle["default"], {
            step: "4",
            title: STEP.T4
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: _About["default"].MARGIN_TOP,
          children: "The result will be shown in a chart in a resizebale container."
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: _About["default"].MB_8EM,
          children: "Also it's possible to export the chart to PNG, JPG, SVG or print to PDF."
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          style: _About["default"].MB_6EM,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].RED,
            children: "Attention:\xA0"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            children: ["For one item from ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Dialog"
            }), " can be only one ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Chart item"
            }), " in a container. More information about a dataset can be found on a ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "tab Info of Chart item."
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp["default"].OpenClose, {
          caption: "More...",
          style: _About["default"].LH_14,
          ocStyle: _About["default"].LH_18,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: _About["default"].MB_8EM,
            children: ["After clicking a ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "button Show"
            }), " in a Dialog will be an opened up ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Chart container"
            }), " with charts or empty. After closing a ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Chart container"
            }), " all charts remains. In one time max three ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Dialogs"
            }), " can be opened."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: _About["default"].MB_8EM,
            children: ["Some open and private data providers require user's ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "API Key"
            }), "."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: _About["default"].MB_8EM,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: "For example, for loading data from\xA0"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Quandl, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              children: ["\xA0without API Key exists some restriction on frequency and amount of queries (", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                style: _About["default"].BLUE_DARK,
                children: "50 per day/1 at a time"
              }), ") and can be deprecated, according to Quandl. With ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                style: _About["default"].BLACK,
                children: "API Key"
              }), " it is possible to make (", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                style: _About["default"].BLUE_DARK,
                children: "50 000 per day/1 at a time"
              }), "). It's free of charge to receive."]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: _About["default"].MB_8EM,
            children: ["Data providers API Keys can be set on the ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "tab ApiKeys, dialog Settings [s]"
            }), "."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: _About["default"].MB_8EM,
            children: ["Also for loading data from data providers with HTTP protocol required ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "HTTPS proxy server"
            }), ", by default settled in the ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "tab Options, dialog Settings [s]"
            }), "."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: _About["default"].MB_8EM,
            children: ["There is three UI theme in the web app ERC: ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Dark, Light, and Sand"
            }), " can be set on ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "tab Options, dialog Settings [s]"
            }), ". All user's settings keep in browser's memory only for a current web session."]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LogosBar["default"], {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].BLACK,
            children: "*Logos Fair Use."
          })
        })]
      })
    })]
  });
};
/*
About.propsTypes = {
  isInitShow: PropTypes.bool,
  store: PropTypes.object
}
*/


var _default = About;
exports["default"] = _default;
//# sourceMappingURL=About.js.map