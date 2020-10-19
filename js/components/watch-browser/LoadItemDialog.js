"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _ChartActions = _interopRequireDefault(require("../../flux/actions/ChartActions"));

var _Type = require("../../constants/Type");

var _ChartType = _interopRequireDefault(require("../../constants/ChartType"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));

var _Decorators = _interopRequireDefault(require("../dialogs/decorators/Decorators"));

var _dec, _class, _class2, _temp;

var getFromDate = _DateUtils["default"].getFromDate,
    getToDate = _DateUtils["default"].getToDate,
    isYmd = _DateUtils["default"].isYmd,
    mlsToDmy = _DateUtils["default"].mlsToDmy;
var S = {
  DIALOG: {
    width: 365
  },
  DIALOG_SHORT: {
    width: 265
  },
  ITEM_TEXT: {
    display: 'inline-block',
    maxWidth: 250,
    height: 32,
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
};

var _crValue = function _crValue(x, y) {
  if (x === void 0) {
    x = '';
  }

  if (y === void 0) {
    y = '';
  }

  return (y + " " + mlsToDmy(x)).trim();
};

var LoadItemDialog = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
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
        onTestDate = _props$data.onTestDate,
        _props$data$itemConf = _props$data.itemConf,
        _itemConf = _props$data$itemConf === void 0 ? {} : _props$data$itemConf,
        isValue = !!_itemConf.x;

    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      isValue: isValue
    });
    _this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Button.Load, {
      onClick: _this._handleLoad
    }, "load")];
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isShowDate: false,
      isValue: isValue,
      initFromDate: _fromDate || getFromDate(2),
      initToDate: initToDate || getToDate(),
      onTestDate: onTestDate || isYmd
    });
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
        _data$itemConf2 = data.itemConf,
        itemConf = _data$itemConf2 === void 0 ? {} : _data$itemConf2,
        dataSource = itemConf.dataSource,
        x = itemConf.x,
        y = itemConf.y,
        _this$state = this.state,
        isShowLabels = _this$state.isShowLabels,
        isShowDate = _this$state.isShowDate,
        isValue = _this$state.isValue,
        initFromDate = _this$state.initFromDate,
        initToDate = _this$state.initToDate,
        onTestDate = _this$state.onTestDate,
        validationMessages = _this$state.validationMessages,
        _style = isShowLabels ? S.DIALOG : S.DIALOG_SHORT,
        _value = _crValue(x, y);

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog["default"], {
      style: _style,
      isShow: isShow,
      caption: "Load Item",
      commandButtons: this._commandButtons,
      onClose: this._handleClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Toolbar, {
        isShow: true,
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Row.Text, {
        isShowLabels: isShowLabels,
        styleText: S.ITEM_TEXT,
        caption: "Item:",
        text: caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ShowHide, {
        isShow: isValue,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Row.Text, {
          isShowLabels: isShowLabels,
          styleText: S.ITEM_TEXT,
          caption: "Value:",
          text: _value
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ShowHide, {
        isShow: isShowDate,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].DatesFragment, {
          ref: this._refDates,
          isShowLabels: isShowLabels,
          initFromDate: initFromDate,
          initToDate: initToDate,
          onTestDate: onTestDate
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Row.Text, {
        isShowLabels: isShowLabels,
        styleText: S.ITEM_TEXT,
        caption: "Source:",
        text: dataSource
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages["default"], {
        validationMessages: validationMessages
      })]
    });
  };

  return LoadItemDialog;
}(_react.Component), _class2.defaultProps = {
  data: {}
}, _temp)) || _class);
var _default = LoadItemDialog;
exports["default"] = _default;
//# sourceMappingURL=LoadItemDialog.js.map