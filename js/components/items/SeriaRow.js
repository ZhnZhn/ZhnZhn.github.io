"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

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
var S = {
  ROOT: {
    paddingLeft: 16,
    paddingBottom: 16
  },
  TITLE: {
    verticalAlign: 'middle',
    color: 'rgb(27, 117, 187)',
    textAlign: 'right',
    width: 100,
    paddingLeft: 4,
    paddingRight: 16,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none'
  },
  COLOR: {
    position: 'relative',
    display: 'inline-block',
    height: 32,
    width: 32,
    borderRadius: 2,
    verticalAlign: 'middle',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  ROW_CHECK_BOX: {
    display: 'inline-block',
    verticalAlign: 'middle',
    paddingLeft: 0
  },
  SELECT: {
    verticalAlign: 'middle',
    marginLeft: 24
  },
  SELECT_OPTIONS: {
    minHeight: 100
  }
};

var SeriaRow = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SeriaRow, _Component);

  function SeriaRow() {
    var _this;

    _this = _Component.call(this) || this;

    _this._getColor = function () {
      var colorEntered = _this.state.colorEntered,
          color = _this.props.seria.options.color;
      return colorEntered || color || DF.COLOR;
    };

    _this.isChecked = false;
    _this._hCheck = _HandleF["default"].set('isChecked', true).bind((0, _assertThisInitialized2["default"])(_this));
    _this._hUnCheck = _HandleF["default"].set('isChecked', false).bind((0, _assertThisInitialized2["default"])(_this));
    _this._hSelectYAxis = _HandleF["default"].reg('toYAxis').bind((0, _assertThisInitialized2["default"])(_this));
    _this._hRegCellColor = _HandleF["default"].reg('cellColorNode').bind((0, _assertThisInitialized2["default"])(_this));
    _this._hEnterColor = _HandleF["default"].enterTo('colorEntered').bind((0, _assertThisInitialized2["default"])(_this));
    _this._hClosePalette = _HandleF["default"].closeTo('isShowPallete').bind((0, _assertThisInitialized2["default"])(_this));
    _this._hClickPallete = _HandleF["default"].toggleModalTo('isShowPallete', 'cellColorNode').bind((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      isShowPallete: false,
      colorEntered: void 0
    };
    return _this;
  }

  var _proto = SeriaRow.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var onReg = this.props.onReg;

    if (typeof onReg === 'function') {
      onReg(this);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var onUnReg = this.props.onUnReg;

    if (typeof onUnReg === 'function') {
      onUnReg(this);
    }
  };

  _proto.render = function render() {
    var isShowPallete = this.state.isShowPallete,
        _this$props = this.props,
        _this$props$seria = _this$props.seria,
        seria = _this$props$seria === void 0 ? {} : _this$props$seria,
        yAxisOptions = _this$props.yAxisOptions,
        name = seria.name,
        _seria$options = seria.options,
        options = _seria$options === void 0 ? {} : _seria$options,
        zhValueText = options.zhValueText,
        _name = zhValueText || name,
        _bgColor = {
      backgroundColor: this._getColor()
    };

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: S.ROOT
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      rootStyle: S.ROW_CHECK_BOX,
      caption: "",
      onCheck: this._hCheck,
      onUnCheck: this._hUnCheck
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: CL.ELL,
      style: S.TITLE
    }, _name), /*#__PURE__*/_react["default"].createElement(_CellColor["default"], {
      style: (0, _extends2["default"])({}, S.COLOR, _bgColor),
      onReg: this._hRegCellColor,
      onClick: this._hClickPallete
    }, /*#__PURE__*/_react["default"].createElement(_ModalPalette["default"], {
      isShow: isShowPallete,
      model: _Model["default"].palette,
      onClickCell: this._hEnterColor,
      onClose: this._hClosePalette
    })), /*#__PURE__*/_react["default"].createElement(_InputSelect["default"], {
      placeholder: "withYAxis",
      width: "150",
      rootStyle: S.SELECT,
      rootOptionsStyle: S.SELECT_OPTIONS,
      options: yAxisOptions,
      onSelect: this._hSelectYAxis
    }));
  };

  _proto.getValue = function getValue() {
    return {
      isChecked: this.isChecked,
      color: this._getColor(),
      yIndex: this.toYAxis ? this.toYAxis.value : void 0,
      data: this.props.seria.userOptions.data
    };
  };

  return SeriaRow;
}(_react.Component);

var _default = SeriaRow;
exports["default"] = _default;
//# sourceMappingURL=SeriaRow.js.map