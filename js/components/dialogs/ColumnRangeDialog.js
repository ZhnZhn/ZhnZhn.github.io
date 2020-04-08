"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _seriaFns = _interopRequireDefault(require("../../charts/seriaFns"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var S = {
  TEXT: {
    paddingTop: 16,
    paddingLeft: 16,
    fontWeight: 600
  },
  ROW: {
    paddingLeft: 8
  },
  INLINE: {
    display: 'inline-block'
  },
  CAPTION_1: {
    width: 60
  },
  CAPTION_2: {
    width: 100
  },
  INPUT: {
    width: 40
  }
};
var INIT = {
  POIN_WIDTH: 1,
  R1: 4,
  R2: 0
};
var SERIA_OPTION = {
  name: 'Range',
  type: 'columnrange',
  borderWidth: 0,
  pointWidth: INIT.POIN_WIDTH
};

var _getNames = function _getNames(s) {
  var n1 = s[0].name,
      n2 = s[1].name;
  return n1 <= n2 ? {
    n1: n1,
    n2: n2,
    fromIndex: 0,
    toIndex: 1
  } : {
    n1: n2,
    n2: n1,
    fromIndex: 1,
    toIndex: 0
  };
};

var _setRadius = function _setRadius(value, seria) {
  var _ = seria.options;
  _.marker.radius = value;
  seria.update(_, false);
};

var _fHeValue = function _fHeValue(propName, min, max) {
  return function (v) {
    var _ = parseInt(v, 10);

    if (_ > min && _ < max) {
      this[propName] = v;
    }
  };
};

var _crSeriaOptions = function _crSeriaOptions(pointWidth) {
  return (0, _extends2["default"])({}, SERIA_OPTION, {}, {
    pointWidth: pointWidth
  });
};

var ColumnRangeDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ColumnRangeDialog, _Component);

  function ColumnRangeDialog(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _this._hAdd = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          _fromIndex = _assertThisInitialize._fromIndex,
          _toIndex = _assertThisInitialize._toIndex,
          props = _assertThisInitialize.props;

      var data = props.data,
          onClose = props.onClose,
          chart = data.chart,
          _series = chart.series,
          _s1 = _series[_fromIndex],
          _s2 = _series[_toIndex],
          _d = _seriaFns["default"].columnRange(_s1.data, _s2.data);

      _this._heWidth(_this._refW.current.getValue());

      _this._heRadius1(_this._refR1.current.getValue());

      _this._heRadius2(_this._refR2.current.getValue());

      _setRadius(_this._r1, _s1);

      _setRadius(_this._r2, _s2);

      chart.zhAddSeriaToYAxis({
        data: _d,
        color: _this._color,
        yIndex: 0
      }, _crSeriaOptions(_this._pointWidth));
      chart.zhEnableDataLabels();
      onClose();
    };

    _this._heColor = function (color) {
      _this._color = color;
    };

    _this._commandButtons = [_react["default"].createElement(_DialogCell["default"].Button.Flat, {
      key: "yes",
      caption: "Yes, Connect" //accessKey="y"
      ,
      isPrimary: true,
      onClick: _this._hAdd
    })];
    _this._heWidth = _fHeValue('_pointWidth', -1, 7).bind((0, _assertThisInitialized2["default"])(_this));
    _this._heRadius1 = _fHeValue('_r1', -1, 9).bind((0, _assertThisInitialized2["default"])(_this));
    _this._heRadius2 = _fHeValue('_r2', -1, 9).bind((0, _assertThisInitialized2["default"])(_this));
    _this._r1 = INIT.R1;
    _this._r2 = INIT.R1;
    _this._pointWidth = INIT.POIN_WIDTH;
    _this._refW = _react["default"].createRef();
    _this._refR1 = _react["default"].createRef();
    _this._refR2 = _react["default"].createRef();
    return _this;
  }

  var _proto = ColumnRangeDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        data = _this$props.data,
        onClose = _this$props.onClose,
        chart = data.chart,
        _s = chart.series,
        _getNames2 = _getNames(_s),
        n1 = _getNames2.n1,
        n2 = _getNames2.n2,
        fromIndex = _getNames2.fromIndex,
        toIndex = _getNames2.toIndex,
        c1 = _s[fromIndex].color,
        c2 = _s[toIndex].color;

    this._fromIndex = fromIndex;
    this._toIndex = toIndex;
    this._color = c1;
    return _react["default"].createElement(_ModalDialog["default"], {
      caption: "Add ColumnRange",
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose
    }, _react["default"].createElement("div", {
      style: S.TEXT
    }, "Connect dots series by column range?"), _react["default"].createElement("div", {
      style: S.ROW
    }, _react["default"].createElement(_DialogCell["default"].RowInputColor, {
      styleRoot: S.INLINE,
      styleCaption: S.CAPTION_1,
      initValue: c1,
      onEnter: this._heColor,
      maxLength: 7
    }), _react["default"].createElement(_DialogCell["default"].RowInputText, {
      ref: this._refW,
      styleRoot: S.INLINE,
      styleCaption: S.CAPTION_1,
      styleInput: S.INPUT,
      caption: "Width",
      initValue: INIT.POIN_WIDTH,
      maxLength: 2,
      type: "number",
      min: 0,
      max: 6,
      step: 1
    })), _react["default"].createElement("div", {
      style: S.ROW
    }, _react["default"].createElement(_DialogCell["default"].RowInputText, {
      ref: this._refR1,
      styleRoot: S.INLINE,
      styleCaption: (0, _extends2["default"])({}, S.CAPTION_2, {}, {
        color: c1
      }),
      styleInput: S.INPUT,
      caption: "R " + n1,
      initValue: INIT.R1,
      type: "number",
      maxLength: 2
    }), _react["default"].createElement(_DialogCell["default"].RowInputText, {
      ref: this._refR2,
      styleRoot: S.INLINE,
      styleCaption: (0, _extends2["default"])({}, S.CAPTION_2, {}, {
        color: c2
      }),
      styleInput: S.INPUT,
      caption: "R " + n2,
      initValue: INIT.R2,
      type: "number",
      maxLength: 2
    })));
  };

  return ColumnRangeDialog;
}(_react.Component);

var _default = ColumnRangeDialog;
exports["default"] = _default;
//# sourceMappingURL=ColumnRangeDialog.js.map