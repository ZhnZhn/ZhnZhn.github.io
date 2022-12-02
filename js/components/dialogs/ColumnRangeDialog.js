"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _seriaFns = require("../../charts/seriaFns");

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

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
const DF_POIN_WIDTH = 1,
      DF_R1 = 4,
      DF_R2 = 0;
const SERIA_OPTION = {
  name: 'Range',
  type: 'columnrange',
  borderWidth: 0,
  pointWidth: DF_POIN_WIDTH
}; // [n1,n2,fromIndex,toIndex]

const _getNames = s => {
  const n1 = s[0].name,
        n2 = s[1].name;
  return n1 <= n2 ? [n1, n2, 0, 1] : [n2, n1, 1, 0];
};

const _getColor = (series, index) => series[index].color;

const _setRadius = (value, seria) => {
  const {
    options
  } = seria;
  options.marker.radius = value;
  seria.update(options, false);
};

const _fHeValue = (propName, min, max) => function (v) {
  const _ = parseInt(v, 10);

  if (_ > min && _ < max) {
    this[propName] = v;
  }
};

const _getValue = ref => ref.current.getValue();

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
        _color,
        props
      } = this,
            {
        data,
        onClose
      } = props,
            {
        chart
      } = data,
            _series = chart.series,
            _s1 = _series[_fromIndex],
            _s2 = _series[_toIndex],
            _d = (0, _seriaFns.columnRange)(_s1.data, _s2.data);

      this._heWidth(_getValue(this._refW));

      this._heRadius1(_getValue(this._refR1));

      this._heRadius2(_getValue(this._refR2));

      _setRadius(this._r1, _s1);

      _setRadius(this._r2, _s2);

      chart.zhAddSeriaToYAxis({
        data: _d,
        color: _color,
        yIndex: 0
      }, _crSeriaOptions(this._pointWidth));
      chart.zhEnableDataLabels();
      onClose();
    };

    this._heColor = color => {
      this._color = color;
    };

    this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      caption: "Yes, Connect",
      isPrimary: true,
      onClick: this._hAdd
    }, "yes")];
    this._heWidth = _fHeValue('_pointWidth', -1, 7).bind(this);
    this._heRadius1 = _fHeValue('_r1', -1, 9).bind(this);
    this._heRadius2 = _fHeValue('_r2', -1, 9).bind(this);
    this._r1 = DF_R1;
    this._r2 = DF_R2;
    this._pointWidth = DF_POIN_WIDTH;
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
          {
      series
    } = chart,
          [n1, n2, fromIndex, toIndex] = _getNames(series),
          c1 = _getColor(series, fromIndex),
          c2 = _getColor(series, toIndex);

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
          initValue: DF_POIN_WIDTH,
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
          initValue: DF_R1,
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
          initValue: DF_R2,
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