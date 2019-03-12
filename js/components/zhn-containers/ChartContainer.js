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

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _ChartStore = require('../../flux/stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ModalSlider = require('../zhn-modal-slider/ModalSlider');

var _ModalSlider2 = _interopRequireDefault(_ModalSlider);

var _ModelMore = require('./ModelMore');

var _ModelMore2 = _interopRequireDefault(_ModelMore);

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
  SCROLL: 'scroll-container-y scroll-items',
  SHOW: "show-popup",

  MENU_MORE: "popup-menu charts__menu-more"
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

var ChartContainer = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ChartContainer, _Component);

  function ChartContainer(props) {
    (0, _classCallCheck3.default)(this, ChartContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChartContainer.__proto__ || Object.getPrototypeOf(ChartContainer)).call(this, props));

    _initialiseProps.call(_this);

    var chartType = props.chartType;

    _this.childMargin = CHILD_MARGIN;

    _this._MODEL = (0, _ModelMore2.default)({
      chartType: chartType,
      onMinWidth: _this._resizeTo.bind(_this, RESIZE_MIN_WIDTH),
      onInitWidth: _this._resizeTo.bind(_this, RESIZE_INIT_WIDTH),
      onPlusWidth: _this._plusToWidth,
      onMinusWidth: _this._minusToWidth,
      onFit: _this._fitToWidth,
      onShowCaptions: _this._onShowCaptions
    });

    _this._hSetActive = _this._toggleChb.bind(_this, true);
    _this._hSetNotActive = _this._toggleChb.bind(_this, false);

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
          theme = _props.theme,
          caption = _props.caption,
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
        _react2.default.createElement(_ModalSlider2.default, {
          isShow: isMore,
          className: CL.MENU_MORE,
          style: TS.EL_BORDER,
          model: this._MODEL,
          onClose: this._hToggleMore
        }),
        _react2.default.createElement(
          _BrowserCaption2.default,
          {
            onMore: this._showMore,
            onCheck: this._hSetActive,
            onUnCheck: this._hSetNotActive,
            caption: caption,
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
}(_react.Component), _class.defaultProps = {
  onSetActive: function onSetActive() {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._isDataForContainer = function (data) {
    var chartType = _this2.props.chartType;

    return data === chartType || data && data.chartType === chartType;
  };

  this._onStore = function (actionType, data) {
    if (_this2._isDataForContainer(data)) {
      if (isInArray(compActions, actionType)) {
        if (actionType !== _ChartActions.ChartActionTypes.CLOSE_CHART) {
          _this2.spComp.scrollTop();
        }
        _this2.setState(data);
      } else if (actionType === _ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2) {
        _this2._hHide();
      }
    }
  };

  this._toggleChb = function (isCheck, checkBox) {
    var _props2 = _this2.props,
        onSetActive = _props2.onSetActive,
        chartType = _props2.chartType,
        browserType = _props2.browserType;

    checkBox.chartType = chartType;
    checkBox.browserType = browserType;
    onSetActive(isCheck, checkBox);
  };

  this._hHide = function () {
    var _props3 = _this2.props,
        chartType = _props3.chartType,
        browserType = _props3.browserType,
        onCloseContainer = _props3.onCloseContainer;

    onCloseContainer(chartType, browserType);
    _this2.setState({ isShow: false });
  };

  this._hResizeAfter = function (parentWidth) {
    var i = 0,
        max = _this2.state.configs.length,
        _propName = void 0;
    for (; i < max; i++) {
      _propName = _this2._crChartPropName(i);
      if (_this2[_propName] && typeof _this2[_propName].reflowChart === 'function') {
        _this2[_propName].reflowChart(parentWidth - _this2.childMargin);
      }
    }
  };

  this._onShowCaptions = function (parentWidth) {
    var i = 0,
        max = _this2.state.configs.length,
        _propName = void 0;
    for (; i < max; i++) {
      _propName = _this2._crChartPropName(i);
      if (_this2[_propName] && typeof _this2[_propName].showCaption === 'function') {
        _this2[_propName].showCaption();
      }
    }
  };

  this._showMore = function () {
    _this2.setState({ isMore: true });
  };

  this._hToggleMore = function () {
    _this2.setState(function (prevState) {
      return {
        isMore: !prevState.isMore
      };
    });
  };

  this._crChartPropName = function (index) {
    return 'chart' + index;
  };

  this._refChart = function (index, comp) {
    return _this2[_this2._crChartPropName(index)] = comp;
  };

  this._renderCharts = function () {
    var _props4 = _this2.props,
        chartType = _props4.chartType,
        browserType = _props4.browserType,
        onCloseItem = _props4.onCloseItem,
        _state$configs = _this2.state.configs,
        configs = _state$configs === undefined ? [] : _state$configs,
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
          ref: _this2._refChart.bind(null, index),
          onCloseItem: onCloseItem.bind(null, chartType, browserType, id),
          isAdminMode: _isAdminMode
        }
      });
    });
  };

  this._resizeTo = function (width) {
    _this2._rootNode.style.width = width + 'px';
    _this2._hResizeAfter(width);
  };

  this._plusToWidth = function () {
    var _rootNode2 = _this2._rootNode,
        _rootNode = _rootNode2 === undefined ? {} : _rootNode2,
        _rootNode$style = _rootNode.style,
        style = _rootNode$style === undefined ? {} : _rootNode$style,
        w = _getWidth(style) + DELTA;

    if (w < RESIZE_MAX_WIDTH) {
      style.width = w + 'px';
    }
  };

  this._minusToWidth = function () {
    var _rootNode3 = _this2._rootNode,
        _rootNode = _rootNode3 === undefined ? {} : _rootNode3,
        _rootNode$style2 = _rootNode.style,
        style = _rootNode$style2 === undefined ? {} : _rootNode$style2,
        w = _getWidth(style) - DELTA;

    if (w > RESIZE_MIN_WIDTH) {
      style.width = w + 'px';
    }
  };

  this._fitToWidth = function () {
    _this2._hResizeAfter(parseInt(_this2._rootNode.style.width, 10));
  };

  this._refRootNode = function (node) {
    return _this2._rootNode = node;
  };

  this._refSpComp = function (node) {
    return _this2.spComp = node;
  };
}, _temp);
exports.default = (0, _withTheme2.default)(ChartContainer);
//# sourceMappingURL=ChartContainer.js.map