"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _merge = _interopRequireDefault(require("../../utils/merge"));
var _mathFn = require("../../math/mathFn");
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));
var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));
var _ChartExportConfig = require("../../charts/ChartExportConfig");
var _RowFlex = require("../dialogs/rows/RowFlex");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _ToolbarButtonCircle = _interopRequireDefault(require("../zhn/ToolbarButtonCircle"));
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _InputText = _interopRequireDefault(require("../zhn/InputText"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));
var _jsxRuntime = require("react/jsx-runtime");
const _S_LABEL = {
    display: 'inline-block',
    color: '#1b75bb',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  S_MT_10 = {
    marginTop: 10
  },
  S_LABEL = {
    ..._S_LABEL,
    width: 100,
    paddingRight: 5,
    textAlign: 'right'
  },
  S_LABEL_WIDTH = {
    ..._S_LABEL,
    padding: '0 5px 0 10px'
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
const APP_HTML = 'Web app ERC https://zhnzhn.github.io',
  DS_TOP_PADDING = 90,
  DS_FONT_SIZE = '10px',
  W_MIN = 351,
  W_MAX = 2001,
  H_MIN = 251,
  H_MAX = 1001;
const _getDimension = (_ref, width, height) => {
  let {
    chartWidth,
    chartHeight
  } = _ref;
  return [(0, _mathFn.isInRange)(width, W_MIN, W_MAX) ? width : chartWidth, (0, _mathFn.isInRange)(height, H_MIN, H_MAX) ? height : chartHeight];
};
const _crItemLabel = function (html, top, fontSize) {
  if (top === void 0) {
    top = -70;
  }
  if (fontSize === void 0) {
    fontSize = '9px';
  }
  return {
    html,
    style: {
      left: 0,
      top: top,
      color: '#909090',
      'font-size': fontSize
    }
  };
};
const DF_DATA = {},
  _optionFormats = [{
    caption: "PNG image",
    value: void 0
  }, {
    caption: "JPEG image",
    value: {
      type: "image/jpeg"
    }
  }, {
    caption: "SVG vector image",
    value: {
      type: "image/svg+xml"
    }
  }],
  DF_EXPORT_FORMAT = _optionFormats[0],
  _getItemValue = (item, dfValue) => item && item.value || dfValue,
  _crCaptionText = refInput => ({
    text: (0, _uiApi.getInputValue)(refInput)
  });
const CustomizeExportDialog = (0, _memoIsShow.default)(_ref2 => {
  let {
    isShow,
    data = DF_DATA,
    onClose
  } = _ref2;
  const [isShowDimension, toggleDimension] = (0, _useToggle.default)(true),
    [isShowTitle, toggleTitle] = (0, _useToggle.default)(true),
    [isShowStyle, toggleStyle] = (0, _useToggle.default)(true),
    _refExportStyle = (0, _uiApi.useRef)({}),
    _refExportFormat = (0, _uiApi.useRef)(null),
    _refToolbarButtons = (0, _uiApi.useRef)([{
      caption: 'D',
      onClick: toggleDimension
    }, {
      caption: 'T',
      onClick: toggleTitle
    }, {
      caption: 'S',
      onClick: toggleStyle
    }]),
    _optionStyles = (0, _useRefInit.default)(() => (0, _ChartExportConfig.crExportStyleOptions)()),
    _refInputWidth = (0, _uiApi.useRef)(),
    _refInputHeight = (0, _uiApi.useRef)(),
    _refInputTitle = (0, _uiApi.useRef)(),
    _refInputSubtitle = (0, _uiApi.useRef)(),
    [_hSelectStyle, _hSelectFormat] = (0, _uiApi.useMemo)(() => [item => (0, _uiApi.setRefValue)(_refExportStyle, _getItemValue(item, {})), item => (0, _uiApi.setRefValue)(_refExportFormat, _getItemValue(item, null))], []),
    {
      chart
    } = data,
    _hExport = (0, _useEventCallback.default)(() => {
      const [width, height] = _getDimension(chart, (0, _uiApi.getInputValue)(_refInputWidth), (0, _uiApi.getInputValue)(_refInputHeight)),
        _customOption = (0, _merge.default)(true, {
          chart: {
            width,
            height
          },
          title: _crCaptionText(_refInputTitle),
          subtitle: _crCaptionText(_refInputSubtitle),
          labels: {
            items: [_crItemLabel(APP_HTML), _crItemLabel(`DataSource: ${chart.userOptions.zhConfig?.dataSource ?? ''}`, height - DS_TOP_PADDING, DS_FONT_SIZE)]
          }
        }, (0, _uiApi.getRefValue)(_refExportStyle));
      chart.exportChartLocal((0, _uiApi.getRefValue)(_refExportFormat), _customOption);
      onClose();
    }),
    _refCommandButtons = (0, _uiApi.useRef)([/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      caption: "Export",
      isPrimary: true,
      onClick: _hExport
    }, "export")]);
  const {
      chartWidth,
      chartHeight,
      options
    } = chart,
    title = options.title.text,
    subtitle = options.subtitle.text;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    caption: "Customize Export Chart",
    isShow: isShow,
    commandButtons: (0, _uiApi.getRefValue)(_refCommandButtons),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle.default, {
      buttons: (0, _uiApi.getRefValue)(_refToolbarButtons)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowDimension,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S_LABEL,
          children: "Dimension:"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S_LABEL_WIDTH,
          children: "Width"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
          refEl: _refInputWidth,
          type: "number",
          placeholder: chartWidth,
          initValue: chartWidth,
          style: S_INPUT_NUMBER,
          min: W_MIN,
          max: W_MAX
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S_LABEL_WIDTH,
          children: "Height"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
          refEl: _refInputHeight,
          type: "number",
          placeholder: chartHeight,
          initValue: chartHeight,
          style: S_INPUT_NUMBER,
          min: H_MIN,
          max: H_MAX
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ShowHide.default, {
      isShow: isShowTitle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
        style: S_MT_10,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S_LABEL,
          children: "Title"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
          refEl: _refInputTitle,
          initValue: title,
          style: S_INPUT_TEXT
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S_LABEL,
          children: "Subtitle"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
          refEl: _refInputSubtitle,
          initValue: subtitle,
          style: S_INPUT_TEXT
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowStyle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
        style: S_MT_10,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S_LABEL,
          children: "Style"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
          width: "250",
          options: _optionStyles,
          placeholder: "Default",
          onSelect: _hSelectStyle
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
      style: S_MT_10,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_LABEL,
        children: "Export As"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
        width: "250",
        options: _optionFormats,
        placeholder: DF_EXPORT_FORMAT.caption,
        onSelect: _hSelectFormat
      })]
    })]
  });
});
var _default = exports.default = CustomizeExportDialog;
//# sourceMappingURL=CustomizeExportDialog.js.map