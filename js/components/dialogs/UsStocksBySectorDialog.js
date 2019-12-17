"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _ChartActions = _interopRequireDefault(require("../../flux/actions/ChartActions"));

var _Type = require("../../constants/Type");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _withValidationLoad = _interopRequireDefault(require("./decorators/withValidationLoad"));

var _class, _class2, _temp;

var getFromDate = _DateUtils["default"].getFromDate,
    getToDate = _DateUtils["default"].getToDate,
    isYmd = _DateUtils["default"].isYmd;
var STYLE = {
  CAPTION_SPAN: {
    display: 'inline-block',
    maxWidth: '295px'
  }
};
var sourceOptions = [{
  caption: "WIKI",
  "value": "WIKI/"
}];

var UsStocksBySectorDialog = (0, _withValidationLoad["default"])(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(UsStocksBySectorDialog, _Component);

  /*
   static propTypes = {
     isShow: PropTypes.bool.isRequired,
     data: PropTypes.object.isRequired,
     store: PropTypes.object,
     onClose: PropTypes.func.isRequired
   }
   */
  function UsStocksBySectorDialog(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._handleSelectDataSource = function (dataSource) {
      _this.dataSource = dataSource;
    };

    _this._handleLoad = function () {
      var validationMessages = _this._getValidationMessages();

      if (validationMessages.isValid) {
        var _this$props = _this.props,
            data = _this$props.data,
            onClose = _this$props.onClose,
            _data$item = data.item,
            item = _data$item === void 0 ? {} : _data$item,
            chartContainerType = data.chartContainerType,
            browserType = data.browserType,
            id = item.id,
            text = item.text,
            _this$datesFragment$g = _this.datesFragment.getValues(),
            fromDate = _this$datesFragment$g.fromDate,
            toDate = _this$datesFragment$g.toDate,
            _dataSource = _this.dataSource ? _this.dataSource.value : 'WIKI/',
            _value = "" + _dataSource + id,
            option = {
          title: text,
          value: _value,
          item: _value,
          fromDate: fromDate,
          toDate: toDate,
          loadId: _Type.LoadType.WL,
          id: _value,
          columnName: 'Close',
          seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close'],
          dataSource: "(Code: " + _dataSource + ")"
        };

        _ChartActions["default"].loadStock({
          chartType: chartContainerType,
          browserType: browserType
        }, option);

        onClose();
      }

      _this._updateValidationMessages(validationMessages);
    };

    _this._getValidationMessages = function () {
      var msg = [];

      var _this$datesFragment$g2 = _this.datesFragment.getValidation(),
          isValid = _this$datesFragment$g2.isValid,
          datesMsg = _this$datesFragment$g2.datesMsg;

      if (!isValid) {
        msg = msg.concat(datesMsg);
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._handleClose = function () {
      if (_this.state.validationMessages.length > 0) {
        _this.setState({
          validationMessages: _this._getValidationMessages()
        });
      }

      _this.props.onClose();
    };

    _this.dataSource = undefined;
    var _props$data = props.data,
        _fromDate = _props$data.fromDate,
        initToDate = _props$data.initToDate,
        onTestDate = _props$data.onTestDate;
    _this._commandButtons = [_react["default"].createElement(_DialogCell["default"].Button.Load, {
      key: "load",
      onClick: _this._handleLoad
    }), _react["default"].createElement(_DialogCell["default"].Button.Show, {
      key: "show",
      onClick: props.data.onShow
    })];
    _this.state = {
      initFromDate: _fromDate || getFromDate(2),
      initToDate: initToDate || getToDate(),
      onTestDate: onTestDate || isYmd,
      validationMessages: []
    };
    return _this;
  }

  var _proto = UsStocksBySectorDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        _this$props2$data = _this$props2.data,
        data = _this$props2$data === void 0 ? {} : _this$props2$data,
        _data$item2 = data.item,
        item = _data$item2 === void 0 ? {} : _data$item2,
        text = item.text,
        _this$state = this.state,
        initFromDate = _this$state.initFromDate,
        initToDate = _this$state.initToDate,
        onTestDate = _this$state.onTestDate,
        validationMessages = _this$state.validationMessages;
    return _react["default"].createElement(_ModalDialog["default"], {
      caption: text,
      styleCaption: STYLE.CAPTION_SPAN,
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: this._handleClose
    }, _react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      caption: "Source",
      placeholder: "Default: WIKI",
      options: sourceOptions,
      onSelect: this._handleSelectDataSource
    }), _react["default"].createElement(_DialogCell["default"].DatesFragment, {
      ref: function ref(c) {
        return _this2.datesFragment = c;
      },
      initFromDate: initFromDate,
      initToDate: initToDate,
      onTestDate: onTestDate
    }), _react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return UsStocksBySectorDialog;
}(_react.Component), _class2.defaultProps = {
  data: {}
}, _temp)) || _class;

var _default = UsStocksBySectorDialog;
exports["default"] = _default;
//# sourceMappingURL=UsStocksBySectorDialog.js.map