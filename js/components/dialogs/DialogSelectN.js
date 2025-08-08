"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = require("../hooks/useToggle");
var _useProperty = require("../hooks/useProperty");
var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));
var _useIsShowInput = _interopRequireDefault(require("./hooks/useIsShowInput"));
var _useSelectChartType = _interopRequireDefault(require("./hooks/useSelectChartType"));
var _useChartConfig = _interopRequireDefault(require("./hooks/useChartConfig"));
var _useModalToggle = _interopRequireDefault(require("./hooks/useModalToggle"));
var _useDialog = _interopRequireDefault(require("./hooks/useDialog"));
var _useDialogOptions = _interopRequireDefault(require("./hooks/useDialogOptions"));
var _useTitles = _interopRequireDefault(require("./hooks/useTitles"));
var _useSelectItem = _interopRequireDefault(require("./hooks/useSelectItem"));
var _ChartOptionsFn = require("./ChartOptionsFn");
var _DraggableDialog = _interopRequireDefault(require("../zhn-moleculs/DraggableDialog"));
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));
var _FocusFirstCombobox = _interopRequireDefault(require("../zhn-moleculs/FocusFirstCombobox"));
var _Toolbar = _interopRequireDefault(require("./Toolbar"));
var _SelectList = _interopRequireDefault(require("./SelectList"));
var _ModalOptions = _interopRequireDefault(require("./modals/ModalOptions"));
var _ModalToggle = _interopRequireDefault(require("./modals/ModalToggle"));
var _RowChartDate = _interopRequireDefault(require("./rows/RowChartDate"));
var _RowDate = _interopRequireDefault(require("./rows/RowDate"));
var _dialogFn = require("./dialogFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const DF_INIT_FROM_DATE = '2010-01-01',
  DF_SELECT_PROPS = [];
const DialogSelectN = (0, _memoIsShow.default)(props => {
  const {
      isCh = !0,
      isShow,
      //isOpt,
      isFd,
      selectProps = DF_SELECT_PROPS,
      dfProps
      //chartsType,
      //msgOnNotSelected,

      //caption,
      //noDate,
      //initFromDate,
      //errNotYmdOrEmpty,
      //isYmdOrEmpty,
      //loadId,

      //toTopLayer,

      //loadFn,
      //onLoad,
      //onShow
    } = props,
    {
      dfRt
    } = dfProps || {},
    [_isShowChart, _toggleIsShowChart] = (0, _useToggle.useToggle)(!0),
    [_toggleInputById, _isShowInputById] = (0, _useIsShowInput.default)(selectProps),
    [_isShowFd, _toggleIsShowFd, _chartType, _hSelectChartType] = (0, _useSelectChartType.default)(),
    [_setPropertyRoundTo, _getPropertyRoundTo] = (0, _useProperty.useProperty)(dfRt),
    _refFromDate = (0, _uiApi.useRef)(),
    _refSeriaColor = (0, _uiApi.useRef)(),
    [_setPropertyDate, _getPropertyDate] = (0, _useProperty.useProperty)()

    /*eslint-disable react-hooks/exhaustive-deps */,
    _onUpdateChartConfig = (0, _uiApi.useCallback)(() => {
      _setPropertyDate();
      _hSelectChartType();
    }, [])
    // setPropertyDate, _hSelectChartType
    /*eslint-enable react-hooks/exhaustive-deps */,
    [_chartOptions, _dateOptions, _dateDefault, _updateChartConfig] = (0, _useChartConfig.default)(selectProps, props.chartsType, props.loadId, dfProps, _onUpdateChartConfig),
    [_isToggle, _toggleInputs, _hideToggle, _isShowLabels, _toggleLabels] = (0, _useModalToggle.default)(),
    [_refDialogOptions, _isShowOptions, _toggleOptions, _hideOptions, _toggleDialogOption] = (0, _useDialogOptions.default)(),
    [_isToolbar, _menuMoreModel, _toolbarButtons, _validationMessages, _setValidationMessages, _hClose] = (0, _useDialog.default)(props, {
      toggleInputs: isFd || selectProps.length > 1 ? _toggleInputs : void 0,
      toggleOptions: props.isOpt || isCh ? _toggleOptions : void 0
    }, _toggleLabels),
    [_refTitles, _addTitleIndex, _removeTitleIndex] = (0, _useTitles.default)(),
    [_refItems, _hSelect, _tupleFilter] = (0, _useSelectItem.default)(_updateChartConfig),
    _hLoad = (0, _useEventCallback.default)(() => {
      const msgs = (0, _dialogFn.crMsgs)(_chartType, (0, _uiApi.getRefValue)(_refItems), selectProps, props.msgOnNotSelected);
      if (msgs.length === 0) {
        props.onLoad(props.loadFn(props, {
          // seriaColor, seriaWidth
          ...(0, _uiApi.getInputValue)(_refSeriaColor),
          chartType: _chartType,
          isCategory: (0, _ChartOptionsFn.isCategoryItem)(_chartType),
          items: [...(0, _uiApi.getRefValue)(_refItems)],
          titles: (0, _uiApi.getRefValue)(_refTitles),
          dialogOptions: (0, _uiApi.getRefValue)(_refDialogOptions),
          fromDate: (0, _uiApi.getInputValidValue)(_refFromDate, ''),
          date: (0, _dialogFn.getItemValue)(_getPropertyDate()) || _dateDefault,
          _rt: _getPropertyRoundTo()
        }));
      }
      _setValidationMessages(msgs);
    }),
    _isCategory = (0, _ChartOptionsFn.isCategoryItem)(_chartType),
    _isRowFd = isFd && !_isCategory,
    _isShowFromDate = _isRowFd && _isShowFd,
    _initialValueFromDate = isFd ? props.initFromDate || DF_INIT_FROM_DATE : void 0,
    _isShowDate = _isShowChart && _isCategory;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DraggableDialog.default, {
    isFocusBtMenu: !1,
    isShow: isShow,
    caption: props.caption,
    menuModel: _menuMoreModel,
    toTopLayer: props.toTopLayer,
    onLoad: _hLoad,
    onShow: props.onShow,
    onClose: _hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Toolbar.default, {
      isShow: _isToolbar,
      buttons: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalOptions.default, {
      isShow: _isShowOptions,
      dfRt: dfRt,
      onRoundTo: _setPropertyRoundTo,
      toggleOption: _toggleDialogOption,
      onClose: _hideOptions
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalToggle.default, {
      isShow: _isToggle,
      selectProps: selectProps,
      isShowLabels: _isShowLabels,
      isFd: _isRowFd,
      isShowFd: _isShowFd,
      isCh: isCh,
      isShowChart: _isShowChart,
      onToggleLabels: _toggleLabels,
      onToggle: _toggleInputById,
      onCheckCaption: _addTitleIndex,
      onUnCheckCaption: _removeTitleIndex,
      onToggleFd: _toggleIsShowFd,
      onToggleChart: _toggleIsShowChart,
      onClose: _hideToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FocusFirstCombobox.default, {
      is: isShow,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectList.default, {
        isShow: isShow,
        isShowLabels: _isShowLabels,
        selectProps: selectProps,
        isShowById: _isShowInputById,
        hSelect: _hSelect,
        tupleFilter: _tupleFilter
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: _isShowFromDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowDate.default, {
        refEl: _refFromDate,
        isShowLabels: _isShowLabels,
        title: "From Date",
        initialValue: _initialValueFromDate,
        errorMsg: props.errNotYmdOrEmpty,
        onTest: props.isYmdOrEmpty
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
      v: isCh,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowChartDate.default, {
        refSeriaColor: _refSeriaColor,
        chartType: _chartType,
        isShowLabels: _isShowLabels,
        isShowChart: _isShowChart,
        chartOptions: _chartOptions,
        onSelectChart: _hSelectChartType,
        noDate: props.noDate,
        isShowDate: _isShowDate,
        dateDefault: _dateDefault,
        dateOptions: _dateOptions,
        onSelectDate: _setPropertyDate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages.default, {
      validationMessages: _validationMessages
    })]
  });
});

/*
DialogSelectN.propTypes = {
  isShow: PropTypes.bool,
  isOpt: PropTypes.bool,
  isCh: PropTypes.bool,
  isFd: PropTypes.bool,
  caption: PropTypes.string,
  selectProps: PropTypes.arrayOf(
     PropTypes.shape({
        id: PropTypes.string,
        caption: PropTypes.string,
        uri: PropTypes.string,
        jsonProp: PropTypes.string
     })
  ),

  noDate: PropTypes.string,
  dfProps: PropTypes.shape({
    mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
    mapDateDf: PropTypes.number,
  }),
  msgOnNotSelected: PropTypes.func,

  loadFn: PropTypes.func,
  onLoad: PropTypes.func,

  onShow: PropTypes.func,
  toTopLayer: PropTypes.func,
  onClose: PropTypes.func,
  onAbout: PropTypes.func,
}
*/
var _default = exports.default = DialogSelectN;
//# sourceMappingURL=DialogSelectN.js.map