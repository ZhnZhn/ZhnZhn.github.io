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

var _class, _temp, _initialiseProps;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Color = require('../styles/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  DIV: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  SVG: {
    display: 'inline-block'
  }
};

var E = {
  KEY: " ",
  KEY_CODE: 32
};

var C_GREY = "#777777";

var EL_CHECKED = _react2.default.createElement('path', {
  d: 'M 2,3 L 8,14 14,3',
  strokeWidth: '2',
  stroke: _Color2.default.YELLOW,
  fill: _Color2.default.BLANK
});

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _getInitStateFrom = function _getInitStateFrom(_ref) {
  var initValue = _ref.initValue,
      value = _ref.value;
  return {
    initValue: initValue,
    isChecked: !!value
  };
};

var SvgCheckBox = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(SvgCheckBox, _Component);

  /*
  static propTypes = {
    initValue: PropTypes.bool,
    value: PropTypes.bool,
    style: PropTypes.object,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */

  function SvgCheckBox(props) {
    (0, _classCallCheck3.default)(this, SvgCheckBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SvgCheckBox.__proto__ || Object.getPrototypeOf(SvgCheckBox)).call(this, props));

    _initialiseProps.call(_this);

    var onCheck = props.onCheck,
        onUnCheck = props.onUnCheck;

    _this._isOnCheck = _isFn(onCheck);
    _this._isOnUnCheck = _isFn(onUnCheck);

    _this.state = _getInitStateFrom(props);
    return _this;
  }

  (0, _createClass3.default)(SvgCheckBox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          _props$value = _props.value,
          value = _props$value === undefined ? this.state.isChecked : _props$value,
          _elChecked = value ? EL_CHECKED : null;

      return _react2.default.createElement(
        'div',
        {
          role: 'checkbox',
          tabIndex: '0',
          'aria-checked': value
          //aria-labelledby
          , style: (0, _extends3.default)({}, S.DIV, style),
          onClick: this._hClick,
          onKeyDown: this._hKeyDown
        },
        _react2.default.createElement(
          'svg',
          {
            viewBox: '0 0 16 16', width: '100%', height: '100%',
            preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
            style: S.SVG
          },
          _react2.default.createElement('rect', {
            x: '1', y: '1',
            height: '14', width: '14',
            strokeWidth: '2', rx: '3',
            stroke: C_GREY, fill: _Color2.default.BLANK
          }),
          _elChecked
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      return props.initValue !== state.initValue ? _getInitStateFrom(props) : null;
    }
  }]);
  return SvgCheckBox;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._hClick = function () {
    var _isOnCheck = _this2._isOnCheck,
        _isOnUnCheck = _this2._isOnUnCheck,
        state = _this2.state,
        props = _this2.props,
        onCheck = props.onCheck,
        onUnCheck = props.onUnCheck,
        isChecked = state.isChecked;


    if (!isChecked && _isOnCheck) {
      onCheck(_this2);
    } else if (_isOnUnCheck) {
      onUnCheck(_this2);
    }

    _this2.setState({ isChecked: !isChecked });
  };

  this._hKeyDown = function (evt) {
    if (evt.key === E.KEY || evt.keyCode === E.KEY_CODE) {
      evt.preventDefault();
      _this2._hClick();
    }
  };

  this.setUnchecked = function () {
    _this2.setState({ isChecked: false });
  };
}, _temp);
exports.default = SvgCheckBox;
//# sourceMappingURL=SvgCheckBox.js.map