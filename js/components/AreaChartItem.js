'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgClose = require('./SvgClose.js');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ZhHighchart = require('./ZhHighchart.js');

var _ZhHighchart2 = _interopRequireDefault(_ZhHighchart);

var _PanelDataInfo = require('./zhn/PanelDataInfo');

var _PanelDataInfo2 = _interopRequireDefault(_PanelDataInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
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
  captionSpanOpen: {
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer'
  },
  captionSpanClose: {
    color: 'gray',
    cursor: 'pointer'
  }
};

var AreaChartItem = _react2.default.createClass({
  displayName: 'AreaChartItem',

  getInitialState: function getInitialState() {
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


  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var config = _props.config;
    var onCloseItem = _props.onCloseItem;
    var _state = this.state;
    var isOpen = _state.isOpen;
    var isShowChart = _state.isShowChart;
    var isShowInfo = _state.isShowInfo;

    var styleShow = isOpen ? { display: 'block' } : { display: 'none' };
    var classShow = isOpen ? 'show-popup' : null;
    var styleCaption = isOpen ? styles.captionSpanOpen : styles.captionSpanClose;

    return _react2.default.createElement(
      'div',
      { style: styles.rootDiv },
      _react2.default.createElement(
        'div',
        { style: styles.headerDiv },
        _react2.default.createElement(
          'span',
          { style: styleCaption, onClick: this._handlerToggleOpen },
          caption
        ),
        _react2.default.createElement(_SvgClose2.default, { onClose: onCloseItem })
      ),
      _react2.default.createElement(
        'div',
        { className: classShow, style: styleShow },
        _react2.default.createElement(_ZhHighchart2.default, {
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