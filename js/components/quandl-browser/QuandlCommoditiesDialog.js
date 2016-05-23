'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _ZhSelect = require('../ZhSelect');

var _ZhSelect2 = _interopRequireDefault(_ZhSelect);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _QuandlCommodity = require('../../services/qe/QuandlCommodity');

var _QuandlCommodity2 = _interopRequireDefault(_QuandlCommodity);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var QuandlCommoditiesDialog = _react2.default.createClass(_extends({
  displayName: 'QuandlCommoditiesDialog'
}, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    return {
      itemType: null,
      itemCommodity: null,
      optionTypes: _QuandlCommodity2.default.getCommodityTypes(),
      optionCommodities: [],
      inputErrMsg: null,
      validationMessages: [],
      isFirstRender: true
    };
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }
    return true;
  },
  _handlerSelectType: function _handlerSelectType(itemType) {
    if (itemType !== null) {
      this.state.itemType = itemType;
      this.state.itemCommodity = null;
      this.state.optionCommodities = _QuandlCommodity2.default.getCommodities(itemType.value);
      this.setState(this.state);
    } else {
      this.state.itemType = null;
      this.state.itemCommodity = null;
    }
  },
  _handlerSelectCommodity: function _handlerSelectCommodity(itemCommodity) {
    this.state.itemCommodity = itemCommodity;
  },
  _handlerLoad: function _handlerLoad(event) {

    event.target.focus();
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var _refs$datesFragment$g = this.refs.datesFragment.getValues();

      var fromDate = _refs$datesFragment$g.fromDate;
      var toDate = _refs$datesFragment$g.toDate;
      var _state = this.state;
      var itemType = _state.itemType;
      var itemCommodity = _state.itemCommodity;

      var option = {
        value: itemCommodity.value,
        type: itemType,
        commodity: itemCommodity,
        fromDate: fromDate,
        toDate: toDate
      };
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var validationMessages = [];
    if (!this.state.itemType) {
      validationMessages.push("Type is Required to Select");
    }
    if (!this.state.itemCommodity) {
      validationMessages.push("Commodity is Required to Select");
    }
    if (!this.refs.datesFragment.isValid()) {
      validationMessages.push("Some Date is not in Valid Format");
    }
    validationMessages.isValid = validationMessages.length === 0 ? true : false;

    return validationMessages;
  },
  render: function render() {
    var commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    })];

    var optionTypes = void 0,
        optionCommodities = void 0;
    if (this.state.isFirstRender) {
      optionTypes = this.state.optionTypes;
      optionCommodities = this.state.optionCommodities;
    } else {
      optionTypes = [];
      optionCommodities = [];
      this.state.isFirstRender = false;
    }

    var _props = this.props;
    var isShow = _props.isShow;
    var onShow = _props.onShow;
    var onClose = _props.onClose;


    return _react2.default.createElement(
      _ZhDialog2.default,
      {
        caption: 'Quandl Commodity Prices',
        isShow: isShow,
        commandButtons: commandButtons,
        onShowChart: onShow,
        onClose: this._handlerClose
      },
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '1' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Type:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          width: '250',
          onSelect: this._handlerSelectType
          //options={optionTypes}
          , options: this.state.optionTypes
        })
      ),
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '2' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Commodity:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          width: '250',
          onSelect: this._handlerSelectCommodity
          //options={optionCommodities}
          , options: this.state.optionCommodities
        })
      ),
      _react2.default.createElement(_DatesFragment2.default, {
        key: '3',
        ref: 'datesFragment',
        initFromDate: this.props.initFromDate,
        initToDate: this.props.initToDate,
        onTestDate: this.props.onTestDate
      }),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        key: '4',
        validationMessages: this.state.validationMessages
      })
    );
  }
}));

exports.default = QuandlCommoditiesDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\QuandlCommoditiesDialog.js.map