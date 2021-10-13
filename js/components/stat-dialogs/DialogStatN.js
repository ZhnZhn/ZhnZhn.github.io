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

var _useRefSet = _interopRequireDefault(require("./useRefSet"));

var _useToolbar = _interopRequireDefault(require("./useToolbar"));

var _useMenuMore = _interopRequireDefault(require("./useMenuMore"));

var _useModalOptions = _interopRequireDefault(require("./useModalOptions"));

var _useModalToggle = _interopRequireDefault(require("./useModalToggle"));

var _useLoadDims = _interopRequireDefault(require("./useLoadDims"));

var _useCommandButtons = _interopRequireDefault(require("./useCommandButtons"));

var _jsxRuntime = require("react/jsx-runtime");

const MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.",
      MSG_DIMS_LOADING = "Dims is loading",
      S_SPINNER_LOADING = {
  margin: '16px auto 32px'
},
      S_SPINNER_FAILED = {
  borderColor: '#f44336',
  animation: 'none'
};

const {
  isCategory
} = _ChartTypes.default,
      IS_SHOW_LABELS = _has.default.wideWidth(),
      _arePropsEqual = (prevProps, props) => prevProps.isShow === props.isShow;

const DialogStatN = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    isShow,
    caption,
    onShow,
    onFront,
    loadFn,
    onLoad,
    //chartsType,
    //mapFrequency:initialMf,
    //mapDateDf,
    msgOnNotSelected,
    onClickInfo,
    onClose
  } = props;

  const _refItems = (0, _react.useRef)([]),
        _fSelect = (0, _react.useCallback)(index => item => {
    _refItems.current[index] = item ? { ...item
    } : void 0;
  }, []),
        [_refColorComp, _onRegColor] = (0, _useRefSet.default)(),
        [_refDate, _hSelectDate] = (0, _useRefSet.default)(),
        [state, isLoading, isLoadFailed, validationMessages, setValidationMessages, setState] = (0, _useLoadDims.default)(props),
        {
    configs,
    selectOptions,
    chartType,
    chartOptions,
    dateOptions,
    dateDefault,
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

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _crValidationMessages = (0, _react.useCallback)(() => {
    const msg = [],
          _isCategory = isCategory(chartType),
          {
      dim
    } = chartType || {};

    if (isLoadFailed) {
      msg.push(MSG_DIMS_NOT_LOADED);
      return msg;
    }

    if (isLoading) {
      msg.push(MSG_DIMS_LOADING);
      return msg;
    }

    configs.forEach((config, index) => {
      const {
        caption
      } = config;

      if (!(_isCategory && caption === dim)) {
        if (!_refItems.current[index]) {
          msg.push(msgOnNotSelected(caption));
        }
      }
    });
    return msg;
  }, [isLoadFailed, isLoading, configs, chartType, msgOnNotSelected])
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hSelectChartType = (0, _react.useCallback)(chartType => {
    let _isShowDate = false;

    if (isCategory(chartType)) {
      _refDate.current = null;
      _isShowDate = true;
    }

    setIsRow(is => {
      is.isShowDate = _isShowDate;
      return { ...is
      };
    });
    setState(prevState => ({ ...prevState,
      chartType
    }));
  }, []) //setIsRow, setState

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _handleLoad = (0, _react.useCallback)(() => {
    const validationMessages = _crValidationMessages();

    if (validationMessages.length === 0) {
      const {
        seriaColor,
        seriaWidth
      } = _refColorComp.current ? _refColorComp.current.getConf() : {},
            _props = { ...props,
        timeId
      },
            loadOpt = loadFn(_props, {
        dialogOptions: _refDialogOptions.current,
        chartType,
        seriaColor,
        seriaWidth,
        date: _refDate.current,
        dateDefault,
        items: _refItems.current,
        titles: _refTitles.current,
        selectOptions: selectOptions
      });
      onLoad(loadOpt);
    }

    setValidationMessages(validationMessages);
  }, [_crValidationMessages, dateDefault, timeId, chartType, selectOptions]) //loadFn, onLoad, props

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _commandButtons = (0, _useCommandButtons.default)(_handleLoad),
        _menuMore = (0, _useMenuMore.default)(toggleToolBar, onClickInfo);

  const _spinnerStyle = isLoading ? S_SPINNER_LOADING : isLoadFailed ? { ...S_SPINNER_LOADING,
    ...S_SPINNER_FAILED
  } : void 0;

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
      fSelect: _fSelect
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
      chartType: chartType,
      isShowLabels: isShowLabels,
      isShowChart: isShowChart,
      chartOptions: chartOptions,
      onSelectChart: _hSelectChartType,
      onRegColor: _onRegColor,
      isShowDate: isShowDate,
      dateDefault: dateDefault,
      dateOptions: dateOptions,
      onSelecDate: _hSelectDate
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
}, _arePropsEqual);
var _default = DialogStatN;
exports.default = _default;
//# sourceMappingURL=DialogStatN.js.map