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

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _SpanValue = require('../zhn-span/SpanValue');

var _SpanValue2 = _interopRequireDefault(_SpanValue);

var _SpanDate = require('../zhn-span/SpanDate');

var _SpanDate2 = _interopRequireDefault(_SpanDate);

var _PanelValueMoving = require('./PanelValueMoving');

var _PanelValueMoving2 = _interopRequireDefault(_PanelValueMoving);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    display: 'inline-block',
    position: 'relative',
    marginLeft: '10px'
    //cursor: 'pointer'
  },
  ROW: {
    display: 'inline-block',
    textAlign: 'left',
    cursor: 'pointer'
  },
  DELTA: {
    marginLeft: '5px',
    fontWeight: 'bold'
  },
  DATE: {
    marginLeft: '10px'
  },
  UP: {
    color: '#4CAF50'
  },
  DOWN: {
    //color: '#ED5813'
    color: '#F44336'
  },
  EQUAL: {
    color: '#2F7ED8'
  },
  SHOW_HIDE: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: 20
  }
};

var ValueMovingBadge = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ValueMovingBadge, _Component);

  function ValueMovingBadge(props) {
    (0, _classCallCheck3.default)(this, ValueMovingBadge);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ValueMovingBadge.__proto__ || Object.getPrototypeOf(ValueMovingBadge)).call(this));

    _this._handleClickRoot = function () {
      _this.setState(function (prev) {
        return {
          isShowPanel: !prev.isShowPanel
        };
      });
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
      isShowPanel: false,
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
          isShowPanel = _state.isShowPanel,
          valueMoving = _state.valueMoving,
          msgDateTo = _state.msgDateTo,
          value = valueMoving.value,
          delta = valueMoving.delta,
          percent = valueMoving.percent,
          direction = valueMoving.direction,
          date = valueMoving.date;


      var _svgDirection = void 0,
          _dStyle = void 0;
      switch (direction) {
        case _Type.Direction.DOWN:
          _svgDirection = _react2.default.createElement(_SvgDown2.default, null);
          _dStyle = S.DOWN;
          break;
        case _Type.Direction.UP:
          _svgDirection = _react2.default.createElement(_SvgUp2.default, null);
          _dStyle = S.UP;
          break;
        case _Type.Direction.EQUAL:
          _svgDirection = _react2.default.createElement(_SvgEqual2.default, null);
          _dStyle = S.EQUAL;
          break;
        default:
          _svgDirection = null;
      }

      return _react2.default.createElement(
        'span',
        {
          style: S.ROOT
        },
        _react2.default.createElement(
          'button',
          {
            style: S.ROW,
            onClick: this._handleClickRoot
          },
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
          _react2.default.createElement(_SpanDate2.default, { style: S.DATE, date: date })
        ),
        _svgDirection !== null && _react2.default.createElement(
          _ShowHide2.default,
          {
            style: S.SHOW_HIDE,
            isShow: isShowPanel
          },
          _react2.default.createElement(_PanelValueMoving2.default, {
            valueMoving: valueMoving,
            isAdminMode: isAdminMode,
            msgDateTo: msgDateTo,
            updateDateTo: this._updateDateTo
          })
        )
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