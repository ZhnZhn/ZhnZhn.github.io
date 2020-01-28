"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _ChartActions = _interopRequireDefault(require("../../flux/actions/ChartActions"));

var _Type = require("../../constants/Type");

var _ChartType = _interopRequireDefault(require("../../constants/ChartType"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));

var _withValidationLoad = _interopRequireDefault(require("../dialogs/decorators/withValidationLoad"));

var _class, _class2, _temp;

var getFromDate = _DateUtils["default"].getFromDate,
    getToDate = _DateUtils["default"].getToDate,
    isYmd = _DateUtils["default"].isYmd;
var S = {
  ITEM_TEXT: {
    display: 'inline-block',
    maxWidth: 200,
    height: 32,
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
};

var LoadItemDialog = (0, _withValidationLoad["default"])(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(LoadItemDialog, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      fromDate: PropTypes.string,
      initToDate: PropTypes.string,
      onTestDate: PropTypes.func
    }),
    store: PropTypes.object,
    onClose: PropTypes.func
  }
  */
  function LoadItemDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleLoad = function () {
      var validationMessages = _this._createValidationMessages();

      if (validationMessages.isValid) {
        var _this$props = _this.props,
            data = _this$props.data,
            onClose = _this$props.onClose,
            id = data.id,
            title = data.title,
            subtitle = data.subtitle,
            caption = data.caption,
            columnName = data.columnName,
            dataColumn = data.dataColumn,
            seriaColumnNames = data.seriaColumnNames,
            _data$itemConf = data.itemConf,
            itemConf = _data$itemConf === void 0 ? {} : _data$itemConf,
            _this$datesFragment$g = _this.datesFragment.getValues(),
            fromDate = _this$datesFragment$g.fromDate,
            toDate = _this$datesFragment$g.toDate,
            option = (0, _extends2["default"])({
          id: id,
          title: title,
          subtitle: subtitle,
          value: caption,
          item: caption,
          fromDate: fromDate,
          toDate: toDate,
          columnName: columnName,
          dataColumn: dataColumn,
          seriaColumnNames: seriaColumnNames,
          loadId: itemConf.loadId || _Type.LoadType.WL
        }, itemConf);

        _ChartActions["default"].loadStock({
          chartType: _ChartType["default"].WATCH_LIST,
          browserType: _Type.BrowserType.WATCH_LIST
        }, option);

        onClose();
      }

      _this._updateValidationMessages(validationMessages);
    };

    _this._createValidationMessages = function () {
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
      _this._handleWithValidationClose(_this._createValidationMessages);

      _this.props.onClose();
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    var _props$data = props.data,
        _fromDate = _props$data.fromDate,
        initToDate = _props$data.initToDate,
        onTestDate = _props$data.onTestDate;
    _this._commandButtons = [_react["default"].createElement(_DialogCell["default"].Button.Load, {
      key: "load",
      onClick: _this._handleLoad
    })];
    _this.state = {
      initFromDate: _fromDate || getFromDate(2),
      initToDate: initToDate || getToDate(),
      onTestDate: onTestDate || isYmd,
      validationMessages: []
    };
    return _this;
  }

  var _proto = LoadItemDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        data = _this$props2.data,
        caption = data.caption,
        _this$state = this.state,
        initFromDate = _this$state.initFromDate,
        initToDate = _this$state.initToDate,
        onTestDate = _this$state.onTestDate,
        validationMessages = _this$state.validationMessages;
    return _react["default"].createElement(_ModalDialog["default"], {
      caption: "Load Item",
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: this._handleClose
    }, _react["default"].createElement(_DialogCell["default"].Row.Text, {
      styleText: S.ITEM_TEXT,
      caption: "Item:",
      text: caption
    }), _react["default"].createElement(_DialogCell["default"].DatesFragment, {
      ref: this._refDates,
      initFromDate: initFromDate,
      initToDate: initToDate,
      onTestDate: onTestDate
    }), _react["default"].createElement(_ValidationMessages["default"], {
      validationMessages: validationMessages
    }));
  };

  return LoadItemDialog;
}(_react.Component), _class2.defaultProps = {
  data: {}
}, _temp)) || _class;

var _default = LoadItemDialog;
exports["default"] = _default;
//# sourceMappingURL=LoadItemDialog.js.map