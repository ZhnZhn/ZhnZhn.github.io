'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE = {
  ROOT_DIV_SHOW: {
    position: 'relative',
    display: 'block',
    zIndex: 1
  },
  ROOT_DIV_HIDE: {
    position: 'relative',
    display: 'none'
  }
};

var ZhHighchart = function (_Component) {
  _inherits(ZhHighchart, _Component);

  function ZhHighchart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ZhHighchart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ZhHighchart.__proto__ || Object.getPrototypeOf(ZhHighchart)).call.apply(_ref, [this].concat(args))), _this), _this.renderChart = function (config) {
      if (!config) {
        throw new Error('Config must be specified for the ZhHighchart');
      }
      var chartConfig = config.chart;
      _this.chart = new _highcharts2.default['Chart'](_extends({}, config, {
        chart: _extends({}, chartConfig, {
          renderTo: _this.chartEl
        })
      }));
    }, _this.getChart = function () {
      if (!_this.chart) {
        throw new Error('getChart() should not called before the ZhHighchart component is mounted');
      }
      return _this.chart;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ZhHighchart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          config = _props.config,
          onLoaded = _props.onLoaded;

      this.renderChart(config);
      if (typeof onLoaded === 'function') {
        onLoaded(this.chart);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var onWillUnLoaded = this.props.onWillUnLoaded;

      if (typeof onWillUnLoaded === 'function') {
        onWillUnLoaded(this.chart);
      }
      this.chart.destroy();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isShow = this.props.isShow,
          _rootDivStyle = isShow ? STYLE.ROOT_DIV_SHOW : STYLE.ROOT_DIV_HIDE;

      return _react2.default.createElement(
        'div',
        { style: _rootDivStyle },
        _react2.default.createElement('div', { ref: function ref(c) {
            return _this2.chartEl = c;
          } })
      );
    }
  }]);

  return ZhHighchart;
}(_react.Component);

exports.default = ZhHighchart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ZhHighchart.js.map