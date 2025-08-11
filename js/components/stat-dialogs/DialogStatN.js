"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _ChartOptionsFn = require("../dialogs/ChartOptionsFn");
var _DraggableDialog = _interopRequireDefault(require("../zhn-moleculs/DraggableDialog"));
var _FocusFirstCombobox = _interopRequireDefault(require("../zhn-moleculs/FocusFirstCombobox"));
var _Spinner = require("../zhn/Spinner");
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));
var _Toolbar = _interopRequireDefault(require("../dialogs/Toolbar"));
var _ModalPopups = require("../dialogs/modals/ModalPopups");
var _RowChartDate = _interopRequireDefault(require("../dialogs/rows/RowChartDate"));
var _crSelectItem = _interopRequireDefault(require("./crSelectItem"));
var _crIsId = require("./crIsId");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useProperty = require("../hooks/useProperty");
var _useValidationMessages = _interopRequireDefault(require("../dialogs/hooks/useValidationMessages"));
var _useMenuMore = _interopRequireDefault(require("../dialogs/hooks/useMenuMore"));
var _useToolbar = require("../dialogs/hooks/useToolbar");
var _useDialogOptions = _interopRequireDefault(require("../dialogs/hooks/useDialogOptions"));
var _useRefByIndex = _interopRequireDefault(require("./useRefByIndex"));
var _useModalToggle = _interopRequireDefault(require("./useModalToggle"));
var _useLoadDims = _interopRequireDefault(require("./useLoadDims"));
var _EsConfig = require("./dimensions/EsConfig");
var _jsxRuntime = require("react/jsx-runtime");
const MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.",
  MSG_DIMS_LOADING = "Dims is loading",
  S_SPINNER = {
    ...(0, _styleFn.crAbsoluteTopLeftStyle)(80, '45%'),
    width: 32,
    height: 32,
    zIndex: 8
  },
  _crDivLoadingStyle = isShowLabels => ({
    width: isShowLabels ? 350 : 267,
    height: 72
  });
const _crDfC = (props, dim) => props.dfC || (dim || {}).value;
const _crDfTitle = (props, dim) => {
  if (props.dfC || !dim) {
    return "";
  }
  return dim.caption || "";
};
const _fAddErrMsgTo = (msg, msgOnNotSelected, configs, items) => is => {
  configs.forEach((config, index) => {
    const {
      caption
    } = config;
    if (is(caption) && !items[index]) {
      msg.push(msgOnNotSelected(caption));
    }
  });
};
const _addDfValuesFrom = (configs, fSelectItem) => {
  configs.forEach((config, index) => {
    const {
      dfItem
    } = config;
    if (dfItem) {
      fSelectItem(index)(dfItem);
    }
  });
};
const DialogStatN = (0, _memoIsShow.default)(props => {
  const {
      isShow,
      caption,
      //dims,
      //chartsType,
      //mapFrequency:initialMf,
      //mapDateDf,

      dfProps,
      msgOnNotSelected,
      toTopLayer,
      onAbout,
      loadFn,
      onLoad,
      onShow,
      onClose
    } = props,
    {
      dfRt
    } = dfProps || {};
  const _isDim = !props.dims && !props.notDim,
    [chartType, setChartType] = (0, _uiApi.useState)(),
    [_refItems, _fSelectItem] = (0, _useRefByIndex.default)(),
    _refSeriaColor = (0, _uiApi.useRef)(),
    [setDate, getDate] = (0, _useProperty.useProperty)(),
    [setDim, getDim] = (0, _useProperty.useProperty)(),
    [_setRoundTo, _getRoundTo] = (0, _useProperty.useProperty)(dfRt),
    [validationMessages, setValidationMessages, _hClose] = (0, _useValidationMessages.default)(onClose),
    [state, isLoading, isLoadFailed] = (0, _useLoadDims.default)(props, setValidationMessages),
    {
      configs,
      selectOptions,
      chartOptions,
      dimOptions,
      dateOptions,
      dateDf = {},
      timeId
    } = state,
    [_modalToggleEl, _refTitles, isShowLabels, isRow, toggleInputs] = (0, _useModalToggle.default)(configs),
    isShowChart = isRow[_crIsId.PN_IS_SHOW_CHART],
    [isToolbar, menuMoreModel] = (0, _useMenuMore.default)(onAbout),
    [refDialogOptions, isShowOptions, toggleOptions, hideOptions, toggleDialogOption] = (0, _useDialogOptions.default)(),
    toolbarButtons = (0, _useToolbar.useToolbar)({
      toggleInputs,
      toggleOptions,
      onAbout
    })
    /*eslint-disable react-hooks/exhaustive-deps */,
    _crValidationMessages = (0, _uiApi.useCallback)(() => {
      const msg = [];
      if (isLoadFailed) {
        msg.push(MSG_DIMS_NOT_LOADED);
        return msg;
      }
      if (isLoading) {
        msg.push(MSG_DIMS_LOADING);
        return msg;
      }
      const _isCategory = (0, _ChartOptionsFn.isCategoryItem)(chartType),
        {
          dim
        } = chartType || {},
        _addErrMsgTo = _fAddErrMsgTo(msg, msgOnNotSelected, configs, (0, _uiApi.getRefValue)(_refItems));

      //For dims case and not category case
      if (!_isDim || !_isCategory) {
        const _filterCaption = props.notDim ? _EsConfig.GEO_ENTITY : dim;
        _addErrMsgTo(caption => !(_isCategory && caption === _filterCaption));
        return msg;
      }
      //For category case
      if (_isCategory) {
        const _dimItem = getDim();
        if (!_dimItem) {
          msg.push("Dim isn't selected");
          return msg;
        }
        _addErrMsgTo(caption => caption !== _dimItem.caption);
      }
      return msg;
    }, [isLoadFailed, isLoading, configs, chartType, msgOnNotSelected])
    //getDim, _isDim
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      _addDfValuesFrom(configs, _fSelectItem);
      const validationMessages = _crValidationMessages();
      if (validationMessages.length === 0) {
        const _dimItem = getDim();
        onLoad(loadFn({
          ...props
        }, {
          //seriaColor, seriaWidth
          ...(0, _uiApi.getInputValue)(_refSeriaColor),
          chartType,
          timeId,
          selectOptions,
          isCategory: (0, _ChartOptionsFn.isCategoryItem)(chartType),
          dfC: _crDfC(props, _dimItem),
          dfTitle: _crDfTitle(props, _dimItem),
          time: (getDate() || dateDf).value,
          dialogOptions: (0, _uiApi.getRefValue)(refDialogOptions),
          items: (0, _uiApi.getRefValue)(_refItems),
          titles: (0, _uiApi.getRefValue)(_refTitles),
          _rt: _getRoundTo()
        }));
      }
      setValidationMessages(validationMessages);
    }, [_crValidationMessages, dateDf, timeId, chartType, configs, selectOptions])
    //loadFn, onLoad, props, clearValidationMessages, setValidationMessages
    /*eslint-enable react-hooks/exhaustive-deps */,
    _spinnerStatus = (0, _Spinner.crSpinnerStatus)(isLoading, isLoadFailed),
    _isShowDate = isShowChart && (0, _ChartOptionsFn.isCategoryItem)(chartType);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DraggableDialog.default, {
    isFocusBtMenu: !1,
    isShow: isShow,
    caption: caption,
    menuModel: menuMoreModel,
    toTopLayer: toTopLayer,
    onLoad: _hLoad,
    onShow: onShow,
    onClose: _hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Toolbar.default, {
      isShow: isToolbar,
      buttons: toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopups.ModalOptions, {
      isShow: isShowOptions,
      dfRt: dfRt,
      onRoundTo: _setRoundTo,
      toggleOption: toggleDialogOption,
      onClose: hideOptions
    }), _modalToggleEl, /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.Spinner, {
      style: S_SPINNER,
      status: _spinnerStatus
    }), _spinnerStatus ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _crDivLoadingStyle(isShowLabels)
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_FocusFirstCombobox.default, {
      is: isShow,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
        items: configs,
        crItem: _crSelectItem.default,
        isShowLabels: isShowLabels,
        isRow: isRow,
        fSelect: _fSelectItem
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowChartDate.default, {
        refSeriaColor: _refSeriaColor,
        chartType: chartType,
        isShowLabels: isShowLabels,
        isShowChart: isShowChart,
        isShowDate: _isShowDate,
        chartOptions: chartOptions,
        onSelectChart: setChartType,
        dateDefault: dateDf.caption,
        dateOptions: dateOptions,
        onSelectDate: setDate,
        isDim: _isDim,
        dimOptions: dimOptions,
        onSelectDim: setDim
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages.default, {
      validationMessages: validationMessages
    })]
  });
});
var _default = exports.default = DialogStatN;
//# sourceMappingURL=DialogStatN.js.map