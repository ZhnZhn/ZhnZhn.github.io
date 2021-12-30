"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ChartExportConfig = _interopRequireDefault(require("../../charts/ChartExportConfig"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

var _ToolbarButtonCircle = _interopRequireDefault(require("./ToolbarButtonCircle"));

var _Button = _interopRequireDefault(require("./Button"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));

var _jsxRuntime = require("react/jsx-runtime");

const _S_LABEL = {
  display: 'inline-block',
  color: '#1b75bb',
  fontSize: '16px',
  fontWeight: 'bold'
},
      S_GAP_BETWEEN_GROUP = {
  marginTop: 10
},
      S_LABEL = { ..._S_LABEL,
  width: 100,
  paddingRight: 5,
  textAlign: 'right'
},
      S_LABEL_WIDTH = { ..._S_LABEL,
  paddingRight: 5,
  paddingLeft: 3
},
      S_LABEL_HEIGHT = {
  paddingLeft: 6
},
      S_INPUT_NUMBER = {
  width: 60,
  height: 30,
  marginLeft: 0
},
      S_INPUT_TEXT = {
  width: 250,
  height: 30,
  marginLeft: 0
};
const C = {
  APP_HTML: 'Web app ERC https://zhnzhn.github.io',
  DS_TOP_PADDING: 90,
  DS_FONT_SIZE: '10px',
  W_MIN: 351,
  W_MAX: 2001,
  H_MIN: 251,
  H_MAX: 1001
};

const _inRange = (v, min, max) => v > min && v < max;

const _crItemLabel = function (html, top, fontSize) {
  if (top === void 0) {
    top = -70;
  }

  if (fontSize === void 0) {
    fontSize = '9px';
  }

  return {
    html: html,
    style: {
      left: 0,
      top: top,
      color: '#909090',
      'font-size': fontSize
    }
  };
};

class CustomizeExportDialog extends _react.Component {
  constructor(props) {
    super(props);

    this._hClickDimension = () => {
      this.setState(prevState => ({
        isShowDimension: !prevState.isShowDimension
      }));
    };

    this._hClickTitle = () => {
      this.setState(prevState => ({
        isShowTitle: !prevState.isShowTitle
      }));
    };

    this._hClickStyle = () => {
      this.setState(prevState => ({
        isShowStyle: !prevState.isShowStyle
      }));
    };

    this._hSelectStyle = item => {
      this.exportStyle = item && item.value || {};
    };

    this._getDimension = chart => {
      const {
        chartWidth,
        chartHeight
      } = chart,
            _width = this.inputWidth.getValue(),
            _height = this.inputHeight.getValue();

      return {
        width: _inRange(_width, C.W_MIN, C.W_MAX) ? _width : chartWidth,
        height: _inRange(_height, C.H_MIN, C.H_MAX) ? _height : chartHeight
      };
    };

    this._hExport = () => {
      var _chart$userOptions$zh, _chart$userOptions$zh2;

      const {
        data,
        onClose
      } = this.props,
            {
        chart,
        fn
      } = data,
            {
        width,
        height
      } = this._getDimension(chart),
            _customOption = _ChartExportConfig.default.merge(true, {
        chart: {
          width,
          height
        },
        title: {
          text: this.inputTitle.getValue()
        },
        subtitle: {
          text: this.inputSubtitle.getValue()
        },
        labels: {
          items: [_crItemLabel(C.APP_HTML), _crItemLabel("DataSource: " + ((_chart$userOptions$zh = (_chart$userOptions$zh2 = chart.userOptions.zhConfig) == null ? void 0 : _chart$userOptions$zh2.dataSource) != null ? _chart$userOptions$zh : ''), height - C.DS_TOP_PADDING, C.DS_FONT_SIZE)]
        }
      }, this.exportStyle);

      fn.apply(chart, [null, _customOption]);
      onClose();
    };

    this._refInputWidth = c => this.inputWidth = c;

    this._refInputHeight = c => this.inputHeight = c;

    this._refInputTitle = c => this.inputTitle = c;

    this._refInputSubtitle = c => this.inputSubtitle = c;

    this.exportStyle = {};
    this.toolbarButtons = [{
      caption: 'D',
      onClick: this._hClickDimension
    }, {
      caption: 'T',
      onClick: this._hClickTitle
    }, {
      caption: 'S',
      onClick: this._hClickStyle
    }];
    this.optionStyles = _ChartExportConfig.default.createOptionStyles();
    this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Flat, {
      caption: "Export",
      isPrimary: true,
      onClick: this._hExport
    }, "export")];
    this.state = {
      isShowDimension: true,
      isShowTitle: true,
      isShowStyle: true
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  }

  render() {
    const {
      isShow,
      data,
      onClose
    } = this.props,
          {
      chart
    } = data,
          {
      chartWidth,
      chartHeight,
      options
    } = chart,
          title = options.title.text,
          subtitle = options.subtitle.text,
          {
      isShowDimension,
      isShowTitle,
      isShowStyle
    } = this.state;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
      caption: "Customize Export Chart",
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle.default, {
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
        isShow: isShowDimension,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: _DialogStyles.default.ROW,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S_LABEL,
            children: "Dimension:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S_LABEL_WIDTH,
            children: "Width:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
            ref: this._refInputWidth,
            type: "number",
            placeholder: chartWidth,
            initValue: chartWidth,
            style: S_INPUT_NUMBER,
            min: C.W_MIN,
            max: C.W_MAX
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: { ...S_LABEL_WIDTH,
              ...S_LABEL_HEIGHT
            },
            children: "Height:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
            ref: this._refInputHeight,
            type: "number",
            placeholder: chartHeight,
            initValue: chartHeight,
            style: S_INPUT_NUMBER,
            min: C.H_MIN,
            max: C.H_MAX
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ShowHide.default, {
        isShow: isShowTitle,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: { ..._DialogStyles.default.ROW,
            ...S_GAP_BETWEEN_GROUP
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S_LABEL,
            children: "Title:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
            ref: this._refInputTitle,
            initValue: title,
            style: S_INPUT_TEXT
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: _DialogStyles.default.ROW,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S_LABEL,
            children: "Subtitle:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
            ref: this._refInputSubtitle,
            initValue: subtitle,
            style: S_INPUT_TEXT
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
        isShow: isShowStyle,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: { ..._DialogStyles.default.ROW,
            ...S_GAP_BETWEEN_GROUP
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S_LABEL,
            children: "Style:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
            width: "250",
            options: this.optionStyles,
            placeholder: "Default",
            onSelect: this._hSelectStyle
          })]
        })
      })]
    });
  }

}

CustomizeExportDialog.defaultProps = {
  data: {}
};
var _default = CustomizeExportDialog;
exports.default = _default;
//# sourceMappingURL=CustomizeExportDialog.js.map