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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _Sparklines = require('../zhn-sparklines/Sparklines');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COLOR_MAX = "#8bc34a";
var COLOR_MIN = "#f44336";
var COLOR_EQUAL = 'black';
var SPOT_COLORS = { '-1': COLOR_MIN, '0': COLOR_EQUAL, '1': COLOR_MAX };

var S = {
  CAPTION: {
    position: 'relative',
    opacity: 0.7,
    lineHeight: 1.8,
    padding: '3px',
    marginBottom: '5px'
  },
  CAPTION_BT: {
    position: 'absolute',
    top: '4px',
    right: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  ITEM_ROOT: {
    padding: '3px',
    cursor: 'pointer'
  },
  ITEM_TITLE: {
    display: 'inline-block',
    width: '30px'
  },
  ITEM_VALUE: {
    display: 'inline-block',
    float: 'right'
  }
};

var Caption = function Caption(_ref) {
  var color = _ref.color,
      from = _ref.from,
      to = _ref.to,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'p',
    { style: (0, _extends3.default)({}, S.CAPTION, { background: color }) },
    _react2.default.createElement(
      'span',
      null,
      from,
      '-',
      to
    ),
    _react2.default.createElement(
      'span',
      { style: S.CAPTION_BT, onClick: onClick },
      '*'
    )
  );
};

var Item = function Item(_ref2) {
  var title = _ref2.title,
      value = _ref2.value,
      onClick = _ref2.onClick;
  return _react2.default.createElement(
    'p',
    {
      style: S.ITEM_ROOT,
      onClick: onClick
    },
    _react2.default.createElement(
      'span',
      { style: S.ITEM_TITLE },
      title
    ),
    _react2.default.createElement(
      'span',
      { style: S.ITEM_VALUE },
      value
    )
  );
};

var ClusterItem = function (_Component) {
  (0, _inherits3.default)(ClusterItem, _Component);

  function ClusterItem(props) {
    (0, _classCallCheck3.default)(this, ClusterItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClusterItem.__proto__ || Object.getPrototypeOf(ClusterItem)).call(this));

    _this._handleClickItem = function () {
      _this.setState(function (prevState) {
        return {
          isShowChart: !prevState.isShowChart
        };
      });
    };

    _this.data = props.point.seria.data;
    _this.pointIndex = _this.data.length - 1;
    _this.state = {
      isShowChart: props.index < 3 ? true : false
    };
    return _this;
  }

  (0, _createClass3.default)(ClusterItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          point = _props.point,
          color = _props.color,
          isShowRange = _props.isShowRange,
          isShowChart = this.state.isShowChart,
          _maxLabel = isShowRange ? _react2.default.createElement(_Sparklines.SparklinesMaxLabel, { color: COLOR_MAX, fontSize: 14 }) : _react2.default.createElement('span', null),
          _minLabel = isShowRange ? _react2.default.createElement(_Sparklines.SparklinesMinLabel, { color: COLOR_MIN, fontSize: 14 }) : _react2.default.createElement('span', null);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Item, {
          title: point.id,
          value: point[0],
          onClick: this._handleClickItem
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowChart },
          _react2.default.createElement(
            _Sparklines.Sparklines,
            {
              height: 32,
              width: 140,
              svgHeight: 32,
              svgWidth: 140,
              data: this.data,
              margin: 3
              //marginLeft={20}
            },
            _maxLabel,
            _minLabel,
            _react2.default.createElement(_Sparklines.SparklinesLine, { color: color }),
            _react2.default.createElement(_Sparklines.SparklinesSpot, {
              pointIndex: this.pointIndex,
              size: 3,
              spotColors: SPOT_COLORS
            })
          )
        )
      );
    }
  }]);
  return ClusterItem;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ClusterItem.propTypes = {
  point: _react.PropTypes.shape({
    0: _react.PropTypes.number,
    id: _react.PropTypes.string,
    seria: _react.PropTypes.shape({
      data: _react.PropTypes.array
    })
  }),
  color: _react.PropTypes.string,
  index: _react.PropTypes.number,
  isShowRange: _react.PropTypes.bool
} : void 0;


var Cluster = function Cluster(_ref3) {
  var cluster = _ref3.cluster,
      color = _ref3.color,
      isShowRange = _ref3.isShowRange;

  var points = cluster.points || [];
  return _react2.default.createElement(
    'div',
    null,
    points.map(function (point, index) {
      return _react2.default.createElement(ClusterItem, (0, _extends3.default)({
        key: point.id
      }, { point: point, color: color, index: index, isShowRange: isShowRange }));
    })
  );
};
process.env.NODE_ENV !== "production" ? Cluster.propTypes = {
  cluster: _react.PropTypes.shape({
    points: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      id: _react.PropTypes.string
    }))
  }),
  color: _react.PropTypes.string
} : void 0;

var ClusterInfo = function (_Component2) {
  (0, _inherits3.default)(ClusterInfo, _Component2);

  function ClusterInfo(props) {
    (0, _classCallCheck3.default)(this, ClusterInfo);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (ClusterInfo.__proto__ || Object.getPrototypeOf(ClusterInfo)).call(this));

    _this2._handleToggleRange = function () {
      _this2.setState(function (prevState) {
        return { isShowRange: !prevState.isShowRange };
      });
    };

    _this2.state = {
      isShowRange: false
    };
    return _this2;
  }

  (0, _createClass3.default)(ClusterInfo, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          cluster = _props2.cluster,
          color = _props2.color,
          from = _props2.from,
          to = _props2.to,
          isShowRange = this.state.isShowRange;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Caption, { color: color, from: from, to: to, onClick: this._handleToggleRange }),
        _react2.default.createElement(Cluster, { cluster: cluster, color: color, isShowRange: isShowRange })
      );
    }
  }]);
  return ClusterInfo;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ClusterInfo.propTypes = {
  cluster: _react.PropTypes.object,
  color: _react.PropTypes.string,
  from: _react.PropTypes.string,
  to: _react.PropTypes.string
} : void 0;

exports.default = ClusterInfo;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\map\ClusterInfo.js.map