"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ChartType = require("../../constants/ChartType");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

var _dec, _class;

const {
  Decor,
  crMenuMore
} = _DialogCell.default;
const unitOptions = [{
  "caption": "Thousand Barrels per day (kb/d)",
  "value": "KD"
}, {
  "caption": "Thousand Barrels (kbbl)",
  "value": "KB"
}, {
  "caption": "Thousand Kilolitres (kl)",
  "value": "KL"
}, {
  "caption": "Thousand Metric Tons (kmt)",
  "value": "KT"
}, {
  "caption": "Conversion factor barrels/ktons",
  "value": "BK"
}];
const chartOptions = [{
  caption: "AreaSpline",
  value: _ChartType.CHT_AREA
}, {
  caption: "Yearly by Month",
  value: _ChartType.CHT_YEARLY
}];
let JodiWorldOilDialog = (_dec = Decor.dialog, _dec(_class = class JodiWorldOilDialog extends _react.Component {
  constructor(props) {
    super(props); //this.country = null
    //this.product = null
    //this.flow = null
    //this.units = null
    //this.chartType = undefined

    this._hSelectCountry = country => {
      this.country = country;
    };

    this._hSelectUnits = units => {
      this.units = units;
    };

    this._hSelectChartType = chartType => {
      this.chartType = chartType;
    };

    this._handleLoad = () => {
      this._handleWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
    };

    this._createValidationMessages = () => {
      const {
        msgOnNotSelected
      } = this.props;
      let msg = [];

      if (!this.country) {
        msg.push(msgOnNotSelected('Country'));
      }

      const {
        isValid: isValid1,
        msg: msg1
      } = this.productFlow.getValidation();

      if (!isValid1) {
        msg = msg.concat(msg1);
      }

      if (!this.units) {
        this.units = unitOptions[0];
      }

      const {
        isValid,
        datesMsg
      } = this.datesFragment.getValidation();

      if (!isValid) {
        msg = msg.concat(datesMsg);
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    this._createLoadOption = () => {
      const {
        one: product,
        two: flow
      } = this.productFlow.getValues(),
            {
        fromDate,
        toDate
      } = this.datesFragment.getValues(),
            seriaType = this.chartType ? this.chartType.value : void 0,
            {
        fnValue,
        dataColumn,
        loadId,
        dataSource
      } = this.props;
      return {
        value: fnValue(this.country.value, product.value, flow.value, this.units.value),
        title: this.country.caption + ": " + product.caption,
        subtitle: flow.caption + ": " + this.units.caption,
        fromDate,
        toDate,
        dataColumn,
        seriaType,
        loadId,
        dataSource
      };
    };

    this._handleClose = () => {
      this._handleWithValidationClose();
    };

    this._refProductFlow = c => this.productFlow = c;

    this._refDates = c => this.datesFragment = c;

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    });
    this.toolbarButtons = this._createType2WithToolbar(props, {
      isShowOptions: true
    });
    this._commandButtons = this._crCommandsWithLoad(this);
    this.state = { ...this._isWithInitialState(),
      isShowDate: false,
      isShowOptions: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  }

  render() {
    const {
      caption,
      isShow,
      onShow,
      onFront,
      oneCaption,
      oneURI,
      oneJsonProp,
      parentCaption,
      parentChildURI,
      parentJsonProp,
      childCaption,
      msgOnNotSelected,
      initFromDate,
      initToDate,
      msgOnNotValidFormat,
      onTestDate
    } = this.props,
          {
      isToolbar,
      isShowLabels,
      isShowDate,
      isShowOptions,
      validationMessages
    } = this.state;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
        isShow: isToolbar,
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
        isShow: isShow,
        isShowLabels: isShowLabels,
        uri: oneURI,
        jsonProp: oneJsonProp,
        caption: oneCaption,
        optionNames: "Items",
        onSelect: this._hSelectCountry
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
        ref: this._refProductFlow,
        isShow: isShow,
        isShowLabels: isShowLabels,
        uri: parentChildURI,
        oneCaption: parentCaption,
        oneJsonProp: parentJsonProp,
        twoCaption: childCaption,
        msgOnNotSelected: msgOnNotSelected
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Units",
        options: unitOptions,
        onSelect: this._hSelectUnits
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
        isShow: isShowDate,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.DatesFragment, {
          ref: this._refDates,
          isShowLabels: isShowLabels,
          initFromDate: initFromDate,
          initToDate: initToDate,
          msgOnNotValidFormat: msgOnNotValidFormat,
          onTestDate: onTestDate
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
        isShow: isShowOptions,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: "Chart Type",
          placeholder: "Default: AreaSpline",
          options: chartOptions,
          onSelect: this._hSelectChartType
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
        validationMessages: validationMessages
      })]
    });
  }

}) || _class);
var _default = JodiWorldOilDialog;
exports.default = _default;
//# sourceMappingURL=JodiWorldOilDialog.js.map