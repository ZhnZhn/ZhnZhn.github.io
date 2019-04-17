'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _dec, _dec2, _class, _class2, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DAILY = 'DAILY';
var D_ADJ = 'DAILY_ADJUSTED';

var _isDaily = function _isDaily(dfT) {
  return dfT.indexOf(DAILY) !== -1;
};
var _isDailyAdj = function _isDailyAdj(dfT) {
  return dfT === D_ADJ;
};

var DF = {
  INTERVAL: '15min',
  PERIOD: 'compact'
};

var _testTicket = function _testTicket(value) {
  return Boolean(('' + value).trim());
};

var _intervalOptions = [{ caption: '1 min', value: '1min' }, { caption: '5 min', value: '5min' }, { caption: '15 min', value: '15min' }, { caption: '30 min', value: '30min' }, { caption: '60 min', value: '60min' }];

var _periodOptions = [{ caption: 'Compact (100 days)', value: 'compact' }, { caption: 'Full (of 20+ years, about 1MB)', value: 'full' }];

var _r = {
  INTRADAY: {
    caption: "Interval",
    placeholder: "Default: 15min",
    options: _intervalOptions
  },
  DAILY: {
    caption: "Period",
    placeholder: "Default: Compact",
    options: _periodOptions
  }
};

var _rDaily = {
  DAILY: {
    indicator: 'TIME_SERIES_DAILY',
    interval: 'Daily'
  },
  DAILY_ADJUSTED: {
    indicator: 'TIME_SERIES_DAILY_ADJUSTED',
    interval: 'Daily'
    //interval: 'Daily Adjusted'
  }
};

var _getConf = function _getConf(key) {
  return _r[key] || _r.DAILY;
};

var _getInterval = function _getInterval(input, df) {
  return input ? input.value : df;
};
var _crLoadOptions = function _crLoadOptions(key, input) {
  if (key === 'INTRADAY') {
    return {
      indicator: 'TIME_SERIES_INTRADAY',
      interval: _getInterval(input, DF.INTERVAL),
      dfT: key
    };
  }
  var _conf = _rDaily[key] || _rDaily.DAILY;
  return (0, _extends3.default)({}, _conf, {
    outputsize: _getInterval(input, DF.PERIOD),
    dfT: key
  });
};

var AlphaIntradayDialog = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withLoad, _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(AlphaIntradayDialog, _Component);

  function AlphaIntradayDialog(props) {
    (0, _classCallCheck3.default)(this, AlphaIntradayDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AlphaIntradayDialog.__proto__ || Object.getPrototypeOf(AlphaIntradayDialog)).call(this, props));

    _initialiseProps.call(_this);

    var dfT = props.dfT;

    _this._isDaily = _isDaily(dfT);
    _this._isDailyAdj = _isDailyAdj(dfT);
    _this._hasDividend = false;
    _this._hasFilterZero = false;

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: true, isToggleOptions: _this._isDaily });
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = {
      isToolbar: true,
      isShowLabels: true,
      isToggleOptions: false
    };
    return _this;
  }

  (0, _createClass3.default)(AlphaIntradayDialog, [{
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
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          caption = _props.caption,
          onShow = _props.onShow,
          onFront = _props.onFront,
          dfT = _props.dfT,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels,
          isToggleOptions = _state.isToggleOptions;


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
        _react2.default.createElement(_DialogCell2.default.RowPattern, {
          ref: this._refTicket,
          isShowLabels: isShowLabels,
          caption: 'Ticket',
          placeholder: 'Nyse or Nasdaq Ticket',
          onTest: _testTicket,
          errorMsg: 'Not Empty'
        }),
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, (0, _extends3.default)({
          isShowLabels: isShowLabels
        }, _getConf(dfT), {
          //caption="Interval"
          //placeholder="Default: 15min"
          //options={_intervalOptions}
          onSelect: this._handleSelectInterval
        })),
        this._isDaily && _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isToggleOptions },
          this._isDailyAdj && _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
            initValue: false,
            caption: "With Dividend History",
            onToggle: this._toggleDividend
          }),
          _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
            initValue: false,
            caption: "Filter Zero Values",
            onToggle: this._toggleFilterZero
          })
        )
      );
    }
  }]);
  return AlphaIntradayDialog;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleSelectInterval = function (item) {
    _this2.interval = item;
  };

  this._handleLoad = function () {
    var _props2 = _this2.props,
        dfT = _props2.dfT,
        dataSource = _props2.dataSource,
        loadId = _props2.loadId,
        _ticket = _this2.ticketComp.isValid() ? _this2.ticketComp.getValue() : undefined,
        _options = _crLoadOptions(dfT, _this2.interval),
        _value = (_ticket || '') + ' (' + _options.interval + ')';

    _this2.props.onLoad((0, _extends3.default)({
      loadId: loadId
    }, _options, {
      ticket: _ticket,
      value: _value, //for label
      hasDividend: _this2._hasDividend,
      hasFilterZero: _this2._hasFilterZero,
      dataSource: dataSource
    }));
  };

  this._toggleDividend = function () {
    _this2._hasDividend = !_this2._hasDividend;
  };

  this._toggleFilterZero = function () {
    _this2._hasFilterZero = !_this2._hasFilterZero;
  };

  this._handleClose = function () {
    _this2.props.onClose();
  };

  this._refTicket = function (comp) {
    _this2.ticketComp = comp;
  };
}, _temp)) || _class) || _class);
exports.default = AlphaIntradayDialog;
//# sourceMappingURL=AlphaIntradayDialog.js.map