"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ChartExportConfig = _interopRequireDefault(require("../../charts/ChartExportConfig"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

var _ToolbarButtonCircle = _interopRequireDefault(require("./ToolbarButtonCircle"));

var _Button = _interopRequireDefault(require("./Button"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));

var _S = {
  LABEL: {
    display: 'inline-block',
    color: '#1b75bb',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};
var S = {
  GAP_BETWEEN_GROUP: {
    marginTop: 10
  },
  LABEL: (0, _extends2["default"])({}, _S.LABEL, {
    width: 100,
    paddingRight: 5,
    textAlign: 'right'
  }),
  LABEL_WIDTH: (0, _extends2["default"])({}, _S.LABEL, {
    paddingRight: 5,
    paddingLeft: 3
  }),
  LABEL_HEIGHT: {
    paddingLeft: 6
  },
  INPUT_NUMBER: {
    width: 60,
    height: 30,
    marginLeft: 0
  },
  INPUT_TEXT: {
    width: 250,
    height: 30,
    marginLeft: 0
  }
};
var C = {
  APP_HTML: 'Web app ERC https://zhnzhn.github.io',
  DS_TOP_PADDING: 90,
  DS_FONT_SIZE: '10px',
  W_MIN: 351,
  W_MAX: 2001,
  H_MIN: 251,
  H_MAX: 1001
};

var _inRange = function _inRange(v, min, max) {
  return v > min && v < max;
};

var _crItemLabel = function _crItemLabel(html, top, fontSize) {
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

var CustomizeExportDialog = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(CustomizeExportDialog, _Component);

  function CustomizeExportDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hClickDimension = function () {
      _this.setState(function (prevState) {
        return {
          isShowDimension: !prevState.isShowDimension
        };
      });
    };

    _this._hClickTitle = function () {
      _this.setState(function (prevState) {
        return {
          isShowTitle: !prevState.isShowTitle
        };
      });
    };

    _this._hClickStyle = function () {
      _this.setState(function (prevState) {
        return {
          isShowStyle: !prevState.isShowStyle
        };
      });
    };

    _this._hSelectStyle = function (item) {
      _this.exportStyle = item && item.value || {};
    };

    _this._getDimension = function (chart) {
      var chartWidth = chart.chartWidth,
          chartHeight = chart.chartHeight,
          _width = _this.inputWidth.getValue(),
          _height = _this.inputHeight.getValue();

      return {
        width: _inRange(_width, C.W_MIN, C.W_MAX) ? _width : chartWidth,
        height: _inRange(_height, C.H_MIN, C.H_MAX) ? _height : chartHeight
      };
    };

    _this._hExport = function () {
      var _chart$userOptions$zh, _chart$userOptions$zh2;

      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          chart = data.chart,
          fn = data.fn,
          _this$_getDimension = _this._getDimension(chart),
          width = _this$_getDimension.width,
          height = _this$_getDimension.height,
          _customOption = _ChartExportConfig["default"].merge(true, {
        chart: {
          width: width,
          height: height
        },
        title: {
          text: _this.inputTitle.getValue()
        },
        subtitle: {
          text: _this.inputSubtitle.getValue()
        },
        labels: {
          items: [_crItemLabel(C.APP_HTML), _crItemLabel("DataSource: " + ((_chart$userOptions$zh = (_chart$userOptions$zh2 = chart.userOptions.zhConfig) == null ? void 0 : _chart$userOptions$zh2.dataSource) != null ? _chart$userOptions$zh : ''), height - C.DS_TOP_PADDING, C.DS_FONT_SIZE)]
        }
      }, _this.exportStyle);

      fn.apply(chart, [null, _customOption]);
      onClose();
    };

    _this._refInputWidth = function (c) {
      return _this.inputWidth = c;
    };

    _this._refInputHeight = function (c) {
      return _this.inputHeight = c;
    };

    _this._refInputTitle = function (c) {
      return _this.inputTitle = c;
    };

    _this._refInputSubtitle = function (c) {
      return _this.inputSubtitle = c;
    };

    _this.exportStyle = {};
    _this.toolbarButtons = [{
      caption: 'D',
      onClick: _this._hClickDimension
    }, {
      caption: 'T',
      onClick: _this._hClickTitle
    }, {
      caption: 'S',
      onClick: _this._hClickStyle
    }];
    _this.optionStyles = _ChartExportConfig["default"].createOptionStyles();
    _this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button["default"].Flat, {
      caption: "Export" //accessKey="x"
      ,
      isPrimary: true,
      onClick: _this._hExport
    }, "export")];
    _this.state = {
      isShowDimension: true,
      isShowTitle: true,
      isShowStyle: true
    };
    return _this;
  }

  var _proto = CustomizeExportDialog.prototype;

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
        onClose = _this$props2.onClose,
        chart = data.chart,
        chartWidth = chart.chartWidth,
        chartHeight = chart.chartHeight,
        options = chart.options,
        title = options.title.text,
        subtitle = options.subtitle.text,
        _this$state = this.state,
        isShowDimension = _this$state.isShowDimension,
        isShowTitle = _this$state.isShowTitle,
        isShowStyle = _this$state.isShowStyle;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog["default"], {
      caption: "Customize Export Chart",
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle["default"], {
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide["default"], {
        isShow: isShowDimension,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: _DialogStyles["default"].ROW,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S.LABEL,
            children: "Dimension:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S.LABEL_WIDTH,
            children: "Width:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
            ref: this._refInputWidth,
            type: "number",
            placeholder: chartWidth,
            initValue: chartWidth,
            style: S.INPUT_NUMBER,
            min: C.W_MIN,
            max: C.W_MAX
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: (0, _extends2["default"])({}, S.LABEL_WIDTH, S.LABEL_HEIGHT),
            children: "Height:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
            ref: this._refInputHeight,
            type: "number",
            placeholder: chartHeight,
            initValue: chartHeight,
            style: S.INPUT_NUMBER,
            min: C.H_MIN,
            max: C.H_MAX
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ShowHide["default"], {
        isShow: isShowTitle,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: (0, _extends2["default"])({}, _DialogStyles["default"].ROW, S.GAP_BETWEEN_GROUP),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S.LABEL,
            children: "Title:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
            ref: this._refInputTitle,
            initValue: title,
            style: S.INPUT_TEXT
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: _DialogStyles["default"].ROW,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S.LABEL,
            children: "Subtitle:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
            ref: this._refInputSubtitle,
            initValue: subtitle,
            style: S.INPUT_TEXT
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide["default"], {
        isShow: isShowStyle,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: (0, _extends2["default"])({}, _DialogStyles["default"].ROW, S.GAP_BETWEEN_GROUP),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S.LABEL,
            children: "Style:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect["default"], {
            width: "250",
            options: this.optionStyles,
            placeholder: "Default",
            onSelect: this._hSelectStyle
          })]
        })
      })]
    });
  };

  return CustomizeExportDialog;
}(_react.Component);

CustomizeExportDialog.defaultProps = {
  data: {}
};
var _default = CustomizeExportDialog;
exports["default"] = _default;
//# sourceMappingURL=CustomizeExportDialog.js.map