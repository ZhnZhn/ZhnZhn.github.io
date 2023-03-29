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
const YEAR_OPTIONS = [{
  caption: '2021',
  value: 2021
}, {
  caption: '2020',
  value: 2020
}, {
  caption: '2019',
  value: 2019
}, {
  caption: '2018',
  value: 2018
}, {
  caption: '2017',
  value: 2017
}, {
  caption: '2016',
  value: 2016
}, {
  caption: '2015',
  value: 2015
}, {
  caption: '2014',
  value: 2014
}, {
  caption: '2013',
  value: 2013
}, {
  caption: '2012',
  value: 2012
}];
const Futures3Dialog = (0, _memoIsShow.default)(props => {
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
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)({
      onAbout,
      onClose
    }),
    _refItemMonth = (0, _uiApi.useRef)(),
    _refFromDate = (0, _uiApi.useRef)(),
    [setYear, getYear] = (0, _useProperty.default)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      const msgs = [],
        _itemMonthInst = (0, _uiApi.getRefValue)(_refItemMonth),
        {
          msg = []
        } = _itemMonthInst.getValidation(),
        year = getYear(),
        _fromDateInst = (0, _uiApi.getRefValue)(_refFromDate);
      msgs.push(...msg);
      if (!year) {
        msgs.push(msgOnNotSelected('Year'));
      }
      if (isFd && !_fromDateInst.isValid()) {
        msgs.push(msgOnNotValidFormat('From Date'));
      }
      if (msgs.length === 0) {
        const {
            one: item,
            two: month
          } = _itemMonthInst.getValues(),
          fromDate = isFd ? _fromDateInst.getValue() : void 0;
        onLoad(loadFn(props, {
          item,
          month,
          year,
          fromDate
        }));
      }
      setValidationMessages(msgs);
    }, []);
  // props, isFd, loadFn, onLoad, msgOnNotSelected, msgOnNotValidFormat,
  // getYear,
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
      ref: _refItemMonth,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: futuresURI,
      oneCaption: "Futures",
      oneOptionNames: "Futures",
      oneJsonProp: "futures",
      twoCaption: "Month",
      msgOnNotSelected: msgOnNotSelected
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Year",
      options: YEAR_OPTIONS,
      onSelect: setYear
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
var _default = Futures3Dialog;
exports.default = _default;
//# sourceMappingURL=Futures3Dialog.js.map