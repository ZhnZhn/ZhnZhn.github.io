"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _getFnByPropName = _interopRequireDefault(require("../../utils/getFnByPropName"));
var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _RowSecret = _interopRequireDefault(require("../dialogs/RowSecret"));
var _RowButtons = _interopRequireDefault(require("./RowButtons"));
var _jsxRuntime = require("react/jsx-runtime");
const MAX_KEY = 11;
const S_SCROLL_PANE = {
    overflowY: 'auto',
    maxHeight: 360,
    paddingRight: 10
  },
  S_OC_CHILD = {
    paddingLeft: 8
  },
  S_ROW_BTS = {
    margLeft: 0
  },
  S_BT_SET = {
    margin: '0 6px'
  };
const CONF_SM_ARR = [["AV", "alpha-vantage", "Alpha Vantage"], ["FMP", "fmp", "Financial Modeling Prep", "32"], ["Intrinio", "intrinio", "Intrinio", "32"], ["Twelve", "twelve", "Twelve Data"], ["PLG", "polygon-io", "Polygon.io"]];
const CONF_EC_ARR = [["NDL", "nasdaq-data-link", "Nasdaq Data Link"], ["WTO", "wto", "WTO", "32"]];
const CONF_EC_USA_ARR = [["BEA", "bea", "BEA", "36"], ["BLS", "bls", "BLS", "32"], ["EIA", "eia", "EIA", "32"]];
const _crPwdItem = (item, index, _ref) => {
  let {
    isShowLabels,
    titleStyle,
    i,
    elRefs,
    fOnEnter
  } = _ref;
  const _i = index + i;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowSecret.default, {
    refEl: elRefs[_i],
    isTitle: isShowLabels,
    titleStyle: titleStyle,
    title: item[0],
    name: item[1],
    placeholder: `${item[2]} API Key`,
    maxLength: item[3],
    onEnter: fOnEnter(_i)
  }, item[0]);
};
const PaneApiKey = _ref0 => {
  let {
    isVisible,
    isShowLabels,
    titleStyle,
    btStyle,
    data,
    onClose,
    setRefFocusLast
  } = _ref0;
  const _ref1 = (0, _uiApi.useRef)(),
    _ref2 = (0, _uiApi.useRef)(),
    _ref3 = (0, _uiApi.useRef)(),
    _ref4 = (0, _uiApi.useRef)(),
    _ref5 = (0, _uiApi.useRef)(),
    _ref6 = (0, _uiApi.useRef)(),
    _ref7 = (0, _uiApi.useRef)(),
    _ref8 = (0, _uiApi.useRef)(),
    _ref9 = (0, _uiApi.useRef)(),
    _ref10 = (0, _uiApi.useRef)(),
    _ref11 = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps*/,
    [_refs, fSetApiKey, _hSetAll, _hClearAll] = (0, _uiApi.useMemo)(() => [[_ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11], i => (0, _getFnByPropName.default)(data, 'key' + i), () => {
      for (let i = 1; i < MAX_KEY; i++) {
        fSetApiKey(i)(_refs[i].current.getValue());
      }
    }, () => {
      for (let i = 1; i < MAX_KEY; i++) {
        fSetApiKey(i)("");
        _refs[i].current.clear();
      }
    }], []);
  /*eslint-enable react-hooks/exhaustive-deps*/
  //data

  return isVisible ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ScrollPane.default, {
    style: S_SCROLL_PANE,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
      caption: "Economics",
      childStyle: S_OC_CHILD,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
        items: CONF_EC_ARR,
        crItem: _crPwdItem,
        isShowLabels: isShowLabels,
        titleStyle: titleStyle,
        i: 1,
        elRefs: _refs,
        fOnEnter: fSetApiKey
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
      caption: "U.S. Economics",
      childStyle: S_OC_CHILD,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
        items: CONF_EC_USA_ARR,
        crItem: _crPwdItem,
        isShowLabels: isShowLabels,
        titleStyle: titleStyle,
        i: 3,
        elRefs: _refs,
        fOnEnter: fSetApiKey
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
      caption: "Stock Market",
      childStyle: S_OC_CHILD,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
        items: CONF_SM_ARR,
        crItem: _crPwdItem,
        isShowLabels: isShowLabels,
        titleStyle: titleStyle,
        i: 6,
        elRefs: _refs,
        fOnEnter: fSetApiKey
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowButtons.default, {
      style: S_ROW_BTS,
      btStyle: btStyle,
      onClose: onClose,
      setRefFocusLast: setRefFocusLast,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
        style: {
          ...btStyle,
          ...S_BT_SET
        },
        caption: "SET ALL",
        onClick: _hSetAll
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
        style: btStyle,
        caption: "CLEAR ALL",
        onClick: _hClearAll
      })]
    })]
  }) : null;
};
var _default = exports.default = PaneApiKey;
//# sourceMappingURL=PaneApiKey.js.map