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

var _ZhHighchart = require('./ZhHighchart');

var _ZhHighchart2 = _interopRequireDefault(_ZhHighchart);

var _PanelDataInfo = require('./zhn/PanelDataInfo');

var _PanelDataInfo2 = _interopRequireDefault(_PanelDataInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  },
  rootDiv: {
    marginBottom: '10px'
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
      isShowInfo: false
    };
  },
  _handlerToggleOpen: function _handlerToggleOpen() {
    this.state.isOpen = !this.state.isOpen;
    this.setState(this.state);
  },
  _handlerClickInfo: function _handlerClickInfo() {
    this.setState({ isShowChart: false, isShowInfo: true });
  },
  _handlerClickChart: function _handlerClickChart() {
    this.setState({ isShowChart: true, isShowInfo: false });
  },
  _handlerCheckBox: function _handlerCheckBox(isCheck, checkBox) {
    this.props.onSetActive(isCheck, checkBox, this.refs.chart.getChart());
  },
  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var config = _props.config;
    var onSetActive = _props.onSetActive;
    var onCloseItem = _props.onCloseItem;
    var _state = this.state;
    var isOpen = _state.isOpen;
    var isShowChart = _state.isShowChart;
    var isShowInfo = _state.isShowInfo;

    var _styleShow = isOpen ? styles.show : styles.hide;
    var _classShow = isOpen ? 'show-popup' : null;
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
        'div',
        { className: _classShow, style: _styleShow },
        _react2.default.createElement(_ZhHighchart2.default, {
          ref: 'chart',
          isShow: isShowChart,
          config: config,
          onClickInfo: this._handlerClickInfo
        }),
        _react2.default.createElement(_PanelDataInfo2.default, {
          isShow: isShowInfo,
          info: config.info,
          onClickChart: this._handlerClickChart
        })
      )
    );
  }
});

exports.default = AreaChartItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\AreaChartItem.js.map