"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ChartType = require("../../constants/ChartType");
var _getPropertyFn = require("../../utils/getPropertyFn");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useBool = require("../hooks/useBool");
var _useToggle = require("../hooks/useToggle");
var _useProperty = require("../hooks/useProperty");
var _useToggleLabels = _interopRequireDefault(require("../dialogs/hooks/useToggleLabels"));
var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _ModalToggleInputs = _interopRequireDefault(require("../dialogs/modals/ModalToggleInputs"));
var _crDateConfig = _interopRequireDefault(require("../dialogs/fns/crDateConfig"));
var _dialogFn = require("./dialogFn");
var _jsxRuntime = require("react/jsx-runtime");
const TRADE_FLOW_OPTIONS = [{
    c: "Export Value",
    v: {
      rg: "X",
      measure: "primaryValue"
    }
  }, {
    c: "Export Weight",
    v: {
      rg: "X",
      measure: "netWgt"
    }
  }, {
    c: "Export Quantity",
    v: {
      rg: "X",
      measure: "qty"
    }
  }, {
    c: "Export Average Value Per Weight",
    v: {
      rg: "X",
      measure: "avgPerWeight"
    }
  }, {
    c: "Export Average Value Per Quantity",
    v: {
      rg: "X",
      measure: "avgPerQuantity"
    }
  }, {
    c: "Import Value",
    v: {
      rg: "M",
      measure: "primaryValue"
    }
  }, {
    c: "Import Weight",
    v: {
      rg: "M",
      measure: "netWgt"
    }
  }, {
    c: "Import Quantity",
    v: {
      rg: "M",
      measure: "qty"
    }
  }, {
    c: "Import Average Value Per Weight",
    v: {
      rg: "M",
      measure: "avgPerWeight"
    }
  }, {
    c: "Import Average Value Per Quantity",
    v: {
      rg: "M",
      measure: "avgPerQuantity"
    }
  }],
  [DF_TRADE_FLOW, TRADE_FLOW_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(TRADE_FLOW_OPTIONS),
  [DF_REPORTER = {
    c: "World",
    v: "0"
  }, REPORTER_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)([{
    c: "World",
    v: "0"
  }]),
  FREQUENCY_OPTIONS = [{
    c: "Annual",
    v: "A"
  }, {
    c: "Monthly",
    v: "M"
  }],
  [DF_FREQ, FREQUENCY_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(FREQUENCY_OPTIONS),
  _crOptionItem = (caption, value) => ({
    caption,
    value
  }),
  CHART_OPTIONS = [_crOptionItem("Bar (60, 90): By Partners", _ChartType.CHT_BAR_SET), _crOptionItem("Tree Map (60, 90): By Partners", _ChartType.CHT_TREE_MAP), _crOptionItem("Dots: By Partners", _ChartType.CHT_DOT_SET)],
  [DF_CHART, CHART_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(CHART_OPTIONS),
  [DATE_OPTIONS] = (0, _crDateConfig.default)("Y", 2),
  [DATE_DF, DATE_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(DATE_OPTIONS, 1),
  _crTwoUri = dfId => `./data/uncomtrade/${dfId}.json`;
const UnDialog5 = (0, _memoIsShow.default)(props => {
  const {
      isShow,
      caption,
      oneURI,
      tpURI,
      dfProps,
      msgOnNotSelected,
      toTopLayer,
      loadFn,
      onLoad,
      onShow
    } = props,
    {
      dfId
    } = dfProps || {},
    [seriaType, setSeriaType] = (0, _uiApi.useState)(DF_CHART),
    [isShowToggle, toggleInputs, hideToggle] = (0, _useBool.useToggleFalse)(),
    [isShowLabels, toggleLabels] = (0, _useToggleLabels.default)(),
    [isToolbar, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)(props, {
      toggleInputs
    }),
    [isHeading, toggleHeading] = (0, _useToggle.useToggle)(!0)
    /*, [isPartner, togglePartner] = useToggle(!1)*/,
    [isFlow, toggleFlow] = (0, _useToggle.useToggle)(!0),
    [isChart, toggleChart] = (0, _useToggle.useToggle)(!1)
    //, [isFreq, toggleFreq] = useToggle(!1)
    ,
    _refTradePartner = (0, _uiApi.useRef)(),
    _refGroupItem = (0, _uiApi.useRef)(),
    _refSeriaColor = (0, _uiApi.useRef)(),
    [setOne, getOne] = (0, _useProperty.useProperty)(DF_REPORTER, DF_REPORTER),
    [setTradeFlow, getTradeFlow] = (0, _useProperty.useProperty)(DF_TRADE_FLOW, DF_TRADE_FLOW),
    getTradePartner = (0, _useProperty.useProperty)()[1],
    [setPropertyTime, getPropertyTime] = (0, _useProperty.useProperty)(DATE_DF, DATE_DF)

    /*eslint-disable no-unused-vars*/,
    [setFreq, getFreq] = (0, _useProperty.useProperty)(DF_FREQ, DF_FREQ)
    /*eslint-enable no-unused-vars*/

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      const _groupItemInst = (0, _uiApi.getRefValue)(_refGroupItem),
        {
          msg = []
        } = _groupItemInst.getValidation(),
        one = getOne(),
        _oneValue = (0, _getPropertyFn.getV)(one),
        tradePartner = getTradePartner(),
        _tradePartnerValue = (0, _getPropertyFn.getV)(tradePartner),
        freq = getFreq();
      if (_oneValue === "all" && _tradePartnerValue === "all") {
        msg.push("Query All to All is too complex");
      }
      if (_oneValue === "all" && (0, _getPropertyFn.getV)(freq) === "M") {
        msg.push("Query All Monthly is too complex");
      }
      if (msg.length === 0) {
        const {
          one: two,
          two: three
        } = _groupItemInst.getValues();
        onLoad(loadFn(props, {
          ...(0, _uiApi.getInputValue)(_refSeriaColor),
          one,
          two,
          three,
          tradeFlow: getTradeFlow(),
          tradePartner,
          freq,
          chType: seriaType,
          time: (0, _getPropertyFn.getV)(getPropertyTime()),
          tradePartners: (0, _uiApi.getRefOptions)(_refTradePartner)
        }));
      }
      setValidationMessages(msg);
    }, [seriaType]);
  // props, loadFn, onLoad,
  // getOne, getTradeFlow,
  // setValidationMessages
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalToggleInputs.default, {
      isShow: isShowToggle,
      isShowLabels: isShowLabels,
      configs: [/*["Partner", isPartner, togglePartner],*/
      ["Heading", isHeading, toggleHeading], ["Trade Flow", isFlow, toggleFlow], ["Chart", isChart, toggleChart]
      /*["Frequency", isFreq, toggleFreq]*/],
      onToggleLabels: toggleLabels,
      onClose: hideToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      caption: "Reporter",
      placeholder: REPORTER_PLACEHOLDER,
      onSelect: setOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: !1,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
        refEl: _refTradePartner,
        isShowLabels: isShowLabels,
        uri: tpURI,
        caption: "Partner",
        placeholder: "Default: World"
        //onSelect={setTradePartner}
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isHeading,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
        refEl: _refGroupItem,
        isShow: isShow,
        isShowLabels: isShowLabels,
        uri: _crTwoUri(dfId),
        oneCaption: "Heading",
        twoCaption: "Subheading",
        msgOnNotSelected: msgOnNotSelected
      })
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
      isShow: !1,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Frequency",
        placeholder: FREQUENCY_PLACEHOLDER,
        propCaption: "c",
        options: FREQUENCY_OPTIONS
        //onSelect={setFreq}
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
      isShowChart: isChart,
      isShowDate: isChart,
      refSeriaColor: _refSeriaColor,
      chartType: seriaType,
      isShowLabels: isShowLabels,
      chartOptions: CHART_OPTIONS,
      chartDefault: CHART_PLACEHOLDER,
      onSelectChart: setSeriaType,
      dateDefault: DATE_PLACEHOLDER,
      dateOptions: DATE_OPTIONS,
      onSelectDate: setPropertyTime
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = exports.default = UnDialog5;
//# sourceMappingURL=UnDialog5.js.map