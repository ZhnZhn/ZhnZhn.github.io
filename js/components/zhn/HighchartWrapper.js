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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  SHOW: {
    position: 'relative',
    display: 'block',
    zIndex: 1
  },
  HIDE: {
    position: 'relative',
    display: 'none'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var HighchartWrapper = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(HighchartWrapper, _Component);

  function HighchartWrapper(props) {
    (0, _classCallCheck3.default)(this, HighchartWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HighchartWrapper.__proto__ || Object.getPrototypeOf(HighchartWrapper)).call(this, props));

    _this._renderChart = function (config) {
      if (!config) {
        throw new Error('Config must be specified for the ZhHighchart');
      }
      _this.chart = new _highcharts2.default['Chart'](_this._refChart.current, config);
    };

    _this._refChart = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(HighchartWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          config = _props.config,
          onLoaded = _props.onLoaded;

      this._renderChart(config);
      if (this.chart && _isFn(onLoaded)) {
        onLoaded(this.chart);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      try {
        var onWillUnLoaded = this.props.onWillUnLoaded;

        if (_isFn(onWillUnLoaded)) {
          onWillUnLoaded(this.chart);
        }
        this.chart.destroy();
        this.chart = null;
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
      var _props2 = this.props,
          isShow = _props2.isShow,
          rootStyle = _props2.rootStyle,
          isShowAbs = _props2.isShowAbs,
          absComp = _props2.absComp,
          _rootDivStyle = isShow ? S.SHOW : S.HIDE;

      return _react2.default.createElement(
        'div',
        {
          style: (0, _extends3.default)({}, rootStyle, _rootDivStyle)
        },
        _react2.default.createElement('div', { ref: this._refChart }),
        isShowAbs && absComp
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
  }]);
  return HighchartWrapper;
}(_react.Component), _class.defaultProps = {
  isShowAbs: true
}, _temp);
exports.default = HighchartWrapper;
//# sourceMappingURL=HighchartWrapper.js.map