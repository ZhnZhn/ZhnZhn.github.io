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

var _LegendItem = require('./LegendItem');

var _LegendItem2 = _interopRequireDefault(_LegendItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  CL_SCROLL: "with-scroll",
  MORE_MAX: 12,
  MORE: 'MORE',
  LESS: 'LESS'
};

var S = {
  ROOT_MORE: {
    overflowY: 'auto',
    height: '250px',
    marginLeft: '-8px',
    paddingRight: '4px',
    transform: 'scaleX(-1)'
  },
  ROOT_LESS: {
    height: 'auto'
  },
  DIV: {
    transform: 'scaleX(-1)'
  },

  BT_MORE: {
    display: 'inline-block',
    marginTop: '10px',
    marginLeft: '8px',
    color: '#1b2836',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

var BtMore = function BtMore(_ref) {
  var isMore = _ref.isMore,
      legend = _ref.legend,
      onClick = _ref.onClick;

  var _len = legend.length;
  if (_len > C.MORE_MAX) {
    var _caption = isMore ? C.LESS + ': ' + C.MORE_MAX : C.MORE + ': +' + (_len - C.MORE_MAX);
    return _react2.default.createElement(
      'button',
      {
        style: S.BT_MORE,
        onClick: onClick
      },
      _caption
    );
  } else {
    return null;
  }
};

var Legend = function (_Component) {
  (0, _inherits3.default)(Legend, _Component);

  function Legend(props) {
    (0, _classCallCheck3.default)(this, Legend);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).call(this));

    _this._handleMore = function () {
      _this.setState({
        isMore: !_this.state.isMore
      });
    };

    _this._renderLegend = function () {
      var legend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var isMore = arguments[1];
      var onClickItem = arguments[2];

      var _legend = [],
          max = legend.length;
      var i = 0;
      for (; i < max; i++) {
        if (isMore || !isMore && i < C.MORE_MAX) {
          var item = legend[i];
          _legend.push(_react2.default.createElement(_LegendItem2.default, {
            key: item.name,
            item: item,
            onClickItem: onClickItem
          }));
        } else {
          break;
        }
      }
      return _legend;
    };

    _this.state = {
      isMore: false
    };
    return _this;
  }

  (0, _createClass3.default)(Legend, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.legend === this.props.legend && nextState.isMore === this.state.isMore) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$legend = _props.legend,
          legend = _props$legend === undefined ? [] : _props$legend,
          onClickItem = _props.onClickItem,
          isMore = this.state.isMore,
          _rootStyle = isMore ? S.ROOT_MORE : (0, _extends3.default)({}, S.ROOT_MORE, S.ROOT_LESS);

      return _react2.default.createElement(
        'div',
        { className: C.CL_SCROLL, style: _rootStyle },
        _react2.default.createElement(
          'div',
          { style: S.DIV },
          this._renderLegend(legend, isMore, onClickItem),
          _react2.default.createElement(BtMore, {
            isMore: isMore,
            legend: legend,
            onClick: this._handleMore
          })
        )
      );
    }
  }]);
  return Legend;
}(_react.Component);

exports.default = Legend;
//# sourceMappingURL=Legend.js.map