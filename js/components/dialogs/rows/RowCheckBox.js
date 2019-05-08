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

var _withTheme = require('../../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _SvgCheckBox = require('../../zhn/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'ROW_CHECKBOX';

var S = {
  ROOT: {
    paddingTop: 6,
    paddingLeft: 16
  },
  CAPTION: {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: 12,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none',
    cursor: 'pointer'
  },
  CHECKED: {
    color: 'black'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn == 'function';
};
var _isUndefined = function _isUndefined(v) {
  return typeof v === 'undefined';
};

var RowCheckBox = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(RowCheckBox, _Component);

  function RowCheckBox(props) {
    (0, _classCallCheck3.default)(this, RowCheckBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RowCheckBox.__proto__ || Object.getPrototypeOf(RowCheckBox)).call(this, props));

    _this._hCheck = function () {
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

    _this._hUnCheck = function () {
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

    _this._hToggle = function () {
      var _is = _this.state ? _this.state.isChecked : _this.props.value;
      if (_is) {
        _this._hUnCheck();
      } else {
        _this._hCheck();
      }
    };

    if (_isUndefined(props.value)) {
      _this.state = {
        isChecked: !!props.initValue
      };
    }
    return _this;
  }
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


  (0, _createClass3.default)(RowCheckBox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          rootStyle = _props.rootStyle,
          caption = _props.caption,
          styleCaption = _props.styleCaption,
          value = _props.value,
          checkedRestStroke = _props.checkedRestStroke,
          checkedRestFill = _props.checkedRestFill,
          TS = theme.getStyle(TH_ID),
          _value = this.state ? this.state.isChecked : value,
          _style = _value ? (0, _extends3.default)({}, styleCaption, S.CHECKED) : styleCaption;

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, S.ROOT, rootStyle) },
        _react2.default.createElement(_SvgCheckBox2.default, {
          value: _value,
          checkedRestStroke: checkedRestStroke,
          checkedRestFill: checkedRestFill,
          checkedColor: TS.CHECKED_COLOR,
          onCheck: this._hCheck,
          onUnCheck: this._hUnCheck
        }),
        caption && _react2.default.createElement(
          'span',
          {
            style: (0, _extends3.default)({}, S.CAPTION, _style),
            onClick: this._hToggle
          },
          caption
        )
      );
    }
  }]);
  return RowCheckBox;
}(_react.Component), _class.defaultProps = {
  checkedRestStroke: 'black',
  checkedRestFill: 'black'
}, _temp);
exports.default = (0, _withTheme2.default)(RowCheckBox);
//# sourceMappingURL=RowCheckBox.js.map