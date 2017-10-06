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

var _ScrollPane = require('../zhn/ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _SeriaRow = require('./SeriaRow');

var _SeriaRow2 = _interopRequireDefault(_SeriaRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ELL: 'ellipsis'
};

var S = {
  ROOT_DIV: {
    paddingTop: '8px'
  },
  TITLE: {
    paddingBottom: '4px',
    marginLeft: '16px',
    marginBottom: '8px',
    fontWeight: 'bold',
    borderBottom: '2px solid black'
  },
  CHART_ID: {
    width: '200px',
    verticalAlign: 'bottom',
    color: 'rgb(164, 135, 212)'
  }
};

var _crYAxisOption = function _crYAxisOption(toChart) {
  var options = [{
    caption: 'withYAxis',
    value: -1
  }];
  toChart.yAxis.forEach(function (yAxis, index) {
    options.push({
      caption: 'toYAxis' + (index + 1),
      value: index
    });
  });
  return options;
};

var SeriesPane = function (_Component) {
  (0, _inherits3.default)(SeriesPane, _Component);

  function SeriesPane() {
    (0, _classCallCheck3.default)(this, SeriesPane);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SeriesPane.__proto__ || Object.getPrototypeOf(SeriesPane)).call(this));

    _this._regSeriaRow = function (comp) {
      var compIndex = comp.props.compIndex;
      _this.compSeries[compIndex] = comp;
    };

    _this._unregSeriaRow = function (comp) {
      var compIndex = comp.props.compIndex;
      _this.compSeries[compIndex] = null;
    };

    _this._renderSeries = function (chartId, series, options) {
      return series.filter(function (seria) {
        return seria.visible;
      }).map(function (seria, index) {
        return _react2.default.createElement(_SeriaRow2.default, {
          key: chartId + index,
          seria: seria,
          compIndex: index,
          yAxisOptions: options,
          onReg: _this._regSeriaRow,
          onUnReg: _this._unregSeriaRow
        });
      });
    };

    _this.compSeries = [];
    return _this;
  }

  (0, _createClass3.default)(SeriesPane, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          toChart = _props.toChart,
          _props$fromChart = _props.fromChart,
          fromChart = _props$fromChart === undefined ? {} : _props$fromChart,
          _yAxisOption = _crYAxisOption(toChart),
          _fromChart$userOption = fromChart.userOptions,
          userOptions = _fromChart$userOption === undefined ? {} : _fromChart$userOption,
          _fromChart$series = fromChart.series,
          series = _fromChart$series === undefined ? [] : _fromChart$series,
          _userOptions$zhConfig = userOptions.zhConfig,
          zhConfig = _userOptions$zhConfig === undefined ? {} : _userOptions$zhConfig,
          _zhConfig$id = zhConfig.id,
          chartId = _zhConfig$id === undefined ? 'id' : _zhConfig$id;

      return _react2.default.createElement(
        _ScrollPane2.default,
        { style: rootStyle },
        _react2.default.createElement(
          'div',
          { style: S.ROOT_DIV },
          _react2.default.createElement(
            'div',
            { style: S.TITLE },
            _react2.default.createElement(
              'span',
              null,
              'From Chart:\xA0'
            ),
            _react2.default.createElement(
              'span',
              {
                className: CL.ELL,
                style: S.CHART_ID
              },
              chartId
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            this._renderSeries(chartId, series, _yAxisOption)
          )
        )
      );
    }
  }, {
    key: 'getValues',
    value: function getValues() {
      return this.compSeries.filter(function (comp) {
        return comp !== null;
      }).map(function (comp) {
        return comp.getValue();
      }).filter(function (config) {
        return config.isChecked;
      });
    }
  }]);
  return SeriesPane;
}(_react.Component);

exports.default = SeriesPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\SeriesPane.js.map