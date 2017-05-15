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

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _safeGet = require('../../utils/safeGet');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _OpenClose = require('../zhn/OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _RowInputText = require('./RowInputText');

var _RowInputText2 = _interopRequireDefault(_RowInputText);

var _RowInputColor = require('./RowInputColor');

var _RowInputColor2 = _interopRequireDefault(_RowInputColor);

var _RowCheckBox = require('../dialogs/RowCheckBox');

var _RowCheckBox2 = _interopRequireDefault(_RowCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROW_INPUT: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
};

var arrType = ['area', 'areaspline', 'line', 'spline', 'bar', 'column'];
var arrSymbol = ['circle', 'square', 'diamond', 'triangle', 'triangle-down'];

var _fnIsInArray = function _fnIsInArray(arr, value) {
  return arr.indexOf(value) !== -1 ? true : false;
};

var _fnIsValidColor = function _fnIsValidColor(color) {
  var el = document.createElement('div');
  el.style.color = color;
  //el.style.color.split(/\s+/).join('').toLowerCase()
  return el.style.color ? true : false;
};

var _fnFindPoint = function _fnFindPoint(points, dmy) {
  var mls = _DateUtils2.default.dmyToUTC(dmy);
  return points.find(function (point) {
    return point.x === mls;
  });
};

var CellSeria = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(CellSeria, _Component);

  function CellSeria(props) {
    (0, _classCallCheck3.default)(this, CellSeria);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CellSeria.__proto__ || Object.getPrototypeOf(CellSeria)).call(this));

    _initialiseProps.call(_this);

    _this._initProps(props);
    return _this;
  }

  (0, _createClass3.default)(CellSeria, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this._initProps(nextProps);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var options = this.props.options,
          name = options.name,
          type = options.type,
          color = options.color,
          symbol = options.symbol;

      return _react2.default.createElement(
        _OpenClose2.default,
        { caption: name, isClose: true },
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'Type:',
          initValue: type,
          onEnter: this._handleEnterType
        }),
        _react2.default.createElement(_RowInputColor2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'Color:',
          initValue: color,
          onEnter: this._handleEnterColor
        }),
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'Symbol:',
          initValue: symbol,
          onEnter: this._handleEnterSymbol
        }),
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'AxisPt:',
          initValue: '',
          onEnter: this._handleEnterAxisPt
        }),
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'HoverPt:',
          initValue: '',
          onEnter: this._handleEnterHover
        }),
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'TooltipPt:',
          initValue: '',
          onEnter: this._handleEnterTooltip
        }),
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'CrossXPt:',
          initValue: '',
          onEnter: this._handleEnterCrossX
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          caption: 'Toggle Seria',
          onCheck: this._handleToggleSeria.bind(null, false),
          onUnCheck: this._handleToggleSeria.bind(null, true)
        })
      );
    }
  }]);
  return CellSeria;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._initProps = function (props) {
    var _props$chart = props.chart,
        chart = _props$chart === undefined ? {} : _props$chart,
        _props$seriaIndex = props.seriaIndex,
        seriaIndex = _props$seriaIndex === undefined ? 0 : _props$seriaIndex;


    _this2.seriaIns = (0, _safeGet2.default)(chart, 'series[' + seriaIndex + ']', {});
    _this2.data = (0, _safeGet2.default)(chart, 'series[' + seriaIndex + '].data', []);
  };

  this._handleEnterType = function (value) {
    var chart = _this2.props.chart,
        seriaOptions = _this2.seriaIns.options;


    if (seriaOptions && chart.addSeries && _fnIsInArray(arrType, value)) {

      seriaOptions.type = value;
      _this2.seriaIns.update(seriaOptions);
      /*
      seria.remove(false);
      chart.addSeries(seriaOptions);
      */
    }
  };

  this._handleEnterColor = function (value) {
    var chart = _this2.props.chart,
        seriaOptions = _this2.seriaIns.options;


    if (seriaOptions && chart.addSeries && _fnIsValidColor(value)) {
      seriaOptions.color = value;
      _this2.seriaIns.update(seriaOptions);
    }
  };

  this._handleEnterSymbol = function (value) {
    var chart = _this2.props.chart,
        seriaOptions = _this2.seriaIns.options;


    if (seriaOptions && chart.addSeries && _fnIsInArray(arrSymbol, value)) {
      if (seriaOptions.marker) {
        seriaOptions.marker.symbol = value;
      } else {
        seriaOptions.marker = { symbol: value };
      }
      _this2.seriaIns.update(seriaOptions);
    }
  };

  this._handleEnterHover = function (value) {
    var point = _fnFindPoint(_this2.data, value);
    if (point) {
      point.setState('hover');
    }
  };

  this._handleEnterTooltip = function (value) {
    var chart = _this2.props.chart,
        point = _fnFindPoint(_this2.data, value);

    if (point) {
      chart.zhTooltip.refresh(point);
    }
  };

  this._handleEnterCrossX = function (value) {
    var chart = _this2.props.chart,
        point = _fnFindPoint(_this2.data, value);

    if (point) {
      chart.xAxis[0].drawCrosshair(null, point);
    }
  };

  this._handleEnterAxisPt = function (value) {
    var point = _fnFindPoint(_this2.data, value);
    if (point) {
      point.onMouseOver();
      point.setState('');
    }
  };

  this._handleToggleSeria = function (isShow) {
    _this2.seriaIns.setVisible(isShow);
  };
}, _temp);
process.env.NODE_ENV !== "production" ? CellSeria.propTypes = {
  chart: _react.PropTypes.object,
  options: _react.PropTypes.shape({
    type: _react.PropTypes.string,
    color: _react.PropTypes.string,
    marker: _react.PropTypes.shape({
      symbol: _react.PropTypes.string
    })
  }),
  seriaIndex: _react.PropTypes.number
} : void 0;
exports.default = CellSeria;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\CellSeria.js.map