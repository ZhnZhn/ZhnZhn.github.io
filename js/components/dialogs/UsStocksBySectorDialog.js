'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var _withValidationLoad = require('./decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE = {
  CAPTION_SPAN: {
    display: 'inline-block',
    maxWidth: '295px'
  }
};

var sourceOptions = [{ caption: "YAHOO", "value": "YAHOO/" }, { caption: "WIKI", "value": "WIKI/" }, { caption: "GOOG/NYSE", "value": "GOOG/NYSE_" }, { caption: "GOOG/NASDAQ", "value": "GOOG/NASDAQ_" }];

var UsStocksBySectorDialog = (0, _withValidationLoad2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(UsStocksBySectorDialog, _Component);

  function UsStocksBySectorDialog(props) {
    _classCallCheck(this, UsStocksBySectorDialog);

    var _this = _possibleConstructorReturn(this, (UsStocksBySectorDialog.__proto__ || Object.getPrototypeOf(UsStocksBySectorDialog)).call(this));

    _initialiseProps.call(_this);

    _this.dataSource = undefined;

    var _props$data = props.data,
        fromDate = _props$data.fromDate,
        initToDate = _props$data.initToDate,
        onTestDate = _props$data.onTestDate,
        _initFromDate = fromDate ? fromDate : _DateUtils2.default.getFromDate(2),
        _initToDate = initToDate ? initToDate : _DateUtils2.default.getToDate(),
        _onTestDate = onTestDate ? onTestDate : _DateUtils2.default.isValidDate;

    _this.state = {
      initFromDate: _initFromDate,
      initToDate: _initToDate,
      onTestDate: _onTestDate,
      validationMessages: []
    };

    return _this;
  }

  _createClass(UsStocksBySectorDialog, [{
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
          onShow = data.onShow,
          text = item.text,
          _state = this.state,
          initFromDate = _state.initFromDate,
          initToDate = _state.initToDate,
          onTestDate = _state.onTestDate,
          validationMessages = _state.validationMessages,
          _commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
        key: 'a',
        type: 'TypeC',
        caption: 'Load',
        onClick: this._handleLoad
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
          onClose: this._handleClose
        },
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: 'Data Source',
          placeholder: 'Default: YAHOO',
          options: sourceOptions,
          onSelect: this._handleSelectDataSource
        }),
        _react2.default.createElement(_DatesFragment2.default, {
          ref: function ref(c) {
            return _this2.datesFragment = c;
          },
          initFromDate: initFromDate,
          initToDate: initToDate,
          onTestDate: onTestDate
        }),
        _react2.default.createElement(_ValidationMessagesFragment2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);

  return UsStocksBySectorDialog;
}(_react.Component), _initialiseProps = function _initialiseProps() {
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
          _dataSource = _this3.dataSource ? _this3.dataSource.value : 'YAHOO/',
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
        seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close']
      };

      _ChartActions2.default.loadStock(chartContainerType, browserType, option);
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

UsStocksBySectorDialog.propTypes = {
  isShow: _react.PropTypes.bool.isRequired,
  data: _react.PropTypes.object.isRequired,
  store: _react.PropTypes.object,
  onClose: _react.PropTypes.func.isRequired
};
UsStocksBySectorDialog.defaultProps = {
  data: {}
};
UsStocksBySectorDialog.displaName = 'UsStocksBySectorDialog';

exports.default = UsStocksBySectorDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\UsStocksBySectorDialog.js.map