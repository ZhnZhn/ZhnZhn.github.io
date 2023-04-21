"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));
var _useInputToggle = _interopRequireDefault(require("./useInputToggle"));
var _useToggleInputChart = _interopRequireDefault(require("./useToggleInputChart"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _ModalInputToggle = _interopRequireDefault(require("./ModalInputToggle"));
var _jsxRuntime = require("react/jsx-runtime");
const AGG_OPTIONS = [{
    c: "Total of trade partner",
    v: "TOTAL"
  }, {
    c: "All 2-digit HS commodities",
    v: "AG2"
  }],
  DF_AGGREGATION = AGG_OPTIONS[0],
  PERIOD_OPTIONS = (() => {
    const arr = [];
    for (let i = 0; i < 22; i++) {
      const _v = '' + (2022 - i);
      arr.push({
        c: _v,
        v: _v
      });
    }
    return arr;
  })(),
  DF_PERIOD = PERIOD_OPTIONS[1],
  TRADE_FLOW_OPTIONS = [{
    c: "Export Value",
    v: {
      rg: 'X',
      measure: "primaryValue"
    }
  }, {
    c: "Import Value",
    v: {
      rg: 'M',
      measure: "primaryValue"
    }
  }],
  CHART_OPTIONS = [{
    c: "TreeMap (60, 90)",
    v: "TREE_MAP"
  }, {
    c: "Bar (60, 90)",
    v: "BAR"
  }],
  DF_TRADE_FLOW = TRADE_FLOW_OPTIONS[0],
  DF_PARTNER = {
    c: "World",
    v: "0"
  },
  DF_FREQ = {
    c: "Annual",
    v: "A"
  };
const _isAggrAll = (tp, aggr) => tp.v === 'all' && aggr.v !== 'total';
const UnDialogAgg = (0, _memoIsShow.default)(props => {
  const {
      isShow,
      caption,
      oneURI,
      tpURI,
      msgOnNotSelected,
      toTopLayer,
      onAbout,
      loadFn,
      onLoad,
      onShow,
      onClose
    } = props,
    _refTradePartner = (0, _uiApi.useRef)(),
    [isShowToggle, toggleInputs, hideToggle] = (0, _useInputToggle.default)(),
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)({
      onAbout,
      onClose,
      toggleInputs
    }),
    [isFlow, toggleFlow] = (0, _useToggle.default)(true),
    [isPartner, togglePartner] = (0, _useToggle.default)()
    //, [isAggr, toggleAggr] = useToggle(true)
    ,
    [setOne, getOne] = (0, _useProperty.default)(),
    [setTradePartner, getTradePartner] = (0, _useProperty.default)(DF_PARTNER, DF_PARTNER),
    [setAggregation, getAggregation] = (0, _useProperty.default)(DF_AGGREGATION, DF_AGGREGATION),
    [isInputChart, toggleInputChart] = (0, _useToggleInputChart.default)(getTradePartner, getAggregation),
    [setTradeFlow, getTradeFlow] = (0, _useProperty.default)(DF_TRADE_FLOW, DF_TRADE_FLOW),
    [setChart, getChart] = (0, _useProperty.default)(),
    [setPeriod, getPeriod] = (0, _useProperty.default)(DF_PERIOD, DF_PERIOD)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _setTradePartner = (0, _uiApi.useCallback)(item => {
      setTradePartner(item);
      toggleInputChart();
    }, [])
    // setTradePartner, toggleInputChart
    ,
    _setAggregation = (0, _uiApi.useCallback)(item => {
      setAggregation(item);
      toggleInputChart();
    }, [])
    // setAggregation, toggleInputChart
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      const one = getOne(),
        tradePartner = getTradePartner(),
        three = getAggregation(),
        msgs = [];
      if (!one) {
        msgs.push(msgOnNotSelected('Reporter'));
      }
      if (one && one.v === 'all' || _isAggrAll(tradePartner, three)) {
        msgs.push('Query All is too complex');
      }
      if (msgs.length === 0) {
        onLoad(loadFn(props, {
          one,
          three,
          tradeFlow: getTradeFlow(),
          tradePartner,
          period: getPeriod(),
          chart: getChart(),
          freq: DF_FREQ,
          tradePartners: (0, _uiApi.getRefOptions)(_refTradePartner)
        }));
      }
      setValidationMessages(msgs);
    }, []);
  // props, loadFn, onLoad, msgOnNotSelected
  // getAggregation, getTradeFlow,
  // clearValidationMessages, setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    caption: caption,
    menuModel: menuMoreModel,
    toTopLayer: toTopLayer,
    onLoad: _hLoad,
    onShow: onShow,
    onClose: hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalInputToggle.default, {
      isShow: isShowToggle,
      configs: [['Trade Flow', isFlow, toggleFlow], ['Partner', isPartner, togglePartner]
      /*['Aggregation', isAggr, toggleAggr]*/],

      onClose: hideToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      caption: "Reporter",
      onSelect: setOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isFlow,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Trade Flow",
        placeholder: "Default: Export Value",
        propCaption: "c",
        options: TRADE_FLOW_OPTIONS,
        onSelect: setTradeFlow
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isPartner,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
        ref: _refTradePartner,
        isShowLabels: isShowLabels,
        uri: tpURI,
        caption: "Partner",
        placeholder: "Default: World",
        onSelect: _setTradePartner
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.ShowHide, {
      isShow: true,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Aggregation",
        placeholder: "Default: Total of trade partner",
        propCaption: "c",
        options: AGG_OPTIONS,
        onSelect: _setAggregation
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.ShowHide, {
        isShow: isInputChart,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: "Chart",
          placeholder: "Default: TreeMap (60,90)",
          propCaption: "c",
          options: CHART_OPTIONS,
          onSelect: setChart
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: "Period",
          placeholder: "Default: 2021",
          propCaption: "c",
          options: PERIOD_OPTIONS,
          onSelect: setPeriod
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = UnDialogAgg;
exports.default = _default;
//# sourceMappingURL=UnDialogAgg.js.map