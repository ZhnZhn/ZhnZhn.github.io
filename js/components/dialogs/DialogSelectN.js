"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useBool = require("../hooks/useBool");
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));
var _useIsShowInput = _interopRequireDefault(require("./hooks/useIsShowInput"));
var _useSelectChartType = _interopRequireDefault(require("./hooks/useSelectChartType"));
var _useChartConfig = _interopRequireDefault(require("./hooks/useChartConfig"));
var _useDialog = _interopRequireDefault(require("./hooks/useDialog"));
var _useDialogOptions = _interopRequireDefault(require("./hooks/useDialogOptions"));
var _useTitles = _interopRequireDefault(require("./hooks/useTitles"));
var _useSelectItem = _interopRequireDefault(require("./hooks/useSelectItem"));
var _ChartOptionsFn = require("./ChartOptionsFn");
var _FocusFirstCombobox = _interopRequireDefault(require("../zhn-moleculs/FocusFirstCombobox"));
var _DialogCell = _interopRequireDefault(require("./DialogCell"));
var _SelectList = _interopRequireDefault(require("./SelectList"));
var _dialogFn = require("./dialogFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const DF_INIT_FROM_DATE = '2010-01-01',
  DF_SELECT_PROPS = [];
const DialogSelectN = (0, _memoIsShow.default)(props => {
  const {
      isCh = true,
      isShow,
      isOpt,
      isFd,
      selectProps = DF_SELECT_PROPS,
      dfProps,
      chartsType,
      msgOnNotSelected,
      caption,
      noDate,
      initFromDate,
      errNotYmdOrEmpty,
      isYmdOrEmpty,
      loadId,
      toTopLayer,
      onAbout,
      loadFn,
      onLoad,
      onShow,
      onClose
    } = props,
    {
      dfRt
    } = dfProps || {},
    [isShowChart, toggleIsShowChart] = (0, _useToggle.default)(true),
    [toggleInputById, isShowInputById] = (0, _useIsShowInput.default)(selectProps),
    [isShowFd, toggleIsShowFd, chartType, _hSelectChartType] = (0, _useSelectChartType.default)(),
    [_setPropertyRoundTo, _getPropertyRoundTo] = (0, _useProperty.default)(dfRt),
    _refFromDate = (0, _uiApi.useRef)(),
    _refSeriaColor = (0, _uiApi.useRef)(),
    [setPropertyDate, getPropertyDate] = (0, _useProperty.default)()

    /*eslint-disable react-hooks/exhaustive-deps */,
    _onUpdateChartConfig = (0, _uiApi.useCallback)(() => {
      setPropertyDate();
      _hSelectChartType();
    }, [])
    // setPropertyDate, _hSelectChartType
    /*eslint-enable react-hooks/exhaustive-deps */,
    [_chartOptions, dateOptions, dateDefault, setChartConfigFromItem] = (0, _useChartConfig.default)(selectProps, chartsType, loadId, dfProps, _onUpdateChartConfig),
    [isToggle, toggleInputs, _hideToggle] = (0, _useBool.useToggleFalse)(),
    [refDialogOptions, isShowOptions, toggleOptions, hideOptions, toggleDialogOption] = (0, _useDialogOptions.default)(),
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)({
      onAbout,
      onClose,
      toggleInputs: isFd || selectProps.length > 1 ? toggleInputs : void 0,
      toggleOptions: isOpt || isCh ? toggleOptions : void 0
    }),
    [refTitles, addTitleIndex, removeTitleIndex] = (0, _useTitles.default)(),
    [_refItems, _hSelect] = (0, _useSelectItem.default)(setChartConfigFromItem),
    _hLoad = (0, _useEventCallback.default)(() => {
      const msgs = (0, _dialogFn.crMsgs)(chartType, (0, _uiApi.getRefValue)(_refItems), selectProps, msgOnNotSelected);
      if (msgs.length === 0) {
        onLoad(loadFn(props, {
          // seriaColor, seriaWidth
          ...(0, _uiApi.getInputValue)(_refSeriaColor),
          chartType,
          isCategory: (0, _ChartOptionsFn.isCategoryItem)(chartType),
          items: [...(0, _uiApi.getRefValue)(_refItems)],
          titles: (0, _uiApi.getRefValue)(refTitles),
          dialogOptions: (0, _uiApi.getRefValue)(refDialogOptions),
          fromDate: (0, _uiApi.getInputValidValue)(_refFromDate, ''),
          date: (0, _dialogFn.getItemValue)(getPropertyDate()) || dateDefault,
          _rt: _getPropertyRoundTo()
        }));
      }
      setValidationMessages(msgs);
    }),
    _isCategory = (0, _ChartOptionsFn.isCategoryItem)(chartType),
    _isRowFd = isFd && !_isCategory,
    _isShowDate = isShowChart && _isCategory;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isFocusBtMenu: false,
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalOptions, {
      isShow: isShowOptions,
      dfRt: dfRt,
      onRoundTo: _setPropertyRoundTo,
      toggleOption: toggleDialogOption,
      onClose: hideOptions
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalToggle, {
      isShow: isToggle,
      selectProps: selectProps,
      isFd: _isRowFd,
      isShowFd: isShowFd,
      isCh: isCh,
      isShowChart: isShowChart,
      crIsId: _dialogFn.crIsId,
      onToggle: toggleInputById,
      onCheckCaption: addTitleIndex,
      onUnCheckCaption: removeTitleIndex,
      onToggleFd: toggleIsShowFd,
      onToggleChart: toggleIsShowChart,
      onClose: _hideToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FocusFirstCombobox.default, {
      is: isShow,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectList.default, {
        isShow: isShow,
        isShowLabels: isShowLabels,
        selectProps: selectProps,
        isShowById: isShowInputById,
        hSelect: _hSelect
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: _isRowFd && isShowFd,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowDate, {
        innerRef: _refFromDate,
        isShowLabels: isShowLabels,
        title: "From Date:",
        initialValue: initFromDate || DF_INIT_FROM_DATE,
        errorMsg: errNotYmdOrEmpty,
        onTest: isYmdOrEmpty
      })
    }), isCh && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
      refSeriaColor: _refSeriaColor,
      chartType: chartType,
      isShowLabels: isShowLabels,
      isShowChart: isShowChart,
      chartOptions: _chartOptions,
      onSelectChart: _hSelectChartType,
      noDate: noDate,
      isShowDate: _isShowDate,
      dateDefault: dateDefault,
      dateOptions: dateOptions,
      onSelectDate: setPropertyDate
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
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
  onFront: PropTypes.func,
  onClose: PropTypes.func,
  onClickInfo: PropTypes.func,
}
*/
var _default = exports.default = DialogSelectN;
//# sourceMappingURL=DialogSelectN.js.map