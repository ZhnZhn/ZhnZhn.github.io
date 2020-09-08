"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _dec, _dec2, _dec3, _class, _temp;

var Decor = _DialogCell["default"].Decor,
    crMenuMore = _DialogCell["default"].crMenuMore;
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

var _intervalOptions = [{
  caption: '1 min',
  value: '1min'
}, {
  caption: '5 min',
  value: '5min'
}, {
  caption: '15 min',
  value: '15min'
}, {
  caption: '30 min',
  value: '30min'
}, {
  caption: '60 min',
  value: '60min'
}];
var _periodOptions = [{
  caption: 'Compact (100 days)',
  value: 'compact'
}, {
  caption: 'Full (of 20+ years, about 1MB)',
  value: 'full'
}];
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
    interval: 'Daily' //interval: 'Daily Adjusted'

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

  return (0, _extends2["default"])({}, _conf, {
    outputsize: _getInterval(input, DF.PERIOD),
    dfT: key
  });
};

var AlphaIntradayDialog = (_dec = Decor.withToolbar, _dec2 = Decor.withLoad, _dec3 = Decor.withInitialState, _dec(_class = _dec2(_class = _dec3(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(AlphaIntradayDialog, _Component);

  function AlphaIntradayDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleSelectInterval = function (item) {
      _this.interval = item;
    };

    _this._handleLoad = function () {
      var _this$props = _this.props,
          dfT = _this$props.dfT,
          dataSource = _this$props.dataSource,
          loadId = _this$props.loadId,
          dfSubId = _this$props.dfSubId,
          _ticket = _this.ticketComp.isValid() ? _this.ticketComp.getValue() : void 0,
          _options = _crLoadOptions(dfT, _this.interval),
          _value = (_ticket || '') + " (" + _options.interval + ")";

      _this.props.onLoad((0, _extends2["default"])({
        loadId: loadId,
        dfSubId: dfSubId
      }, _options, {
        ticket: _ticket,
        value: _value,
        //for label
        hasDividend: _this._hasDividend,
        hasFilterZero: _this._hasFilterZero,
        dataSource: dataSource
      }));
    };

    _this._toggleDividend = function () {
      _this._hasDividend = !_this._hasDividend;
    };

    _this._toggleFilterZero = function () {
      _this._hasFilterZero = !_this._hasFilterZero;
    };

    _this._handleClose = function () {
      _this.props.onClose();
    };

    _this._refTicket = function (comp) {
      _this.ticketComp = comp;
    };

    var _dfT = props.dfT;
    _this._isDaily = _isDaily(_dfT);
    _this._isDailyAdj = _isDailyAdj(_dfT);
    _this._hasDividend = false;
    _this._hasFilterZero = false;
    _this._menuMore = crMenuMore((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true,
      isToggleOptions: _this._isDaily
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isToggleOptions: false
    });
    return _this;
  }

  var _proto = AlphaIntradayDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        caption = _this$props2.caption,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        dfT = _this$props2.dfT,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        isToggleOptions = _this$state.isToggleOptions;
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
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowPattern, {
      ref: this._refTicket,
      isShowLabels: isShowLabels,
      caption: "Ticket",
      placeholder: "Nyse or Nasdaq Ticket",
      onTest: _testTicket,
      errorMsg: "Not Empty"
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSelect, (0, _extends2["default"])({
      isShowLabels: isShowLabels
    }, _getConf(dfT), {
      //caption="Interval"
      //placeholder="Default: 15min"
      //options={_intervalOptions}
      onSelect: this._handleSelectInterval
    })), this._isDaily && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isToggleOptions
    }, this._isDailyAdj && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: false,
      caption: "With Dividend History",
      onToggle: this._toggleDividend
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: false,
      caption: "Filter Zero Values",
      onToggle: this._toggleFilterZero
    })));
  };

  return AlphaIntradayDialog;
}(_react.Component), _temp)) || _class) || _class) || _class);
var _default = AlphaIntradayDialog;
exports["default"] = _default;
//# sourceMappingURL=AlphaIntradayDialog.js.map