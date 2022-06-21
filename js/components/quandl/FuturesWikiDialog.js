"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const TYPE_OPTIONS = [{
  caption: 'Continuous Contract #1',
  value: 1
}, {
  caption: 'Continuous Contract #2',
  value: 2
}, {
  caption: 'Continuous Contract #3',
  value: 3
}, {
  caption: 'Continuous Contract #4',
  value: 4
}, {
  caption: 'Continuous Contract #5',
  value: 5
}];
const FuturesWikiDialog = (0, _memoIsShow.default)(props => {
  const {
    isShow,
    isFd,
    caption,
    futuresURI,
    msgOnNotSelected,
    msgOnNotValidFormat,
    initFromDate,
    isYmdOrEmpty,
    errNotYmdOrEmpty,
    toTopLayer,
    onAbout,
    loadFn,
    onLoad,
    onShow,
    onClose
  } = props,
        [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, clearValidationMessages, hClose] = (0, _useDialog.default)({
    onAbout,
    onClose
  }),
        [setType, getType] = (0, _useProperty.default)(),
        _refExchangeItem = (0, _uiApi.useRef)(),
        _refFromDate = (0, _uiApi.useRef)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _uiApi.useCallback)(() => {
    const msgs = [],
          _exchangeItemInst = (0, _uiApi.getRefValue)(_refExchangeItem),
          {
      msg = []
    } = _exchangeItemInst.getValidation(),
          type = getType(),
          _fromDateInst = (0, _uiApi.getRefValue)(_refFromDate);

    msgs.push(...msg);

    if (!type) {
      msgs.push(msgOnNotSelected('Type'));
    }

    if (isFd && !_fromDateInst.isValid()) {
      msgs.push(msgOnNotValidFormat('From Date'));
    }

    if (msgs.length === 0) {
      const {
        one: exchange,
        two: item
      } = _exchangeItemInst.getValues(),
            fromDate = isFd ? _fromDateInst.getValue() : void 0;

      onLoad(loadFn(props, {
        exchange,
        item,
        type,
        fromDate
      }));
      clearValidationMessages();
    } else {
      setValidationMessages(msgs);
    }
  }, []); // props, onLoad, loadFn, isFd, msgOnNotSelected, msgOnNotValidFormat,
  // getType,
  // setValidationMessages, clearValidationMessages

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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
      ref: _refExchangeItem,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: futuresURI,
      oneCaption: "Exchange",
      oneOptionNames: "Exchanges",
      oneJsonProp: "futures",
      twoCaption: "Asset",
      msgOnNotSelected: msgOnNotSelected
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Type",
      options: TYPE_OPTIONS,
      onSelect: setType
    }), isFd && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowDate, {
      innerRef: _refFromDate,
      isShowLabels: isShowLabels,
      title: "From Date:",
      initialValue: initFromDate,
      errorMsg: errNotYmdOrEmpty,
      onTest: isYmdOrEmpty
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = FuturesWikiDialog;
exports.default = _default;
//# sourceMappingURL=FuturesWikiDialog.js.map