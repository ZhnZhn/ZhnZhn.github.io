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

var _class;
//import SelectWithLoad from '../dialogs/SelectWithLoad'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _RowPattern = require('../dialogs/RowPattern');

var _RowPattern2 = _interopRequireDefault(_RowPattern);

var _Button = require('../dialogs/Button');

var _Button2 = _interopRequireDefault(_Button);

var _withToolbar = require('../dialogs/decorators/withToolbar');

var _withToolbar2 = _interopRequireDefault(_withToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF = {
  INTERVAL: '15min'
};
//const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

var _testTicket = function _testTicket(value) {
  if (String(value).trim() === '') {
    return false;
  } else {
    return true;
  }
};

var _intervalOptions = [{ caption: '1 min', value: '1min' }, { caption: '5 min', value: '5min' }, { caption: '15 min', value: '15min' }, { caption: '30 min', value: '30min' }, { caption: '60 min', value: '60min' }];

var AlphaIntradayDialog = (0, _withToolbar2.default)(_class = function (_Component) {
  (0, _inherits3.default)(AlphaIntradayDialog, _Component);

  function AlphaIntradayDialog(props) {
    (0, _classCallCheck3.default)(this, AlphaIntradayDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AlphaIntradayDialog.__proto__ || Object.getPrototypeOf(AlphaIntradayDialog)).call(this));

    _this._handleSelectInterval = function (item) {
      _this.interval = item;
    };

    _this._handleLoad = function () {
      var _ticket = _this.ticketComp.isValid() ? _this.ticketComp.getValue() : undefined,
          _interval = _this.interval ? _this.interval.value : DF.INTERVAL,
          _value = _ticket + ' (' + _interval + ')';
      var option = {
        loadId: 'AL_I',
        indicator: 'TIME_SERIES_INTRADAY',
        interval: _interval,
        ticket: _ticket,
        value: _value };
      _this.props.onLoad(option);
    };

    _this._handleClose = function () {
      //this._handleWithValidationClose(this._createValidationMessages);
      _this.props.onClose();
    };

    _this._refTicket = function (comp) {
      _this.ticketComp = comp;
    };

    _this.toolbarButtons = _this._createType2WithToolbar(props, true);
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Load, { onClick: _this._handleLoad })];
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
          onFront = _props.onFront;


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_ToolbarButtonCircle2.default, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_RowPattern2.default, {
          ref: this._refTicket,
          title: 'Ticket',
          placeholder: 'Nyse or Nasdaq Ticket',
          onTest: _testTicket,
          errorMsg: 'Not Empty'
        }),
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: 'Interval',
          placeholder: 'Default: 15min',
          options: _intervalOptions,
          onSelect: this._handleSelectInterval
        })
      );
    }
  }]);
  return AlphaIntradayDialog;
}(_react.Component)) || _class;

exports.default = AlphaIntradayDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\AlphaIntradayDialog.js.map