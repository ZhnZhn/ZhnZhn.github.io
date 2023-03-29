"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));
var _checkAreDatesValid = _interopRequireDefault(require("../dialogs/hooks/checkAreDatesValid"));
var _ChartType = require("../../constants/ChartType");
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
const UNIT_OPTIONS = [{
    caption: "Thousand Barrels per day (kb/d)",
    value: "KD"
  }, {
    caption: "Thousand Barrels (kbbl)",
    value: "KB"
  }, {
    caption: "Thousand Kilolitres (kl)",
    value: "KL"
  }, {
    caption: "Thousand Metric Tons (kmt)",
    value: "KT"
  }, {
    caption: "Conversion factor barrels/ktons",
    value: "BK"
  }],
  DF_UNITS = UNIT_OPTIONS[0],
  CHART_OPTIONS = [{
    caption: "AreaSpline",
    value: _ChartType.CHT_AREA
  }, {
    caption: "Yearly by Month",
    value: _ChartType.CHT_YEARLY
  }];
const JodiWorldOilDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    caption,
    oneCaption,
    oneURI,
    oneJsonProp,
    parentCaption,
    parentChildURI,
    parentJsonProp,
    childCaption,
    msgOnNotSelected,
    initFromDate,
    initToDate,
    msgOnNotValidFormat,
    onTestDate,
    dataColumn,
    loadId,
    dataSource,
    toTopLayer,
    onAbout,
    fnValue,
    onLoad,
    onShow,
    onClose
  } = _ref;
  const [isShowDate, toggleDate] = (0, _useToggle.default)(false),
    [isShowOptions, toggleOptions] = (0, _useToggle.default)(false),
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)({
      onAbout,
      onClose,
      toggleDate,
      toggleOptions
    }),
    [setCountry, getCountry] = (0, _useProperty.default)(),
    [setUnits, getUnits] = (0, _useProperty.default)(),
    [setChartType, getChartType] = (0, _useProperty.default)(),
    _refProductFlow = (0, _uiApi.useRef)(),
    _refDates = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      const msgs = [],
        country = getCountry(),
        _productFlowInst = (0, _uiApi.getRefValue)(_refProductFlow),
        {
          msg = []
        } = _productFlowInst.getValidation(),
        units = getUnits() || DF_UNITS;
      if (!country) {
        msgs.push(msgOnNotSelected('Country'));
      }
      msgs.push(...msg);
      (0, _checkAreDatesValid.default)(_refDates, msgs);
      if (msgs.length === 0) {
        const _datesInst = (0, _uiApi.getRefValue)(_refDates),
          {
            one: product,
            two: flow
          } = _productFlowInst.getValues(),
          {
            value: seriaType
          } = getChartType() || {};
        onLoad({
          ..._datesInst.getValues(),
          value: fnValue(country.value, product.value, flow.value, units.value),
          title: country.caption + ": " + product.caption,
          subtitle: flow.caption + ": " + units.caption,
          seriaType,
          dataColumn,
          loadId,
          dataSource
        });
      }
      setValidationMessages(msgs);
    }, []);
  // dataColumn, loadId, dataSource, msgOnNotSelected, fnValue, onLoad
  // getCountry, getUnits, getChartType
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      jsonProp: oneJsonProp,
      caption: oneCaption,
      optionNames: "Items",
      onSelect: setCountry
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
      ref: _refProductFlow,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: parentChildURI,
      oneCaption: parentCaption,
      oneJsonProp: parentJsonProp,
      twoCaption: childCaption,
      msgOnNotSelected: msgOnNotSelected
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Units",
      options: UNIT_OPTIONS,
      onSelect: setUnits
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowOptions,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Chart Type",
        placeholder: "Default: AreaSpline",
        options: CHART_OPTIONS,
        onSelect: setChartType
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = JodiWorldOilDialog;
exports.default = _default;
//# sourceMappingURL=JodiWorldOilDialog.js.map