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
    //color : '#2F7ED8',
    color: '#FDB316',
    fontWeight: 'bold'
  },
  up: {
    color: 'green'
  },
  down: {
    color: '#ED5813'
  },
  equal: {
    color: '#2F7ED8'
  }
};

var ValueMovingBadge = _react2.default.createClass({
  displayName: 'ValueMovingBadge',
  getDefaultProps: function getDefaultProps() {
    return {
      valueMoving: {
        value: 0,
        delta: 0,
        percent: 0,
        direction: _Type.Direction.EQUAL,
        date: ''
      }
    };
  },
  render: function render() {
    var _props$valueMoving = this.props.valueMoving;
    var value = _props$valueMoving.value;
    var delta = _props$valueMoving.delta;
    var percent = _props$valueMoving.percent;
    var direction = _props$valueMoving.direction;
    var date = _props$valueMoving.date;


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
  }
});

exports.default = ValueMovingBadge;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ValueMovingBadge.js.map