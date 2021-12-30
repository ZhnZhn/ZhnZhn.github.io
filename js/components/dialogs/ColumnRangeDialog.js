"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _seriaFns = _interopRequireDefault(require("../../charts/seriaFns"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const S_TEXT = {
  padding: '16px 0 0 16px',
  fontWeight: 600
},
      S_ROW = {
  paddingLeft: 8
},
      S_INLINE = {
  display: 'inline-block'
},
      S_CAPTION_1 = {
  width: 60
},
      S_CAPTION_2 = {
  width: 100
},
      S_INPUT = {
  width: 40
};
const INIT = {
  POIN_WIDTH: 1,
  R1: 4,
  R2: 0
};
const SERIA_OPTION = {
  name: 'Range',
  type: 'columnrange',
  borderWidth: 0,
  pointWidth: INIT.POIN_WIDTH
};

const _getNames = s => {
  const n1 = s[0].name,
        n2 = s[1].name;
  return n1 <= n2 ? {
    n1,
    n2,
    fromIndex: 0,
    toIndex: 1
  } : {
    n1: n2,
    n2: n1,
    fromIndex: 1,
    toIndex: 0
  };
};

const _setRadius = (value, seria) => {
  const _ = seria.options;
  _.marker.radius = value;
  seria.update(_, false);
};

const _fHeValue = (propName, min, max) => function (v) {
  const _ = parseInt(v, 10);

  if (_ > min && _ < max) {
    this[propName] = v;
  }
};

const _crSeriaOptions = pointWidth => ({ ...SERIA_OPTION,
  ...{
    pointWidth
  }
});

class ColumnRangeDialog extends _react.Component {
  constructor(_props) {
    super(_props);

    this._hAdd = () => {
      const {
        _fromIndex,
        _toIndex,
        props
      } = this;

      const {
        data,
        onClose
      } = props,
            {
        chart
      } = data,
            _series = chart.series,
            _s1 = _series[_fromIndex],
            _s2 = _series[_toIndex],
            _d = _seriaFns.default.columnRange(_s1.data, _s2.data);

      this._heWidth(this._refW.current.getValue());

      this._heRadius1(this._refR1.current.getValue());

      this._heRadius2(this._refR2.current.getValue());

      _setRadius(this._r1, _s1);

      _setRadius(this._r2, _s2);

      chart.zhAddSeriaToYAxis({
        data: _d,
        color: this._color,
        yIndex: 0
      }, _crSeriaOptions(this._pointWidth));
      chart.zhEnableDataLabels();
      onClose();
    };

    this._heColor = color => {
      this._color = color;
    };

    this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Flat, {
      caption: "Yes, Connect",
      isPrimary: true,
      onClick: this._hAdd
    }, "yes")];
    this._heWidth = _fHeValue('_pointWidth', -1, 7).bind(this);
    this._heRadius1 = _fHeValue('_r1', -1, 9).bind(this);
    this._heRadius2 = _fHeValue('_r2', -1, 9).bind(this);
    this._r1 = INIT.R1;
    this._r2 = INIT.R1;
    this._pointWidth = INIT.POIN_WIDTH;
    this._refW = /*#__PURE__*/(0, _react.createRef)();
    this._refR1 = /*#__PURE__*/(0, _react.createRef)();
    this._refR2 = /*#__PURE__*/(0, _react.createRef)();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  }

  render() {
    const {
      isShow,
      data,
      onClose
    } = this.props,
          {
      chart
    } = data,
          _s = chart.series,
          {
      n1,
      n2,
      fromIndex,
      toIndex
    } = _getNames(_s),
          c1 = _s[fromIndex].color,
          c2 = _s[toIndex].color;

    this._fromIndex = fromIndex;
    this._toIndex = toIndex;
    this._color = c1;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
      caption: "Add ColumnRange",
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S_TEXT,
        children: "Connect dots series by column range?"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_ROW,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputColor, {
          style: S_INLINE,
          captionStyle: S_CAPTION_1,
          caption: "Color",
          initValue: c1,
          onEnter: this._heColor
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputText, {
          ref: this._refW,
          styleRoot: S_INLINE,
          styleCaption: S_CAPTION_1,
          styleInput: S_INPUT,
          caption: "Width",
          initValue: INIT.POIN_WIDTH,
          maxLength: 2,
          type: "number",
          min: 0,
          max: 6,
          step: 1
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_ROW,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputText, {
          ref: this._refR1,
          styleRoot: S_INLINE,
          styleCaption: { ...S_CAPTION_2,
            ...{
              color: c1
            }
          },
          styleInput: S_INPUT,
          caption: "R " + n1,
          initValue: INIT.R1,
          type: "number",
          maxLength: 2
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputText, {
          ref: this._refR2,
          styleRoot: S_INLINE,
          styleCaption: { ...S_CAPTION_2,
            ...{
              color: c2
            }
          },
          styleInput: S_INPUT,
          caption: "R " + n2,
          initValue: INIT.R2,
          type: "number",
          maxLength: 2
        })]
      })]
    });
  }

}

var _default = ColumnRangeDialog;
exports.default = _default;
//# sourceMappingURL=ColumnRangeDialog.js.map