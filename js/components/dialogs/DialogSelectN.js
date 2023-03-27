"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useToggleClose = _interopRequireDefault(require("../hooks/useToggleClose"));
var _useToggleState = _interopRequireDefault(require("../hooks/useToggleState"));
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));
var _useDialog = _interopRequireDefault(require("./hooks/useDialog"));
var _useDialogOptions = _interopRequireDefault(require("./hooks/useDialogOptions"));
var _useTitles = _interopRequireDefault(require("./hooks/useTitles"));
var _ChartOptionsFn = require("./ChartOptionsFn");
var _DialogCell = _interopRequireDefault(require("./DialogCell"));
var _SelectList = _interopRequireDefault(require("./SelectList"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const {
    crDateConfig
  } = _DialogCell.default,
  DF_INIT_FROM_DATE = '2010-01-01',
  DF_MAP_FREQUENCY = 'EMPTY',
  DF_SELECT_PROPS = [],
  TABLE_ID = 'table';
const _crIsId = id => "is" + id + "Select";
const _crIsToggleInit = selectProps => selectProps.reduce((toggleConfig, item) => {
  toggleConfig[_crIsId(item.id)] = true;
  return toggleConfig;
}, {});
const _isRequireUpdateChartConfig = (prevState, mapFrequency, mapDateDf) => prevState._mapFrequency !== mapFrequency || prevState._mapDateDf !== mapDateDf;
const _getValidValue = (ref, dfValue) => (0, _uiApi.isInputValid)(ref) ? (0, _uiApi.getInputValue)(ref) : dfValue;
const _useDate = dateDefault => {
  const [setDate, getDate] = (0, _useProperty.default)()

    /*eslint-disable react-hooks/exhaustive-deps */,
    _getDate = (0, _uiApi.useCallback)(() => (getDate() || {}).value || dateDefault, [dateDefault]);
  // getDate
  /*eslint-enable react-hooks/exhaustive-deps */

  return [setDate, _getDate];
};
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
      initFromDate = DF_INIT_FROM_DATE,
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
      mapFrequency = DF_MAP_FREQUENCY,
      mapDateDf,
      dfRt
    } = dfProps || {},
    [isShowFd, toggleIsShowFd] = (0, _useToggle.default)(false),
    [isShowChart, toggleIsShowChart] = (0, _useToggle.default)(true),
    [chartConfig, setChartConfig] = (0, _uiApi.useState)({
      _mapFrequency: mapFrequency,
      _mapDateDf: mapDateDf,
      chartType: void 0
    }),
    {
      _mapFrequency,
      _mapDateDf,
      chartType
    } = chartConfig,
    _hSelectChartType = (0, _uiApi.useCallback)(chartType => {
      setChartConfig(prevState => ({
        ...prevState,
        chartType
      }));
      if ((0, _ChartOptionsFn.isCategoryItem)(chartType)) {
        toggleIsShowFd(false);
      }
    }, [toggleIsShowFd]),
    [isToggle, toggleInputs, _hideToggle] = (0, _useToggleClose.default)(),
    [refDialogOptions, isShowOptions, toggleOptions, hideOptions, toggleDialogOption] = (0, _useDialogOptions.default)(),
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)({
      onAbout,
      onClose,
      toggleInputs: isFd || selectProps.length > 1 ? toggleInputs : void 0,
      toggleOptions: isOpt || isCh ? toggleOptions : void 0
    }),
    [_isShowConfig, _toggleStateBy] = (0, _useToggleState.default)(() => _crIsToggleInit(selectProps)),
    _isShowById = (0, _uiApi.useCallback)(id => _isShowConfig[_crIsId(id)], [_isShowConfig]),
    {
      _chartOptions,
      dateDefault,
      dateOptions
    } = (0, _uiApi.useMemo)(() => ({
      _chartOptions: (0, _ChartOptionsFn.crChartOptions)(selectProps, chartsType, _mapFrequency),
      ...crDateConfig(_mapFrequency, _mapDateDf, loadId)
    }), [selectProps, chartsType, _mapFrequency, _mapDateDf, loadId]),
    _refItems = (0, _uiApi.useRef)([]),
    [refTitles, addTitleIndex, removeTitleIndex] = (0, _useTitles.default)(),
    [_setRoundTo, _getRoundTo] = (0, _useProperty.default)(dfRt),
    _refFromDate = (0, _uiApi.useRef)(),
    [setDate, _getDate] = _useDate(dateDefault),
    _refSeriaColor = (0, _uiApi.useRef)(),
    _hSelect = (0, _uiApi.useCallback)((id, index, item) => {
      (0, _uiApi.getRefValue)(_refItems)[index] = item;
      if (item) {
        item.id = id;
        if (id === TABLE_ID) {
          const _mapFrequency = item.mapFrequency || mapFrequency,
            _mapDateDf = item.mapDateDf || mapDateDf;
          setChartConfig(prevState => _isRequireUpdateChartConfig(prevState, _mapFrequency, _mapDateDf) ? (setDate(), {
            _mapFrequency,
            _mapDateDf,
            chartType: void 0
          }) : prevState);
        }
      }
    }, [mapFrequency, mapDateDf, setDate]),
    _hLoad = (0, _useEventCallback.default)(() => {
      const msgs = [],
        _items = (0, _uiApi.getRefValue)(_refItems);
      let i = (0, _ChartOptionsFn.isCategoryItem)(chartType) ? 1 : 0;
      for (; i < selectProps.length; i++) {
        if (!_items[i]) {
          msgs.push(msgOnNotSelected(selectProps[i].caption));
        }
      }
      if (msgs.length === 0) {
        onLoad(loadFn(props, {
          // seriaColor, seriaWidth
          ...(0, _uiApi.getInputValue)(_refSeriaColor),
          chartType,
          isCategory: (0, _ChartOptionsFn.isCategoryItem)(chartType),
          items: [...(0, _uiApi.getRefValue)(_refItems)],
          titles: (0, _uiApi.getRefValue)(refTitles),
          dialogOptions: (0, _uiApi.getRefValue)(refDialogOptions),
          fromDate: _getValidValue(_refFromDate, ''),
          date: _getDate(),
          _rt: _getRoundTo()
        }));
      }
      setValidationMessages(msgs);
    }),
    _isCategory = (0, _ChartOptionsFn.isCategoryItem)(chartType),
    _isRowFd = isFd && !_isCategory,
    _isShowDate = isShowChart && _isCategory;
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalOptions, {
      isShow: isShowOptions,
      dfRt: dfRt,
      onRoundTo: _setRoundTo,
      toggleOption: toggleDialogOption,
      onClose: hideOptions
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalToggle, {
      isShow: isToggle,
      selectProps: selectProps,
      isFd: _isRowFd,
      isShowFd: isShowFd,
      isCh: isCh,
      isShowChart: isShowChart,
      crIsId: _crIsId,
      onToggle: _toggleStateBy,
      onCheckCaption: addTitleIndex,
      onUnCheckCaption: removeTitleIndex,
      onToggleFd: toggleIsShowFd,
      onToggleChart: toggleIsShowChart,
      onClose: _hideToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectList.default, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      selectProps: selectProps,
      isShowById: _isShowById,
      hSelect: _hSelect
    }), _isRowFd && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowFd,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowDate, {
        innerRef: _refFromDate,
        isShowLabels: isShowLabels,
        title: "From Date:",
        initialValue: initFromDate,
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
      onSelectDate: setDate
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
var _default = DialogSelectN;
exports.default = _default;
//# sourceMappingURL=DialogSelectN.js.map