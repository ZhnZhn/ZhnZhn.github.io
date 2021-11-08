"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _has = _interopRequireDefault(require("../has"));

var _ChartTypes = _interopRequireDefault(require("../dialogs/ChartTypes"));

var _SpinnerLoading = _interopRequireDefault(require("../zhn/SpinnerLoading"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _crSelectItem = _interopRequireDefault(require("./crSelectItem"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useRefSet = _interopRequireDefault(require("../hooks/useRefSet"));

var _useRefByIndex = _interopRequireDefault(require("./useRefByIndex"));

var _useToolbar = _interopRequireDefault(require("./useToolbar"));

var _useMenuMore = _interopRequireDefault(require("./useMenuMore"));

var _useModalOptions = _interopRequireDefault(require("./useModalOptions"));

var _useModalToggle = _interopRequireDefault(require("./useModalToggle"));

var _useLoadDims = _interopRequireDefault(require("./useLoadDims"));

var _useCommandButtons = _interopRequireDefault(require("./useCommandButtons"));

var _updateStateIf = _interopRequireDefault(require("./updateStateIf"));

var _crSpinnerStyle = _interopRequireDefault(require("./crSpinnerStyle"));

var _EsConfig = require("./dimensions/EsConfig");

var _jsxRuntime = require("react/jsx-runtime");

const MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.",
      MSG_DIMS_LOADING = "Dims is loading";

const {
  isCategory
} = _ChartTypes.default,
      IS_SHOW_LABELS = _has.default.wideWidth(),
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

const DialogStatN = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    isShow,
    caption,
    onShow,
    onFront,
    loadFn,
    onLoad,
    //dims,
    //chartsType,
    //mapFrequency:initialMf,
    //mapDateDf,
    msgOnNotSelected,
    onClickInfo,
    onClose
  } = props;

  const _isDim = !props.dims && !props.notDim,
        [_refItems, _fSelectItem] = (0, _useRefByIndex.default)(),
        [_refColorComp, _onRegColor] = (0, _useRefSet.default)(),
        [_refDate, _hSelectDate] = (0, _useRefSet.default)(),
        [_refDim, _hSelectDim] = (0, _useRefSet.default)(),
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
        _hClose = (0, _react.useCallback)(() => {
    onClose();
    setValidationMessages([]);
  }, []) //onClose
  ,
        _crValidationMessages = (0, _react.useCallback)(() => {
    const msg = [];

    if (isLoadFailed) {
      msg.push(MSG_DIMS_NOT_LOADED);
      return msg;
    }

    if (isLoading) {
      msg.push(MSG_DIMS_LOADING);
      return msg;
    }

    const _isCategory = isCategory(chartType),
          {
      dim
    } = chartType || {},
          _addErrMsgTo = _fAddErrMsgTo(msg, msgOnNotSelected, configs, _refItems.current); //For dims case and not category case


    if (!_isDim || !_isCategory) {
      const _filterCaption = props.notDim ? _EsConfig.GEO_ENTITY : dim;

      _addErrMsgTo(caption => !(_isCategory && caption === _filterCaption));

      return msg;
    } //For category case


    if (_isCategory) {
      const _dimItem = _refDim.current;

      if (!_dimItem) {
        msg.push("Dim isn't selected");
        return msg;
      }

      _addErrMsgTo(caption => caption !== _dimItem.caption);
    }

    return msg;
  }, [isLoadFailed, isLoading, configs, chartType, msgOnNotSelected]) //_refDim, _isDim
  ,
        _hSelectChartType = (0, _react.useCallback)(chartType => {
    const _isShowDate = isCategory(chartType) ? (_refDate.current = null, true) : false;

    (0, _updateStateIf.default)(setIsRow, 'isShowDate', _isShowDate);
    (0, _updateStateIf.default)(setState, 'chartType', chartType);
  }, []) //setIsRow, setState

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _react.useCallback)(() => {
    _addDfValuesFrom(configs, _fSelectItem);

    const validationMessages = _crValidationMessages();

    if (validationMessages.length === 0) {
      const {
        seriaColor,
        seriaWidth
      } = _refColorComp.current ? _refColorComp.current.getConf() : {},
            dfC = _crDfC(props, _refDim.current),
            dfTitle = _crDfTitle(props, _refDim.current),
            loadOpt = loadFn({ ...props
      }, {
        timeId,
        dfC,
        dfTitle,
        time: (_refDate.current || dateDf).value,
        dialogOptions: _refDialogOptions.current,
        chartType,
        seriaColor,
        seriaWidth,
        items: _refItems.current,
        titles: _refTitles.current,
        selectOptions: selectOptions
      });

      onLoad(loadOpt);
    }

    setValidationMessages(validationMessages);
  }, [_crValidationMessages, dateDf, timeId, chartType, configs, selectOptions]) //loadFn, onLoad, props

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _commandButtons = (0, _useCommandButtons.default)(_hLoad),
        _menuMore = (0, _useMenuMore.default)(toggleToolBar, onClickInfo),
        _spinnerStyle = (0, _crSpinnerStyle.default)(isLoading, isLoadFailed);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    caption: caption,
    menuModel: _menuMore,
    commandButtons: _commandButtons,
    onShowChart: onShow,
    onFront: onFront,
    onClose: _hClose,
    children: [_toolbarEl, _modalOptionsEl, _modalToggleEl, _spinnerStyle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpinnerLoading.default, {
      style: _spinnerStyle
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: configs,
      crItem: _crSelectItem.default,
      isShowLabels: isShowLabels,
      isRow: isRow,
      fSelect: _fSelectItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
      chartType: chartType,
      isShowLabels: isShowLabels,
      isShowChart: isShowChart,
      chartOptions: chartOptions,
      onSelectChart: _hSelectChartType,
      onRegColor: _onRegColor,
      isShowDate: isShowDate,
      dateDefault: dateDf.caption,
      dateOptions: dateOptions,
      onSelecDate: _hSelectDate,
      isDim: _isDim,
      dimOptions: dimOptions,
      onSelecDim: _hSelectDim
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
}, _arePropsEqual);
var _default = DialogStatN;
exports.default = _default;
//# sourceMappingURL=DialogStatN.js.map