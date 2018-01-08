'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var HighchartWrapper = function (_Component) {
  (0, _inherits3.default)(HighchartWrapper, _Component);

  function HighchartWrapper() {
    (0, _classCallCheck3.default)(this, HighchartWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HighchartWrapper.__proto__ || Object.getPrototypeOf(HighchartWrapper)).call(this));

    _this.renderChart = function (config) {
      if (!config) {
        throw new Error('Config must be specified for the ZhHighchart');
      }
      var chartConfig = config.chart;
      _this.chart = new _highcharts2.default['Chart']((0, _extends3.default)({}, config, {
        chart: (0, _extends3.default)({}, chartConfig, {
          renderTo: _this.chartEl
        })
      }));
    };

    _this.state = {
      isShowAbsComp: true
    };
    return _this;
  }

  (0, _createClass3.default)(HighchartWrapper, [{
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

      try {
        this.chart.destroy();
      } catch (err) {
        /*eslint-disable no-undef */
        if (process.env.NODE_ENV === 'development') {
          console.log('Exception during destroy chart');
          console.log(err);
        }
        /*eslint-enable no-undef */
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          isShow = _props2.isShow,
          rootStyle = _props2.rootStyle,
          absComp = _props2.absComp,
          isShowAbsComp = this.state.isShowAbsComp,
          _absComp = isShowAbsComp ? absComp : null,
          _rootDivStyle = isShow ? STYLE.ROOT_DIV_SHOW : STYLE.ROOT_DIV_HIDE;

      return _react2.default.createElement(
        'div',
        {
          style: (0, _extends3.default)({}, rootStyle, _rootDivStyle)
        },
        _react2.default.createElement('div', { ref: function ref(c) {
            return _this2.chartEl = c;
          } }),
        _absComp
      );
    }
  }, {
    key: 'getChart',
    value: function getChart() {
      if (!this.chart) {
        throw new Error('getChart() should not called before the ZhHighchart component is mounted');
      }
      return this.chart;
    }
  }, {
    key: 'toggleAbsComp',
    value: function toggleAbsComp() {
      this.setState(function (prevState) {
        return {
          isShowAbsComp: !prevState.isShowAbsComp
        };
      });
    }
  }]);
  return HighchartWrapper;
}(_react.Component);

exports.default = HighchartWrapper;
//# sourceMappingURL=HighchartWrapper.js.map