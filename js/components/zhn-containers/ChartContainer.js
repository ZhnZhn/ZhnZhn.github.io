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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _ChartStore = require('../../flux/stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _BrowserCaption = require('../zhn/BrowserCaption');

var _BrowserCaption2 = _interopRequireDefault(_BrowserCaption);

var _SvgHrzResize = require('../zhn/SvgHrzResize');

var _SvgHrzResize2 = _interopRequireDefault(_SvgHrzResize);

var _ScrollPane = require('../zhn/ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _ItemFactory = require('../factories/ItemFactory');

var _ItemFactory2 = _interopRequireDefault(_ItemFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHOW_POPUP = "show-popup",
    CHILD_MARGIN = 36,
    RESIZE_MIN_WIDTH = 600,
    RESIZE_MAX_WIDTH = 1200;

var styles = {
  rootDiv: {
    backgroundColor: '#4D4D4D',
    padding: '0px 0px 3px 0px',
    position: 'relative',
    borderRadius: '4px',
    width: '635px',
    height: 'calc(100vh - 71px)',
    minHeight: '500px',
    marginLeft: '16px',
    boxShadow: '1px 4px 6px 1px rgba(0,0,0,0.6)',
    overflowY: 'hidden',
    overflowX: 'hidden'
  },
  hrzResize: {
    position: 'absolute',
    top: '30px',
    right: '0'
  },
  scrollDiv: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  chartDiv: {
    overflowY: 'auto',
    height: '680px'
  },
  transitionOption: {
    transitionName: "scaleY",
    transitionEnterTimeout: 400,
    transitionLeave: false
  },
  inlineBlock: {
    display: 'inline-block'
  },
  none: {
    display: 'none'
  }
};

var isInArray = function isInArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments[1];

  var i = 0,
      len = array.length;
  for (; i < len; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
};

var compActions = [_ChartActions.ChartActionTypes.SHOW_CHART, _ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED, _ChartActions.ChartActionTypes.CLOSE_CHART];

var ChartContainer = function (_Component) {
  (0, _inherits3.default)(ChartContainer, _Component);

  function ChartContainer(props) {
    (0, _classCallCheck3.default)(this, ChartContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChartContainer.__proto__ || Object.getPrototypeOf(ChartContainer)).call(this));

    _this._onStore = function (actionType, data) {
      if (isInArray(compActions, actionType)) {
        if (data && data.chartType === _this.props.chartType) {
          _this.setState(data);
        }
      } else if (actionType === _ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2) {
        if (data === _this.props.chartType) {
          _this._handleHide();
        }
      }
    };

    _this._handleHide = function () {
      var _this$props = _this.props,
          chartType = _this$props.chartType,
          browserType = _this$props.browserType,
          onCloseContainer = _this$props.onCloseContainer;

      onCloseContainer(chartType, browserType);
      _this.setState({ isShow: false });
    };

    _this._handleResizeAfter = function (parentWidth) {
      var i = 0,
          max = _this.state.configs.length;
      for (; i < max; i++) {
        if (typeof _this.refs['chart' + i].reflowChart === 'function') {
          _this.refs['chart' + i].reflowChart(parentWidth - _this.childMargin);
        }
      }
    };

    _this._renderCharts = function () {
      var _this$props2 = _this.props,
          chartType = _this$props2.chartType,
          browserType = _this$props2.browserType,
          onCloseItem = _this$props2.onCloseItem,
          _this$state$configs = _this.state.configs,
          configs = _this$state$configs === undefined ? [] : _this$state$configs;

      return configs.map(function (config, index) {
        var _config$zhConfig = config.zhConfig,
            zhConfig = _config$zhConfig === undefined ? {} : _config$zhConfig,
            id = zhConfig.id;

        return _ItemFactory2.default.createItem(config, index, { chartType: chartType }, { onCloseItem: onCloseItem.bind(null, chartType, browserType, id) });
      });
    };

    _this.childMargin = CHILD_MARGIN;
    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(ChartContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.unsubscribe = _ChartStore2.default.listen(this._onStore);
      var _initState = _ChartStore2.default.getConfigs(this.props.chartType);
      if (_initState) {
        this.setState(_initState);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var caption = this.props.caption,
          isShow = this.state.isShow,
          _styleIsShow = isShow ? styles.inlineBlock : styles.none,
          _classIsShow = isShow ? SHOW_POPUP : undefined;

      return _react2.default.createElement(
        'div',
        {
          className: _classIsShow,
          style: Object.assign({}, styles.rootDiv, _styleIsShow)
        },
        _react2.default.createElement(
          _BrowserCaption2.default,
          {
            caption: caption,
            onClose: this._handleHide
          },
          _react2.default.createElement(_SvgHrzResize2.default, {
            minWidth: RESIZE_MIN_WIDTH,
            maxWidth: RESIZE_MAX_WIDTH,
            comp: this,
            onResizeAfter: this._handleResizeAfter
          })
        ),
        _react2.default.createElement(
          _ScrollPane2.default,
          { style: styles.scrollDiv },
          _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            (0, _extends3.default)({}, styles.transitionOption, {
              component: 'div'
            }),
            this._renderCharts()
          )
        )
      );
    }
  }]);
  return ChartContainer;
}(_react.Component);

exports.default = ChartContainer;
//# sourceMappingURL=ChartContainer.js.map