'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _ChoroplethMap = require('../../adapters/eurostat/ChoroplethMap');

var _ChoroplethMap2 = _interopRequireDefault(_ChoroplethMap);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ButtonTab = require('../zhn/ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _PanelDataInfo = require('../zhn/PanelDataInfo');

var _PanelDataInfo2 = _interopRequireDefault(_PanelDataInfo);

var _SpinnerLoading = require('../zhn/SpinnerLoading');

var _SpinnerLoading2 = _interopRequireDefault(_SpinnerLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    position: 'relative',
    lineHeight: 1.5,
    marginBottom: '10px',
    marginRight: '25px'
  },
  headerDiv: {
    backgroundColor: '#232F3B',
    paddingTop: '4px',
    paddingLeft: '10px',
    lineHeight: 1.8,
    height: '32px',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  checkBoxStyle: {
    float: 'left',
    marginRight: '10px',
    marginLeft: '10px'
  },
  captionSpanOpen: {
    display: 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '410px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    float: 'left'
  },
  timeSpan: {
    color: 'rgb(253, 179, 22)',
    fontWeight: 'bold',
    paddingLeft: '16px'
  },
  captionSpanClose: {
    display: 'inline-block',
    color: 'gray',
    cursor: 'pointer',
    width: '410px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    float: 'left'
  },
  tabDiv: {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  mapDiv: {
    height: '400px'
  },
  spinnerLoading: {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '0 auto',
    marginTop: '64px',
    width: '32px',
    height: '32px'
  },
  displayBlock: {
    display: 'block'
  },
  displayNone: {
    display: 'none'
  }
};

var MapChartItem = function (_Component) {
  (0, _inherits3.default)(MapChartItem, _Component);

  function MapChartItem(props) {
    (0, _classCallCheck3.default)(this, MapChartItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MapChartItem.__proto__ || Object.getPrototypeOf(MapChartItem)).call(this));

    _this._handleToggle = function () {
      _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this._handleClickInfo = function () {
      _this.setState({ isShowInfo: true });
    };

    _this._handleClickChart = function () {
      _this.setState({ isShowInfo: false });
    };

    _this._renderTabToolbar = function () {
      return _react2.default.createElement(
        'div',
        { style: styles.tabDiv },
        _react2.default.createElement(_ButtonTab2.default, {
          caption: 'Info',
          isShow: false,
          onClick: _this._handleClickInfo
        })
      );
    };

    _this.map = undefined;
    _this.state = {
      isLoading: true,
      isOpen: true,
      isShowInfo: false,
      time: ''
    };
    return _this;
  }

  (0, _createClass3.default)(MapChartItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          caption = _props.caption,
          config = _props.config,
          jsonCube = config.json,
          zhMapSlice = config.zhMapSlice;


      _ChoroplethMap2.default.draw('map_' + caption, jsonCube, zhMapSlice).then(function (option) {
        _this2.map = option.map;
        _this2.setState({
          isLoading: false,
          time: option.time
        });
        return undefined;
      }).catch(function (err) {
        _this2.setState({ isLoading: false });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          caption = _props2.caption,
          config = _props2.config,
          onCloseItem = _props2.onCloseItem,
          _config$json = config.json,
          json = _config$json === undefined ? {} : _config$json,
          _config$zhDialog = config.zhDialog,
          zhDialog = _config$zhDialog === undefined ? {} : _config$zhDialog,
          _zhDialog$subtitle = zhDialog.subtitle,
          subtitle = _zhDialog$subtitle === undefined ? '' : _zhDialog$subtitle,
          _state = this.state,
          isLoading = _state.isLoading,
          isOpen = _state.isOpen,
          isShowInfo = _state.isShowInfo,
          time = _state.time,
          _styleCaption = isOpen ? styles.captionSpanOpen : styles.captionSpanClose,
          _styleMap = isShowInfo ? styles.displayNone : styles.displayBlock;

      return _react2.default.createElement(
        'div',
        { style: styles.rootDiv },
        _react2.default.createElement(
          'div',
          { style: styles.headerDiv },
          _react2.default.createElement(
            'span',
            {
              className: 'not-selected',
              title: json.label,
              style: _styleCaption,
              onClick: this._handleToggle
            },
            subtitle
          ),
          _react2.default.createElement(
            'span',
            { style: styles.timeSpan },
            time
          ),
          _react2.default.createElement(_SvgClose2.default, { onClose: onCloseItem })
        ),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isOpen },
          !isShowInfo && this._renderTabToolbar(),
          _react2.default.createElement(
            'div',
            {
              id: 'map_' + caption,
              style: Object.assign({}, styles.mapDiv, _styleMap)
            },
            isLoading && _react2.default.createElement(_SpinnerLoading2.default, { style: styles.spinnerLoading })
          ),
          _react2.default.createElement(_PanelDataInfo2.default, {
            isShow: isShowInfo,
            info: config.info,
            onClickChart: this._handleClickChart
          })
        )
      );
    }
  }]);
  return MapChartItem;
}(_react.Component);

process.env.NODE_ENV !== "production" ? MapChartItem.propTypes = {
  caption: _react.PropTypes.string,
  config: _react.PropTypes.shape({
    json: _react.PropTypes.object,
    zhMapSlice: _react.PropTypes.object,
    zhDialog: _react.PropTypes.shape({
      subtitle: _react.PropTypes.string,
      time: _react.PropTypes.string
    })
  }),
  onCloseItem: _react.PropTypes.func
} : void 0;
exports.default = MapChartItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\MapChartItem.js.map