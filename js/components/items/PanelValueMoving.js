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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _QuandlFn = require('../../adapters/QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ArrayUtil = require('../../utils/ArrayUtil');

var _ArrayUtil2 = _interopRequireDefault(_ArrayUtil);

var _SpanValue = require('../zhn-span/SpanValue');

var _SpanValue2 = _interopRequireDefault(_SpanValue);

var _SpanDate = require('../zhn-span/SpanDate');

var _SpanDate2 = _interopRequireDefault(_SpanDate);

var _SpanLabel = require('../zhn-span/SpanLabel');

var _SpanLabel2 = _interopRequireDefault(_SpanLabel);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _SubPanel = require('./SubPanel');

var _SubPanel2 = _interopRequireDefault(_SubPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  SUB_PANEL: {
    position: 'absolute',
    top: '32px',
    left: '0px',
    width: 'auto'
  },
  ROW: {
    //width: '230px'
    display: 'flex',
    justifyContent: 'space-between'
  },
  DATE: {
    display: 'inline-block',
    //float: 'right',
    paddingLeft: '16px',
    whiteSpace: 'nowrap'
  },
  ROW_INPUT: {
    display: 'block',
    paddingTop: '8px'
  },
  INPUT_TEXT: {
    width: '100px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var _fnFindIndex = _ArrayUtil2.default.findIndexByProp('x');

var PanelValueMoving = function (_Component) {
  (0, _inherits3.default)(PanelValueMoving, _Component);

  function PanelValueMoving() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PanelValueMoving);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PanelValueMoving.__proto__ || Object.getPrototypeOf(PanelValueMoving)).call.apply(_ref, [this].concat(args))), _this), _this._handleEnterDate = function (dateTo) {
      //console.log('handleEnterDate')
      //console.log(dateTo)
      var chart = _this.props.fnGetChart(),
          points = chart.series[0].data,
          millisUTC = _DateUtils2.default.dmyToUTC(dateTo),
          index = _fnFindIndex(points, millisUTC);

      var valueTo = void 0;
      if (index !== -1) {

        valueTo = points[index].y;

        //console.log(index);
        //console.log(valueTo);

        var valueMoving = Object.assign({}, _this.props.valueMoving, _QuandlFn2.default.createValueMoving({
          bNowValue: (0, _big2.default)(_this.props.valueMoving.value.replace(' ', '')),
          bPrevValue: (0, _big2.default)(valueTo)
        }), { valueTo: valueTo, dateTo: dateTo });
        _this.props.onChangeDateTo(valueMoving);
      }
    }, _this._renderAdmin = function (isAdminMode, date) {
      if (!isAdminMode) {
        return null;
      } else {
        return _react2.default.createElement(
          'label',
          { style: STYLE.ROW_INPUT },
          _react2.default.createElement(_SpanLabel2.default, { label: 'CompareTo:' }),
          _react2.default.createElement(_InputText2.default, {
            style: STYLE.INPUT_TEXT,
            initValue: date,
            onEnter: _this._handleEnterDate
          })
        );
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PanelValueMoving, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          valueMoving = _props.valueMoving,
          isAdminMode = _props.isAdminMode,
          value = valueMoving.value,
          date = valueMoving.date,
          valueTo = valueMoving.valueTo,
          dateTo = valueMoving.dateTo,
          _isAdminMode = typeof isAdminMode == 'function' ? isAdminMode() : typeof isAdminMode == 'boolean' ? isAdminMode : false;

      return _react2.default.createElement(
        _SubPanel2.default,
        { style: STYLE.SUB_PANEL },
        _react2.default.createElement(
          'div',
          { style: STYLE.ROW },
          _react2.default.createElement(_SpanValue2.default, { value: value }),
          _react2.default.createElement(_SpanDate2.default, { date: date, style: STYLE.DATE })
        ),
        _react2.default.createElement(
          'div',
          { style: STYLE.ROW },
          _react2.default.createElement(_SpanValue2.default, { value: valueTo }),
          _react2.default.createElement(_SpanDate2.default, { date: dateTo, style: STYLE.DATE })
        ),
        this._renderAdmin(_isAdminMode, date)
      );
    }
  }]);
  return PanelValueMoving;
}(_react.Component);

process.env.NODE_ENV !== "production" ? PanelValueMoving.propTypes = {
  valueMoving: _react.PropTypes.object,
  fnGetChart: _react.PropTypes.func,
  onChangeDateTo: _react.PropTypes.func,
  isAdminMode: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool])
} : void 0;
exports.default = PanelValueMoving;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\PanelValueMoving.js.map