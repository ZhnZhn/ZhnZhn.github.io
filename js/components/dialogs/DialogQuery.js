"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _ChartType = require("../../constants/ChartType");
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));
var _useToggleLabels = _interopRequireDefault(require("./hooks/useToggleLabels"));
var _useDialog = _interopRequireDefault(require("./hooks/useDialog"));
var _useDialogOptions = _interopRequireDefault(require("./hooks/useDialogOptions"));
var _ChartOptionsFn = require("./ChartOptionsFn");
var _DraggableDialog = _interopRequireDefault(require("../zhn-moleculs/DraggableDialog"));
var _Toolbar = _interopRequireDefault(require("./Toolbar"));
var _ModalOptions = _interopRequireDefault(require("./modals/ModalOptions"));
var _RowPattern = _interopRequireDefault(require("./rows/RowPattern"));
var _RowChartDate = _interopRequireDefault(require("./rows/RowChartDate"));
var _jsxRuntime = require("react/jsx-runtime");
//import { useToggle } from '../hooks/useToggle';

//import ShowHide from '../zhn/ShowHide';

//import InputPeriod from './rows/InputPeriod';
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
      noDate

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
      //onShow
    } = props,
    [_chartType, _setChartType] = (0, _uiApi.useState)(_ChartType.CHT_SPLINE)
    /*
    , [
      _isShowDate,
      _toggleDate
    ] = useToggle(!0)
    */,
    [_refDialogOptions, _isShowOptions, _toggleOptions, _hideOptions, _toggleDialogOption] = (0, _useDialogOptions.default)(),
    [_isShowLabels, _toggleLabels] = (0, _useToggleLabels.default)(),
    [_isToolbar, _menuMoreModel, _toolbarButtons] = (0, _useDialog.default)(props, {
      toggleOptions: _toggleOptions
    }, _toggleLabels),
    _refIdInput = (0, _uiApi.useRef)()
    //, _refDates = useRef()
    ,
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
          dialogOptions: (0, _uiApi.getRefValue)(_refDialogOptions),
          chartType: _chartType
        }));
      } else {
        _idInputInst.showErrMsg();
      }
    });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DraggableDialog.default, {
    isShow: props.isShow,
    menuModel: _menuMoreModel,
    caption: props.caption,
    toTopLayer: props.toTopLayer,
    onLoad: _hLoad,
    onShow: props.onShow,
    onClose: props.onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Toolbar.default, {
      isShow: _isToolbar,
      buttons: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalOptions.default, {
      isShow: _isShowOptions,
      toggleOption: _toggleDialogOption,
      onClose: _hideOptions
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPattern.default, {
      refEl: _refIdInput,
      isShowLabels: _isShowLabels,
      style: S_ID_ROOT,
      captionStyle: S_ID_CAPTION,
      placeholder: props.onePlaceholder,
      caption: props.oneCaption,
      onTest: _testId,
      errorMsg: ERR_MSG
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowChartDate.default, {
      refSeriaColor: _refSeriaColor,
      chartType: _chartType,
      isShowLabels: _isShowLabels,
      isShowChart: !0,
      labelStyle: S_ID_CAPTION,
      selectWidth: S_ID_ROOT.width,
      chartOptions: CHART_OPTIONS,
      onSelectChart: _setChartType,
      noDate: noDate
    })]
  });
});
var _default = exports.default = DialogQuery;
//# sourceMappingURL=DialogQuery.js.map