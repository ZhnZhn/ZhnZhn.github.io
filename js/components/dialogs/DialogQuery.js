"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));

var _useDialog = _interopRequireDefault(require("./hooks/useDialog"));

var _ChartOptionsFn = require("./ChartOptionsFn");

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const ERR_MSG = 'Empty or Id format is not valid',
      S_ID_CAPTION = {
  width: 85
},
      S_ID_ROOT = {
  width: 270
};

const _isStrNotBlank = str => typeof str === 'string' && str.trim();

const _testId = value => _isStrNotBlank(value) && _isStrNotBlank(value.split('/')[2]);

const CHART_OPTIONS = (0, _ChartOptionsFn.crDialogChartOptions)({
  chartsType: 't2'
});
const DialogQuery = (0, _memoIsShow.default)(props => {
  const {
    isShow,
    noDate,
    caption,
    oneCaption,
    onePlaceholder,
    initFromDate,
    initToDate,
    msgOnNotValidFormat,
    onTestDate,
    loadFn,
    onLoad,
    onShow,
    onFront,
    onClose,
    onClickInfo
  } = props,
        [chartType, setChartType] = (0, _uiApi.useState)('SPLINE'),
        [isShowOptions, toggleOptions] = (0, _useToggle.default)(false),
        [isShowDate, toggleDate] = (0, _useToggle.default)(true),
        [isToolbar, isShowLabels, menuMoreModel, toolbarButtons] = (0, _useDialog.default)({
    onClickInfo,
    onClose,
    toggleOptions,
    toggleDate: noDate ? void 0 : toggleDate
  }),
        _refIdInput = (0, _uiApi.useRef)(),
        _refDates = (0, _uiApi.useRef)(),
        _refColorComp = (0, _uiApi.useRef)(),
        _onRegColor = (0, _uiApi.useCallback)(comp => {
    _refColorComp.current = comp;
  }, []),
        _refDialogOptions = (0, _uiApi.useRef)({
    isNotZoomToMinMax: false,
    isFilterZero: false
  }),
        toggleDialogOption = (0, _uiApi.useCallback)((propName, is) => {
    _refDialogOptions.current[propName] = is;
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hideOptions = (0, _uiApi.useCallback)(() => {
    toggleOptions(false);
  }, []) // toggleOption

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _useEventCallback.default)(() => {
    const _idInputInst = (0, _uiApi.getRefValue)(_refIdInput);

    if (_idInputInst && _idInputInst.isValid()) {
      const _value = _idInputInst.getValue(),
            _colorCompInst = (0, _uiApi.getRefValue)(_refColorComp),
            {
        seriaColor,
        seriaWidth
      } = _colorCompInst ? _colorCompInst.getConf() : {};

      onLoad(loadFn(props, {
        items: [{
          c: _value,
          v: _value
        }],
        dialogOptions: (0, _uiApi.getRefValue)(_refDialogOptions),
        chartType,
        seriaColor,
        seriaWidth
      }));
    } else {
      _idInputInst.showErrMsg();
    }
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    menuModel: menuMoreModel,
    caption: caption,
    onLoad: _hLoad,
    onShowChart: onShow,
    onFront: onFront,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalOptions, {
      isShow: isShowOptions,
      toggleOption: toggleDialogOption,
      onClose: _hideOptions
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowPattern, {
      ref: _refIdInput,
      isShow: isShow,
      isShowLabels: isShowLabels,
      captionStyle: S_ID_CAPTION,
      rootStyle: S_ID_ROOT,
      placeholder: onePlaceholder,
      caption: oneCaption,
      onTest: _testId,
      errorMsg: ERR_MSG
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
      chartType: chartType,
      isShowLabels: isShowLabels,
      isShowChart: true,
      labelStyle: S_ID_CAPTION,
      selectWidth: S_ID_ROOT.width,
      chartOptions: CHART_OPTIONS,
      onSelectChart: setChartType,
      onRegColor: _onRegColor,
      noDate: noDate
    }), !noDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.DatesFragment, {
        ref: _refDates,
        isShowLabels: isShowLabels,
        initFromDate: initFromDate,
        initToDate: initToDate,
        msgOnNotValidFormat: msgOnNotValidFormat,
        onTestDate: onTestDate
      })
    })]
  });
});
var _default = DialogQuery;
exports.default = _default;
//# sourceMappingURL=DialogQuery.js.map