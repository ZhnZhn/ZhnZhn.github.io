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

var SvgChecked = function SvgChecked(_ref) {
  var stroke = _ref.stroke;
  return _react2.default.createElement('path', {
    d: 'M 2,5 L 8,14 14,1',
    strokeWidth: '2',
    strokeLinecap: 'round',
    stroke: stroke,
    fill: _Color2.default.BLANK
  });
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _getInitStateFrom = function _getInitStateFrom(_ref2) {
  var initValue = _ref2.initValue,
      value = _ref2.value;
  return {
    initValue: initValue,
    isChecked: !!value
  };
};

var SvgCheckBox = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(SvgCheckBox, _Component);

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
  /*
  static propTypes = {
    initValue: PropTypes.bool,
    value: PropTypes.bool,
    style: PropTypes.object,
    checkedRestStroke: PropTypes.string,
    checkedRestFill: PropTypes.string,
    checkedColor: PropTypes.string,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */


  (0, _createClass3.default)(SvgCheckBox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          checkedRestStroke = _props.checkedRestStroke,
          checkedRestFill = _props.checkedRestFill,
          checkedColor = _props.checkedColor,
          _props$value = _props.value,
          value = _props$value === undefined ? this.state.isChecked : _props$value,
          _restStroke = value ? checkedRestStroke : C_GREY,
          _restFill = value ? checkedRestFill : _Color2.default.BLANK;

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
            stroke: _restStroke,
            fill: _restFill
          }),
          value ? _react2.default.createElement(SvgChecked, { stroke: checkedColor }) : null
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
}(_react.Component), _class.defaultProps = {
  checkedRestStroke: C_GREY,
  checkedRestFill: _Color2.default.BLANK,
  checkedColor: _Color2.default.YELLOW
}, _initialiseProps = function _initialiseProps() {
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