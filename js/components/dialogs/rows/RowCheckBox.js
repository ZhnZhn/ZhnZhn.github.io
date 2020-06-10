"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withTheme = _interopRequireDefault(require("../../hoc/withTheme"));

var _SvgCheckBox = _interopRequireDefault(require("../../zhn/SvgCheckBox"));

//import PropTypes from "prop-types";
var CL = "bt-chb";
var TH_ID = 'ROW_CHECKBOX';
var CHECKED_COLOR = '#1b2836';
var S = {
  ROOT: {
    paddingTop: 6,
    paddingLeft: 16
  },
  CAPTION: {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: 12,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none',
    cursor: 'pointer'
  },
  CHECKED: {
    color: CHECKED_COLOR
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn == 'function';
};

var _isUndefined = function _isUndefined(v) {
  return typeof v === 'undefined';
};

var _crCheckedStyle = function _crCheckedStyle(color) {
  return {
    color: color
  };
};

var RowCheckBox = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(RowCheckBox, _Component);

  /*
  static propTypes = {
    rootStyle : PropTypes.object,
    checkedRestStroke: PropTypes.string,
    checkedRestFill: PropTypes.string,
    caption: PropTypes.string,
    styleCheckedCaption: PropTypes.object,
    initValue: PropTypes.bool,
    value: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func,
    onToggle: PropTypes.func
  }
  */
  function RowCheckBox(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hCheck = function () {
      var _this$props = _this.props,
          onCheck = _this$props.onCheck,
          onToggle = _this$props.onToggle;

      if (_isFn(onCheck)) {
        onCheck();
      } else if (_isFn(onToggle)) {
        onToggle();
      }

      if (_this.state) {
        _this.setState({
          isChecked: true
        });
      }
    };

    _this._hUnCheck = function () {
      var _this$props2 = _this.props,
          onUnCheck = _this$props2.onUnCheck,
          onToggle = _this$props2.onToggle;

      if (_isFn(onUnCheck)) {
        onUnCheck();
      } else if (_isFn(onToggle)) {
        onToggle();
      }

      if (_this.state) {
        _this.setState({
          isChecked: false
        });
      }
    };

    _this._hToggle = function () {
      var _is = _this.state ? _this.state.isChecked : _this.props.value;

      if (_is) {
        _this._hUnCheck();
      } else {
        _this._hCheck();
      }
    };

    if (_isUndefined(props.value)) {
      _this.state = {
        isChecked: !!props.initValue
      };
    }

    return _this;
  }

  var _proto = RowCheckBox.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        theme = _this$props3.theme,
        rootStyle = _this$props3.rootStyle,
        checkedColor = _this$props3.checkedColor,
        caption = _this$props3.caption,
        captionStyle = _this$props3.captionStyle,
        value = _this$props3.value,
        TS = theme.getStyle(TH_ID),
        _value = this.state ? this.state.isChecked : value,
        _style = _value ? (0, _extends2["default"])({}, captionStyle, _crCheckedStyle(checkedColor)) : captionStyle;

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.ROOT, rootStyle)
    }, /*#__PURE__*/_react["default"].createElement(_SvgCheckBox["default"], {
      value: _value,
      checkedRestStroke: checkedColor,
      checkedRestFill: checkedColor,
      checkedColor: TS.CHECKED_COLOR,
      onCheck: this._hCheck,
      onUnCheck: this._hUnCheck
    }), caption && /*#__PURE__*/_react["default"].createElement("button", {
      className: CL,
      tabIndex: "-1",
      style: (0, _extends2["default"])({}, S.CAPTION, _style),
      onClick: this._hToggle
    }, caption));
  };

  return RowCheckBox;
}(_react.Component);

RowCheckBox.defaultProps = {
  checkedColor: CHECKED_COLOR
};

var _default = (0, _withTheme["default"])(RowCheckBox);

exports["default"] = _default;
//# sourceMappingURL=RowCheckBox.js.map