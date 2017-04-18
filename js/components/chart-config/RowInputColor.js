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

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingRight: '6px'
  },
  CAPTION: {
    color: 'rgb(27, 117, 187)',
    display: 'inline-block',
    textAlign: 'right',
    width: '80px',
    paddingRight: '5px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: '80px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  COLOR: {
    display: 'inline-block',
    height: '32px',
    width: '32px',
    borderRadius: '2px',
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var RowInputColor = function (_Component) {
  (0, _inherits3.default)(RowInputColor, _Component);

  function RowInputColor(props) {
    (0, _classCallCheck3.default)(this, RowInputColor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RowInputColor.__proto__ || Object.getPrototypeOf(RowInputColor)).call(this));

    _this._handleEnter = function (value) {
      _this.props.onEnter(value);
      _this.setState({ value: value });
    };

    _this.state = {
      value: props.initValue
    };
    return _this;
  }

  (0, _createClass3.default)(RowInputColor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({ value: nextProps.initValue });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styleRoot = _props.styleRoot,
          styleCaption = _props.styleCaption,
          styleInput = _props.styleInput,
          caption = _props.caption,
          value = this.state.value,
          _bgColor = { backgroundColor: value };

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, STYLE.ROOT, styleRoot) },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement(
            'span',
            { style: (0, _extends3.default)({}, STYLE.CAPTION, styleCaption) },
            caption
          ),
          _react2.default.createElement(_InputText2.default, {
            style: (0, _extends3.default)({}, STYLE.INPUT_TEXT, styleInput),
            initValue: value,
            onEnter: this._handleEnter
          })
        ),
        _react2.default.createElement('span', { style: (0, _extends3.default)({}, STYLE.COLOR, _bgColor) })
      );
    }
  }]);
  return RowInputColor;
}(_react.Component);

process.env.NODE_ENV !== "production" ? RowInputColor.propTypes = {
  styleRoot: _react.PropTypes.object,
  styleCaption: _react.PropTypes.object,
  styleInput: _react.PropTypes.object,
  caption: _react.PropTypes.string,
  initValue: _react.PropTypes.string,
  onEnter: _react.PropTypes.func
} : void 0;
exports.default = RowInputColor;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\RowInputColor.js.map