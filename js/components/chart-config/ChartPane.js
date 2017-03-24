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

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _RowInputText = require('./RowInputText');

var _RowInputText2 = _interopRequireDefault(_RowInputText);

var _RowCheckBox = require('./RowCheckBox');

var _RowCheckBox2 = _interopRequireDefault(_RowCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _findPlotLine = function _findPlotLine(chart, id) {
  var _lines = (0, _lodash2.default)(chart, 'options.yAxis[0].plotLines', []);
  return _lines.find(function (item) {
    return item.id === id;
  });
};

var ChartPane = function (_Component) {
  (0, _inherits3.default)(ChartPane, _Component);

  function ChartPane(props) {
    (0, _classCallCheck3.default)(this, ChartPane);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChartPane.__proto__ || Object.getPrototypeOf(ChartPane)).call(this));

    _this._handleEnterTitle = function (value) {
      var chart = (0, _lodash2.default)(_this.props, 'chart', {}),
          options = chart.options;

      if (options && chart.setTitle) {
        var _options$title = options.title,
            title = _options$title === undefined ? {} : _options$title,
            _options$subtitle = options.subtitle,
            subtitle = _options$subtitle === undefined ? {} : _options$subtitle;

        title.text = value;
        chart.setTitle(title, subtitle);
      }
    };

    _this._handleEnterSubtitle = function (value) {
      var chart = (0, _lodash2.default)(_this.props, 'chart', {}),
          options = chart.options;

      if (options && chart.setTitle) {
        var _options$title2 = options.title,
            title = _options$title2 === undefined ? {} : _options$title2,
            _options$subtitle2 = options.subtitle,
            subtitle = _options$subtitle2 === undefined ? {} : _options$subtitle2;

        subtitle.text = value;
        chart.setTitle(title, subtitle);
      }
    };

    _this._handleRemovePlotLine = function (id) {
      var chart = (0, _lodash2.default)(_this.props, 'chart'),
          lineOptions = _findPlotLine(chart, id),
          yAxis = (0, _lodash2.default)(chart, 'yAxis[0]');

      if (lineOptions && yAxis.removePlotLine) {
        _this.hmLines[id] = lineOptions;
        yAxis.removePlotLine(id);
      }
    };

    _this._handleAddPlotLine = function (id) {
      var chart = (0, _lodash2.default)(_this.props, 'chart'),
          yAxis = (0, _lodash2.default)(chart, 'yAxis[0]');

      if (yAxis && yAxis.addPlotLine) {
        yAxis.addPlotLine(_this.hmLines[id]);
      }
    };

    _this._handleHideSeriesTitles = function () {
      var _els = (0, _lodash2.default)(_this.props, 'chart.options.zhSeries.titleEls', []);
      _els.forEach(function (el) {
        el.css({ display: 'none' });
      });
    };

    _this._handleShowSeriesTitles = function () {
      var _els = (0, _lodash2.default)(_this.props, 'chart.options.zhSeries.titleEls', []);
      _els.forEach(function (el) {
        el.css({ display: 'inline' });
      });
    };

    _this.hmLines = {};
    return _this;
  }

  (0, _createClass3.default)(ChartPane, [{
    key: 'render',
    value: function render() {
      var chart = this.props.chart,
          _title = (0, _lodash2.default)(chart, 'options.title.text', ''),
          _subtitle = (0, _lodash2.default)(chart, 'options.subtitle.text', '');


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_RowInputText2.default, {
          caption: 'Title:',
          initValue: _title,
          onEnter: this._handleEnterTitle
        }),
        _react2.default.createElement(_RowInputText2.default, {
          caption: 'Subtitle:',
          initValue: _subtitle,
          onEnter: this._handleEnterSubtitle
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          caption: 'Hide YAxis Max Plot Line',
          onCheck: this._handleRemovePlotLine.bind(null, 'max'),
          onUnCheck: this._handleAddPlotLine.bind(null, 'max')
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          caption: 'Hide YAxis Min Plot Line',
          onCheck: this._handleRemovePlotLine.bind(null, 'min'),
          onUnCheck: this._handleAddPlotLine.bind(null, 'min')
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          caption: 'Hide Series Titles',
          onCheck: this._handleHideSeriesTitles,
          onUnCheck: this._handleShowSeriesTitles
        })
      );
    }
  }]);
  return ChartPane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ChartPane.propTypes = {
  chart: _react.PropTypes.object
} : void 0;
exports.default = ChartPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\ChartPane.js.map