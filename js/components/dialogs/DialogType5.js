"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ChartType = require("../../constants/ChartType");

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

var _dec, _class;

const {
  Decor,
  crMenuMore
} = _DialogCell.default;
const HAS_SECOND_Y_AXIS = 'hasSecondYAxis';
const CHART_TYPE_OPTIONS = [{
  caption: 'Default: Area',
  value: _ChartType.CHT_AREA
}, {
  caption: 'Scatter: Label Up',
  value: _ChartType.CHT_SCATTER_UP
}, {
  caption: 'Scatter: Label Down',
  value: _ChartType.CHT_SCATTER_DOWN
}];
let DialogType5 = (_dec = Decor.dialog, _dec(_class = class DialogType5 extends _react.Component {
  constructor(props) {
    super(props);

    this._handleSelectOne = one => {
      this.one = one;
    };

    this._handleLoad = () => {
      this._handleWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
    };

    this._createValidationMessages = () => {
      const {
        oneCaption
      } = this.props;
      let msg = [];

      if (!this.one) {
        msg.push(this.props.msgOnNotSelected(oneCaption));
      }

      const {
        isValid: isValid1,
        msg: msg1
      } = this.twoThree.getValidation();

      if (!isValid1) {
        msg = msg.concat(msg1);
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
        one: two,
        two: three
      } = this.twoThree.getValues(),
            {
        fromDate,
        toDate
      } = this.datesFragment.getValues(),
            seriaType = this.chartType ? this.chartType.value : undefined;
      return this.props.loadFn(this.props, {
        one: this.one,
        two,
        three,
        fromDate,
        toDate,
        hasSecondYAxis: this[HAS_SECOND_Y_AXIS],
        seriaType
      });
    };

    this._handleClose = () => {
      this._handleWithValidationClose();
    };

    this._hCheckSecondYAxis = () => {
      this[HAS_SECOND_Y_AXIS] = true;
    };

    this._hUnCheckSecondYAxis = () => {
      this[HAS_SECOND_Y_AXIS] = false;
    };

    this._handlerSelectChartType = item => {
      this.chartType = item;
    };

    this._refTwoThree = c => this.twoThree = c;

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
      twoCaption,
      twoURI,
      twoJsonProp,
      threeCaption,
      msgOnNotSelected,
      initFromDate,
      initToDate,
      msgOnNotValidFormat,
      onTestDate,
      isChartType
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
        onSelect: this._handleSelectOne
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
        ref: this._refTwoThree,
        isShow: isShow,
        isShowLabels: isShowLabels,
        uri: twoURI,
        oneCaption: twoCaption,
        oneJsonProp: twoJsonProp,
        twoCaption: threeCaption,
        msgOnNotSelected: msgOnNotSelected
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.ShowHide, {
        isShow: isShowOptions,
        children: [isChartType && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: "Chart Type:",
          options: CHART_TYPE_OPTIONS,
          onSelect: this._handlerSelectChartType
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox, {
          initValue: false,
          caption: "Add Seria with Second YAxis",
          onCheck: this._hCheckSecondYAxis,
          onUnCheck: this._hUnCheckSecondYAxis
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
        validationMessages: validationMessages
      })]
    });
  }

}) || _class);
var _default = DialogType5;
exports.default = _default;
//# sourceMappingURL=DialogType5.js.map