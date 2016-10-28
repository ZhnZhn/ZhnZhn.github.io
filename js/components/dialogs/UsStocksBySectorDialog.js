'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _Type = require('../../constants/Type');

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  CAPTION_SPAN: {
    display: 'inline-block',
    maxWidth: '295px'
  }
};

var sourceOptions = [{ caption: "YAHOO", "value": "YAHOO/" }, { caption: "WIKI", "value": "WIKI/" }, { caption: "GOOG/NYSE", "value": "GOOG/NYSE_" }, { caption: "GOOG/NASDAQ", "value": "GOOG/NASDAQ_" }];

var UsStocksBySectorDialog = _react2.default.createClass(_extends({
  displayName: 'UsStocksBySectorDialog'
}, _WithValidation2.default, {
  propTypes: {
    isShow: _react2.default.PropTypes.bool.isRequired,
    data: _react2.default.PropTypes.object.isRequired,
    store: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    var _props$data = this.props.data;
    var fromDate = _props$data.fromDate;
    var initToDate = _props$data.initToDate;
    var onTestDate = _props$data.onTestDate;
    var _initFromDate = fromDate ? fromDate : _DateUtils2.default.getFromDate(2);
    var _initToDate = initToDate ? initToDate : _DateUtils2.default.getToDate();
    var _onTestDate = onTestDate ? onTestDate : _DateUtils2.default.isValidDate;

    this.dataSource = undefined;
    //this.toolbarButtons =  [{ caption: 'I', onClick: this._handlerClickInfo }];

    return {
      initFromDate: _initFromDate,
      initToDate: _initToDate,
      onTestDate: _onTestDate,
      validationMessages: []
    };
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },
  _handlerSelectDataSource: function _handlerSelectDataSource(dataSource) {
    this.dataSource = dataSource;
  },
  _handlerLoad: function _handlerLoad() {
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var _props = this.props;
      var data = _props.data;
      var onClose = _props.onClose;
      var _data$item = data.item;
      var item = _data$item === undefined ? {} : _data$item;
      var chartContainerType = data.chartContainerType;
      var browserType = data.browserType;
      var id = item.id;
      var text = item.text;

      var _datesFragment$getVal = this.datesFragment.getValues();

      var fromDate = _datesFragment$getVal.fromDate;
      var toDate = _datesFragment$getVal.toDate;
      var _dataSource = this.dataSource ? this.dataSource.value : 'YAHOO/';
      var _value = '' + _dataSource + id;
      var option = {
        title: text,
        //subtitle : subtitle,
        value: _value,
        stock: _value,
        fromDate: fromDate,
        toDate: toDate,
        loadId: _Type.LoadType.WL,
        id: _value,
        columnName: 'Close',
        seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close']
      };

      _ChartActions2.default.loadStock(chartContainerType, browserType, option);
      onClose();
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var msg = [];

    var _datesFragment$getVal2 = this.datesFragment.getValidation();

    var isValid = _datesFragment$getVal2.isValid;
    var datesMsg = _datesFragment$getVal2.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var isShow = _props2.isShow;
    var _props2$data = _props2.data;
    var data = _props2$data === undefined ? {} : _props2$data;
    var _data$item2 = data.item;
    var item = _data$item2 === undefined ? {} : _data$item2;
    var onShow = data.onShow;
    var text = item.text;
    var _state = this.state;
    var initFromDate = _state.initFromDate;
    var initToDate = _state.initToDate;
    var onTestDate = _state.onTestDate;
    var validationMessages = _state.validationMessages;
    var _commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    }), _react2.default.createElement(_ToolBarButton2.default, {
      key: 'b',
      type: 'TypeC',
      caption: 'Show',
      onClick: onShow
    })];

    return _react2.default.createElement(
      _ModalDialog2.default,
      {
        caption: text,
        styleCaption: STYLE.CAPTION_SPAN,
        isShow: isShow,
        commandButtons: _commandButtons,
        onClose: this._handlerClose
      },
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Data Source',
        placeholder: 'Default: YAHOO',
        options: sourceOptions,
        onSelect: this._handlerSelectDataSource
      }),
      _react2.default.createElement(_DatesFragment2.default, {
        key: '2',
        ref: function ref(c) {
          return _this.datesFragment = c;
        },
        initFromDate: initFromDate,
        initToDate: initToDate,
        onTestDate: onTestDate
      }),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        key: '3',
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = UsStocksBySectorDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\UsStocksBySectorDialog.js.map