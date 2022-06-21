"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _has = _interopRequireDefault(require("../has"));

var _ChartOptionsFn = require("../dialogs/ChartOptionsFn");

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _Spinner = _interopRequireDefault(require("./Spinner"));

var _crSelectItem = _interopRequireDefault(require("./crSelectItem"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useRefByIndex = _interopRequireDefault(require("./useRefByIndex"));

var _useToolbar = _interopRequireDefault(require("./useToolbar"));

var _useMenuMore = _interopRequireDefault(require("./useMenuMore"));

var _useModalOptions = _interopRequireDefault(require("./useModalOptions"));

var _useModalToggle = _interopRequireDefault(require("./useModalToggle"));

var _useLoadDims = _interopRequireDefault(require("./useLoadDims"));

var _useCommandButtons = _interopRequireDefault(require("./useCommandButtons"));

var _updateStateIf = _interopRequireDefault(require("./updateStateIf"));

var _crSpinnerStatus = _interopRequireDefault(require("./crSpinnerStatus"));

var _EsConfig = require("./dimensions/EsConfig");

var _jsxRuntime = require("react/jsx-runtime");

const MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.",
      MSG_DIMS_LOADING = "Dims is loading",
      S_DIV_LOADING = {
  height: 50,
  width: '100%'
};

const IS_SHOW_LABELS = _has.default.wideWidth(),
      _arePropsEqual = (prevProps, props) => prevProps.isShow === props.isShow;

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

const DialogStatN = (0, _uiApi.memo)(props => {
  const {
    isShow,
    caption,
    //dims,
    //chartsType,
    //mapFrequency:initialMf,
    //mapDateDf,
    msgOnNotSelected,
    toTopLayer,
    onClickInfo,
    loadFn,
    onLoad,
    onShow,
    onClose
  } = props;

  const _isDim = !props.dims && !props.notDim,
        [_refItems, _fSelectItem] = (0, _useRefByIndex.default)(),
        _refSeriaColor = (0, _uiApi.useRef)(),
        [setDate, getDate] = (0, _useProperty.default)(),
        [setDim, getDim] = (0, _useProperty.default)(),
        [state, isLoading, isLoadFailed, validationMessages, setValidationMessages, setState] = (0, _useLoadDims.default)(props),
        {
    configs,
    selectOptions,
    chartType,
    chartOptions,
    dimOptions,
    dateOptions,
    dateDf = {},
    timeId
  } = state,
        [isShowLabels, _toggleLabels] = (0, _useToggle.default)(IS_SHOW_LABELS),
        [_modalOptionsEl, _refDialogOptions, _toggleOptions] = (0, _useModalOptions.default)(),
        [_modalToggleEl, _refTitles, isRow, setIsRow, _toggleInputs] = (0, _useModalToggle.default)(configs),
        {
    isShowDate,
    isShowChart
  } = isRow,
        [_toolbarEl, toggleToolBar] = (0, _useToolbar.default)(_toggleLabels, _toggleInputs, _toggleOptions, onClickInfo)
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hClose = (0, _uiApi.useCallback)(() => {
    onClose();
    setValidationMessages([]);
  }, []) //onClose
  ,
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
          _addErrMsgTo = _fAddErrMsgTo(msg, msgOnNotSelected, configs, (0, _uiApi.getRefValue)(_refItems)); //For dims case and not category case


    if (!_isDim || !_isCategory) {
      const _filterCaption = props.notDim ? _EsConfig.GEO_ENTITY : dim;

      _addErrMsgTo(caption => !(_isCategory && caption === _filterCaption));

      return msg;
    } //For category case


    if (_isCategory) {
      const _dimItem = getDim();

      if (!_dimItem) {
        msg.push("Dim isn't selected");
        return msg;
      }

      _addErrMsgTo(caption => caption !== _dimItem.caption);
    }

    return msg;
  }, [isLoadFailed, isLoading, configs, chartType, msgOnNotSelected]) //getDim, _isDim
  ,
        _hSelectChartType = (0, _uiApi.useCallback)(chartType => {
    const _isShowDate = (0, _ChartOptionsFn.isCategoryItem)(chartType) ? (setDate(), true) : false;

    (0, _updateStateIf.default)(setIsRow, 'isShowDate', _isShowDate);
    (0, _updateStateIf.default)(setState, 'chartType', chartType);
  }, []) //setDate, setIsRow, setState

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _uiApi.useCallback)(() => {
    _addDfValuesFrom(configs, _fSelectItem);

    const validationMessages = _crValidationMessages();

    if (validationMessages.length === 0) {
      const _dimItem = getDim();

      onLoad(loadFn({ ...props
      }, { //seriaColor, seriaWidth
        ...(0, _uiApi.getInputValue)(_refSeriaColor),
        chartType,
        timeId,
        selectOptions,
        dfC: _crDfC(props, _dimItem),
        dfTitle: _crDfTitle(props, _dimItem),
        time: (getDate() || dateDf).value,
        dialogOptions: (0, _uiApi.getRefValue)(_refDialogOptions),
        items: (0, _uiApi.getRefValue)(_refItems),
        titles: (0, _uiApi.getRefValue)(_refTitles)
      }));
    }

    setValidationMessages(validationMessages);
  }, [_crValidationMessages, dateDf, timeId, chartType, configs, selectOptions]) //loadFn, onLoad, props

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _commandButtons = (0, _useCommandButtons.default)(_hLoad),
        _menuMore = (0, _useMenuMore.default)(toggleToolBar, onClickInfo),
        _spinnerStatus = (0, _crSpinnerStatus.default)(isLoading, isLoadFailed);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    caption: caption,
    menuModel: _menuMore,
    commandButtons: _commandButtons,
    toTopLayer: toTopLayer,
    onShow: onShow,
    onClose: _hClose,
    children: [_toolbarEl, _modalOptionsEl, _modalToggleEl, /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.default, {
      status: _spinnerStatus
    }), _spinnerStatus ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_DIV_LOADING
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: configs,
      crItem: _crSelectItem.default,
      isShowLabels: isShowLabels,
      isRow: isRow,
      fSelect: _fSelectItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
      refSeriaColor: _refSeriaColor,
      chartType: chartType,
      isShowLabels: isShowLabels,
      isShowChart: isShowChart,
      chartOptions: chartOptions,
      onSelectChart: _hSelectChartType,
      isShowDate: isShowDate,
      dateDefault: dateDf.caption,
      dateOptions: dateOptions,
      onSelecDate: setDate,
      isDim: _isDim,
      dimOptions: dimOptions,
      onSelecDim: setDim
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
}, _arePropsEqual);
var _default = DialogStatN;
exports.default = _default;
//# sourceMappingURL=DialogStatN.js.map