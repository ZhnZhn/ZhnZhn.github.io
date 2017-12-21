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

var _class, _class2, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _Type = require('../../constants/Type');

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DialogCell = require('./DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _withValidationLoad = require('./decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  CAPTION_SPAN: {
    display: 'inline-block',
    maxWidth: '295px'
  }
};

var sourceOptions = [{ caption: "WIKI", "value": "WIKI/" }];

var UsStocksBySectorDialog = (0, _withValidationLoad2.default)(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(UsStocksBySectorDialog, _Component);

  function UsStocksBySectorDialog(props) {
    (0, _classCallCheck3.default)(this, UsStocksBySectorDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UsStocksBySectorDialog.__proto__ || Object.getPrototypeOf(UsStocksBySectorDialog)).call(this));

    _initialiseProps.call(_this);

    _this.dataSource = undefined;

    var _props$data = props.data,
        fromDate = _props$data.fromDate,
        initToDate = _props$data.initToDate,
        onTestDate = _props$data.onTestDate,
        _initFromDate = fromDate ? fromDate : _DateUtils2.default.getFromDate(2),
        _initToDate = initToDate ? initToDate : _DateUtils2.default.getToDate(),
        _onTestDate = onTestDate ? onTestDate : _DateUtils2.default.isValidDate;

    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, { onClick: _this._handleLoad }), _react2.default.createElement(_DialogCell2.default.Button.Show, { onClick: props.data.onShow })];
    _this.state = {
      initFromDate: _initFromDate,
      initToDate: _initToDate,
      onTestDate: _onTestDate,
      validationMessages: []
    };

    return _this;
  }

  (0, _createClass3.default)(UsStocksBySectorDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isShow = _props.isShow,
          _props$data2 = _props.data,
          data = _props$data2 === undefined ? {} : _props$data2,
          _data$item = data.item,
          item = _data$item === undefined ? {} : _data$item,
          text = item.text,
          _state = this.state,
          initFromDate = _state.initFromDate,
          initToDate = _state.initToDate,
          onTestDate = _state.onTestDate,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: text,
          styleCaption: STYLE.CAPTION_SPAN,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          caption: 'Source',
          placeholder: 'Default: WIKI',
          options: sourceOptions,
          onSelect: this._handleSelectDataSource
        }),
        _react2.default.createElement(_DialogCell2.default.DatesFragment, {
          ref: function ref(c) {
            return _this2.datesFragment = c;
          },
          initFromDate: initFromDate,
          initToDate: initToDate,
          onTestDate: onTestDate
        }),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return UsStocksBySectorDialog;
}(_react.Component), _class2.defaultProps = {
  data: {}
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._handleSelectDataSource = function (dataSource) {
    _this3.dataSource = dataSource;
  };

  this._handleLoad = function () {
    var validationMessages = _this3._getValidationMessages();
    if (validationMessages.isValid) {
      var _props2 = _this3.props,
          data = _props2.data,
          onClose = _props2.onClose,
          _data$item2 = data.item,
          item = _data$item2 === undefined ? {} : _data$item2,
          chartContainerType = data.chartContainerType,
          browserType = data.browserType,
          id = item.id,
          text = item.text,
          _datesFragment$getVal = _this3.datesFragment.getValues(),
          fromDate = _datesFragment$getVal.fromDate,
          toDate = _datesFragment$getVal.toDate,
          _dataSource = _this3.dataSource ? _this3.dataSource.value : 'WIKI/',
          _value = '' + _dataSource + id,
          option = {
        title: text,
        //subtitle : subtitle,
        value: _value,
        stock: _value,
        fromDate: fromDate,
        toDate: toDate,
        loadId: _Type.LoadType.WL,
        id: _value,
        columnName: 'Close',
        seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close'],
        dataSource: '(Code: ' + _dataSource + ')'
      };

      _ChartActions2.default.loadStock({ chartType: chartContainerType, browserType: browserType }, option);
      onClose();
    }
    _this3._updateValidationMessages(validationMessages);
  };

  this._getValidationMessages = function () {
    var msg = [];

    var _datesFragment$getVal2 = _this3.datesFragment.getValidation(),
        isValid = _datesFragment$getVal2.isValid,
        datesMsg = _datesFragment$getVal2.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  };

  this._handleClose = function () {
    if (_this3.state.validationMessages.length > 0) {
      _this3.setState({ validationMessages: _this3._getValidationMessages() });
    }
    _this3.props.onClose();
  };
}, _temp)) || _class;

UsStocksBySectorDialog.propTypes = process.env.NODE_ENV !== "production" ? {
  isShow: _propTypes2.default.bool.isRequired,
  data: _propTypes2.default.object.isRequired,
  store: _propTypes2.default.object,
  onClose: _propTypes2.default.func.isRequired
} : {};
exports.default = UsStocksBySectorDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\UsStocksBySectorDialog.js.map