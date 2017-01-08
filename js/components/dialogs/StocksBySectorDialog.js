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

var _RowText = require('./RowText');

var _RowText2 = _interopRequireDefault(_RowText);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ABSENT = "Absent",
    ABSENT_VALIDATION_MSG = "Data Source for this item Absent";

var STYLE = {
  CAPTION_SPAN: {
    display: 'inline-block',
    maxWidth: '295px'
  }
};

var StocksBySectorDialog = _react2.default.createClass(_extends({
  displayName: 'StocksBySectorDialog'
}, _WithValidation2.default, {
  propTypes: {
    isShow: _react2.default.PropTypes.bool.isRequired,
    data: _react2.default.PropTypes.object.isRequired,
    store: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    var _props$data = this.props.data,
        fromDate = _props$data.fromDate,
        initToDate = _props$data.initToDate,
        onTestDate = _props$data.onTestDate,
        _initFromDate = fromDate ? fromDate : _DateUtils2.default.getFromDate(2),
        _initToDate = initToDate ? initToDate : _DateUtils2.default.getToDate(),
        _onTestDate = onTestDate ? onTestDate : _DateUtils2.default.isValidDate;

    return {
      initFromDate: _initFromDate,
      initToDate: _initToDate,
      onTestDate: _onTestDate,
      validationMessages: []
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data && this.state.validationMessages.length !== 0) {
      this.setState({ validationMessages: [] });
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },
  _handlerLoad: function _handlerLoad() {
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var _props = this.props,
          data = _props.data,
          onClose = _props.onClose,
          _data$item = data.item,
          item = _data$item === undefined ? {} : _data$item,
          browserType = data.browserType,
          chartContainerType = data.chartContainerType,
          id = item.id,
          text = item.text,
          _datesFragment$getVal = this.datesFragment.getValues(),
          fromDate = _datesFragment$getVal.fromDate,
          toDate = _datesFragment$getVal.toDate,
          option = {
        title: text,
        //subtitle : subtitle,
        value: id,
        //stock: id,
        stock: item,
        fromDate: fromDate,
        toDate: toDate,
        loadId: _Type.LoadType.WL,
        id: id,
        linkFn: 'NASDAQ',
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
    var data = this.props.data,
        item = data.item,
        id = item.id,
        _arr = id.split('/');


    if (!(_arr.length > 1)) {
      msg.push(ABSENT_VALIDATION_MSG);
    }

    var _datesFragment$getVal2 = this.datesFragment.getValidation(),
        isValid = _datesFragment$getVal2.isValid,
        datesMsg = _datesFragment$getVal2.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props,
        isShow = _props2.isShow,
        _props2$data = _props2.data,
        data = _props2$data === undefined ? {} : _props2$data,
        _data$item2 = data.item,
        item = _data$item2 === undefined ? {} : _data$item2,
        onShow = data.onShow,
        text = item.text,
        id = item.id,
        _state = this.state,
        initFromDate = _state.initFromDate,
        initToDate = _state.initToDate,
        onTestDate = _state.onTestDate,
        validationMessages = _state.validationMessages,
        _commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    }), _react2.default.createElement(_ToolBarButton2.default, {
      key: 'b',
      type: 'TypeC',
      caption: 'Show',
      onClick: onShow
    })],
        _arr = id.split('/'),
        _text = _arr.length > 1 ? id.split('/')[0] : ABSENT;

    return _react2.default.createElement(
      _ModalDialog2.default,
      {
        caption: text,
        styleCaption: STYLE.CAPTION_SPAN,
        isShow: isShow,
        commandButtons: _commandButtons,
        onClose: this._handlerClose
      },
      _react2.default.createElement(_RowText2.default, {
        key: '1',
        caption: 'Source:',
        text: _text
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

exports.default = StocksBySectorDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\StocksBySectorDialog.js.map