'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _Type = require('../../constants/Type');

var _ChartType = require('../../constants/ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var LoadItemDialog = _react2.default.createClass((0, _extends3.default)({
  displayName: 'LoadItemDialog'
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
          id = data.id,
          title = data.title,
          subtitle = data.subtitle,
          caption = data.caption,
          columnName = data.columnName,
          dataColumn = data.dataColumn,
          seriaColumnNames = data.seriaColumnNames,
          _datesFragment$getVal = this.datesFragment.getValues(),
          fromDate = _datesFragment$getVal.fromDate,
          toDate = _datesFragment$getVal.toDate,
          option = {
        title: title,
        subtitle: subtitle,
        value: caption,
        stock: caption,
        fromDate: fromDate,
        toDate: toDate,
        loadId: _Type.LoadType.WL,
        id: id,
        columnName: columnName,
        dataColumn: dataColumn,
        seriaColumnNames: seriaColumnNames
      };

      _ChartActions2.default.loadStock(_ChartType2.default.WATCH_LIST, _Type.BrowserType.WATCH_LIST, option);
      onClose();
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var msg = [];

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
        data = _props2.data,
        caption = data.caption,
        _state = this.state,
        initFromDate = _state.initFromDate,
        initToDate = _state.initToDate,
        onTestDate = _state.onTestDate,
        validationMessages = _state.validationMessages,
        _commandButtons = [_react2.default.createElement(_ActionButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    })];

    return _react2.default.createElement(
      _ModalDialog2.default,
      {
        caption: 'Load Item',
        isShow: isShow,
        commandButtons: _commandButtons,
        onClose: this._handlerClose
      },
      _react2.default.createElement(
        'div',
        { style: Object.assign({}, styles.rowDiv, { lineHeight: 2 }), key: '1' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Item:'
        ),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: 'bold' } },
          caption
        )
      ),
      _react2.default.createElement(_DatesFragment2.default, {
        ref: function ref(c) {
          return _this.datesFragment = c;
        },
        initFromDate: initFromDate,
        initToDate: initToDate,
        onTestDate: onTestDate
      }),
      _react2.default.createElement(_ValidationMessages2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = LoadItemDialog;
//# sourceMappingURL=LoadItemDialog.js.map