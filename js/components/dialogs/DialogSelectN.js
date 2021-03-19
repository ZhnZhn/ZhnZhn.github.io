"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _ChartTypes = _interopRequireDefault(require("./ChartTypes"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _SelectList = _interopRequireDefault(require("./SelectList"));

var _dec, _class, _class2, _temp;

var Decor = _DialogCell["default"].Decor,
    crMenuMore = _DialogCell["default"].crMenuMore,
    crDateConfig = _DialogCell["default"].crDateConfig;
var DF_INIT_FROM_DATE = '2010-01-01';
var DF_MAP_FREQUENCY = 'EMPTY';
var TABLE_ID = 'table';
var crChartOptions = _ChartTypes["default"].crChartOptions,
    isCategory = _ChartTypes["default"].isCategory;

var _isRequireChartOptionsUpdate = function _isRequireChartOptionsUpdate(prevMapFrequency, nextMapFrequency) {
  return prevMapFrequency !== nextMapFrequency && (prevMapFrequency === 'M' || nextMapFrequency === 'M');
};

var _isEqualChartOptions = function _isEqualChartOptions(nextArgs, prevArgs) {
  var _bool = nextArgs[0] === prevArgs[0] && nextArgs[1] === prevArgs[1] && !_isRequireChartOptionsUpdate(prevArgs[2], nextArgs[2]);

  return _bool;
};

var _crIsId = function _crIsId(id) {
  return "is" + id + "Select";
};

var _crIsToggleInit = function _crIsToggleInit(selectProps) {
  var _isToggleInit = {};
  selectProps.forEach(function (item) {
    _isToggleInit[_crIsId(item.id)] = true;
  });
  return _isToggleInit;
};

var _getDfFrequencyConfig = function _getDfFrequencyConfig(props) {
  var dfProps = props.dfProps,
      _ref = dfProps || {},
      _ref$mapFrequency = _ref.mapFrequency,
      mapFrequency = _ref$mapFrequency === void 0 ? DF_MAP_FREQUENCY : _ref$mapFrequency,
      mapDateDf = _ref.mapDateDf;

  return {
    mapFrequency: mapFrequency,
    mapDateDf: mapDateDf
  };
};

var _mergeFrequencyConfig = function _mergeFrequencyConfig(props, item) {
  var _getDfFrequencyConfig2 = _getDfFrequencyConfig(props),
      mapFrequency = _getDfFrequencyConfig2.mapFrequency,
      mapDateDf = _getDfFrequencyConfig2.mapDateDf;

  return [item.mapFrequency || mapFrequency, item.mapDateDf || mapDateDf];
};

var _crStateForTableItem = function _crStateForTableItem(comp, item) {
  var props = comp.props,
      state = comp.state,
      _mergeFrequencyConfig2 = _mergeFrequencyConfig(props, item),
      mapFrequency = _mergeFrequencyConfig2[0],
      mapDateDf = _mergeFrequencyConfig2[1],
      prevMf = state.mapFrequency,
      prevCht = state.chartType,
      chartType = _isRequireChartOptionsUpdate(prevMf, mapFrequency) ? void 0 : prevCht;

  return {
    mapFrequency: mapFrequency,
    mapDateDf: mapDateDf,
    chartType: chartType
  };
};

var DialogSelectN = (_dec = Decor.dialog, _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DialogSelectN, _Component);

  /*
  static propTypes = {
    isOpt: PropTypes.bool,
    isCh: PropTypes.bool,
    isShow: PropTypes.bool,
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
      onShow: PropTypes.func,
    onFront: PropTypes.func,
    loadFn: PropTypes.func,
      descrUrl: PropTypes.string,
    onClickInfo: PropTypes.func,
      onClose: PropTypes.func,
    onLoad: PropTypes.func
  }
  */
  function DialogSelectN(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._crDateConfig = function () {
      var _this$state = _this.state,
          mapFrequency = _this$state.mapFrequency,
          mapDateDf = _this$state.mapDateDf;
      return _this._crDateConfigMem(mapFrequency, mapDateDf);
    };

    _this._isShowById = function (id) {
      return _this.state[_crIsId(id)];
    };

    _this._toggleStateBy = function (propName) {
      _this.setState(function (prevState) {
        var _ref2;

        return _ref2 = {}, _ref2[propName] = !prevState[propName], _ref2;
      });
    };

    _this._checkCaptionBy = function (index) {
      _this._titles.push(index);
    };

    _this._uncheckCaption = function (index) {
      _this._titles = _this._titles.filter(function (v) {
        return v !== index;
      });
    };

    _this._hSelectChartType = function (chartType) {
      var _nextState = isCategory(chartType) ? {
        isShowDate: true,
        isShowFd: false
      } : {
        isShowDate: false
      };

      _this.setState((0, _extends2["default"])({}, _nextState, {
        chartType: chartType
      }));
    };

    _this._onRegColor = function (comp) {
      _this.colorComp = comp;
    };

    _this._hSelectDate = function (date) {
      _this.date = date;
    };

    _this._getDate = function () {
      return (_this.date || {}).value || _this._crDateConfig().dateDefault;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          msgOnNotSelected = _this$props.msgOnNotSelected,
          selectProps = _this$props.selectProps,
          chartType = _this.state.chartType,
          _max = selectProps.length,
          msg = [];
      var i = isCategory(chartType) ? 1 : 0;

      for (; i < _max; i++) {
        if (!_this._items[i]) {
          msg.push(msgOnNotSelected(selectProps[i].caption));
        }
      }

      msg.isValid = msg.length === 0;
      return msg;
    };

    _this._createLoadOption = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          colorComp = _assertThisInitialize.colorComp,
          dialogOptions = _assertThisInitialize.dialogOptions,
          chartType = _this.state.chartType,
          _ref3 = colorComp ? colorComp.getConf() : {},
          seriaColor = _ref3.seriaColor,
          seriaWidth = _ref3.seriaWidth,
          date = _this._getDate(),
          _isCategory = isCategory(chartType),
          items = _isCategory ? _this._items.slice(1) : [].concat(_this._items),
          _compFd = _this._refFromDate.current,
          fromDate = _compFd && _compFd.isValid() ? _compFd.getValue() : '';

      return _this.props.loadFn(_this.props, {
        items: items,
        titles: _this._titles,
        dialogOptions: dialogOptions,
        chartType: chartType,
        seriaColor: seriaColor,
        seriaWidth: seriaWidth,
        isCategory: _isCategory,
        fromDate: fromDate,
        date: date
        /*
        selectOptions: [
          compSelect1.getOptions(),
          compSelect2.getOptions()
        ]
        */

      });
    };

    _this._hClose = function () {
      _this._handleWithValidationClose();
    };

    _this._hSelect = function (id, index, item) {
      _this._items[index] = item;

      if (item) {
        item.id = id;

        if (id === TABLE_ID) {
          _this.setState(_crStateForTableItem((0, _assertThisInitialized2["default"])(_this), item));
        }
      }
    };

    _this._refSelect = function (id, comp) {
      _this._compSelect[id] = comp;
    };

    _this._items = [];
    _this._titles = [0];
    _this._compSelect = {}; //this.date = undefined;

    var isOpt = props.isOpt,
        isCh = props.isCh,
        isFd = props.isFd,
        _selectProps = props.selectProps;
    _this._menuMore = crMenuMore((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true,
      isOptions: isOpt || isCh,
      isToggle: isFd || _selectProps.length > 1
    });
    _this._refFromDate = /*#__PURE__*/(0, _react.createRef)();
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this._crChartOptionsMem = (0, _memoizeOne["default"])(crChartOptions, _isEqualChartOptions);
    _this._crDateConfigMem = (0, _memoizeOne["default"])(crDateConfig);
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isOptions: false,
      isToggle: false,
      isShowFd: true,
      isShowChart: true,
      isShowDate: false
    }, _crIsToggleInit(_selectProps), _getDfFrequencyConfig(props));
    return _this;
  }

  var _proto = DialogSelectN.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps && this.props.isShow === nextProps.isShow) {
      return false;
    }

    return true;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$state2 = this.state,
        mapFrequency = _this$state2.mapFrequency,
        mapDateDf = _this$state2.mapDateDf;

    if (prevState.mapFrequency !== mapFrequency || prevState.mapDateDf !== mapDateDf) {
      this.date = void 0;
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        caption = _this$props2.caption,
        isShow = _this$props2.isShow,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        selectProps = _this$props2.selectProps,
        chartsType = _this$props2.chartsType,
        isFd = _this$props2.isFd,
        isCh = _this$props2.isCh,
        noDate = _this$props2.noDate,
        noForDate = _this$props2.noForDate,
        initFromDate = _this$props2.initFromDate,
        errNotYmdOrEmpty = _this$props2.errNotYmdOrEmpty,
        isYmdOrEmpty = _this$props2.isYmdOrEmpty,
        _this$state3 = this.state,
        chartType = _this$state3.chartType,
        isToolbar = _this$state3.isToolbar,
        isOptions = _this$state3.isOptions,
        isToggle = _this$state3.isToggle,
        isShowLabels = _this$state3.isShowLabels,
        isShowFd = _this$state3.isShowFd,
        isShowChart = _this$state3.isShowChart,
        isShowDate = _this$state3.isShowDate,
        validationMessages = _this$state3.validationMessages,
        mapFrequency = _this$state3.mapFrequency,
        _chartOptions = this._crChartOptionsMem(selectProps, chartsType, mapFrequency),
        _this$_crDateConfig = this._crDateConfig(),
        dateDefault = _this$_crDateConfig.dateDefault,
        dateOptions = _this$_crDateConfig.dateOptions,
        _isCategory = isCategory(chartType),
        _isRowFd = isFd && !_isCategory,
        _noForDate = noForDate || !_isCategory;

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._hClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Toolbar, {
        isShow: isToolbar,
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ModalOptions, {
        isShow: isOptions,
        toggleOption: this._toggleOptionWithToolbar,
        onClose: this._hideOptionsWithToolbar
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ModalToggle, {
        isShow: isToggle,
        noForDate: _noForDate,
        selectProps: selectProps,
        isFd: _isRowFd,
        isShowFd: isShowFd,
        isCh: isCh,
        isShowChart: isShowChart,
        isShowDate: isShowDate,
        crIsId: _crIsId,
        onToggle: this._toggleStateBy,
        onCheckCaption: this._checkCaptionBy,
        onUnCheckCaption: this._uncheckCaption,
        onClose: this._hideToggleWithToolbar
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectList["default"], {
        isShow: isShow,
        isShowLabels: isShowLabels,
        selectProps: selectProps,
        refSelect: this._refSelect,
        isShowById: this._isShowById,
        hSelect: this._hSelect
      }), _isRowFd && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ShowHide, {
        isShow: isShowFd,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowDate, {
          innerRef: this._refFromDate,
          isShowLabels: isShowLabels,
          title: "From Date:",
          initialValue: initFromDate,
          errorMsg: errNotYmdOrEmpty,
          onTest: isYmdOrEmpty
        })
      }), isCh && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowChartDate, {
        chartType: chartType,
        isShowLabels: isShowLabels,
        isShowChart: isShowChart,
        chartOptions: _chartOptions,
        onSelectChart: this._hSelectChartType,
        onRegColor: this._onRegColor,
        noDate: noDate,
        isShowDate: isShowDate,
        dateDefault: dateDefault,
        dateOptions: dateOptions,
        onSelecDate: this._hSelectDate
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ValidationMessages, {
        validationMessages: validationMessages
      })]
    });
  };

  return DialogSelectN;
}(_react.Component), _class2.defaultProps = {
  isCh: true,
  selectProps: [],
  initFromDate: DF_INIT_FROM_DATE
}, _temp)) || _class);
var _default = DialogSelectN;
exports["default"] = _default;
//# sourceMappingURL=DialogSelectN.js.map