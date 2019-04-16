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

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF = {
  INDICATOR: 'SMA',
  PERIOD: 30,
  FOR_DAYS: 501
};
var HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

var _testTicket = function _testTicket(value) {
  if (String(value).trim() === '') {
    return false;
  } else {
    return true;
  }
};

var _testInRangeOrEmpty = function _testInRangeOrEmpty(min, max) {
  return function (value) {
    if (String(value).trim() === '') {
      return true;
    }
    var n = parseInt(String(value).trim(), 10);
    if (!Number.isNaN(n) && n > min && n < max) {
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
      return indicator + ' (' + period + ')';
  }
};

var AlphaIndicatorDialog = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withLoad, _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3.default)(AlphaIndicatorDialog, _Component);

  function AlphaIndicatorDialog(props) {
    (0, _classCallCheck3.default)(this, AlphaIndicatorDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AlphaIndicatorDialog.__proto__ || Object.getPrototypeOf(AlphaIndicatorDialog)).call(this));

    _this._handleClickOptions = function () {
      _this.setState({ isShowOptions: !_this.state.isShowOptions });
    };

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
        value: _crValue(_indicator, _period), //for label
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

    _this._handleMode = function (propName, value) {
      _this[propName] = value;
    };

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: true });
    _this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: _this._handleClickOptions
    });
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = {
      isToolbar: true,
      isShowLabels: true,
      isShowOptions: false
    };
    return _this;
  }

  (0, _createClass3.default)(AlphaIndicatorDialog, [{
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
          oneURI = _props.oneURI,
          oneJsonProp = _props.oneJsonProp,
          oneCaption = _props.oneCaption,
          onShow = _props.onShow,
          onFront = _props.onFront,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels,
          isShowOptions = _state.isShowOptions;


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
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: oneURI,
          jsonProp: oneJsonProp,
          caption: oneCaption,
          optionNames: 'Items',
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_DialogCell2.default.RowPattern, {
          ref: this._refTicket,
          isShowLabels: isShowLabels,
          caption: 'Ticket',
          placeholder: 'Nyse or Nasdaq Ticket',
          onTest: _testTicket,
          errorMsg: 'Not Empty'
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowOptions },
          _react2.default.createElement(_DialogCell2.default.RowPattern, {
            ref: this._refPeriod,
            isShowLabels: isShowLabels,
            caption: 'Period',
            placeholder: 'Default: ' + DF.PERIOD,
            onTest: _testPeriod,
            errorMsg: 'Number in range 1-200'
          }),
          _react2.default.createElement(_DialogCell2.default.RowPattern, {
            ref: this._refForDays,
            isShowLabels: isShowLabels,
            caption: 'For Days',
            placeholder: 'Default: ' + DF.FOR_DAYS + ' (2 Years)',
            onTest: _testForDays,
            errorMsg: 'Number in range 250-2500'
          })
        ),
        _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
          initValue: false,
          caption: 'Add Seria with Second YAxis',
          onCheck: this._handleMode.bind(null, HAS_SECOND_Y_AXIS, true),
          onUnCheck: this._handleMode.bind(null, HAS_SECOND_Y_AXIS, false)
        })
      );
    }
  }]);
  return AlphaIndicatorDialog;
}(_react.Component)) || _class) || _class);
exports.default = AlphaIndicatorDialog;
//# sourceMappingURL=AlphaIndicatorDialog.js.map