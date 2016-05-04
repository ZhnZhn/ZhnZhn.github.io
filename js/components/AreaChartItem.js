'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgCheckBox = require('./zhn/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

var _ValueMovingBadge = require('./zhn/ValueMovingBadge');

var _ValueMovingBadge2 = _interopRequireDefault(_ValueMovingBadge);

var _SvgClose = require('./SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ButtonTab = require('./zhn/ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

var _ShowHide = require('./zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _ZhHighchart = require('./ZhHighchart');

var _ZhHighchart2 = _interopRequireDefault(_ZhHighchart);

var _PanelIndicator = require('./zhn/PanelIndicator');

var _PanelIndicator2 = _interopRequireDefault(_PanelIndicator);

var _PanelDataInfo = require('./zhn/PanelDataInfo');

var _PanelDataInfo2 = _interopRequireDefault(_PanelDataInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    marginBottom: '10px',
    position: 'relative'
  },
  headerDiv: {
    backgroundColor: '#232F3B',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    height: '25px',
    width: '600px'
  },
  checkBoxStyle: {
    float: 'left',
    marginRight: '10px'
  },
  captionSpanOpen: {
    display: 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '125px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    float: 'left'
  },
  captionSpanClose: {
    display: 'inline-block',
    color: 'gray',
    cursor: 'pointer',
    width: '125px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    float: 'left'
  }
};

var AreaChartItem = _react2.default.createClass({
  displayName: 'AreaChartItem',
  getInitialState: function getInitialState() {
    this._fnOnCheck = this._handlerCheckBox.bind(null, true);
    this._fnOnUnCheck = this._handlerCheckBox.bind(null, false);
    return {
      isOpen: true,
      isShowChart: true,
      isShowIndicator: false,
      isShowInfo: false,

      isInitVolume: false, isShowVolume: false,
      isATHVolume: false, isShowATH: false,
      isInitHighLow: false, isShowHighLow: false,

      chartsDescription: []
    };
  },
  componentDidMount: function componentDidMount() {
    this.mainChart = this.refs.chart.getChart();
  },
  _handlerLoadedMetricChart: function _handlerLoadedMetricChart(metricChart) {
    var chart = this.refs.chart.getChart();
    chart.options.zhDetailCharts.push(metricChart);
  },
  _handlerToggleOpen: function _handlerToggleOpen() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false, isShowIndicator: false });
    } else {
      this.setState({ isOpen: true });
    }
  },
  _handlerClickIndicator: function _handlerClickIndicator() {
    this.setState({ isShowIndicator: !this.state.isShowIndicator });
  },
  _handlerClickInfo: function _handlerClickInfo() {
    this.setState({ isShowChart: false, isShowInfo: true });
  },
  _handlerClickVolume: function _handlerClickVolume() {
    var _state = this.state;
    var isInitVolume = _state.isInitVolume;
    var isShowVolume = _state.isShowVolume;

    if (isInitVolume) {
      this.setState({ isShowVolume: !this.state.isShowVolume });
    } else {
      this.state.chartsDescription.push({ type: 'Volume' });
      this.setState({
        chartsDescription: this.state.chartsDescription,
        isShowVolume: true, isInitVolume: true
      });
    }
  },
  _handlerClickATH: function _handlerClickATH() {
    var _state2 = this.state;
    var isInitATH = _state2.isInitATH;
    var isShowATH = _state2.isShowATH;

    if (isInitATH) {
      this.setState({ isShowATH: !isShowATH });
    } else {
      this.state.chartsDescription.push({ type: 'ATH' });
      this.setState({
        chartsDescription: this.state.chartsDescription,
        isShowATH: true, isInitATH: true
      });
    }
  },
  _handlerClickHighLow: function _handlerClickHighLow() {
    var _state3 = this.state;
    var isInitHighLow = _state3.isInitHighLow;
    var isShowHighLow = _state3.isShowHighLow;

    if (isInitHighLow) {
      this.setState({ isShowHighLow: !isShowHighLow });
    } else {
      this.state.chartsDescription.push({ type: 'HighLow' });
      this.setState({
        chartsDescription: this.state.chartsDescription,
        isShowHighLow: true, isInitHighLow: true
      });
    }
  },
  _handlerClickChart: function _handlerClickChart() {
    this.setState({ isShowChart: true, isShowInfo: false });
  },
  _handlerCheckBox: function _handlerCheckBox(isCheck, checkBox) {
    this.props.onSetActive(isCheck, checkBox, this.refs.chart.getChart());
  },
  _handlerAddSma: function _handlerAddSma(period) {
    return this.mainChart.options.zhFnAddSeriesSma(this.mainChart, period);
  },
  _handleRemoveSeries: function _handleRemoveSeries(id) {
    return this.mainChart.options.zhFnRemoveSeries(this.mainChart, id);
  },
  _createChartToolBar: function _createChartToolBar(config) {
    var _btIndicator = _react2.default.createElement(_ButtonTab2.default, {
      caption: 'Indicator',
      isShow: this.state.isShowIndicator,
      style: { left: '10px' },
      onClick: this._handlerClickIndicator
    });

    var _btInfo = config.info ? _react2.default.createElement(_ButtonTab2.default, {
      caption: 'Info',
      isShow: false,
      style: { color: 'gray' },
      onClick: this._handlerClickInfo
    }) : undefined;

    var _btVolume = config.zhVolumeConfig ? _react2.default.createElement(_ButtonTab2.default, {
      style: { left: '350px' },
      caption: 'Volume',
      isShow: false,
      onClick: this._handlerClickVolume
    }) : undefined;

    var _btATH = config.zhATHConfig ? _react2.default.createElement(_ButtonTab2.default, {
      style: { left: '425px' },
      caption: 'ATH',
      isShow: false,
      onClick: this._handlerClickATH
    }) : undefined;

    var _btHL = config.zhHighLowConfig ? _react2.default.createElement(_ButtonTab2.default, {
      style: { left: '480px' },
      caption: 'HL',
      isShow: false,
      onClick: this._handlerClickHighLow
    }) : undefined;

    return _react2.default.createElement(
      'div',
      null,
      _btIndicator,
      _btInfo,
      _btVolume,
      _btATH,
      _btHL
    );
  },
  _renderMetricCharts: function _renderMetricCharts() {
    var _this = this;

    var chartsDescription = this.state.chartsDescription;


    var _metricCharts = chartsDescription.map(function (descr, index) {
      var type = descr.type;
      var _isShow = _this.state['isShow' + type];
      var _ref = 'chart' + type;
      var _config = _this.props.config['zh' + type + 'Config'];

      return _react2.default.createElement(
        _ShowHide2.default,
        { isShow: _isShow, key: index },
        _react2.default.createElement(_ZhHighchart2.default, {
          ref: _ref,
          isShow: true,
          config: _config,
          onLoaded: _this._handlerLoadedMetricChart
        })
      );
    });

    return _react2.default.createElement(
      'div',
      null,
      _metricCharts
    );
  },
  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var config = _props.config;
    var onSetActive = _props.onSetActive;
    var onCloseItem = _props.onCloseItem;
    var _state4 = this.state;
    var isOpen = _state4.isOpen;
    var isShowChart = _state4.isShowChart;
    var isShowInfo = _state4.isShowInfo;
    var isShowIndicator = _state4.isShowIndicator;

    var _styleCaption = isOpen ? styles.captionSpanOpen : styles.captionSpanClose;

    return _react2.default.createElement(
      'div',
      { style: styles.rootDiv },
      _react2.default.createElement(
        'div',
        { style: styles.headerDiv },
        _react2.default.createElement(_SvgCheckBox2.default, {
          rootStyle: styles.checkBoxStyle,
          onCheck: this._fnOnCheck,
          onUnCheck: this._fnOnUnCheck
        }),
        _react2.default.createElement(
          'span',
          {
            title: caption,
            style: _styleCaption,
            onClick: this._handlerToggleOpen
          },
          caption
        ),
        _react2.default.createElement(_ValueMovingBadge2.default, {
          valueMoving: config.valueMoving
        }),
        _react2.default.createElement(_SvgClose2.default, { onClose: onCloseItem })
      ),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isOpen },
        _react2.default.createElement(_ZhHighchart2.default, {
          ref: 'chart',
          isShow: isShowChart,
          toolBar: this._createChartToolBar(config),
          config: config
        }),
        _react2.default.createElement(_PanelIndicator2.default, {
          isShow: isShowIndicator,
          onAddSma: this._handlerAddSma,
          onRemoveSeries: this._handleRemoveSeries
        }),
        _react2.default.createElement(_PanelDataInfo2.default, {
          isShow: isShowInfo,
          info: config.info,
          onClickChart: this._handlerClickChart
        }),
        this._renderMetricCharts()
      )
    );
  }
});

exports.default = AreaChartItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\AreaChartItem.js.map