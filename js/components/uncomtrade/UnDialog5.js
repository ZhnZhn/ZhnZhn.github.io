"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const TRADE_FLOW_OPTIONS = [{
  caption: "Export Value",
  value: {
    rg: 2,
    measure: "TradeValue"
  }
}, {
  caption: "Export Weight",
  value: {
    rg: 2,
    measure: "NetWeight"
  }
}, {
  caption: "Export Quantity",
  value: {
    rg: 2,
    measure: "TradeQuantity"
  }
}, {
  caption: "Export Average Value Per Weight",
  value: {
    rg: 2,
    measure: "avgPerWeight"
  }
}, {
  caption: "Export Average Value Per Quantity",
  value: {
    rg: 2,
    measure: "avgPerQuantity"
  }
}, {
  caption: "Import Value",
  value: {
    rg: 1,
    measure: "TradeValue"
  }
}, {
  caption: "Import Weight",
  value: {
    rg: 1,
    measure: "NetWeight"
  }
}, {
  caption: "Import Quantity",
  value: {
    rg: 1,
    measure: "TradeQuantity"
  }
}, {
  caption: "Import Average Value Per Weight",
  value: {
    rg: 1,
    measure: "avgPerWeight"
  }
}, {
  caption: "Import Average Value Per Quantity",
  value: {
    rg: 1,
    measure: "avgPerQuantity"
  }
}];
const UnDialog5 = (0, _memoIsShow.default)(props => {
  const {
    isShow,
    caption,
    oneCaption,
    oneURI,
    oneJsonProp,
    twoCaption,
    twoURI,
    twoJsonProp,
    threeCaption,
    msgOnNotSelected,
    loadFn,
    onLoad,
    onShow,
    onFront,
    onClose,
    onClickInfo
  } = props,
        [isShowOptions, toggleOptions] = (0, _useToggle.default)(false),
        [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, clearValidationMessages, hClose] = (0, _useDialog.default)({
    onClickInfo,
    onClose,
    toggleOptions
  }),
        _refGroupItem = (0, _uiApi.useRef)(),
        [setOne, getOne] = (0, _useProperty.default)(),
        [setTradeFlow, getTradeFlow] = (0, _useProperty.default)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _uiApi.useCallback)(() => {
    const _groupItemInst = (0, _uiApi.getRefValue)(_refGroupItem),
          {
      msg = []
    } = _groupItemInst.getValidation();

    if (msg.length === 0) {
      const {
        one: two,
        two: three
      } = _groupItemInst.getValues();

      onLoad(loadFn(props, {
        one: getOne(),
        two,
        three,
        tradeFlow: getTradeFlow()
      }));
      clearValidationMessages();
    } else {
      setValidationMessages(msg);
    }
  }, []); // props, loadFn, onLoad,
  // getOne, getTradeFlow,
  // clearValidationMessages, setValidationMessages

  /*eslint-enable react-hooks/exhaustive-deps */


  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    caption: caption,
    menuModel: menuMoreModel,
    onLoad: _hLoad,
    onShowChart: onShow,
    onFront: onFront,
    onClose: hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      jsonProp: oneJsonProp,
      caption: oneCaption,
      placeholder: "Default: All",
      onSelect: setOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
      ref: _refGroupItem,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: twoURI,
      oneCaption: twoCaption,
      oneJsonProp: twoJsonProp,
      twoCaption: threeCaption,
      msgOnNotSelected: msgOnNotSelected
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowOptions,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Trade Flow",
        placeholder: "Default: Export Value",
        options: TRADE_FLOW_OPTIONS,
        onSelect: setTradeFlow
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = UnDialog5;
exports.default = _default;
//# sourceMappingURL=UnDialog5.js.map