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
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _ModalInputToggle = _interopRequireDefault(require("./ModalInputToggle"));
var _dialogFn = require("./dialogFn");
var _jsxRuntime = require("react/jsx-runtime");
const TRADE_FLOW_OPTIONS = [{
    c: "Export Value",
    v: {
      rg: 'X',
      measure: "primaryValue"
    }
  }, {
    c: "Export Weight",
    v: {
      rg: 'X',
      measure: "netWgt"
    }
  }, {
    c: "Export Quantity",
    v: {
      rg: 'X',
      measure: "qty"
    }
  }, {
    c: "Export Average Value Per Weight",
    v: {
      rg: 'X',
      measure: "avgPerWeight"
    }
  }, {
    c: "Export Average Value Per Quantity",
    v: {
      rg: 'X',
      measure: "avgPerQuantity"
    }
  }, {
    c: "Import Value",
    v: {
      rg: 'M',
      measure: "primaryValue"
    }
  }, {
    c: "Import Weight",
    v: {
      rg: 'M',
      measure: "netWgt"
    }
  }, {
    c: "Import Quantity",
    v: {
      rg: 'M',
      measure: "qty"
    }
  }, {
    c: "Import Average Value Per Weight",
    v: {
      rg: 'M',
      measure: "avgPerWeight"
    }
  }, {
    c: "Import Average Value Per Quantity",
    v: {
      rg: 'M',
      measure: "avgPerQuantity"
    }
  }],
  [DF_TRADE_FLOW, TRADE_FLOW_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(TRADE_FLOW_OPTIONS),
  [DF_REPORTER = {
    c: 'All',
    v: 'all'
  }, REPORTER_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)([{
    c: 'All',
    v: 'all'
  }]),
  FREQUENCY_OPTIONS = [{
    c: "Annual",
    v: "A"
  }, {
    c: "Monthly",
    v: "M"
  }],
  [DF_FREQ, FREQUENCY_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(FREQUENCY_OPTIONS);
const UnDialog5 = (0, _memoIsShow.default)(props => {
  const {
      isShow,
      caption,
      oneURI,
      twoURI,
      tpURI,
      msgOnNotSelected,
      toTopLayer,
      onAbout,
      loadFn,
      onLoad,
      onShow,
      onClose
    } = props,
    [isShowToggle, toggleInputs, hideToggle] = (0, _useInputToggle.default)(),
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)({
      onAbout,
      onClose,
      toggleInputs
    }),
    [isHeading, toggleHeading] = (0, _useToggle.default)(true),
    [isPartner, togglePartner] = (0, _useToggle.default)(false),
    [isFlow, toggleFlow] = (0, _useToggle.default)(true)
    //, [isFreq, toggleFreq] = useToggle(false)
    ,
    _refTradePartner = (0, _uiApi.useRef)(),
    _refGroupItem = (0, _uiApi.useRef)(),
    [setOne, getOne] = (0, _useProperty.default)(),
    [setTradeFlow, getTradeFlow] = (0, _useProperty.default)(),
    [setTradePartner, getTradePartner] = (0, _useProperty.default)()

    /*eslint-disable no-unused-vars*/,
    [setFreq, getFreq] = (0, _useProperty.default)()
    /*eslint-enable no-unused-vars*/

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      const _groupItemInst = (0, _uiApi.getRefValue)(_refGroupItem),
        {
          msg = []
        } = _groupItemInst.getValidation(),
        one = getOne() || DF_REPORTER,
        _oneValue = one.v,
        tradePartner = getTradePartner(),
        _tradePartnerValue = tradePartner && tradePartner.v,
        freq = getFreq() || DF_FREQ;
      if (_oneValue === 'all' && _tradePartnerValue === 'all') {
        msg.push('Query All to All is too complex');
      }
      if (_oneValue === 'all' && freq.v === 'M') {
        msg.push('Query All Monthly is too complex');
      }
      if (msg.length === 0) {
        const {
          one: two,
          two: three
        } = _groupItemInst.getValues();
        onLoad(loadFn(props, {
          one,
          two,
          three,
          tradeFlow: getTradeFlow() || DF_TRADE_FLOW,
          tradePartner,
          freq,
          tradePartners: (0, _uiApi.getRefOptions)(_refTradePartner)
        }));
      }
      setValidationMessages(msg);
    }, []);
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalInputToggle.default, {
      isShow: isShowToggle,
      configs: [['Partner', isPartner, togglePartner], ['Heading', isHeading, toggleHeading], ['Trade Flow', isFlow, toggleFlow]
      /*['Frequency', isFreq, toggleFreq]*/],
      onClose: hideToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      caption: "Reporter",
      placeholder: REPORTER_PLACEHOLDER,
      onSelect: setOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isPartner,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
        refEl: _refTradePartner,
        isShowLabels: isShowLabels,
        uri: tpURI,
        caption: "Partner",
        placeholder: "Default: World",
        onSelect: setTradePartner
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isHeading,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
        refEl: _refGroupItem,
        isShow: isShow,
        isShowLabels: isShowLabels,
        uri: twoURI,
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
      isShow: false,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Frequency",
        placeholder: FREQUENCY_PLACEHOLDER,
        propCaption: "c",
        options: FREQUENCY_OPTIONS
        //onSelect={setFreq}
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = exports.default = UnDialog5;
//# sourceMappingURL=UnDialog5.js.map