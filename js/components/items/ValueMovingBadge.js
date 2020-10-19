"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _Type = require("../../constants/Type");

var _SvgDown = _interopRequireDefault(require("../zhn/SvgDown"));

var _SvgUp = _interopRequireDefault(require("../zhn/SvgUp"));

var _SvgEqual = _interopRequireDefault(require("../zhn/SvgEqual"));

var _SpanValue = _interopRequireDefault(require("../zhn-span/SpanValue"));

var _SpanDate = _interopRequireDefault(require("../zhn-span/SpanDate"));

var _ValueMovingModal = _interopRequireDefault(require("./ValueMovingModal"));

//import PropTypes from "prop-types";
var CL_BT = 'bt';
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
  G5: {
    display: 'inline-block',
    width: 5
  },
  DATE: {
    display: 'inline-block',
    paddingTop: 4,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5
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
        _svgDirection: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgDown["default"], {}),
        _dStyle: S.DOWN
      };

    case _Type.Direction.UP:
      return {
        _svgDirection: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgUp["default"], {}),
        _dStyle: S.UP
      };

    case _Type.Direction.EQUAL:
      return {
        _svgDirection: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgEqual["default"], {}),
        _dStyle: S.EQUAL
      };

    default:
      return {
        _svgDirection: null
      };
  }
};

var ValueMovingBadge = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ValueMovingBadge, _Component);

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
    crValueMoving: PropTypes.func,
    regCompVm: PropTypes.func
  }
  */
  function ValueMovingBadge(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hClickBt = function () {
      _this.setState(function (prev) {
        return {
          isShowModal: !prev.isShowModal
        };
      });
    };

    _this._hCloseModal = function (event) {
      _this.setState({
        isShowModal: false
      });
    };

    _this._updateDateTo = function (dateTo) {
      var valueMoving = _this.props.crValueMoving(_this.state.valueMoving, dateTo);

      if (valueMoving) {
        _this.setState({
          valueMoving: valueMoving
        });

        return valueMoving;
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

  var _proto = ValueMovingBadge.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.regCompVm(this);
  };

  _proto.render = function render() {
    var isAdminMode = this.props.isAdminMode,
        _this$state = this.state,
        isShowModal = _this$state.isShowModal,
        valueMoving = _this$state.valueMoving,
        msgDateTo = _this$state.msgDateTo,
        value = valueMoving.value,
        delta = valueMoving.delta,
        percent = valueMoving.percent,
        direction = valueMoving.direction,
        date = valueMoving.date,
        _getDirection2 = _getDirection(direction),
        _svgDirection = _getDirection2._svgDirection,
        _dStyle = _getDirection2._dStyle;

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      style: S.ROOT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanValue["default"], {
        value: value
      }), _svgDirection, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: (0, _extends2["default"])({}, S.DELTA, _dStyle),
        children: percent
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: (0, _extends2["default"])({}, S.DELTA, _dStyle),
        children: delta
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S.G5
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: CL_BT,
        onClick: this._hClickBt,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanDate["default"], {
          style: S.DATE,
          date: date
        })
      }), _svgDirection !== null && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueMovingModal["default"], {
        isShow: isShowModal,
        onClose: this._hCloseModal,
        valueMoving: valueMoving,
        isAdminMode: isAdminMode,
        msgDateTo: msgDateTo,
        updateDateTo: this._updateDateTo
      })]
    });
  };

  return ValueMovingBadge;
}(_react.Component);

ValueMovingBadge.defaultProps = {
  valueMoving: {
    value: 0,
    delta: 0,
    percent: 0,
    direction: _Type.Direction.EQUAL,
    date: ''
  },
  regCompVm: function regCompVm() {}
};
var _default = ValueMovingBadge;
exports["default"] = _default;
//# sourceMappingURL=ValueMovingBadge.js.map