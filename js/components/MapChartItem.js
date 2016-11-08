'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _EuroStatToMap = require('../adapters/EuroStatToMap');

var _EuroStatToMap2 = _interopRequireDefault(_EuroStatToMap);

var _SvgClose = require('./SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ShowHide = require('./zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    lineHeight: 1.5,
    marginBottom: '10px',
    marginRight: '25px',
    //marginRight: '10px',
    position: 'relative'
  },
  headerDiv: {
    backgroundColor: '#232F3B',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    lineHeight: 1.5,
    height: '32px',
    //width: '600px'
    width: '100%'
  },
  checkBoxStyle: {
    float: 'left',
    marginRight: '10px'
  },
  captionSpanOpen: {
    display: 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '450px',
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
    width: '450px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    float: 'left'
  }
};

var MapChartItem = _react2.default.createClass({
  displayName: 'MapChartItem',
  getInitialState: function getInitialState() {
    return {
      isOpen: true
    };
  },
  _handlerToggleOpen: function _handlerToggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var caption = this.props.caption;

    var map = _leaflet2.default.map('map_' + caption).setView([58.00, 10.00], 3);

    _leaflet2.default.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      id: 'addis',
      attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    fetch('data/geo/eu-stat.geo.json').then(function (response) {
      return response.json();
    }).then(function (geoJson) {
      var config = _this.props.config;
      var json = config.json;
      var zhMapSlice = config.zhMapSlice;

      _EuroStatToMap2.default.createCholoplethMap(json, geoJson, zhMapSlice,
      //{ time : '2016M08', 's_adj' : 'NSA', 'indic' : 'LM-UN-T-TOT' },
      map);
    });
  },
  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var config = _props.config;
    var onCloseItem = _props.onCloseItem;
    var json = config.json;
    //, { zhConfig } = config
    //, { itemCaption } = zhConfig
    //, _itemCaption = (itemCaption) ? itemCaption : caption
    var isOpen = this.state.isOpen;
    var _styleCaption = isOpen ? styles.captionSpanOpen : styles.captionSpanClose;

    return _react2.default.createElement(
      'div',
      { style: styles.rootDiv },
      _react2.default.createElement(
        'div',
        { style: styles.headerDiv },
        _react2.default.createElement(
          'span',
          {
            className: 'not-selected'
            //title={caption}
            , title: json.label,
            style: _styleCaption,
            onClick: this._handlerToggleOpen
          },
          json.label
        ),
        _react2.default.createElement(_SvgClose2.default, { onClose: onCloseItem })
      ),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isOpen },
        _react2.default.createElement(
          'div',
          {
            id: 'map_' + caption,
            style: { height: '400px' }
          },
          'MapChartItem'
        )
      )
    );
  }
});

exports.default = MapChartItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\MapChartItem.js.map