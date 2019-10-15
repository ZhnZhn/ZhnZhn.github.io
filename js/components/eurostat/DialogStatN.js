'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _dec3, _dec4, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _crDateConfig = require('./crDateConfig');

var _crDateConfig2 = _interopRequireDefault(_crDateConfig);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

var _SpinnerLoading = require('../zhn/SpinnerLoading');

var _SpinnerLoading2 = _interopRequireDefault(_SpinnerLoading);

var _RouterOptions = require('./RouterOptions');

var _RouterOptions2 = _interopRequireDefault(_RouterOptions);

var _loadDims = require('./loadDims');

var _loadDims2 = _interopRequireDefault(_loadDims);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

//const _isArr = Array.isArray;

var _fNotTimeDimension = function _fNotTimeDimension(timeId) {
  return function (config) {
    return config.id !== timeId;
  };
};

/*
const _notTimeDimension = config => {
  console.log(config)
  if ( config.caption === 'Month'
    && _isArr(config.options)
    && config.options.length > 12
  ) { return false; }
  return config.caption.indexOf('Year') === -1
     &&  config.caption.indexOf('Vuosi') === -1;
};
*/

var DialogStatN = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec3 = _Decorators2.default.withLoad, _dec4 = _Decorators2.default.withInitialState, _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function (_Component) {
  (0, _inherits3.default)(DialogStatN, _Component);

  function DialogStatN(props) {
    (0, _classCallCheck3.default)(this, DialogStatN);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogStatN.__proto__ || Object.getPrototypeOf(DialogStatN)).call(this, props));

    _this._loadDims = function () {
      var _this$props = _this.props,
          proxy = _this$props.proxy,
          baseMeta = _this$props.baseMeta,
          dims = _this$props.dims,
          timeId = _this$props.timeId,
          _this$props$dfProps = _this$props.dfProps,
          dfProps = _this$props$dfProps === undefined ? {} : _this$props$dfProps,
          noTime = _this$props.noTime,
          dfId = dfProps.dfId;

      (0, _loadDims2.default)({ id: dfId, proxy: proxy, baseMeta: baseMeta, dims: dims, noTime: noTime, timeId: timeId }).then(function (result) {
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
      return _RouterOptions2.default.isCategory(_this.chartType);
    };

    _this._updateForDate = function () {
      _this.date = null;
      var frequency = _this._items[1] ? _this.props.mapFrequency ? _this.props.mapFrequency : _this.two.mapFrequency ? _this.two.mapFrequency : MAP_FREQUENCY_DF : null,
          mapDateDf = _this.props.mapDateDf,
          dateConfig = frequency ? (0, _crDateConfig2.default)(frequency, mapDateDf) : (0, _crDateConfig2.default)('Y', mapDateDf);


      _this.setState((0, _extends3.default)({
        isShowDate: true
      }, dateConfig));
    };

    _this._handleLoad = function () {
      var validationMessages = _this._crValidationMessages();
      if (validationMessages.length === 0) {
        var _items = _this._items,
            chartType = _this.chartType,
            colorComp = _this.colorComp,
            date = _this.date,
            seriaColor = colorComp ? colorComp.getColor() : undefined,
            dateDefault = _this.state.dateDefault;


        var loadOpt = _this.props.loadFn(_this.props, {
          //one, two, chartType, date, dateDefault,
          chartType: chartType, seriaColor: seriaColor,
          date: date, dateDefault: dateDefault,
          items: _items,
          selectOptions: _this._selectOptions
        });
        _this.props.onLoad(loadOpt);
      }
      _this.setState({ validationMessages: validationMessages });
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
        _this.setState({ isShowDate: false });
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
            rest = { isShowLabels: isShowLabels, caption: caption, options: options };

        return _react2.default.createElement(_DialogCell2.default.RowInputSelect, (0, _extends3.default)({
          key: id
        }, rest, {
          onSelect: _this._fSelect(index).bind(_this)
        }));
      });
    };

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this._commandButtons = _this._crCommandsWithLoad(_this);
    _this._chartOptions = _RouterOptions2.default.crOptions(props);
    _this._items = [];
    _this._selectOptions = [];

    _this.state = (0, _extends3.default)({}, _this._isWithInitialState(), {
      isLoading: true,
      isLoadFailed: false,
      isShowDate: false
    }, (0, _crDateConfig2.default)('EMPTY'));
    return _this;
  }

  (0, _createClass3.default)(DialogStatN, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps) {
        if (this.props.isShow === nextProps.isShow) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadDims();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (_isOpenAndPrevLoadFailed(prevProps, this.props, this.state)) {
        this.setState({
          isLoading: true,
          isLoadFailed: false
        });
        this._loadDims();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          isShow = _props.isShow,
          onShow = _props.onShow,
          onFront = _props.onFront,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels,
          isLoading = _state.isLoading,
          isLoadFailed = _state.isLoadFailed,
          isShowDate = _state.isShowDate,
          dateDefault = _state.dateDefault,
          dateOptions = _state.dateOptions,
          validationMessages = _state.validationMessages,
          _spinnerStyle = !isLoadFailed ? S.SPINNER_LOADING : (0, _extends3.default)({}, S.SPINNER_LOADING, S.SPINNER_FAILED);

      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          isShow: isShow,
          caption: caption,
          menuModel: this._menuMore,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.Toolbar, {
          isShow: isToolbar,
          buttons: this.toolbarButtons
        }),
        (isLoading || isLoadFailed) && _react2.default.createElement(_SpinnerLoading2.default, {
          style: _spinnerStyle
        }),
        !isLoading && !isLoadFailed && this._renderSelectInputs(),
        _react2.default.createElement(_DialogCell2.default.RowChart, {
          isShowLabels: isShowLabels,
          options: this._chartOptions,
          onSelectChart: this._hSelectChartType,
          onRegColor: this._onRegColor
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowDate },
          _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: 'For Date',
            placeholder: dateDefault,
            options: dateOptions,
            onSelect: this._hSelectDate
          })
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogStatN;
}(_react.Component)) || _class) || _class) || _class) || _class);
exports.default = DialogStatN;
//# sourceMappingURL=DialogStatN.js.map