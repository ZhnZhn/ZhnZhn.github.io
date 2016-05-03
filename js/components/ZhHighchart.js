'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _ButtonTab = require('./zhn/ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDivShow: {
    position: 'relative',
    display: 'block'
  },
  rootDivHide: {
    position: 'relative',
    display: 'none'
  }
};

var ZhHighchart = _react2.default.createClass({

  displayName: 'ZhHighchart',

  componentDidMount: function componentDidMount() {
    this.renderChart(this.props.config);
    if (this.props.onLoaded) {
      this.props.onLoaded(this.chart);
    }
  },
  componentWillUnmout: function componentWillUnmout() {
    this.chart.destroy();
  },
  renderChart: function renderChart(config) {
    if (!config) {
      throw new Error('Config must be specified for the ZhHighchart');
    }

    var chartConfig = config.chart;
    this.chart = new _highcharts2.default['Chart'](_extends({}, config, {
      chart: _extends({}, chartConfig, {
        renderTo: this.refs.chart
      })
    }));
  },
  render: function render() {
    var _props = this.props;
    var isShow = _props.isShow;
    var toolBar = _props.toolBar;

    var _styleRootDiv = isShow ? styles.rootDivShow : styles.rootDivHide;
    return _react2.default.createElement(
      'div',
      { style: _styleRootDiv },
      toolBar,
      _react2.default.createElement('div', { ref: 'chart' })
    );
  },
  getChart: function getChart() {
    if (!this.chart) {
      throw new Error('getChart() should not called before the ZhHighchart component is mounted');
    }
    return this.chart;
  }
});

exports.default = ZhHighchart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ZhHighchart.js.map