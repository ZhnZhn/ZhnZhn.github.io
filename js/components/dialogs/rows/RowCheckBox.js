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

var _SvgCheckBox = require('../../zhn/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    paddingTop: '6px',
    paddingLeft: '16px'
  },
  CAPTION: {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none',
    cursor: 'pointer'
  },
  CHECKED: {
    color: 'black'
  }
};
//import PropTypes from "prop-types";

var _isFn = function _isFn(fn) {
  return typeof fn == 'function';
};
var _isUndefined = function _isUndefined(v) {
  return typeof v === 'undefined';
};

var RowCheckBox = function (_Component) {
  (0, _inherits3.default)(RowCheckBox, _Component);

  /*
  static propTypes = {
    rootStyle : PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.bool,
    value: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func,
    onToggle: PropTypes.func
  }
  */

  function RowCheckBox(props) {
    (0, _classCallCheck3.default)(this, RowCheckBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RowCheckBox.__proto__ || Object.getPrototypeOf(RowCheckBox)).call(this, props));

    _this._handleCheck = function () {
      var _this$props = _this.props,
          onCheck = _this$props.onCheck,
          onToggle = _this$props.onToggle;

      if (_isFn(onCheck)) {
        onCheck();
      } else if (_isFn(onToggle)) {
        onToggle();
      }
      if (_this.state) {
        _this.setState({ isChecked: true });
      }
    };

    _this._handleUnCheck = function () {
      var _this$props2 = _this.props,
          onUnCheck = _this$props2.onUnCheck,
          onToggle = _this$props2.onToggle;

      if (_isFn(onUnCheck)) {
        onUnCheck();
      } else if (_isFn(onToggle)) {
        onToggle();
      }
      if (_this.state) {
        _this.setState({ isChecked: false });
      }
    };

    _this._handleToggle = function () {
      var _is = _this.state ? _this.state.isChecked : _this.props.value;
      if (_is) {
        _this._handleUnCheck();
      } else {
        _this._handleCheck();
      }
    };

    if (_isUndefined(props.value)) {
      _this.state = {
        isChecked: !!props.initValue
      };
    }
    return _this;
  }

  (0, _createClass3.default)(RowCheckBox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          caption = _props.caption,
          value = _props.value,
          _value = this.state ? this.state.isChecked : value,
          _style = _value ? STYLE.CHECKED : null;

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, STYLE.ROOT, rootStyle) },
        _react2.default.createElement(_SvgCheckBox2.default, {
          value: _value,
          onCheck: this._handleCheck,
          onUnCheck: this._handleUnCheck
        }),
        caption && _react2.default.createElement(
          'span',
          {
            style: (0, _extends3.default)({}, STYLE.CAPTION, _style),
            onClick: this._handleToggle
          },
          caption
        )
      );
    }
  }]);
  return RowCheckBox;
}(_react.Component);

exports.default = RowCheckBox;
//# sourceMappingURL=RowCheckBox.js.map