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

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _MenuMore = _interopRequireDefault(require("../dialogs/MenuMore"));

var _Decorators = _interopRequireDefault(require("../dialogs/decorators/Decorators"));

var _SpinnerLoading = _interopRequireDefault(require("../zhn/SpinnerLoading"));

var _RouterOptions = _interopRequireDefault(require("./RouterOptions"));

var _loadDims = _interopRequireDefault(require("./loadDims"));

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
var isCategory = _RouterOptions["default"].isCategory;

var _crIsId = function _crIsId(id) {
  return "is" + id + "Select";
};

var _isOpenAndPrevLoadFailed = function _isOpenAndPrevLoadFailed(prevProps, props, state) {
  return props !== prevProps && !prevProps.isShow && props.isShow && state.isLoadFailed;
};

var _fNotTimeDimension = function _fNotTimeDimension(timeId) {
  return function (config) {
    return config.id !== timeId;
  };
};

var DialogStatN = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
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

    _this._loadDims = function () {
      var _this$props = _this.props,
          proxy = _this$props.proxy,
          baseMeta = _this$props.baseMeta,
          dims = _this$props.dims,
          timeId = _this$props.timeId,
          _this$props$dfProps = _this$props.dfProps,
          dfProps = _this$props$dfProps === void 0 ? {} : _this$props$dfProps,
          noTime = _this$props.noTime,
          dfId = dfProps.dfId;
      (0, _loadDims["default"])({
        id: dfId,
        proxy: proxy,
        baseMeta: baseMeta,
        dims: dims,
        noTime: noTime,
        timeId: timeId
      }).then(function (result) {
        var configs = result.configs,
            errMsg = result.errMsg;

        if (configs) {
          //id
          var _configs = configs.filter(_fNotTimeDimension(timeId));

          _this._selectOptions = _configs.map(function (config) {
            return config.options;
          });

          _this.setState({
            isLoading: false,
            isLoadFailed: false,
            configs: _configs,
            captions: _configs.map(function (_ref2) {
              var id = _ref2.id,
                  caption = _ref2.caption;
              return {
                id: id,
                caption: caption
              };
            })
          });
        } else {
          _this.setState({
            isLoading: false,
            isLoadFailed: true,
            validationMessages: [errMsg]
          });
        }
      });
    };

    _this._updateForDate = function (chartType) {
      _this.date = null;
      var frequency = _this._items[1] ? _this.props.mapFrequency || MAP_FREQUENCY_DF : null,
          mapDateDf = _this.props.mapDateDf,
          dateConfig = frequency ? (0, _crDateConfig["default"])(frequency, mapDateDf) : (0, _crDateConfig["default"])('Y', mapDateDf);

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
            chartType = _this.state.chartType,
            _ref3 = colorComp ? colorComp.getConf() : {},
            seriaColor = _ref3.seriaColor,
            seriaWidth = _ref3.seriaWidth,
            dateDefault = _this.state.dateDefault,
            loadOpt = _this.props.loadFn(_this.props, {
          dialogOptions: dialogOptions,
          chartType: chartType,
          seriaColor: seriaColor,
          seriaWidth: seriaWidth,
          date: date,
          dateDefault: dateDefault,
          items: _items,
          titles: _this._titles,
          selectOptions: _this._selectOptions
        });

        _this.props.onLoad(loadOpt);
      }

      _this.setState({
        validationMessages: validationMessages
      });
    };

    _this._crValidationMessages = function () {
      var msg = [],
          _this$state = _this.state,
          configs = _this$state.configs,
          isLoadFailed = _this$state.isLoadFailed,
          _this$state$chartType = _this$state.chartType,
          chartType = _this$state$chartType === void 0 ? {} : _this$state$chartType,
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
      var _this$state2 = _this.state,
          isShowLabels = _this$state2.isShowLabels,
          configs = _this$state2.configs;
      return configs.map(function (conf, index) {
        var id = conf.id,
            caption = conf.caption,
            options = conf.options,
            rest = {
          isShowLabels: isShowLabels,
          caption: caption,
          options: options
        },
            _isShow = !_this.state[_crIsId(id)];

        return _react["default"].createElement(_DialogCell["default"].ShowHide, {
          key: id,
          isShow: _isShow
        }, _react["default"].createElement(_DialogCell["default"].RowInputSelect, (0, _extends2["default"])({}, rest, {
          onSelect: _this._fSelect(index).bind((0, _assertThisInitialized2["default"])(_this))
        })));
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
    _this._chartOptions = _RouterOptions["default"].crOptions(props);
    _this._items = [];
    _this._titles = [];
    _this._selectOptions = [];
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isLoading: true,
      isLoadFailed: false,
      isShowChart: true,
      isShowDate: false
    }, (0, _crDateConfig["default"])('EMPTY'), {
      isOptions: false,
      isToggle: false,
      captions: [] //chartType

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
    var _this$props2 = this.props,
        caption = _this$props2.caption,
        isShow = _this$props2.isShow,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        _this$state3 = this.state,
        chartType = _this$state3.chartType,
        isToolbar = _this$state3.isToolbar,
        isOptions = _this$state3.isOptions,
        isToggle = _this$state3.isToggle,
        isShowLabels = _this$state3.isShowLabels,
        isLoading = _this$state3.isLoading,
        isLoadFailed = _this$state3.isLoadFailed,
        isShowChart = _this$state3.isShowChart,
        isShowDate = _this$state3.isShowDate,
        dateDefault = _this$state3.dateDefault,
        dateOptions = _this$state3.dateOptions,
        captions = _this$state3.captions,
        validationMessages = _this$state3.validationMessages,
        _spinnerStyle = !isLoadFailed ? S.SPINNER_LOADING : (0, _extends2["default"])({}, S.SPINNER_LOADING, {}, S.SPINNER_FAILED);

    return _react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose
    }, _react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), _react["default"].createElement(_ModalOptions["default"], {
      isShow: isOptions,
      toggleOption: this._toggleOptionWithToolbar,
      onClose: this._hideOptionsWithToolbar
    }), _react["default"].createElement(_ModalToggle["default"], {
      isShow: isToggle,
      selectProps: captions,
      isShowChart: isShowChart,
      isShowDate: isShowDate,
      crIsId: _crIsId,
      onToggle: this._toggleStateBy,
      onCheckCaption: this._checkCaptionBy,
      onUnCheckCaption: this._uncheckCaption,
      onClose: this._hideToggleWithToolbar
    }), (isLoading || isLoadFailed) && _react["default"].createElement(_SpinnerLoading["default"], {
      style: _spinnerStyle
    }), !isLoading && !isLoadFailed && this._renderSelectInputs(), _react["default"].createElement(_RowChart["default"], {
      chartType: chartType,
      isShowLabels: isShowLabels,
      isShowChart: isShowChart,
      chartOptions: this._chartOptions,
      onSelectChart: this._hSelectChartType,
      onRegColor: this._onRegColor,
      isShowDate: isShowDate,
      dateDefault: dateDefault,
      dateOptions: dateOptions,
      onSelecDate: this._hSelectDate
    }), _react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return DialogStatN;
}(_react.Component), _temp)) || _class);
var _default = DialogStatN;
exports["default"] = _default;
//# sourceMappingURL=DialogStatN.js.map