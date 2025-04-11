"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _getPropertyFn = require("../../utils/getPropertyFn");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = require("../hooks/useToggle");
var _useProperty = require("../hooks/useProperty");
var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));
var _useInputToggle = _interopRequireDefault(require("./useInputToggle"));
var _useInputChart = _interopRequireDefault(require("./useInputChart"));
var _dialogFn = require("./dialogFn");
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _ModalInputToggle = _interopRequireDefault(require("./ModalInputToggle"));
var _jsxRuntime = require("react/jsx-runtime");
const [DF_REPORTER = {
    c: "World",
    v: "0"
  }, REPORTER_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)([{
    c: "World",
    v: "0"
  }]),
  AGG_OPTIONS = [{
    c: "Total of trade partner",
    v: "TOTAL"
  }, {
    c: "All 2-digit HS commodities",
    v: "AG2"
  }],
  [DF_AGGREGATION, AGGREGATION_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(AGG_OPTIONS),
  PERIOD_OPTIONS = (() => {
    const arr = [];
    for (let i = 0; i < 23; i++) {
      const _v = "" + (2023 - i);
      arr.push({
        c: _v,
        v: _v
      });
    }
    return arr;
  })(),
  [DF_PERIOD, PERIOD_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(PERIOD_OPTIONS, 1),
  TRADE_FLOW_OPTIONS = [{
    c: "Export Value",
    v: {
      rg: "X",
      measure: "primaryValue"
    }
  },
  //{ c: "Calculated Export Value by Reporter Imports", v: { rg: "M", measure: "primaryValue", tfType: "t1"} },
  {
    c: "Import Value",
    v: {
      rg: "M",
      measure: "primaryValue"
    }
  }
  //{ c: "Calculated Import Value by Reporter Exports", v: { rg: "M", measure: "primaryValue", tfType: "t1" } }
  ],
  [DF_TRADE_FLOW, TRADE_FLOW_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(TRADE_FLOW_OPTIONS),
  [DF_PARTNER = {
    c: "World",
    v: "0"
  }, PARTNER_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)([{
    c: "World",
    v: "0"
  }]),
  DF_FREQ = {
    c: "Annual",
    v: "A"
  };
const _isAggrAll = (tp, aggr) => (0, _getPropertyFn.getV)(tp) === "all" && (0, _getPropertyFn.getV)(aggr) !== "total";
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
    [isFlow, toggleFlow] = (0, _useToggle.useToggle)(true)
    /*
    , [
      isPartner,
      togglePartner
    ] = useToggle()
    */
    //, [isAggr, toggleAggr] = useToggle(true)
    ,
    [setOne, getOne] = (0, _useProperty.useProperty)(DF_REPORTER, DF_REPORTER),
    [setTradePartner, getTradePartner] = (0, _useProperty.useProperty)(DF_PARTNER, DF_PARTNER),
    [setAggregation, getAggregation] = (0, _useProperty.useProperty)(DF_AGGREGATION, DF_AGGREGATION),
    [CHART_PLACEHOLDER, isInputChart, isPeriod, toggleInputChart, setChart, getChart, chartOptions] = (0, _useInputChart.default)(getTradePartner, getAggregation),
    [setTradeFlow, getTradeFlow] = (0, _useProperty.useProperty)(DF_TRADE_FLOW, DF_TRADE_FLOW),
    [setPeriod, getPeriod] = (0, _useProperty.useProperty)(DF_PERIOD, DF_PERIOD)
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
        tradeFlow = getTradeFlow(),
        three = getAggregation(),
        chart = getChart(),
        msgs = [];
      if (!one) {
        msgs.push(msgOnNotSelected("Reporter"));
      }
      if (one && (0, _getPropertyFn.getV)(one) === "all" || _isAggrAll(tradePartner, three)) {
        msgs.push("Query All is too complex");
      }
      if (one && (0, _getPropertyFn.getV)(one) === "0" && (0, _getPropertyFn.getV)(three) === "AG2") {
        msgs.push("Query World by AG2 is too complex");
      }
      if (((0, _getPropertyFn.getV)(tradeFlow) || {}).tfType === "t1" && ((0, _getPropertyFn.getV)(tradePartner) !== "0" || (0, _getPropertyFn.getV)(chart) === "SPLINE")) {
        msgs.push("Query trade flow calculated values is only for category charts of trade partner World");
      }
      if (msgs.length === 0) {
        onLoad(loadFn(props, {
          one,
          three,
          tradeFlow,
          tradePartner,
          chart,
          chType: chart,
          time: (0, _getPropertyFn.getV)(getPeriod()),
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
      configs: [["Trade Flow", isFlow, toggleFlow]
      /*["Partner", isPartner, togglePartner]*/
      /*["Aggregation", isAggr, toggleAggr]*/],
      onClose: hideToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      caption: "Reporter",
      placeholder: REPORTER_PLACEHOLDER,
      onSelect: setOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isFlow,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Trade Flow",
        placeholder: TRADE_FLOW_PLACEHOLDER,
        propCaption: "c",
        options: TRADE_FLOW_OPTIONS,
        onSelect: setTradeFlow
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: false,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
        refEl: _refTradePartner,
        isShowLabels: isShowLabels,
        uri: tpURI,
        caption: "Partner",
        placeholder: PARTNER_PLACEHOLDER,
        onSelect: _setTradePartner
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.ShowHide, {
      isShow: true,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Aggregation",
        placeholder: AGGREGATION_PLACEHOLDER,
        propCaption: "c",
        options: AGG_OPTIONS,
        onSelect: _setAggregation
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.ShowHide, {
        isShow: isInputChart,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: "Chart",
          placeholder: CHART_PLACEHOLDER,
          propCaption: "c",
          options: chartOptions,
          onSelect: setChart
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
          isShow: isPeriod,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
            isShowLabels: isShowLabels
            //caption="Period"
            ,
            caption: "For Date",
            placeholder: PERIOD_PLACEHOLDER,
            propCaption: "c",
            options: PERIOD_OPTIONS,
            onSelect: setPeriod
          })
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = exports.default = UnDialogAgg;
//# sourceMappingURL=UnDialogAgg.js.map