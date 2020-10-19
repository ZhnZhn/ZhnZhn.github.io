"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _SeriesPane = _interopRequireDefault(require("./SeriesPane"));

var S = {
  MODAL: {
    position: 'static',
    width: 365,
    height: 340,
    margin: '70px auto 0px'
  },
  SCROLL_PANE: {
    overflowY: 'auto',
    height: 250,
    paddingRight: 10
  }
};

var PasteToModalDialog = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(PasteToModalDialog, _Component);

  function PasteToModalDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hPasteTo = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          toChart = data.toChart;

      if (toChart) {
        _this._compSeries.getValues().forEach(function (conf) {
          //color, data, userMin, userMax, yIndex
          toChart.zhAddSeriaToYAxis(conf);
        });
      }

      onClose();
    };

    _this._refCompSeries = function (comp) {
      return _this._compSeries = comp;
    };

    _this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
      caption: "Paste & Close",
      isPrimary: true,
      onClick: _this._hPasteTo
    }, "paste")];
    return _this;
  }

  var _proto = PasteToModalDialog.prototype;

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
        fromChart = data.fromChart,
        toChart = data.toChart;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog["default"], {
      style: S.MODAL,
      caption: "Paste Series To",
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeriesPane["default"], {
        ref: this._refCompSeries,
        rootStyle: S.SCROLL_PANE,
        fromChart: fromChart,
        toChart: toChart
      })
    });
  };

  return PasteToModalDialog;
}(_react.Component);

PasteToModalDialog.defaultProps = {
  data: {}
};
var _default = PasteToModalDialog;
exports["default"] = _default;
//# sourceMappingURL=PasteToModalDialog.js.map