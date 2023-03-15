"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useRefBool = _interopRequireDefault(require("../hooks/useRefBool"));
var _useDialog = _interopRequireDefault(require("./hooks/useDialog"));
var _checkAreDatesValid = _interopRequireDefault(require("./hooks/checkAreDatesValid"));
var _ChartType = require("../../constants/ChartType");
var _DialogCell = _interopRequireDefault(require("./DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
const INITIAL_IS_SECOND_YAXIS = false;
const CHART_TYPE_OPTIONS = [{
  caption: 'Default: Area',
  value: _ChartType.CHT_AREA
}, {
  caption: 'Scatter: Label Up',
  value: _ChartType.CHT_SCATTER_UP
}, {
  caption: 'Scatter: Label Down',
  value: _ChartType.CHT_SCATTER_DOWN
}];
const DialogType5 = (0, _memoIsShow.default)(props => {
  const {
      isShow,
      isChartType,
      caption,
      oneCaption,
      oneURI,
      oneJsonProp,
      twoCaption,
      twoURI,
      twoJsonProp,
      threeCaption,
      msgOnNotSelected,
      initFromDate,
      initToDate,
      msgOnNotValidFormat,
      onTestDate,
      toTopLayer,
      onAbout,
      loadFn,
      onLoad,
      onShow,
      onClose
    } = props,
    [isShowDate, toggleDate] = (0, _useToggle.default)(false),
    [isShowOptions, toggleOptions] = (0, _useToggle.default)(false),
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, clearValidationMessages, hClose] = (0, _useDialog.default)({
      onAbout,
      onClose,
      toggleDate,
      toggleOptions
    }),
    [refSecondYAxis, hCheckSecondYAxis, hUnCheckSecondYAxis] = (0, _useRefBool.default)(INITIAL_IS_SECOND_YAXIS),
    [setOne, getOne] = (0, _useProperty.default)(),
    [setChartType, getChartType] = (0, _useProperty.default)(),
    _refDates = (0, _uiApi.useRef)(),
    _refTwoThree = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      const msgs = [],
        one = getOne(),
        _twoThreeInst = (0, _uiApi.getRefValue)(_refTwoThree),
        {
          msg = []
        } = _twoThreeInst.getValidation();
      if (!one) {
        msgs.push(msgOnNotSelected(oneCaption));
      }
      msgs.push(...msg);
      (0, _checkAreDatesValid.default)(_refDates, msgs);
      if (msgs.length === 0) {
        const {
            one: two,
            two: three
          } = _twoThreeInst.getValues(),
          {
            value: seriaType
          } = getChartType() || {};
        onLoad(loadFn(props, {
          ...(0, _uiApi.getRefValue)(_refDates).getValues(),
          one,
          two,
          three,
          seriaType,
          hasSecondYAxis: (0, _uiApi.getRefValue)(refSecondYAxis)
        }));
        clearValidationMessages();
      } else {
        setValidationMessages(msgs);
      }
    }, []);
  // props, loadFn, onLoad, oneCaption, msgOnNotSelected,
  // refSecondYAxis, getChartType, getOne,
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      jsonProp: oneJsonProp,
      caption: oneCaption,
      optionNames: "Items",
      onSelect: setOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
      ref: _refTwoThree,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: twoURI,
      oneCaption: twoCaption,
      oneJsonProp: twoJsonProp,
      twoCaption: threeCaption,
      msgOnNotSelected: msgOnNotSelected
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.DatesFragment, {
        ref: _refDates,
        isShowLabels: isShowLabels,
        initFromDate: initFromDate,
        initToDate: initToDate,
        msgOnNotValidFormat: msgOnNotValidFormat,
        onTestDate: onTestDate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.ShowHide, {
      isShow: isShowOptions,
      children: [isChartType && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Chart Type:",
        options: CHART_TYPE_OPTIONS,
        onSelect: setChartType
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox1, {
        initValue: INITIAL_IS_SECOND_YAXIS,
        caption: "Add Seria with Second YAxis",
        onCheck: hCheckSecondYAxis,
        onUnCheck: hUnCheckSecondYAxis
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = DialogType5;
exports.default = _default;
//# sourceMappingURL=DialogType5.js.map