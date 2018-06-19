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

var _ChoroplethMap = require('../../adapters/eurostat/ChoroplethMap');

var _ChoroplethMap2 = _interopRequireDefault(_ChoroplethMap);

var _ButtonTab = require('../zhn/ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _SpinnerLoading = require('../zhn/SpinnerLoading');

var _SpinnerLoading2 = _interopRequireDefault(_SpinnerLoading);

var _ItemHeader = require('./ItemHeader');

var _ItemHeader2 = _interopRequireDefault(_ItemHeader);

var _PanelDataInfo = require('./PanelDataInfo');

var _PanelDataInfo2 = _interopRequireDefault(_PanelDataInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var S = {
  ROOT_DIV: {
    position: 'relative',
    lineHeight: 1.5,
    marginBottom: '10px',
    marginRight: '25px'
  },
  TIME_SPAN: {
    display: 'inline-block',
    color: 'rgb(253, 179, 22)',
    fontWeight: 'bold',
    paddingLeft: '16px'
  },
  TAB_DIV: {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  MAP_DIV: {
    height: '400px'
  },
  SPINNER_LOADING: {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '0 auto',
    marginTop: '64px',
    width: '32px',
    height: '32px'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

var MapChartItem = function (_Component) {
  (0, _inherits3.default)(MapChartItem, _Component);

  /*
  static propTypes = {
    caption: PropTypes.string,
    config: PropTypes.shape({
      json: PropTypes.object,
      zhMapSlice: PropTypes.object,
      zhDialog: PropTypes.shape({
        subtitle: PropTypes.string,
        time: PropTypes.string
      })
    }),
    onCloseItem: PropTypes.func
  }
  */

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
        { style: S.TAB_DIV },
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
          _config$zhDialog = config.zhDialog,
          zhDialog = _config$zhDialog === undefined ? {} : _config$zhDialog,
          _zhDialog$subtitle = zhDialog.subtitle,
          subtitle = _zhDialog$subtitle === undefined ? '' : _zhDialog$subtitle,
          _state = this.state,
          isLoading = _state.isLoading,
          isOpen = _state.isOpen,
          isShowInfo = _state.isShowInfo,
          time = _state.time,
          _styleMap = isShowInfo ? S.NONE : S.BLOCK;

      return _react2.default.createElement(
        'div',
        { style: S.ROOT_DIV },
        _react2.default.createElement(
          _ItemHeader2.default,
          {
            isOpen: isOpen,
            caption: subtitle,
            onClick: this._handleToggle,
            onClose: onCloseItem
          },
          _react2.default.createElement(
            'span',
            { style: S.TIME_SPAN },
            time
          )
        ),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isOpen },
          !isShowInfo && this._renderTabToolbar(),
          _react2.default.createElement(
            'div',
            {
              id: 'map_' + caption,
              style: (0, _extends3.default)({}, S.MAP_DIV, _styleMap)
            },
            isLoading && _react2.default.createElement(_SpinnerLoading2.default, {
              style: S.SPINNER_LOADING })
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

exports.default = MapChartItem;
//# sourceMappingURL=MapChartItem.js.map