'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartStore = require('../flux/stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartActions = require('../flux/actions/ChartActions');

var _ComponentActions = require('../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ZhHighchart = require('./ZhHighchart');

var _ZhHighchart2 = _interopRequireDefault(_ZhHighchart);

var _CaptionRow = require('./CaptionRow');

var _CaptionRow2 = _interopRequireDefault(_CaptionRow);

var _AreaChartItem = require('./AreaChartItem');

var _AreaChartItem2 = _interopRequireDefault(_AreaChartItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    backgroundColor: '#4D4D4D',
    //padding: '5px',
    paddingTop: '5px',
    paddingLeft: '5px',
    borderRadius: '10px',
    border: 'solid 3px #232F3B',
    position: 'relative',
    width: '635px',
    height: '730px',
    overflowY: 'auto',
    marginLeft: '10px',

    //paddingRight : '10px',
    overflowX: 'hidden'
  },
  hrzResize: {
    position: 'absolute',
    top: '30px',
    right: '0'
  },
  chartDiv: {
    overflowY: 'auto',
    height: '680px'
  }
};

var isInArray = function isInArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
};

var compActions = [_ChartActions.ChartActionTypes.SHOW_CHART, _ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED, _ChartActions.ChartActionTypes.CLOSE_CHART];

var ChartContainer2 = _react2.default.createClass({
  displayName: 'ChartContainer2',
  getInitialState: function getInitialState() {
    this.childMargin = 36;
    return {};
  },


  componentWillMount: function componentWillMount() {
    this.unsubscribe = _ChartStore2.default.listen(this._onStore);
    this.setState(_ChartStore2.default.getConfigs(this.props.chartType));
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },

  _onStore: function _onStore(actionType, data) {
    if (isInArray(compActions, actionType)) {
      if (data.chartType === this.props.chartType) {
        this.setState(data);
      }
    } else if (actionType === _ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2) {
      if (data === this.props.chartType) {
        this._handlerHide();
      }
    }
  },

  _handlerHide: function _handlerHide() {
    var _props = this.props;
    var chartType = _props.chartType;
    var browserType = _props.browserType;
    var onCloseContainer = _props.onCloseContainer;

    onCloseContainer(chartType, browserType);
    this.setState({ isShow: false });
  },

  _handlerResizeAfter: function _handlerResizeAfter(parentWidth) {
    for (var i = 0, max = this.state.configs.length; i < max; i++) {
      this.refs['chart' + i].reflowChart(parentWidth - this.childMargin);
    }
  },


  renderCharts: function renderCharts() {
    var _props2 = this.props;
    var chartType = _props2.chartType;
    var browserType = _props2.browserType;
    var onCloseItem = _props2.onCloseItem;

    var domCharts = this.state.configs.map(function (config, index) {
      return _react2.default.createElement(_AreaChartItem2.default, {
        ref: 'chart' + index,
        key: config.stockTicket,
        caption: config.stockTicket,
        config: config,
        onSetActive: _ComponentActions2.default.setActiveCheckbox,
        onCloseItem: onCloseItem.bind(null, chartType, browserType, config.stockTicket)
      });
    });

    return domCharts;
  },

  render: function render() {
    var styleOpen = this.state.isShow ? { display: 'inline-block' } : { display: 'none' };
    //const classOpen = this.state.isShow ? "with-scroll show-popup" : "with-scroll";
    var classOpen = this.state.isShow ? "show-popup" : null;

    return _react2.default.createElement(
      'div',
      {
        className: classOpen,
        style: Object.assign({}, styles.rootDiv, styleOpen)
      },
      _react2.default.createElement(_CaptionRow2.default, {
        caption: this.props.caption,
        isResizable: true,
        minWidth: 600,
        maxWidth: 1200,
        comp: this,
        onResizeAfter: this._handlerResizeAfter,
        onClose: this._handlerHide
      }),
      _react2.default.createElement(
        'div',
        { className: 'with-scroll', style: styles.chartDiv },
        this.renderCharts()
      )
    );
  }
});

exports.default = ChartContainer2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ChartContainer2.js.map