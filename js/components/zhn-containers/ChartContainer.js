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

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _ChartStore = require('../../flux/stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ChartMorePopup = require('./ChartMorePopup');

var _ChartMorePopup2 = _interopRequireDefault(_ChartMorePopup);

var _BrowserCaption = require('../zhn/BrowserCaption');

var _BrowserCaption2 = _interopRequireDefault(_BrowserCaption);

var _SvgHrzResize = require('../zhn/SvgHrzResize');

var _SvgHrzResize2 = _interopRequireDefault(_SvgHrzResize);

var _ScrollPane = require('../zhn/ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _ItemFactory = require('../factories/ItemFactory');

var _ItemFactory2 = _interopRequireDefault(_ItemFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'CHART_CONTAINER';

var CL = {
  ROOT: "item-container",
  SCROLL: 'scroll-container-y',
  SHOW: "show-popup"
};

var CHILD_MARGIN = 36,
    RESIZE_INIT_WIDTH = 635,
    RESIZE_MIN_WIDTH = 395,
    RESIZE_MAX_WIDTH = 1200,
    DELTA = 10;

var S = {
  /*
  transitionOption : {
    transitionName : "scaleY",
    transitionEnterTimeout : 400,
    transitionLeave : false
  },
  */
  INLINE: {
    display: 'inline-block'
  },
  NONE: {
    display: 'none'
  }
};

var isInArray = function isInArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments[1];

  var len = array.length;
  var i = 0;
  for (; i < len; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
};

var compActions = [_ChartActions.ChartActionTypes.SHOW_CHART, _ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED, _ChartActions.ChartActionTypes.CLOSE_CHART];

var _getWidth = function _getWidth(style) {
  return parseInt(style.width, 10) || RESIZE_INIT_WIDTH;
};

var ChartContainer = function (_Component) {
  (0, _inherits3.default)(ChartContainer, _Component);

  function ChartContainer(props) {
    (0, _classCallCheck3.default)(this, ChartContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChartContainer.__proto__ || Object.getPrototypeOf(ChartContainer)).call(this));

    _this._isDataForContainer = function (data) {
      var chartType = _this.props.chartType;

      return data === chartType || data && data.chartType === chartType;
    };

    _this._onStore = function (actionType, data) {
      if (_this._isDataForContainer(data)) {
        if (isInArray(compActions, actionType)) {
          if (actionType !== _ChartActions.ChartActionTypes.CLOSE_CHART) {
            _this.spComp.scrollTop();
          }
          _this.setState(data);
        } else if (actionType === _ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2) {
          _this._hHide();
        }
      }
    };

    _this._hHide = function () {
      var _this$props = _this.props,
          chartType = _this$props.chartType,
          browserType = _this$props.browserType,
          onCloseContainer = _this$props.onCloseContainer;

      onCloseContainer(chartType, browserType);
      _this.setState({ isShow: false });
    };

    _this._hResizeAfter = function (parentWidth) {
      var i = 0,
          max = _this.state.configs.length,
          _propName = void 0;
      for (; i < max; i++) {
        _propName = _this._crChartPropName(i);
        if (_this[_propName] && typeof _this[_propName].reflowChart === 'function') {
          _this[_propName].reflowChart(parentWidth - _this.childMargin);
        }
      }
    };

    _this._showMore = function () {
      if (!_this.state.isMore) {
        _this.setState({ isMore: true });
      }
    };

    _this._closeMore = function () {
      _this.setState({ isMore: false });
    };

    _this._crChartPropName = function (index) {
      return 'chart' + index;
    };

    _this._refChart = function (index, comp) {
      return _this[_this._crChartPropName(index)] = comp;
    };

    _this._renderCharts = function () {
      var _this$props2 = _this.props,
          chartType = _this$props2.chartType,
          browserType = _this$props2.browserType,
          onCloseItem = _this$props2.onCloseItem,
          _this$state$configs = _this.state.configs,
          configs = _this$state$configs === undefined ? [] : _this$state$configs,
          _isAdminMode = typeof _ChartStore2.default.isAdminMode == 'function' ? _ChartStore2.default.isAdminMode.bind(_ChartStore2.default) : false;

      return configs.map(function (config, index) {
        var _config$zhConfig = config.zhConfig,
            zhConfig = _config$zhConfig === undefined ? {} : _config$zhConfig,
            id = zhConfig.id;

        return _ItemFactory2.default.createItem({
          store: _ChartStore2.default,
          config: config, index: index,
          option: { chartType: chartType },
          props: {
            ref: _this._refChart.bind(null, index),
            onCloseItem: onCloseItem.bind(null, chartType, browserType, id),
            isAdminMode: _isAdminMode
          }
        });
      });
    };

    _this._resizeTo = function (width) {
      _this._rootNode.style.width = width + 'px';
      _this._hResizeAfter(width);
    };

    _this._resizeToMin = function () {
      _this._resizeTo(RESIZE_MIN_WIDTH);
    };

    _this._resizeToInit = function () {
      _this._resizeTo(RESIZE_INIT_WIDTH);
    };

    _this._plusToWidth = function () {
      var _this$_rootNode = _this._rootNode,
          _rootNode = _this$_rootNode === undefined ? {} : _this$_rootNode,
          _rootNode$style = _rootNode.style,
          style = _rootNode$style === undefined ? {} : _rootNode$style,
          w = _getWidth(style) + DELTA;

      if (w < RESIZE_MAX_WIDTH) {
        style.width = w + 'px';
      }
    };

    _this._minusToWidth = function () {
      var _this$_rootNode2 = _this._rootNode,
          _rootNode = _this$_rootNode2 === undefined ? {} : _this$_rootNode2,
          _rootNode$style2 = _rootNode.style,
          style = _rootNode$style2 === undefined ? {} : _rootNode$style2,
          w = _getWidth(style) - DELTA;

      if (w > RESIZE_MIN_WIDTH) {
        style.width = w + 'px';
      }
    };

    _this._fitToWidth = function () {
      _this._hResizeAfter(parseInt(_this._rootNode.style.width, 10));
    };

    _this._refRootNode = function (node) {
      return _this._rootNode = node;
    };

    _this._refSpComp = function (node) {
      return _this.spComp = node;
    };

    _this.childMargin = CHILD_MARGIN;
    _this.state = {
      isMore: false
    };
    return _this;
  }

  (0, _createClass3.default)(ChartContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
      var _props = this.props,
          caption = _props.caption,
          theme = _props.theme,
          TS = theme.getStyle(TH_ID),
          _state = this.state,
          isShow = _state.isShow,
          isMore = _state.isMore,
          _styleIsShow = isShow ? S.INLINE : S.NONE,
          _classIsShow = isShow ? CL.ROOT + ' ' + CL.SHOW : CL.ROOT;

      return _react2.default.createElement(
        'div',
        {
          ref: this._refRootNode,
          className: _classIsShow,
          style: (0, _extends3.default)({}, _styleIsShow, TS.ROOT)
        },
        _react2.default.createElement(_ChartMorePopup2.default, {
          isShow: isMore,
          onClose: this._closeMore,
          onResizeToMin: this._resizeToMin,
          onResizeToInit: this._resizeToInit,
          onPlusWidth: this._plusToWidth,
          onMinusWidth: this._minusToWidth,
          onFit: this._fitToWidth
        }),
        _react2.default.createElement(
          _BrowserCaption2.default,
          {
            isMore: true,
            caption: caption,
            onMore: this._showMore,
            onClose: this._hHide
          },
          _react2.default.createElement(_SvgHrzResize2.default, {
            initWidth: RESIZE_INIT_WIDTH,
            minWidth: RESIZE_MIN_WIDTH,
            maxWidth: RESIZE_MAX_WIDTH,
            comp: this,
            onResizeAfter: this._hResizeAfter
          })
        ),
        _react2.default.createElement(
          _ScrollPane2.default,
          {
            ref: this._refSpComp,
            className: CL.SCROLL
            //style={S.SCROLL}
          },
          _react2.default.createElement(
            'div',
            null,
            this._renderCharts()
          )
        )
      );
    }
  }]);
  return ChartContainer;
}(_react.Component);

exports.default = (0, _withTheme2.default)(ChartContainer);
//# sourceMappingURL=ChartContainer.js.map