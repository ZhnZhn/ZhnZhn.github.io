'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _seriaFns = require('../../charts/seriaFns');

var _seriaFns2 = _interopRequireDefault(_seriaFns);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _DialogCell = require('./DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return n1 <= n2 ? { n1: n1, n2: n2, fromIndex: 0, toIndex: 1 } : { n1: n2, n2: n1, fromIndex: 1, toIndex: 0 };
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
  return (0, _extends3.default)({}, SERIA_OPTION, { pointWidth: pointWidth });
};

var ColumnRangeDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ColumnRangeDialog, _Component);

  function ColumnRangeDialog(props) {
    (0, _classCallCheck3.default)(this, ColumnRangeDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ColumnRangeDialog.__proto__ || Object.getPrototypeOf(ColumnRangeDialog)).call(this, props));

    _initialiseProps.call(_this);

    _this._commandButtons = [_react2.default.createElement(_Button2.default.Flat, {
      key: 'yes',
      caption: 'Yes, Connect'
      //accessKey="y"
      , isPrimary: true,
      onClick: _this._hAdd
    })];
    _this._heWidth = _fHeValue('_pointWidth', -1, 7).bind(_this);
    _this._heRadius1 = _fHeValue('_r1', -1, 9).bind(_this);
    _this._heRadius2 = _fHeValue('_r2', -1, 9).bind(_this);
    _this._r1 = INIT.R1;
    _this._r2 = INIT.R1;
    _this._pointWidth = INIT.POIN_WIDTH;

    _this._refW = _react2.default.createRef();
    _this._refR1 = _react2.default.createRef();
    _this._refR2 = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(ColumnRangeDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          data = _props.data,
          onClose = _props.onClose,
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
      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Add ColumnRange',
          isShow: isShow,
          commandButtons: this._commandButtons,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: S.TEXT },
          'Connect dots series by column range?'
        ),
        _react2.default.createElement(
          'div',
          { style: S.ROW },
          _react2.default.createElement(_DialogCell2.default.RowInputColor, {
            styleRoot: S.INLINE,
            styleCaption: S.CAPTION_1,
            initValue: c1,
            onEnter: this._heColor,
            maxLength: 7
          }),
          _react2.default.createElement(_DialogCell2.default.RowInputText, {
            ref: this._refW,
            styleRoot: S.INLINE,
            styleCaption: S.CAPTION_1,
            styleInput: S.INPUT,
            caption: 'Width',
            initValue: INIT.POIN_WIDTH,
            maxLength: 2,
            type: 'number',
            min: 0,
            max: 6,
            step: 1
          })
        ),
        _react2.default.createElement(
          'div',
          { style: S.ROW },
          _react2.default.createElement(_DialogCell2.default.RowInputText, {
            ref: this._refR1,
            styleRoot: S.INLINE,
            styleCaption: (0, _extends3.default)({}, S.CAPTION_2, { color: c1 }),
            styleInput: S.INPUT,
            caption: 'R ' + n1,
            initValue: INIT.R1,
            type: 'number',
            maxLength: 2
          }),
          _react2.default.createElement(_DialogCell2.default.RowInputText, {
            ref: this._refR2,
            styleRoot: S.INLINE,
            styleCaption: (0, _extends3.default)({}, S.CAPTION_2, { color: c2 }),
            styleInput: S.INPUT,
            caption: 'R ' + n2,
            initValue: INIT.R2,
            type: 'number',
            maxLength: 2
          })
        )
      );
    }
  }]);
  return ColumnRangeDialog;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._hAdd = function () {
    var _fromIndex = _this2._fromIndex,
        _toIndex = _this2._toIndex,
        props = _this2.props;

    var data = props.data,
        onClose = props.onClose,
        chart = data.chart,
        _series = chart.series,
        _s1 = _series[_fromIndex],
        _s2 = _series[_toIndex],
        _d = _seriaFns2.default.columnRange(_s1.data, _s2.data);

    _this2._heWidth(_this2._refW.current.getValue());
    _this2._heRadius1(_this2._refR1.current.getValue());
    _this2._heRadius2(_this2._refR2.current.getValue());

    _setRadius(_this2._r1, _s1);
    _setRadius(_this2._r2, _s2);

    chart.zhAddSeriaToYAxis({
      data: _d,
      color: _this2._color,
      index: 0
    }, _crSeriaOptions(_this2._pointWidth));
    console.log(_this2._pointWidth);
    console.log(_crSeriaOptions(_this2._pointWidth));
    console.log(_this2._refW.current.getValue());
    chart.zhEnableDataLables();

    onClose();
  };

  this._heColor = function (color) {
    _this2._color = color;
  };
}, _temp);
exports.default = ColumnRangeDialog;
//# sourceMappingURL=ColumnRangeDialog.js.map