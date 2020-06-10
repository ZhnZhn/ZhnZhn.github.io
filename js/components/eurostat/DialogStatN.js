"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _crDateConfig = _interopRequireDefault(require("./crDateConfig"));

var _loadConfigs = _interopRequireDefault(require("./loadConfigs"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _MenuMore = _interopRequireDefault(require("../dialogs/MenuMore"));

var _Decorators = _interopRequireDefault(require("../dialogs/decorators/Decorators"));

var _ChartTypes = _interopRequireDefault(require("../dialogs/ChartTypes"));

var _SpinnerLoading = _interopRequireDefault(require("../zhn/SpinnerLoading"));

var _ModalOptions = _interopRequireDefault(require("./ModalOptions"));

var _ModalToggle = _interopRequireDefault(require("./ModalToggle"));

var _RowChart = _interopRequireDefault(require("./RowChart"));

var _dec, _class, _temp;

var MAP_FREQUENCY_DF = 'M',
    MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.";
var S = {
  SPINNER_LOADING: {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '16px auto 32px',
    width: 32,
    height: 32
  },
  SPINNER_FAILED: {
    borderColor: '#f44336',
    animation: 'none'
  }
};
var isCategory = _ChartTypes["default"].isCategory,
    crOptions = _ChartTypes["default"].crOptions;

var _crIsId = function _crIsId(id) {
  return "is" + id + "Select";
};

var _isOpenAndPrevLoadFailed = function _isOpenAndPrevLoadFailed(prevProps, props, state) {
  return props !== prevProps && !prevProps.isShow && props.isShow && state.isLoadFailed;
};

var DialogStatN = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DialogStatN, _Component);

  function DialogStatN(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._toggleStateBy = function (propName) {
      _this.setState(function (prevState) {
        var _ref;

        return _ref = {}, _ref[propName] = !prevState[propName], _ref;
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

    _this._setConfigs = function (_ref2) {
      var configs = _ref2.configs,
          timeId = _ref2.timeId,
          mF = _ref2.mapFrequency,
          errMsg = _ref2.errMsg;

      if (configs) {
        var _this$props = _this.props,
            chartsType = _this$props.chartsType,
            mapFrequency = _this$props.mapFrequency;

        _this.setState({
          isLoading: false,
          isLoadFailed: false,
          timeId: timeId,
          configs: configs,
          mapFrequency: mF || mapFrequency,
          selectOptions: configs.map(function (config) {
            return config.options;
          }),
          chartOptions: crOptions({
            configs: configs,
            chartsType: chartsType
          })
        });
      } else {
        _this.setState({
          isLoading: false,
          isLoadFailed: true,
          validationMessages: [errMsg]
        });
      }
    };

    _this._loadDims = function () {
      var _this$props2 = _this.props,
          dims = _this$props2.dims,
          proxy = _this$props2.proxy,
          baseMeta = _this$props2.baseMeta,
          dfProps = _this$props2.dfProps;
      (0, _loadConfigs["default"])((0, _extends2["default"])({
        dims: dims,
        proxy: proxy,
        baseMeta: baseMeta
      }, dfProps)).then(_this._setConfigs)["catch"](function (err) {
        _this._setConfigs({
          errMsg: err.message
        });
      });
    };

    _this._updateForDate = function (chartType) {
      _this.date = null;

      var mapDateDf = _this.props.mapDateDf,
          mapFrequency = _this.state.mapFrequency,
          _frequency = mapFrequency || MAP_FREQUENCY_DF,
          dateConfig = (0, _crDateConfig["default"])(_frequency, mapDateDf);

      _this.setState((0, _extends2["default"])({
        isShowDate: true
      }, dateConfig, {
        chartType: chartType
      }));
    };

    _this._handleLoad = function () {
      var validationMessages = _this._crValidationMessages();

      if (validationMessages.length === 0) {
        var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
            _items = _assertThisInitialize._items,
            dialogOptions = _assertThisInitialize.dialogOptions,
            colorComp = _assertThisInitialize.colorComp,
            date = _assertThisInitialize.date,
            _this$state = _this.state,
            timeId = _this$state.timeId,
            chartType = _this$state.chartType,
            selectOptions = _this$state.selectOptions,
            _ref3 = colorComp ? colorComp.getConf() : {},
            seriaColor = _ref3.seriaColor,
            seriaWidth = _ref3.seriaWidth,
            dateDefault = _this.state.dateDefault,
            _props = (0, _extends2["default"])({}, _this.props, {
          timeId: timeId
        }),
            loadOpt = _this.props.loadFn(_props, {
          dialogOptions: dialogOptions,
          chartType: chartType,
          seriaColor: seriaColor,
          seriaWidth: seriaWidth,
          date: date,
          dateDefault: dateDefault,
          items: _items,
          titles: _this._titles,
          selectOptions: selectOptions
        });

        _this.props.onLoad(loadOpt);
      }

      _this.setState({
        validationMessages: validationMessages
      });
    };

    _this._crValidationMessages = function () {
      var msg = [],
          _this$state2 = _this.state,
          configs = _this$state2.configs,
          isLoadFailed = _this$state2.isLoadFailed,
          _this$state2$chartTyp = _this$state2.chartType,
          chartType = _this$state2$chartTyp === void 0 ? {} : _this$state2$chartTyp,
          _isCategory = isCategory(chartType),
          dim = chartType.dim;

      if (!isLoadFailed) {
        configs.forEach(function (config, index) {
          var caption = config.caption;

          if (!(_isCategory && caption === dim)) {
            if (!_this._items[index]) {
              msg.push(_this.props.msgOnNotSelected(caption));
            }
          }
        });
      } else {
        msg.push(MSG_DIMS_NOT_LOADED);
      }

      return msg;
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._hSelectChartType = function (chartType) {
      if (isCategory(chartType)) {
        _this._updateForDate(chartType);
      } else {
        _this.setState({
          chartType: chartType,
          isShowDate: false
        });
      }
    };

    _this._onRegColor = function (comp) {
      _this.colorComp = comp;
    };

    _this._fSelect = function (index) {
      return function (item) {
        this._items[index] = item;
      };
    };

    _this._hSelectDate = function (date) {
      _this.date = date;
    };

    _this._renderSelectInputs = function () {
      var _this$state3 = _this.state,
          isShowLabels = _this$state3.isShowLabels,
          configs = _this$state3.configs;
      return configs.map(function (conf, index) {
        var id = conf.id,
            caption = conf.caption,
            options = conf.options,
            _isShow = !_this.state[_crIsId(id)];

        return /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
          key: id,
          isShow: _isShow
        }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: caption,
          options: options,
          onSelect: _this._fSelect(index).bind((0, _assertThisInitialized2["default"])(_this))
        }));
      });
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true,
      isOptions: true,
      isToggle: true
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this._items = [];
    _this._titles = [];
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isLoading: true,
      isLoadFailed: false,
      isShowChart: true,
      isShowDate: false
    }, (0, _crDateConfig["default"])('EMPTY'), {
      isOptions: false,
      isToggle: false,
      configs: [],
      selectOptions: [],
      mapFrequency: props.mapFrequency,
      chartOptions: crOptions(props) //chartType

    });
    return _this;
  }

  var _proto = DialogStatN.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.componentDidMount = function componentDidMount() {
    this._loadDims();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (_isOpenAndPrevLoadFailed(prevProps, this.props, this.state)) {
      this.setState({
        isLoading: true,
        isLoadFailed: false
      });

      this._loadDims();
    }
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        caption = _this$props3.caption,
        isShow = _this$props3.isShow,
        onShow = _this$props3.onShow,
        onFront = _this$props3.onFront,
        _this$state4 = this.state,
        chartType = _this$state4.chartType,
        isToolbar = _this$state4.isToolbar,
        isOptions = _this$state4.isOptions,
        isToggle = _this$state4.isToggle,
        isShowLabels = _this$state4.isShowLabels,
        isLoading = _this$state4.isLoading,
        isLoadFailed = _this$state4.isLoadFailed,
        isShowChart = _this$state4.isShowChart,
        isShowDate = _this$state4.isShowDate,
        dateDefault = _this$state4.dateDefault,
        dateOptions = _this$state4.dateOptions,
        configs = _this$state4.configs,
        chartOptions = _this$state4.chartOptions,
        validationMessages = _this$state4.validationMessages,
        _spinnerStyle = !isLoadFailed ? S.SPINNER_LOADING : (0, _extends2["default"])({}, S.SPINNER_LOADING, S.SPINNER_FAILED);

    return /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), /*#__PURE__*/_react["default"].createElement(_ModalOptions["default"], {
      isShow: isOptions,
      toggleOption: this._toggleOptionWithToolbar,
      onClose: this._hideOptionsWithToolbar
    }), /*#__PURE__*/_react["default"].createElement(_ModalToggle["default"], {
      isShow: isToggle,
      selectProps: configs,
      isShowChart: isShowChart,
      isShowDate: isShowDate,
      crIsId: _crIsId,
      onToggle: this._toggleStateBy,
      onCheckCaption: this._checkCaptionBy,
      onUnCheckCaption: this._uncheckCaption,
      onClose: this._hideToggleWithToolbar
    }), (isLoading || isLoadFailed) && /*#__PURE__*/_react["default"].createElement(_SpinnerLoading["default"], {
      style: _spinnerStyle
    }), !isLoading && !isLoadFailed && this._renderSelectInputs(), /*#__PURE__*/_react["default"].createElement(_RowChart["default"], {
      chartType: chartType,
      isShowLabels: isShowLabels,
      isShowChart: isShowChart,
      chartOptions: chartOptions,
      onSelectChart: this._hSelectChartType,
      onRegColor: this._onRegColor,
      isShowDate: isShowDate,
      dateDefault: dateDefault,
      dateOptions: dateOptions,
      onSelecDate: this._hSelectDate
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return DialogStatN;
}(_react.Component), _temp)) || _class);
var _default = DialogStatN;
exports["default"] = _default;
//# sourceMappingURL=DialogStatN.js.map