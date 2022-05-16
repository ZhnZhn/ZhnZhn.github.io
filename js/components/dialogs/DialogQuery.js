"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ChartOptionsFn = require("./ChartOptionsFn");

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

var _dec, _dec2, _class;

const {
  Decor,
  crMenuMore
} = _DialogCell.default;
const ERR_MSG = 'Empty or Id format is not valid',
      S_ID_CAPTION = {
  width: 85
},
      S_ID_ROOT = {
  width: 270
};

const _isStrNotBlank = str => typeof str === 'string' && str.trim();

const _testId = value => _isStrNotBlank(value) && _isStrNotBlank(value.split('/')[2]) ? true : false;

let DialogQuery = (_dec = Decor.withToolbar, _dec2 = Decor.withLoad, _dec(_class = _dec2(_class = class DialogQuery extends _react.Component {
  constructor(_props) {
    super(_props);

    this._hSelectChartType = chartType => {
      this.setState({
        chartType
      });
    };

    this._onRegColor = comp => {
      this.colorComp = comp;
    };

    this._handleLoad = () => {
      if (this._idInput) {
        if (this._idInput.isValid()) {
          const _value = this._idInput.getValue(),
                {
            props,
            state,
            colorComp,
            dialogOptions
          } = this,
                {
            onLoad,
            loadFn
          } = props,
                {
            chartType
          } = state,
                {
            seriaColor,
            seriaWidth
          } = colorComp ? colorComp.getConf() : {};

          onLoad(loadFn(this.props, {
            items: [{
              c: _value,
              v: _value
            }],
            chartType,
            seriaColor,
            seriaWidth,
            dialogOptions
          }));
        } else {
          this._idInput.showErrMsg();
        }
      }
    };

    this._refIdInput = c => this._idInput = c;

    this._refDates = c => this.datesFragment = c;

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    });
    const {
      noDate
    } = _props;
    this.toolbarButtons = this._createType2WithToolbar(_props, {
      noDate,
      isOptions: true
    });
    this._chartOptions = (0, _ChartOptionsFn.crDialogChartOptions)({
      chartsType: 't2'
    });
    this._commandButtons = this._crCommandsWithLoad(this);
    this.state = {
      isToolbar: true,
      isShowLabels: true,
      isShowDate: true,
      isOptions: false,
      chartType: 'SPLINE'
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
      onClose,
      oneCaption,
      onePlaceholder,
      noDate,
      initFromDate,
      initToDate,
      msgOnNotValidFormat,
      onTestDate
    } = this.props,
          {
      isToolbar,
      isShowLabels,
      isShowDate,
      isOptions,
      chartType
    } = this.state;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
      isShow: isShow,
      menuModel: this._menuMore,
      caption: caption,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: onClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
        isShow: isToolbar,
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalOptions, {
        isShow: isOptions,
        toggleOption: this._toggleOptionWithToolbar,
        onClose: this._hideOptionsWithToolbar
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowPattern, {
        ref: this._refIdInput,
        isShow: isShow,
        isShowLabels: isShowLabels,
        captionStyle: S_ID_CAPTION,
        rootStyle: S_ID_ROOT,
        placeholder: onePlaceholder,
        caption: oneCaption,
        onTest: _testId,
        errorMsg: ERR_MSG
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
        chartType: chartType,
        isShowLabels: isShowLabels,
        isShowChart: true,
        labelStyle: S_ID_CAPTION,
        selectWidth: S_ID_ROOT.width,
        chartOptions: this._chartOptions,
        onSelectChart: this._hSelectChartType,
        onRegColor: this._onRegColor,
        noDate: noDate
      }), !noDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
        isShow: isShowDate,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.DatesFragment, {
          ref: this._refDates,
          isShowLabels: isShowLabels,
          initFromDate: initFromDate,
          initToDate: initToDate,
          msgOnNotValidFormat: msgOnNotValidFormat,
          onTestDate: onTestDate
        })
      })]
    });
  }

}) || _class) || _class);
var _default = DialogQuery;
exports.default = _default;
//# sourceMappingURL=DialogQuery.js.map