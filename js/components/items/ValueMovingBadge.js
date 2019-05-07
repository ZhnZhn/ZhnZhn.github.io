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

var _class, _temp;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _SvgDown = require('../zhn/SvgDown');

var _SvgDown2 = _interopRequireDefault(_SvgDown);

var _SvgUp = require('../zhn/SvgUp');

var _SvgUp2 = _interopRequireDefault(_SvgUp);

var _SvgEqual = require('../zhn/SvgEqual');

var _SvgEqual2 = _interopRequireDefault(_SvgEqual);

var _SpanValue = require('../zhn-span/SpanValue');

var _SpanValue2 = _interopRequireDefault(_SpanValue);

var _SpanDate = require('../zhn-span/SpanDate');

var _SpanDate2 = _interopRequireDefault(_SpanDate);

var _ModalValueMoving = require('./ModalValueMoving');

var _ModalValueMoving2 = _interopRequireDefault(_ModalValueMoving);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    marginLeft: 10
  },
  DELTA: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  DATE: {
    marginLeft: 10
  },
  UP: {
    color: '#4caf50'
  },
  DOWN: {
    color: '#f44336'
  },
  EQUAL: {
    color: '#2f7ed8'
  },
  BT: {
    cursor: 'pointer'
  },
  SHOW_HIDE: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 20
  }
};

var _getDirection = function _getDirection(direction) {
  switch (direction) {
    case _Type.Direction.DOWN:
      return {
        _svgDirection: _react2.default.createElement(_SvgDown2.default, null),
        _dStyle: S.DOWN
      };
    case _Type.Direction.UP:
      return {
        _svgDirection: _react2.default.createElement(_SvgUp2.default, null),
        _dStyle: S.UP
      };
    case _Type.Direction.EQUAL:
      return {
        _svgDirection: _react2.default.createElement(_SvgEqual2.default, null),
        _dStyle: S.EQUAL
      };
    default:
      return {
        _svgDirection: null
      };
  }
};

var ValueMovingBadge = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ValueMovingBadge, _Component);

  function ValueMovingBadge(props) {
    (0, _classCallCheck3.default)(this, ValueMovingBadge);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ValueMovingBadge.__proto__ || Object.getPrototypeOf(ValueMovingBadge)).call(this, props));

    _this._hClickBt = function () {
      _this.setState(function (prev) {
        return {
          isShowModal: !prev.isShowModal
        };
      });
    };

    _this._hCloseModal = function (event) {
      _this.setState({ isShowModal: false });
    };

    _this._updateDateTo = function (dateTo) {
      var valueMoving = _this.props.crValueMoving(_this.state.valueMoving, dateTo);
      if (valueMoving) {
        _this.setState({ valueMoving: valueMoving });
        return true;
      } else {
        return false;
      }
    };

    _this.state = {
      isShowModal: false,
      valueMoving: props.valueMoving
    };
    return _this;
  }
  /*
  static propTypes = {
    valueMoving: PropTypes.shape({
      value: PropTypes.number,
      delta: PropTypes.number,
      percent: PropTypes.number,
      direction: PropTypes.oneOf(
        'up', 'down', 'equal', 'empty'
      ),
      date: PropTypes.string
    }),
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    crValueMoving: PropTypes.func
  }
  */

  (0, _createClass3.default)(ValueMovingBadge, [{
    key: 'render',
    value: function render() {
      var isAdminMode = this.props.isAdminMode,
          _state = this.state,
          isShowModal = _state.isShowModal,
          valueMoving = _state.valueMoving,
          msgDateTo = _state.msgDateTo,
          value = valueMoving.value,
          delta = valueMoving.delta,
          percent = valueMoving.percent,
          direction = valueMoving.direction,
          date = valueMoving.date,
          _getDirection2 = _getDirection(direction),
          _svgDirection = _getDirection2._svgDirection,
          _dStyle = _getDirection2._dStyle;


      return _react2.default.createElement(
        'span',
        { style: S.ROOT },
        _react2.default.createElement(_SpanValue2.default, { value: value }),
        _svgDirection,
        _react2.default.createElement(
          'span',
          { style: (0, _extends3.default)({}, S.DELTA, _dStyle) },
          percent
        ),
        _react2.default.createElement(
          'span',
          { style: (0, _extends3.default)({}, S.DELTA, _dStyle) },
          delta
        ),
        _react2.default.createElement(
          'button',
          { style: S.BT, onClick: this._hClickBt },
          _react2.default.createElement(_SpanDate2.default, { style: S.DATE, date: date })
        ),
        _svgDirection !== null && _react2.default.createElement(_ModalValueMoving2.default, {
          isShow: isShowModal,
          onClose: this._hCloseModal,
          valueMoving: valueMoving,
          isAdminMode: isAdminMode,
          msgDateTo: msgDateTo,
          updateDateTo: this._updateDateTo
        })
      );
    }
  }]);
  return ValueMovingBadge;
}(_react.Component), _class.defaultProps = {
  valueMoving: {
    value: 0,
    delta: 0,
    percent: 0,
    direction: _Type.Direction.EQUAL,
    date: ''
  }
}, _temp);
exports.default = ValueMovingBadge;
//# sourceMappingURL=ValueMovingBadge.js.map