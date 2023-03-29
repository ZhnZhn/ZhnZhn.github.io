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
var _jsxRuntime = require("react/jsx-runtime");
const TRADE_FLOW_OPTIONS = [{
    c: "Export Value",
    v: {
      rg: 2,
      measure: "TradeValue"
    }
  }, {
    c: "Export Weight",
    v: {
      rg: 2,
      measure: "NetWeight"
    }
  }, {
    c: "Export Quantity",
    v: {
      rg: 2,
      measure: "TradeQuantity"
    }
  }, {
    c: "Export Average Value Per Weight",
    v: {
      rg: 2,
      measure: "avgPerWeight"
    }
  }, {
    c: "Export Average Value Per Quantity",
    v: {
      rg: 2,
      measure: "avgPerQuantity"
    }
  }, {
    c: "Import Value",
    v: {
      rg: 1,
      measure: "TradeValue"
    }
  }, {
    c: "Import Weight",
    v: {
      rg: 1,
      measure: "NetWeight"
    }
  }, {
    c: "Import Quantity",
    v: {
      rg: 1,
      measure: "TradeQuantity"
    }
  }, {
    c: "Import Average Value Per Weight",
    v: {
      rg: 1,
      measure: "avgPerWeight"
    }
  }, {
    c: "Import Average Value Per Quantity",
    v: {
      rg: 1,
      measure: "avgPerQuantity"
    }
  }],
  DF_TRADE_FLOW = TRADE_FLOW_OPTIONS[0],
  DF_ONE = {
    c: 'All',
    v: 'all'
  },
  FREQUENCY_OPTIONS = [{
    c: "Annual",
    v: "A"
  }, {
    c: "Monthly",
    v: "M"
  }],
  DF_FREQ = FREQUENCY_OPTIONS[0];
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
    [isFlow, toggleFlow] = (0, _useToggle.default)(true),
    [isFreq, toggleFreq] = (0, _useToggle.default)(false),
    _refGroupItem = (0, _uiApi.useRef)(),
    [setOne, getOne] = (0, _useProperty.default)(),
    [setTradeFlow, getTradeFlow] = (0, _useProperty.default)(),
    [setTradePartner, getTradePartner] = (0, _useProperty.default)(),
    [setFreq, getFreq] = (0, _useProperty.default)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      const _groupItemInst = (0, _uiApi.getRefValue)(_refGroupItem),
        {
          msg = []
        } = _groupItemInst.getValidation(),
        one = getOne() || DF_ONE,
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
          freq
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
      configs: [['Partner', isPartner, togglePartner], ['Heading', isHeading, toggleHeading], ['Trade Flow', isFlow, toggleFlow], ['Frequency', isFreq, toggleFreq]],
      onClose: hideToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      caption: "Reporter",
      placeholder: "Default: All",
      onSelect: setOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isPartner,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
        isShowLabels: isShowLabels,
        uri: tpURI,
        caption: "Partner",
        placeholder: "Default: World",
        onSelect: setTradePartner
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isHeading,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
        ref: _refGroupItem,
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
        placeholder: "Default: Export Value",
        propCaption: "c",
        options: TRADE_FLOW_OPTIONS,
        onSelect: setTradeFlow
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isFreq,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Frequency",
        placeholder: "Default: Annual",
        propCaption: "c",
        options: FREQUENCY_OPTIONS,
        onSelect: setFreq
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = UnDialog5;
exports.default = _default;
//# sourceMappingURL=UnDialog5.js.map