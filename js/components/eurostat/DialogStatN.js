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

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

var _SpinnerLoading = require('../zhn/SpinnerLoading');

var _SpinnerLoading2 = _interopRequireDefault(_SpinnerLoading);

var _RouterOptions = require('./RouterOptions');

var _RouterOptions2 = _interopRequireDefault(_RouterOptions);

var _loadDims = require('./loadDims');

var _loadDims2 = _interopRequireDefault(_loadDims);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATE_PLACEHOLDER = 'Before Select Metric',
    MAP_FREQUENCY_DF = 'M',
    MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.";

var S = {
  SPINNER_LOADING: {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '16px auto 32px',
    width: '32px',
    height: '32px'
  },
  SPINNER_FAILED: {
    borderColor: '#f44336',
    animation: 'none'
  }
};

var DialogStatN = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3.default)(DialogStatN, _Component);

  function DialogStatN(props) {
    (0, _classCallCheck3.default)(this, DialogStatN);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogStatN.__proto__ || Object.getPrototypeOf(DialogStatN)).call(this));

    _this._loadDims = function () {
      var _this$props = _this.props,
          proxy = _this$props.proxy,
          baseMeta = _this$props.baseMeta,
          dims = _this$props.dims,
          _this$props$dfProps = _this$props.dfProps,
          dfProps = _this$props$dfProps === undefined ? {} : _this$props$dfProps,
          dfId = dfProps.dfId;


      (0, _loadDims2.default)({ id: dfId, proxy: proxy, baseMeta: baseMeta, dims: dims }).then(function (result) {
        var configs = result.configs,
            errMsg = result.errMsg;

        if (configs) {
          _this._selectOptions = configs.map(function (config) {
            return config.options;
          });
          _this.setState({
            isLoading: false,
            isLoadFailed: false,
            configs: configs
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
      var frequency = _this._items[1] ?
      //(this.two)
      _this.props.mapFrequency ? _this.props.mapFrequency : _this.two.mapFrequency ? _this.two.mapFrequency : MAP_FREQUENCY_DF : null,
          mapDateDf = _this.props.mapDateDf,
          config = frequency ? _DateUtils2.default.createEurostatSelect(frequency, mapDateDf) : _DateUtils2.default.createEurostatSelect('Y', mapDateDf);
      //: { dateDefault : DATE_PLACEHOLDER , options : [] };

      _this.setState({
        isShowDate: true,
        dateDefault: config.dateDefault,
        dateOptions: config.options
      });
    };

    _this._handleLoad = function () {
      var validationMessages = _this._crValidationMessages();
      if (validationMessages.length === 0) {
        var _items = _this._items,
            chartType = _this.chartType,
            date = _this.date,
            dateDefault = _this.state.dateDefault;


        var loadOpt = _this.props.loadFn(_this.props, {
          //one, two, chartType, date, dateDefault,
          chartType: chartType, date: date, dateDefault: dateDefault,
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

    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, { onClick: _this._handleLoad })];
    _this._chartOptions = _RouterOptions2.default.crOptions(props);
    _this._items = [];
    _this._selectOptions = [];

    _this.state = {
      isShowLabels: true,
      isLoading: true,
      isLoadFailed: false,
      isShowDate: false,
      dateDefault: DATE_PLACEHOLDER,
      dateOptions: [],
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(DialogStatN, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps && !this.props.isShow && nextProps.isShow && this.state.isLoadFailed) {
        this.setState({
          isLoading: true,
          isLoadFailed: false
        });
        this._loadDims();
      }
    }
  }, {
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
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          isShow = _props.isShow,
          onShow = _props.onShow,
          onFront = _props.onFront,
          _state = this.state,
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
          caption: caption,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.ToolbarButtonCircle, {
          buttons: this.toolbarButtons
        }),
        (isLoading || isLoadFailed) && _react2.default.createElement(_SpinnerLoading2.default, {
          style: _spinnerStyle
        }),
        !isLoading && !isLoadFailed && this._renderSelectInputs(),
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: 'Chart',
          placeholder: 'Default: Area',
          options: this._chartOptions,
          onSelect: this._hSelectChartType
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
}(_react.Component)) || _class) || _class);
exports.default = DialogStatN;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\eurostat\DialogStatN.js.map