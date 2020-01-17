"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DateField = _interopRequireDefault(require("../../zhn/DateField"));

var _useRowStyle2 = _interopRequireDefault(require("./useRowStyle"));

//import PropTypes from "prop-types";
var RowDate =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(RowDate, _Component);

  function RowDate() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refInpuDate = function (c) {
      return _this.inputDate = c;
    };

    _this.getValue = function () {
      return _this.inputDate.getValue();
    };

    _this.isValid = function () {
      return _this.inputDate.isValid();
    };

    return _this;
  }

  var _proto = RowDate.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        isShowLabels = _this$props.isShowLabels,
        _this$props$labelTitl = _this$props.labelTitle,
        labelTitle = _this$props$labelTitl === void 0 ? '' : _this$props$labelTitl,
        initValue = _this$props.initValue,
        errorMsg = _this$props.errorMsg,
        onTestDate = _this$props.onTestDate,
        _useRowStyle = (0, _useRowStyle2["default"])({
      isShowLabels: isShowLabels
    }),
        rowStyle = _useRowStyle.rowStyle,
        labelStyle = _useRowStyle.labelStyle; //STYLE.crRowLabelStyle(isShowLabels);


    return _react["default"].createElement("div", {
      style: rowStyle
    }, _react["default"].createElement("span", {
      style: labelStyle
    }, labelTitle), _react["default"].createElement(_DateField["default"], {
      ref: this._refInpuDate,
      initialValue: initValue,
      errorMsg: errorMsg,
      onTest: onTestDate
    }));
  };

  return RowDate;
}(_react.Component);

var _default = RowDate;
exports["default"] = _default;
//# sourceMappingURL=RowDate.js.map