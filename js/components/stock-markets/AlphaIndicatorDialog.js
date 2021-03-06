"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _dec, _dec2, _dec3, _class, _temp;

var Decor = _DialogCell["default"].Decor,
    crMenuMore = _DialogCell["default"].crMenuMore;
var _isNaN = Number.isNaN;
var DF = {
  INDICATOR: 'SMA',
  PERIOD: 30,
  FOR_DAYS: 501
};
var HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

var _testTicket = function _testTicket(value) {
  return String(value).trim() === '' ? false : true;
};

var _testInRangeOrEmpty = function _testInRangeOrEmpty(min, max) {
  return function (value) {
    if (String(value).trim() === '') {
      return true;
    }

    var n = parseInt(String(value).trim(), 10);

    if (!_isNaN(n) && n > min && n < max) {
      return true;
    } else {
      return false;
    }
  };
};

var _testPeriod = _testInRangeOrEmpty(0, 201);

var _testForDays = _testInRangeOrEmpty(250, 2500);

var _crValue = function _crValue(indicator, period) {
  switch (indicator) {
    case 'MACD':
      return 'MACD(12, 24, 9)';

    case 'STOCH':
      return 'STOCH(5, 3, 3, SMA)';

    default:
      return indicator + " (" + period + ")";
  }
};

var AlphaIndicatorDialog = (_dec = Decor.withToolbar, _dec2 = Decor.withLoad, _dec3 = Decor.withInitialState, _dec(_class = _dec2(_class = _dec3(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(AlphaIndicatorDialog, _Component);

  function AlphaIndicatorDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleSelectOne = function (item) {
      _this.indicator = item;
    };

    _this._handleLoad = function () {
      var _period = _this.periodComp.isValid() ? _this.periodComp.getValue() !== '' ? _this.periodComp.getValue() : DF.PERIOD : DF.PERIOD,
          _forDays = _this.forDaysComp.isValid() ? _this.forDaysComp.getValue() !== '' ? _this.forDaysComp.getValue() : DF.FOR_DAYS : DF.FOR_DAYS,
          _ticket = _this.ticketComp.isValid() ? _this.ticketComp.getValue() : undefined,
          _indicator = _this.indicator ? _this.indicator.value : DF.INDICATOR;

      var option = {
        loadId: 'AL',
        indicator: _indicator,
        ticket: _ticket,
        period: _period,
        forDays: _forDays,
        value: _crValue(_indicator, _period),
        //for label
        hasSecondYAxis: _this[HAS_SECOND_Y_AXIS]
      };

      _this.props.onLoad(option);
    };

    _this._handleClose = function () {
      //this._handleWithValidationClose(this._createValidationMessages);
      _this.props.onClose();
    };

    _this._refTicket = function (comp) {
      _this.ticketComp = comp;
    };

    _this._refPeriod = function (comp) {
      _this.periodComp = comp;
    };

    _this._refForDays = function (comp) {
      _this.forDaysComp = comp;
    };

    _this._hCheckSecondYAxis = function () {
      _this[HAS_SECOND_Y_AXIS] = true;
    };

    _this._hUnCheckSecondYAxis = function () {
      _this[HAS_SECOND_Y_AXIS] = false;
    };

    _this._menuMore = crMenuMore((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true,
      isShowOptions: true
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isShowOptions: false
    });
    return _this;
  }

  var _proto = AlphaIndicatorDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        caption = _this$props.caption,
        oneURI = _this$props.oneURI,
        oneJsonProp = _this$props.oneJsonProp,
        oneCaption = _this$props.oneCaption,
        onShow = _this$props.onShow,
        onFront = _this$props.onFront,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        isShowOptions = _this$state.isShowOptions;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Toolbar, {
        isShow: isToolbar,
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].SelectWithLoad, {
        isShow: isShow,
        isShowLabels: isShowLabels,
        uri: oneURI,
        jsonProp: oneJsonProp,
        caption: oneCaption,
        optionNames: "Items",
        onSelect: this._handleSelectOne
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowPattern, {
        ref: this._refTicket,
        isShowLabels: isShowLabels,
        caption: "Ticket",
        placeholder: "Nyse or Nasdaq Ticket",
        onTest: _testTicket,
        errorMsg: "Not Empty"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell["default"].ShowHide, {
        isShow: isShowOptions,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowPattern, {
          ref: this._refPeriod,
          isShowLabels: isShowLabels,
          caption: "Period",
          placeholder: "Default: " + DF.PERIOD,
          onTest: _testPeriod,
          errorMsg: "Number in range 1-200"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowPattern, {
          ref: this._refForDays,
          isShowLabels: isShowLabels,
          caption: "For Days",
          placeholder: "Default: " + DF.FOR_DAYS + " (2 Years)",
          onTest: _testForDays,
          errorMsg: "Number in range 250-2500"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowCheckBox, {
        initValue: false,
        caption: "Add Seria with Second YAxis",
        onCheck: this._hCheckSecondYAxis,
        onUnCheck: this._hUnCheckSecondYAxis
      })]
    });
  };

  return AlphaIndicatorDialog;
}(_react.Component), _temp)) || _class) || _class) || _class);
var _default = AlphaIndicatorDialog;
exports["default"] = _default;
//# sourceMappingURL=AlphaIndicatorDialog.js.map