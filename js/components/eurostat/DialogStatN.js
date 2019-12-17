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
            configs: _configs
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

    _this._isCategory = function () {
      return _RouterOptions["default"].isCategory(_this.chartType);
    };

    _this._updateForDate = function () {
      _this.date = null;
      var frequency = _this._items[1] ? _this.props.mapFrequency ? _this.props.mapFrequency : _this.two.mapFrequency ? _this.two.mapFrequency : MAP_FREQUENCY_DF : null,
          mapDateDf = _this.props.mapDateDf,
          dateConfig = frequency ? (0, _crDateConfig["default"])(frequency, mapDateDf) : (0, _crDateConfig["default"])('Y', mapDateDf);

      _this.setState((0, _extends2["default"])({
        isShowDate: true
      }, dateConfig));
    };

    _this._handleLoad = function () {
      var validationMessages = _this._crValidationMessages();

      if (validationMessages.length === 0) {
        var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
            _items = _assertThisInitialize._items,
            chartType = _assertThisInitialize.chartType,
            colorComp = _assertThisInitialize.colorComp,
            date = _assertThisInitialize.date,
            seriaColor = colorComp ? colorComp.getColor() : undefined,
            dateDefault = _this.state.dateDefault;

        var loadOpt = _this.props.loadFn(_this.props, {
          //one, two, chartType, date, dateDefault,
          chartType: chartType,
          seriaColor: seriaColor,
          date: date,
          dateDefault: dateDefault,
          items: _items,
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
          isLoadFailed = _this$state.isLoadFailed;

      if (!isLoadFailed) {
        configs.forEach(function (config, index) {
          var caption = config.caption;

          if (!_this._items[index]) {
            msg.push(_this.props.msgOnNotSelected(caption));
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
      _this.chartType = chartType;

      if (_this._isCategory()) {
        _this._updateForDate();
      } else {
        _this.setState({
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
        };
        return _react["default"].createElement(_DialogCell["default"].RowInputSelect, (0, _extends2["default"])({
          key: id
        }, rest, {
          onSelect: _this._fSelect(index).bind((0, _assertThisInitialized2["default"])(_this))
        }));
      });
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this._chartOptions = _RouterOptions["default"].crOptions(props);
    _this._items = [];
    _this._selectOptions = [];
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isLoading: true,
      isLoadFailed: false,
      isShowDate: false
    }, (0, _crDateConfig["default"])('EMPTY'));
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
        isToolbar = _this$state3.isToolbar,
        isShowLabels = _this$state3.isShowLabels,
        isLoading = _this$state3.isLoading,
        isLoadFailed = _this$state3.isLoadFailed,
        isShowDate = _this$state3.isShowDate,
        dateDefault = _this$state3.dateDefault,
        dateOptions = _this$state3.dateOptions,
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
    }), (isLoading || isLoadFailed) && _react["default"].createElement(_SpinnerLoading["default"], {
      style: _spinnerStyle
    }), !isLoading && !isLoadFailed && this._renderSelectInputs(), _react["default"].createElement(_DialogCell["default"].RowChart, {
      isShowLabels: isShowLabels,
      options: this._chartOptions,
      onSelectChart: this._hSelectChartType,
      onRegColor: this._onRegColor
    }), _react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowDate
    }, _react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "For Date",
      placeholder: dateDefault,
      options: dateOptions,
      onSelect: this._hSelectDate
    })), _react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return DialogStatN;
}(_react.Component), _temp)) || _class);
var _default = DialogStatN;
exports["default"] = _default;
//# sourceMappingURL=DialogStatN.js.map