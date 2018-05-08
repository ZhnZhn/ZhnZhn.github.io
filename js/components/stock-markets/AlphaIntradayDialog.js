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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _withToolbar = require('../dialogs/decorators/withToolbar');

var _withToolbar2 = _interopRequireDefault(_withToolbar);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF = {
  INTERVAL: '15min'
};

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
        value: _value //for label
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

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: true });
    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, { onClick: _this._handleLoad })];
    _this.state = {
      isToolbar: true,
      isShowLabels: true
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
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels;


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
          title: 'Ticket',
          placeholder: 'Nyse or Nasdaq Ticket',
          onTest: _testTicket,
          errorMsg: 'Not Empty'
        }),
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          isShowLabels: isShowLabels,
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
//# sourceMappingURL=AlphaIntradayDialog.js.map