"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _Model = _interopRequireDefault(require("../../constants/Model"));

var _HandleF = _interopRequireDefault(require("../f-handle/HandleF"));

var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));

var _ModalPalette = _interopRequireDefault(require("../zhn-moleculs/ModalPalette"));

var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var DF = {
  COLOR: '#7cb5ec'
};
var CL = {
  ELL: 'ellipsis'
};
var CL_INPUT_COLOR = 'p-r va-m';
var S = {
  ROOT: {
    paddingLeft: 16,
    paddingBottom: 16
  },
  TITLE: {
    color: '##1b75bb',
    width: 100,
    paddingLeft: 4,
    paddingRight: 16,
    verticalAlign: 'middle',
    textAlign: 'right',
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none'
  },
  ROW_CHECK_BOX: {
    display: 'inline-block',
    paddingLeft: 0,
    verticalAlign: 'middle'
  },
  SELECT: {
    marginLeft: 24,
    verticalAlign: 'middle'
  },
  SELECT_OPTIONS: {
    minHeight: 100
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SeriaRow = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SeriaRow, _Component);

  function SeriaRow(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._getColor = function () {
      var colorEntered = _this.state.colorEntered,
          color = _this.props.seria.color;
      return colorEntered || color || DF.COLOR;
    };

    _this.isChecked = false;
    _this._hCheck = _HandleF["default"].set('isChecked', true).bind((0, _assertThisInitialized2["default"])(_this));
    _this._hUnCheck = _HandleF["default"].set('isChecked', false).bind((0, _assertThisInitialized2["default"])(_this));
    _this._hSelectYAxis = _HandleF["default"].reg('toYAxis').bind((0, _assertThisInitialized2["default"])(_this));
    _this._hEnterColor = _HandleF["default"].enterTo('colorEntered').bind((0, _assertThisInitialized2["default"])(_this));
    _this._hClosePalette = _HandleF["default"].closeTo('isShowPallete').bind((0, _assertThisInitialized2["default"])(_this));
    _this._refCellColor = /*#__PURE__*/(0, _react.createRef)();
    _this._hClickPallete = _HandleF["default"].toggleModalBy('isShowPallete', '_refCellColor').bind((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      isShowPallete: false,
      colorEntered: void 0
    };
    return _this;
  }

  var _proto = SeriaRow.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var onReg = this.props.onReg;

    if (_isFn(onReg)) {
      onReg(this);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var onUnReg = this.props.onUnReg;

    if (_isFn(onUnReg)) {
      onUnReg(this);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.toYAxis = void 0;
    }
  };

  _proto.render = function render() {
    var isShowPallete = this.state.isShowPallete,
        _this$props = this.props,
        _this$props$seria = _this$props.seria,
        seria = _this$props$seria === void 0 ? {} : _this$props$seria,
        yAxisOptions = _this$props.yAxisOptions,
        _seria$name = seria.name,
        name = _seria$name === void 0 ? '' : _seria$name,
        _color = this._getColor();

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROOT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowCheckBox, {
        rootStyle: S.ROW_CHECK_BOX,
        caption: "",
        onCheck: this._hCheck,
        onUnCheck: this._hUnCheck
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL.ELL,
        style: S.TITLE,
        children: name
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor["default"], {
        ref: this._refCellColor,
        className: CL_INPUT_COLOR,
        color: _color,
        onClick: this._hClickPallete,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPalette["default"], {
          isShow: isShowPallete,
          model: _Model["default"].palette,
          onClickCell: this._hEnterColor,
          onClose: this._hClosePalette
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect["default"], {
        placeholder: "withYAxis",
        width: "150",
        style: S.SELECT,
        optionsStyle: S.SELECT_OPTIONS,
        options: yAxisOptions,
        onSelect: this._hSelectYAxis
      })]
    });
  };

  _proto.getValue = function getValue() {
    var userOptions = this.props.seria.userOptions,
        data = userOptions.data,
        name = userOptions.name;
    return {
      isChecked: this.isChecked,
      color: this._getColor(),
      yIndex: this.toYAxis ? this.toYAxis.value : void 0,
      data: data,
      name: name
    };
  };

  return SeriaRow;
}(_react.Component);

var _default = SeriaRow;
exports["default"] = _default;
//# sourceMappingURL=SeriaRow.js.map