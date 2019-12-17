"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Model = _interopRequireDefault(require("../../constants/Model"));

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));

var _ModalPalette = _interopRequireDefault(require("../zhn-moleculs/ModalPalette"));

//import PropTypes from "prop-types";
var S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6
  },
  CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 80,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  COLOR: {
    position: 'relative',
    display: 'inline-block',
    height: 32,
    width: 32,
    borderRadius: 2,
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var RowInputColor =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(RowInputColor, _Component);

  /*
  static propTypes = {
    styleRoot: PropTypes.object,
    styleCaption: PropTypes.object,
    styleInput: PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.string,
    onEnter: PropTypes.func
  }
  */
  function RowInputColor(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hEnter = function (value) {
      _this.props.onEnter(value);

      _this.setState({
        value: value
      });
    };

    _this._hRegCellColor = function (node) {
      _this.cellColorNode = node;
    };

    _this._hClickPallete = function (color, event) {
      if (event.target === _this.cellColorNode) {
        _this.setState(function (prevState) {
          return {
            isShowPallete: !prevState.isShowPallete
          };
        });
      }
    };

    _this._hClosePalette = function (event) {
      _this.setState({
        isShowPallete: false
      });
    };

    var initValue = props.initValue;
    _this.state = {
      initValue: initValue,
      value: initValue,
      isShowPallete: false
    };
    return _this;
  }

  RowInputColor.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, state) {
    var initValue = _ref.initValue;
    return initValue !== state.initValue ? {
      initValue: initValue,
      value: initValue
    } : null;
  };

  var _proto = RowInputColor.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        styleRoot = _this$props.styleRoot,
        styleCaption = _this$props.styleCaption,
        styleInput = _this$props.styleInput,
        caption = _this$props.caption,
        _this$state = this.state,
        isShowPallete = _this$state.isShowPallete,
        value = _this$state.value,
        _caption = caption.indexOf(':') !== -1 ? caption : caption + ":",
        _bgColor = {
      backgroundColor: value
    };

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.ROOT, {}, styleRoot)
    }, _react["default"].createElement("label", null, _react["default"].createElement("span", {
      style: (0, _extends2["default"])({}, S.CAPTION, {}, styleCaption)
    }, _caption), _react["default"].createElement(_InputText["default"], {
      style: (0, _extends2["default"])({}, S.INPUT_TEXT, {}, styleInput),
      initValue: value,
      maxLength: 20,
      onEnter: this._hEnter
    })), _react["default"].createElement(_CellColor["default"], {
      style: (0, _extends2["default"])({}, S.COLOR, {}, _bgColor),
      onReg: this._hRegCellColor,
      onClick: this._hClickPallete
    }, _react["default"].createElement(_ModalPalette["default"], {
      isShow: isShowPallete,
      model: _Model["default"].palette,
      onClickCell: this._hEnter,
      onClose: this._hClosePalette
    })));
  };

  return RowInputColor;
}(_react.Component);

RowInputColor.defaultProps = {
  caption: 'Color:',
  initValue: '#90ed7d',
  onEnter: function onEnter() {}
};
var _default = RowInputColor;
exports["default"] = _default;
//# sourceMappingURL=RowInputColor.js.map