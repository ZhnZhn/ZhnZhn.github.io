"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ChartExportConfig = _interopRequireDefault(require("../../charts/ChartExportConfig"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

var _ToolbarButtonCircle = _interopRequireDefault(require("./ToolbarButtonCircle"));

var _Button = _interopRequireDefault(require("./Button"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));

var S = {
  GAP_BETWEEN_GROUP: {
    marginTop: 10
  },
  LABEL_WIDTH: {
    display: 'inline-block',
    color: '#1b75bb',
    width: 100,
    paddingRight: 5,
    textAlign: 'right',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  LABEL_HEIGHT: {
    display: 'inline-block',
    color: '#1b75bb',
    paddingRight: 5,
    paddingLeft: 3,
    fontSize: '16px',
    fontWeight: 'bold'
  },
  INPUT_NUMBER: {
    height: 30,
    marginLeft: 0
  },
  INPUT_TEXT: {
    width: 250,
    height: 30,
    marginLeft: 0
  }
};

var CustomizeExportDialog =
/*#__PURE__*/
function (_Component) {
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

    _this._hExport = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          chart = data.chart,
          fn = data.fn,
          _customOption = _ChartExportConfig["default"].merge(true, {
        chart: {
          width: _this.inputWidth.getValue(),
          height: _this.inputHeight.getValue()
        },
        title: {
          text: _this.inputTitle.getValue()
        },
        subtitle: {
          text: _this.inputSubtitle.getValue()
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
    _this._commandButtons = [_react["default"].createElement(_Button["default"].Flat, {
      key: "export",
      caption: "Export" //accessKey="x"
      ,
      isPrimary: true,
      onClick: _this._hExport
    })];
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
    return _react["default"].createElement(_ModalDialog["default"], {
      caption: "Customize Export Chart",
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose
    }, _react["default"].createElement(_ToolbarButtonCircle["default"], {
      buttons: this.toolbarButtons
    }), _react["default"].createElement(_ShowHide["default"], {
      isShow: isShowDimension
    }, _react["default"].createElement("div", {
      style: _DialogStyles["default"].rowDiv
    }, _react["default"].createElement("span", {
      style: S.LABEL_WIDTH
    }, "Dimension:"), _react["default"].createElement("span", {
      style: S.LABEL_HEIGHT
    }, "Width:"), _react["default"].createElement(_InputText["default"], {
      ref: this._refInputWidth,
      initValue: chartWidth,
      style: S.INPUT_NUMBER
    }), _react["default"].createElement("span", {
      style: S.LABEL_HEIGHT
    }, "Height:"), _react["default"].createElement(_InputText["default"], {
      ref: this._refInputHeight,
      initValue: chartHeight,
      style: S.INPUT_NUMBER
    }))), _react["default"].createElement(_ShowHide["default"], {
      isShow: isShowTitle
    }, _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, _DialogStyles["default"].rowDiv, {}, S.GAP_BETWEEN_GROUP)
    }, _react["default"].createElement("span", {
      style: S.LABEL_WIDTH
    }, "Title:"), _react["default"].createElement(_InputText["default"], {
      ref: this._refInputTitle,
      initValue: title,
      style: S.INPUT_TEXT
    })), _react["default"].createElement("div", {
      style: _DialogStyles["default"].rowDiv
    }, _react["default"].createElement("span", {
      style: S.LABEL_WIDTH
    }, "Subtitle:"), _react["default"].createElement(_InputText["default"], {
      ref: this._refInputSubtitle,
      initValue: subtitle,
      style: S.INPUT_TEXT
    }))), _react["default"].createElement(_ShowHide["default"], {
      isShow: isShowStyle
    }, _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, _DialogStyles["default"].rowDiv, {}, S.GAP_BETWEEN_GROUP)
    }, _react["default"].createElement("span", {
      style: S.LABEL_WIDTH
    }, "Style:"), _react["default"].createElement(_InputSelect["default"], {
      width: "250",
      options: this.optionStyles,
      placeholder: "Default",
      onSelect: this._hSelectStyle
    }))));
  };

  return CustomizeExportDialog;
}(_react.Component);

CustomizeExportDialog.defaultProps = {
  data: {}
};
var _default = CustomizeExportDialog;
exports["default"] = _default;
//# sourceMappingURL=CustomizeExportDialog.js.map