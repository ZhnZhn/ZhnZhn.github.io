"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _SpanValue = _interopRequireDefault(require("../zhn-span/SpanValue"));

var _SpanDate = _interopRequireDefault(require("../zhn-span/SpanDate"));

var _SpanLabel = _interopRequireDefault(require("../zhn-span/SpanLabel"));

var _DateField = _interopRequireDefault(require("../zhn/DateField"));

//import PropTypes from "prop-types";
var isDmy = _DateUtils["default"].isDmy;
var S = {
  ROOT: {
    position: 'absolute',
    top: 25,
    left: 0,
    zIndex: 10,
    width: 'auto',
    backgroundColor: 'inherit',
    border: '2px solid #1b2836',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 12,
    cursor: 'auto'
  },
  ROW: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  DATE: {
    display: 'inline-block',
    paddingLeft: 16,
    whiteSpace: 'nowrap'
  },
  ROW_INPUT: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8
  },
  DATE_FIELD: {
    width: 120,
    marginLeft: 8,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  MSG: {
    color: '#f44336',
    fontWeight: 'bold'
  }
};

var _isNotAdminMode = function _isNotAdminMode(isAdminMode, isDenyToChange) {
  var _isAdminMode = typeof isAdminMode == 'function' ? isAdminMode() : typeof isAdminMode == 'boolean' ? isAdminMode : false;

  return !_isAdminMode || isDenyToChange;
};

var RowValueDate = function RowValueDate(_ref) {
  var value = _ref.value,
      date = _ref.date;
  return _react["default"].createElement("div", {
    style: S.ROW
  }, _react["default"].createElement(_SpanValue["default"], {
    value: (0, _formatAllNumber["default"])(value)
  }), _react["default"].createElement(_SpanDate["default"], {
    date: date,
    style: S.DATE
  }));
};

var ModalValueMoving =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ModalValueMoving, _Component);

  function ModalValueMoving() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      msgDateTo: ''
    };

    _this._handleEnterDate = function (dateTo) {
      if (_this.dateToComp.isValid()) {
        var isUpdated = _this.props.updateDateTo(dateTo);

        if (isUpdated) {
          _this.setState({
            msgDateTo: ''
          });
        } else {
          _this.setState({
            msgDateTo: "No data for " + dateTo
          });
        }
      }
    };

    _this._refDateToComp = function (comp) {
      return _this.dateToComp = comp;
    };

    _this._renderAdmin = function (date, msgDateTo) {
      return _react["default"].createElement("div", null, _react["default"].createElement("label", {
        style: S.ROW_INPUT
      }, _react["default"].createElement(_SpanLabel["default"], {
        label: "CompareTo:"
      }), _react["default"].createElement(_DateField["default"], {
        ref: _this._refDateToComp,
        rootStyle: S.DATE_FIELD,
        initValue: date,
        placeholder: "DD-MM-YYYY",
        errorMsg: "DD-MM-YYYY",
        onTest: isDmy,
        onEnter: _this._handleEnterDate
      })), _react["default"].createElement("div", null, _react["default"].createElement("span", {
        style: S.MSG
      }, msgDateTo)));
    };

    return _this;
  }

  var _proto = ModalValueMoving.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        msgDateTo: ''
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        onClose = _this$props.onClose,
        valueMoving = _this$props.valueMoving,
        isAdminMode = _this$props.isAdminMode,
        value = valueMoving.value,
        date = valueMoving.date,
        valueTo = valueMoving.valueTo,
        dateTo = valueMoving.dateTo,
        isDenyToChange = valueMoving.isDenyToChange,
        msgDateTo = this.state.msgDateTo;
    return _react["default"].createElement(_ModalPopup["default"], {
      isShow: isShow,
      style: S.ROOT,
      onClose: onClose
    }, _react["default"].createElement(RowValueDate, {
      value: value,
      date: date
    }), _react["default"].createElement(RowValueDate, {
      value: valueTo,
      date: dateTo
    }), _isNotAdminMode(isAdminMode, isDenyToChange) ? null : this._renderAdmin(date, msgDateTo));
  };

  return ModalValueMoving;
}(_react.Component);

var _default = ModalValueMoving;
exports["default"] = _default;
//# sourceMappingURL=ModalValueMoving.js.map