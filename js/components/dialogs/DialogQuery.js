"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _ChartType = require("../../constants/ChartType");
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = require("../hooks/useToggle");
var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));
var _useDialog = _interopRequireDefault(require("./hooks/useDialog"));
var _useDialogOptions = _interopRequireDefault(require("./hooks/useDialogOptions"));
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
const _testId = value => (0, _isTypeFn.isStrNotBlank)(value) && (0, _isTypeFn.isStrNotBlank)(value.split('/')[2]);
const CHART_OPTIONS = (0, _ChartOptionsFn.crChartOptions)(void 0, 't2');
const DialogQuery = (0, _memoIsShow.default)(props => {
  const {
      //isShow,
      noDate,
      //caption,
      //oneCaption,
      //onePlaceholder,
      //initFromDate,
      //initToDate,
      //msgOnNotValidFormat,
      //onTestDate,

      //toTopLayer,

      //loadFn,
      //onLoad,
      //onShow,

      onAbout,
      onClose
    } = props,
    [chartType, setChartType] = (0, _uiApi.useState)(_ChartType.CHT_SPLINE),
    [isShowDate, toggleDate] = (0, _useToggle.useToggle)(!0),
    [refDialogOptions, isShowOptions, toggleOptions, hideOptions, toggleDialogOption] = (0, _useDialogOptions.default)(),
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons] = (0, _useDialog.default)({
      onAbout,
      onClose,
      toggleOptions,
      toggleDate: noDate ? void 0 : toggleDate
    }),
    _refIdInput = (0, _uiApi.useRef)(),
    _refDates = (0, _uiApi.useRef)(),
    _refSeriaColor = (0, _uiApi.useRef)(),
    _hLoad = (0, _useEventCallback.default)(() => {
      const _idInputInst = (0, _uiApi.getRefValue)(_refIdInput);
      if (_idInputInst && _idInputInst.isValid()) {
        const _value = _idInputInst.getValue();
        props.onLoad(props.loadFn(props, {
          // seriaColor, seriaWidth
          ...(0, _uiApi.getInputValue)(_refSeriaColor),
          items: [{
            c: _value,
            v: _value
          }],
          dialogOptions: (0, _uiApi.getRefValue)(refDialogOptions),
          chartType
        }));
      } else {
        _idInputInst.showErrMsg();
      }
    });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: props.isShow,
    menuModel: menuMoreModel,
    caption: props.caption,
    toTopLayer: props.toTopLayer,
    onLoad: _hLoad,
    onShow: props.onShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalOptions, {
      isShow: isShowOptions,
      toggleOption: toggleDialogOption,
      onClose: hideOptions
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowPattern, {
      refEl: _refIdInput,
      isShowLabels: isShowLabels,
      style: S_ID_ROOT,
      captionStyle: S_ID_CAPTION,
      placeholder: props.onePlaceholder,
      caption: props.oneCaption,
      onTest: _testId,
      errorMsg: ERR_MSG
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
      refSeriaColor: _refSeriaColor,
      chartType: chartType,
      isShowLabels: isShowLabels,
      isShowChart: true,
      labelStyle: S_ID_CAPTION,
      selectWidth: S_ID_ROOT.width,
      chartOptions: CHART_OPTIONS,
      onSelectChart: setChartType,
      noDate: noDate
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
      v: !noDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
        isShow: isShowDate,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.InputPeriod, {
          refEl: _refDates,
          isShowLabels: isShowLabels,
          initFromDate: props.initFromDate,
          initToDate: props.initToDate,
          msgOnNotValidFormat: props.msgOnNotValidFormat,
          onTestDate: props.onTestDate
        })
      })
    })]
  });
});
var _default = exports.default = DialogQuery;
//# sourceMappingURL=DialogQuery.js.map