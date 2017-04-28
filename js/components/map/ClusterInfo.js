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

var S = {
  CAPTION: {
    opacity: 0.7,
    padding: '3px',
    marginBottom: '5px'
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
      to = _ref.to;
  return _react2.default.createElement(
    'p',
    { style: (0, _extends3.default)({}, S.CAPTION, { background: color }) },
    from,
    '-',
    to
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
          isShowChart = this.state.isShowChart;

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
              width: 120,
              svgHeight: 32,
              svgWidth: 120,
              data: this.data
            },
            _react2.default.createElement(_Sparklines.SparklinesLine, { color: color }),
            _react2.default.createElement(_Sparklines.SparklinesSpot, { pointIndex: this.pointIndex })
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
  index: _react.PropTypes.number
} : void 0;


var Cluster = function Cluster(_ref3) {
  var cluster = _ref3.cluster,
      color = _ref3.color;

  var points = cluster.points || [];
  return _react2.default.createElement(
    'div',
    null,
    points.map(function (point, index) {
      return _react2.default.createElement(ClusterItem, (0, _extends3.default)({
        key: point.id
      }, { point: point, color: color, index: index }));
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

var ClusterInfo = function ClusterInfo(_ref4) {
  var cluster = _ref4.cluster,
      color = _ref4.color,
      from = _ref4.from,
      to = _ref4.to;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(Caption, { color: color, from: from, to: to }),
    _react2.default.createElement(Cluster, { cluster: cluster, color: color })
  );
};

process.env.NODE_ENV !== "production" ? ClusterInfo.propTypes = {
  cluster: _react.PropTypes.object,
  color: _react.PropTypes.string,
  from: _react.PropTypes.string,
  to: _react.PropTypes.string
} : void 0;

exports.default = ClusterInfo;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\map\ClusterInfo.js.map