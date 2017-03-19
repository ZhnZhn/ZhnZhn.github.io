'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _SvgDown = require('./SvgDown');

var _SvgDown2 = _interopRequireDefault(_SvgDown);

var _SvgUp = require('./SvgUp');

var _SvgUp2 = _interopRequireDefault(_SvgUp);

var _SvgEqual = require('./SvgEqual');

var _SvgEqual2 = _interopRequireDefault(_SvgEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootSpan: {
    marginLeft: '10px',
    display: 'inline-block'
  },
  valueSpan: {
    color: '#2F7ED8',
    fontWeight: 'bold'
  },
  deltaSpan: {
    marginLeft: '5px',
    fontWeight: 'bold'
  },
  dateSpan: {
    marginLeft: '10px',
    color: '#FDB316',
    fontWeight: 'bold'
  },
  up: {
    color: '#4CAF50'
  },
  down: {
    //color: '#ED5813'
    color: '#F44336'
  },
  equal: {
    color: '#2F7ED8'
  }
};

var ValueMovingBadge = function ValueMovingBadge(props) {
  var _props$valueMoving = props.valueMoving,
      value = _props$valueMoving.value,
      delta = _props$valueMoving.delta,
      percent = _props$valueMoving.percent,
      direction = _props$valueMoving.direction,
      date = _props$valueMoving.date;


  var _svgDirection = void 0,
      _dStyle = void 0;
  if (direction === _Type.Direction.DOWN) {
    _svgDirection = _react2.default.createElement(_SvgDown2.default, null);
    _dStyle = styles.down;
  } else if (direction === _Type.Direction.UP) {
    _svgDirection = _react2.default.createElement(_SvgUp2.default, null);
    _dStyle = styles.up;
  } else {
    _svgDirection = _react2.default.createElement(_SvgEqual2.default, null);
    _dStyle = styles.equal;
  }

  return _react2.default.createElement(
    'span',
    { style: styles.rootSpan },
    _react2.default.createElement(
      'span',
      { style: styles.valueSpan },
      value
    ),
    _svgDirection,
    _react2.default.createElement(
      'span',
      { style: Object.assign({}, styles.deltaSpan, _dStyle) },
      percent
    ),
    _react2.default.createElement(
      'span',
      { style: Object.assign({}, styles.deltaSpan, _dStyle) },
      delta
    ),
    _react2.default.createElement(
      'span',
      { style: styles.dateSpan },
      date
    )
  );
};

process.env.NODE_ENV !== "production" ? ValueMovingBadge.propTypes = {
  valueMoving: _react.PropTypes.shape({
    value: _react.PropTypes.number,
    delta: _react.PropTypes.number,
    percent: _react.PropTypes.number,
    direction: _react.PropTypes.oneOf('up', 'down', 'equal'),
    date: _react.PropTypes.string
  })
} : void 0;

ValueMovingBadge.defaultProps = {
  valueMoving: {
    value: 0,
    delta: 0,
    percent: 0,
    direction: _Type.Direction.EQUAL,
    date: ''
  }
};

exports.default = ValueMovingBadge;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ValueMovingBadge.js.map